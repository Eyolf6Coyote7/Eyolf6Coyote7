---
name: skill_impl_ops
description: Infra & DevOps harness — single skill covering Terraform / K8s yaml / OPA Rego / Prometheus yaml as a unified declarative-config mental model for FE / BE / Data consumers.
status: spec-only
spec_only_reason: This monorepo's portfolio is local-only via docker-compose with no Terraform / Kubernetes / OPA / Prometheus deployment layer. This harness is documented as a design spec. Will become `implemented` when an IaC layer joins the workspace.
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二, 五).

| Harness | This file |
|---|---|
| FE × 4 | `skill_impl_fe_ssr.md` / `skill_impl_fe_csr.md` / `skill_impl_fe_isr.md` / `skill_impl_fe_ab.md` |
| BE × 1 | `skill_impl_be.md` |
| Ops × 1 | **`skill_impl_ops.md`** ← |

Ops is **1 harness** because — although the consumer surface is broad (FE deploys want CloudFront + S3 + WAF + edge latency SLO; BE deploys want EKS + RDS + Kafka + RBAC + app SLO; Data deploys want Glue + EMR + Airflow + data freshness SLO) — the **mental model is identical**: "from a spec, derive declarative config." Only the syntax surface changes (HCL / YAML / Rego), not the cognitive process.

## Why Ops is 1 harness, not 3

The slide proves this in section 五: every Ops consumer (FE / BE / Data) needs the same 4 declarative tool families:
- **Terraform HCL** — cloud resources (CloudFront / RDS / Kafka / S3 / Glue)
- **Kubernetes YAML** — workload manifests (Deployment / Ingress / CronJob / NetworkPolicy)
- **OPA Rego** — policy (WAF / RBAC / data access)
- **Prometheus YAML** — alerts / SLOs (Web Vitals / app error rate / ETL freshness)

The CONTENT of each tool's config differs by consumer (FE writes CloudFront, BE writes RDS), but the **syntax + AI prompting pattern is identical**. AI needs to learn 4 tool surfaces (HCL / YAML / Rego / PromQL); after that, it can write config for any consumer.

## When to use

Trigger when the user is building or modifying:
- Terraform `.tf` files (any cloud provider)
- Kubernetes manifests (`Deployment`, `Service`, `Ingress`, `HorizontalPodAutoscaler`, `CronJob`, `NetworkPolicy`)
- OPA Rego policies (`*.rego`)
- Prometheus alert rules / recording rules / SLO definitions
- GitHub Actions / GitLab CI / ArgoCD application manifests
- Helm charts / Kustomize overlays
- mentions `terraform plan`, `kubectl apply`, `opa eval`, `promtool`, `helm install`, `argocd sync`

This skill covers ALL infra/devops work regardless of consumer (FE / BE / Data).

## The unified mental model

For ANY declarative tool, the AI workflow is:

1. **Read the spec** (what does the consumer want?)
2. **Identify the resource graph** (A depends on B, B is deployed to C)
3. **Predict blast radius** (changing this affects which downstream?)
4. **Produce a dry-run plan** (`terraform plan`, `kubectl diff`, `opa eval`, `promtool check`)
5. **Human review** (HITL — see Anti-patterns)
6. **Apply** (`terraform apply`, `kubectl apply`, `opa publish`, `promtool reload`)
7. **Verify** (resource health, traffic, alert silence)

The 7 steps are the SAME for every tool. Only the syntax for steps 4 and 6 differs.

## Code patterns by tool

### Terraform HCL pattern

```hcl
# CloudFront distribution for FE static deploy
resource "aws_cloudfront_distribution" "fe_dist" {
  origin {
    domain_name = aws_s3_bucket.fe_bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.fe_bucket.id}"
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"  # SPA fallback
  }
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.fe_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
  }
  restrictions {
    geo_restriction { restriction_type = "none" }
  }
  viewer_certificate { cloudfront_default_certificate = true }
}
```

### Kubernetes YAML pattern

