---
name: nestjs-tenant-crud
description: Build a NestJS controller+service+dto CRUD slice with multi-tenant scoping, Prisma access, pagination, JWT guard, and guest share tokens.
---

## When to use

Trigger when the user asks to:

- add a new resource (controller + service + DTOs) to the bff-api
- add or modify a Prisma query under multi-tenant scoping
- add pagination, JWT guard, or guest share token endpoints
- mentions of NestJS, Prisma, BoardController, BoardService, AuthGuard, ParseIntPipe, DefaultValuePipe, CurrentUser, AuthUser

This is the converged backend skill for general NestJS CRUD work in this project.

## Context

The bff-api is NestJS 11 + Prisma 6 + Postgres. Multi-tenancy is enforced two ways:

1. Application layer: every Prisma where clause includes tenantId taken from the JWT (req.user.tenantId via @CurrentUser).
2. Database layer: TenantMiddleware sets PostgreSQL search_path to the tenant schemaName, validated against a strict regex SCHEMA_NAME_PATTERN before being interpolated into $executeRawUnsafe. See tenant.middleware.ts.

Pagination is uniform: page (default 1) + limit (default 20, capped 100). Implemented via DefaultValuePipe + ParseIntPipe in the controller and Math.max/Math.min in the service.

JWT auth: @UseGuards(AuthGuard('jwt')) on the controller class; the @CurrentUser() decorator pulls the typed AuthUser off the request.

Guest sharing: BoardService.generateShareLink uses crypto.randomBytes(32).toString('hex') and stores it on the Board row as guestToken. A separate @Controller('guest') exposes findByGuestToken without auth.

Canonical files: bff-api/src/board/board.controller.ts, board.service.ts, board.module.ts, dto/*.ts; bff-api/src/tenant/tenant.middleware.ts; bff-api/src/common/auth-user.decorator.ts; bff-api/prisma/schema.prisma.

## Operating instructions

When adding a new resource (example: Template):

1. Add the Prisma model to bff-api/prisma/schema.prisma. Always include tenantId String + an @@index on it. Run prisma generate via the prebuild script.
2. Create src/template/template.module.ts importing TemplateController and TemplateService and exporting nothing.
3. Create src/template/template.service.ts following BoardService shape: constructor(private prisma: PrismaService); methods take tenantId as a parameter and pass it into every where clause.
4. Create src/template/template.controller.ts with @Controller('templates') @UseGuards(AuthGuard('jwt')); use @CurrentUser() user: AuthUser to access user.tenantId and user.userId.
5. Create dto/create-template.dto.ts and dto/update-template.dto.ts with class-validator decorators (@IsString @IsNotEmpty @IsOptional). Validation is global via app.useGlobalPipes(new ValidationPipe()) in main.ts.
6. Register TemplateModule in app.module.ts and write tests in template.service.spec.ts and template.controller.spec.ts mirroring board.service.spec.ts.
7. Re-use the pagination pattern: @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, then Math.max(1, page) and Math.min(100, Math.max(1, limit)) inside the service.
8. If guest access is required, add a generateShareLink method using crypto.randomBytes and a separate @Controller('guest') endpoint with no AuthGuard.

## Reusable prompts / code patterns

### Controller skeleton (paraphrased from BoardController)

Class decorators: @Controller('templates') and @UseGuards(AuthGuard('jwt')). Inject the service in the constructor.

Routes: @Post() create takes @CurrentUser() and @Body() dto and forwards to svc.create. @Get() findAll uses @Query with DefaultValuePipe(1) + ParseIntPipe for page, DefaultValuePipe(20) + ParseIntPipe for limit, and forwards to svc.findAll(user.tenantId, ...). @Get(':id') findOne forwards id and user.tenantId. @Patch and @Delete follow the same pattern. Optional @Post(':id/share') and @Delete(':id/share') for guest sharing, plus a separate @Controller('guest') with @Get('templates/:token').

### Service skeleton (paraphrased from BoardService)

@Injectable() class with constructor(private prisma: PrismaService).

findAll(tenantId, page=1, limit=20): clamp safePage = Math.max(1, page) and safeLimit = Math.min(100, Math.max(1, limit)); call this.prisma.template.findMany with where { tenantId }, orderBy { createdAt: 'desc' }, skip (safePage-1)*safeLimit, take safeLimit.

findOne(id, tenantId): call this.prisma.template.findFirst with where { id, tenantId }; throw NotFoundException if null. Always include tenantId in the where to prevent cross-tenant leaks.

update / remove: first call findOne(id, tenantId) to assert ownership, then run prisma.update / delete.

Share link: import { randomBytes } from 'crypto', wrap in promisify(randomBytes), generate 32 bytes hex, store as guestToken. Use a separate guest controller without AuthGuard for token-based reads.

### DTO skeleton (class-validator)

Each DTO is a plain class with property decorators: @IsString(), @IsNotEmpty(), @IsOptional() for nullable fields. UpdateDto re-uses the Create fields with @IsOptional. Validation is enforced globally via app.useGlobalPipes(new ValidationPipe()) in main.ts.

### Tenant scoping invariant

Every Prisma where clause MUST include tenantId. Pull tenantId from @CurrentUser() in the controller and forward as a service argument; never read it from the request inside the service. The TenantMiddleware additionally sets PostgreSQL search_path to the tenant schemaName, validated against SCHEMA_NAME_PATTERN before $executeRawUnsafe.

## Anti-patterns

- Do NOT omit tenantId from a Prisma where clause - this leaks data across tenants.
- Do NOT use $executeRawUnsafe with un-validated input - the existing TenantMiddleware uses a strict regex check before interpolating schemaName.
- Do NOT skip the @UseGuards(AuthGuard('jwt')) on the class - per-method guards are easy to forget.
- Do NOT cap pagination above 100 - keeps a single bad client from OOM-ing Postgres.
- Do NOT mix the guest controller into the auth-protected one - keep @Controller('guest') separate so the AuthGuard cannot accidentally apply.
- Do NOT generate share tokens via Math.random - use crypto.randomBytes(32).toString('hex') as in BoardService.
- Do NOT add a new controller without registering it in app.module.ts and writing a .spec.ts.

## References

- realtime_ai_whiteboard/bff-api/src/board/board.controller.ts:1-75 - canonical CRUD controller with guest sub-controller.
- realtime_ai_whiteboard/bff-api/src/board/board.service.ts:1-69 - service with pagination, tenant scoping, and share-link generation.
- realtime_ai_whiteboard/bff-api/src/board/dto/ - create / update / share DTOs with class-validator.
- realtime_ai_whiteboard/bff-api/src/tenant/tenant.middleware.ts:1-33 - schema-name regex + search_path interpolation.
- realtime_ai_whiteboard/bff-api/src/common/auth-user.decorator.ts - @CurrentUser() and AuthUser type.
- realtime_ai_whiteboard/bff-api/src/auth/auth.service.ts - register/login pattern (used as a peer reference).
- realtime_ai_whiteboard/bff-api/src/export/export.service.ts - simpler tenant-scoped read.
- realtime_ai_whiteboard/bff-api/prisma/schema.prisma - tenantId fields and @@index per model.
- realtime_ai_whiteboard/bff-api/src/board/board.service.spec.ts - service unit-test pattern.
