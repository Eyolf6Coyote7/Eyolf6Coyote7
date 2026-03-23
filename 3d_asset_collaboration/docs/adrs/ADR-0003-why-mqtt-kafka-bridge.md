# ADR-0003: Why MQTT → Kafka Bridge Instead of Direct Kafka from IoT Devices

## Status
Accepted

## Context
IoT sensors need to send data to the platform. Options:
- **Direct Kafka producer** on each IoT device
- **MQTT (Mosquitto)** on devices, then bridge to Kafka server-side

## Decision
Use **MQTT** for device-to-server communication, then **bridge to Kafka** for persistence and processing.

## Reason
- MQTT is designed for constrained IoT devices — lightweight, low bandwidth, supports QoS levels
- Kafka client libraries are heavy — not suitable for embedded/IoT devices
- MQTT supports intermittent connectivity with QoS 1/2 (guaranteed delivery)
- Mosquitto is battle-tested for IoT (millions of deployments)
- Kafka handles durable storage, partitioning, and consumer groups — decouples ingestion from processing

## Consequences
- Need to maintain MQTT → Kafka bridge (additional component)
- Message ordering: MQTT doesn't guarantee order — Kafka partitioning by device_id restores per-device order
- Two serialization points (MQTT payload → Kafka record) — need consistent schema