```yaml
# Deployment + HPA for a BE service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: workflow-api
spec:
  replicas: 3
  selector:
    matchLabels: { app: workflow-api }
  template:
    metadata:
      labels: { app: workflow-api }
    spec:
      containers:
        - name: workflow-api
          image: ghcr.io/workspace/workflow-api:latest
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: 200m, memory: 256Mi }
            limits:   { cpu: 1000m, memory: 1Gi }
          readinessProbe:
            httpGet: { path: /health, port: 8080 }
            initialDelaySeconds: 5
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: workflow-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: workflow-api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 70 }
```

### OPA Rego pattern

```rego
package kubernetes.admission

# deny pods running as root
deny[msg] {
  input.request.kind.kind == "Pod"
  some container
  container := input.request.object.spec.containers[_]
  not container.securityContext.runAsNonRoot
  msg := sprintf("container %q must set runAsNonRoot=true", [container.name])
}

# deny privileged containers
deny[msg] {
  input.request.kind.kind == "Pod"
  some container
  container := input.request.object.spec.containers[_]
  container.securityContext.privileged == true
  msg := sprintf("container %q must not be privileged", [container.name])
}
```

### Prometheus YAML pattern

```yaml
# Recording rule + alert for app SLO
groups:
  - name: workflow-api.slo
    interval: 30s
    rules:
      - record: workflow_api:request_error_rate:5m
        expr: |
          sum(rate(http_requests_total{job="workflow-api",status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total{job="workflow-api"}[5m]))
      - alert: WorkflowApiHighErrorRate
        expr: workflow_api:request_error_rate:5m > 0.01
        for: 10m
        labels: { severity: page, team: workflow }
        annotations:
          summary: workflow-api 5xx rate above 1% for 10m
          runbook: https://runbooks/workflow-api-5xx
```

## Why these 4 tools fit one harness

The slide section 5.2 makes this explicit: differing surface SYNTAX (HCL vs YAML vs Rego vs PromQL) is a **language adapter problem**, not a mental model problem. The cognitive process — read the spec, identify the resource graph, predict blast radius, produce a dry-run plan, HITL, apply, verify — is identical for all four.

The portfolio doesn't currently use any of them, but the skill is structured so that adding (e.g.) a Terraform module to deploy `asset-api` to ECS would mean writing a new `infra/terraform/asset-api.tf` file using the HCL pattern above — without needing to consult a different harness.

## Memory writeback evidence

**`status: spec-only`** — this monorepo runs everything via `docker-compose.yml` for local development. There is no Terraform, no Kubernetes manifest, no OPA Rego, no Prometheus rule in the repo today. This harness is the **design spec** that would be filled with leaves once an IaC layer joins the workspace.

For a leaf-citation example using a different harness, see [`skill_impl_be.md`](skill_impl_be.md) — the BE harness has 9 leaves across 5 language stacks.

## Anti-patterns

- Do NOT let AI run `terraform apply` / `kubectl apply` / `opa publish` automatically. Ops blast radius is large enough that **human-in-the-loop is mandatory** at the apply step. AI can produce the diff, human approves the apply.
- Do NOT mix imperative scripts (`bash`, `python` calling boto3) into this harness — those belong in a separate "scripted ops" skill if needed. This harness is declarative only.
- Do NOT introduce per-consumer skill files (`skill_ops_fe.md`, `skill_ops_be.md`, `skill_ops_data.md`) — the slide proves they collapse.
- Do NOT skip the dry-run step. Every tool has one (`plan` / `diff` / `eval` / `promtool check`); always run it before apply.
- Do NOT hardcode secrets in HCL / YAML / Rego — use SOPS / sealed-secrets / KMS / vault references.
- Do NOT confuse this harness with FE/BE harnesses — Ops is "spec → declarative config", not "spec → runtime code".

## Cross-cutting governance hooks (per slide section 七)

- **Model routing**: Opus 4.6 for resource graph design (high stakes, deep reasoning); Sonnet 4.6 for routine config edits; Haiku 4.5 for `terraform fmt` / `kubeval` micro-fixes.
- **HITL**: REQUIRED at the apply step for ALL Ops actions. Slide section 五 explicitly calls this out.
- **Audit**: every `terraform apply` and `kubectl apply` logged via the CI runner with the human approver's identity and the diff hash.
- **Eval**: changes to this skill require running an Ops-config-generation eval set (synthetic specs → expected HCL/YAML output) before merge.
