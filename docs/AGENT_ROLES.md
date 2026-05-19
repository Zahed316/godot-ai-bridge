# Agent Roles

Global execution rule:

- Only one agent may be active at a time.
- Wait for the active agent result before activating another agent.
- No parallel agent execution.

All agents must follow `AGENTS.md`, preserve `docs/CLEAN_ROOM.md`, stay within the current phase in `docs/NEXT_PHASES.md`, and use the final report contract from `AGENTS.md`.

## Project Coordinator Agent

Purpose:
Controls phase scope, checks whether the requested task belongs to the current phase, and prevents phase creep.

Responsibilities:
- Confirm current phase from `docs/NEXT_PHASES.md`.
- Split large requests into one hard task or a few simple tasks.
- Reject or defer work from future phases.
- Ensure final report is useful for the next prompt.
- Ensure Git workflow happened according to `AGENTS.md`.

Allowed files:
- `AGENTS.md`
- `README.md`
- `README.fa.md`
- `docs/NEXT_PHASES.md`
- `docs/QUALITY_GATES.md`

Forbidden actions:
- Feature implementation.
- MCP tool implementation.
- Godot plugin implementation.
- WebSocket implementation.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify requested work matches the current phase.
- Verify required files exist.
- Run available changed-scope checks.
- Run `git status`.

Final report fields:
- Active role.
- Current phase and scope decision.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Next suggested phase or blocker.

Handoff notes:
- State the current phase, deferred work, and next allowed action.
- Note whether the required Git workflow completed.

## Architecture Agent

Purpose:
Keeps the architecture clean and prevents overengineering.

Responsibilities:
- Review MCP/Godot boundaries.
- Maintain architecture decisions.
- Keep TypeScript server, protocol, and Godot plugin separated.
- Ensure dynamic/progressive tool discovery remains the preferred design.
- Add ADRs when a lasting architecture decision is made.

Allowed files:
- `docs/ARCHITECTURE.md`
- `docs/API_BOUNDARIES.md`
- `docs/MCP_KNOWLEDGE.md`
- `docs/ADR/**`

Forbidden actions:
- Runtime implementation.
- Tool handler implementation unless explicitly requested.
- Changing security defaults without Security Agent review.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify architecture docs remain consistent with phase scope.
- Verify ADRs are added only for lasting decisions.
- Run available documentation checks.
- Run `git status`.

Final report fields:
- Active role.
- Architecture decision or boundary reviewed.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Handoff risks or next decision needed.

Handoff notes:
- Summarize any boundary decision in one or two lines.
- Identify whether a Security Agent review is needed.

## Security Agent

Purpose:
Keeps the project local-first, default-deny, and safe for agentic tool use.

Responsibilities:
- Review localhost-only rules.
- Review path guard rules.
- Review approval/snapshot requirements.
- Review tool risk levels.
- Review audit-log expectations.
- Block dangerous tools unless explicitly approved.

Allowed files:
- `docs/SECURITY.md`
- `docs/API_BOUNDARIES.md`
- `docs/QUALITY_GATES.md`
- `docs/ERROR_MODEL.md`
- Security-related sections in `README.md` and `README.fa.md`

Forbidden actions:
- Weakening default-deny behavior.
- Enabling arbitrary script execution.
- Enabling external command execution.
- Binding services to `0.0.0.0`.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SECURITY.md`
- `docs/ERROR_MODEL.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify localhost-only and default-deny rules remain intact.
- Verify dangerous tools remain disabled unless explicitly approved.
- Run available documentation checks.
- Run `git status`.

Final report fields:
- Active role.
- Security boundary reviewed.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Security blocker or next review needed.

Handoff notes:
- Flag any unresolved approval, snapshot, path guard, or audit-log gap.
- State whether the next phase is safe to proceed from a security perspective.

## MCP Server Agent

Purpose:
Implements and maintains the TypeScript MCP server only when the current phase explicitly allows it.

Responsibilities:
- Maintain `packages/mcp-server`.
- Keep stdout clean for MCP protocol.
- Send logs to stderr only.
- Implement MCP tools only when the phase requests them.
- Keep tools minimal and schema-driven.
- Never connect to Godot before the WebSocket phase.

Allowed files:
- `packages/mcp-server/**`
- `package.json`
- `pnpm-workspace.yaml`
- `docs/MCP_KNOWLEDGE.md` when needed
- `docs/SCHEMA_CONVENTIONS.md` when needed

Forbidden actions:
- Godot plugin edits.
- WebSocket bridge before its phase.
- External command execution.
- Unsafe tool registration.
- Adding many tools without progressive discovery.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/MCP_KNOWLEDGE.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Run package install verification if needed.
- Run TypeScript check for changed packages.
- Verify JSON files parse when edited.
- Run `git status`.

Final report fields:
- Active role.
- MCP server scope implemented or deferred.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Next server blocker or phase.

Handoff notes:
- State whether stdout remains MCP-safe.
- State whether any tool registration was added and why the phase allowed it.

## Protocol Agent

Purpose:
Maintains shared protocol contracts between MCP server and Godot plugin.

Responsibilities:
- Maintain shared constants, command names, types, schemas, and error codes.
- Keep protocol version explicit.
- Keep protocol package implementation-free unless requested.
- Align with `docs/ERROR_MODEL.md`.

Allowed files:
- `packages/protocol/**`
- `docs/ERROR_MODEL.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/API_BOUNDARIES.md`

Forbidden actions:
- Transport implementation.
- Godot runtime implementation.
- Direct MCP tool implementation.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Run TypeScript check for `packages/protocol` when code changes.
- Verify schema and error docs stay aligned when edited.
- Verify JSON files parse when edited.
- Run `git status`.

Final report fields:
- Active role.
- Protocol contract changed or reviewed.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Handoff notes for server and plugin agents.

Handoff notes:
- List changed constants, schemas, versions, or error codes.
- State whether downstream MCP server or Godot plugin work is required.

## Godot Plugin Agent

Purpose:
Implements and maintains the Godot Editor Plugin only when the current phase explicitly allows it.

Responsibilities:
- Maintain `addons/godot_ai_bridge`.
- Keep plugin minimal until its phase.
- Use `@tool` and `EditorPlugin` correctly.
- Avoid arbitrary editor script execution.
- Avoid WebSocket startup until the WebSocket phase.

Allowed files:
- `addons/godot_ai_bridge/**`
- `docs/GODOT_KNOWLEDGE.md` when needed

Forbidden actions:
- MCP server edits.
- External command execution.
- Arbitrary GDScript execution by default.
- Runtime bridge logic before runtime phase.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SECURITY.md`
- `docs/GODOT_KNOWLEDGE.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify Godot plugin files exist when edited.
- Run available syntax or project checks.
- Run documentation checks if docs changed.
- Run `git status`.

Final report fields:
- Active role.
- Plugin scope implemented or deferred.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Next plugin blocker or phase.

Handoff notes:
- State whether plugin remains minimal and phase-compliant.
- Note any manual Godot editor verification that remains.

## WebSocket Bridge Agent

Purpose:
Owns the local WebSocket handshake phase only.

Responsibilities:
- Implement localhost-only connection when requested.
- Add token handshake when requested.
- Keep command execution disabled until command-router phase.
- Ensure no `0.0.0.0` binding.

Allowed files:
- `packages/mcp-server/src/bridge/**`
- `addons/godot_ai_bridge/bridge/**`
- `packages/protocol/**`

Forbidden actions:
- Real command execution before allowed.
- Runtime inspection.
- Unsafe network binding.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SECURITY.md`
- `docs/ERROR_MODEL.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify binding is localhost-only.
- Verify command execution remains disabled.
- Run TypeScript checks for server/protocol changes.
- Run available Godot checks for plugin bridge changes.
- Run `git status`.

Final report fields:
- Active role.
- WebSocket handshake scope implemented or deferred.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Security handoff or next phase.

Handoff notes:
- State exact host binding and handshake behavior.
- State that command routing and runtime inspection remain out of scope.

## Tooling and Build Agent

Purpose:
Maintains development tooling, package scripts, CI, and typecheck/build health.

Responsibilities:
- Maintain package scripts.
- Maintain tsconfig files.
- Maintain CI only for checks, not deployment.
- Keep pnpm/corepack behavior documented.
- Avoid adding heavy dependencies.

Allowed files:
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `packages/*/package.json`
- `packages/*/tsconfig.json`
- `.github/workflows/**`
- `docs/DEVELOPMENT.md`

Forbidden actions:
- Feature logic.
- Deployment CI.
- Heavy frameworks without approval.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify JSON files parse when edited.
- Run package manager checks available for changed scope.
- Run TypeScript check when tooling affects TypeScript.
- Run `git status`.

Final report fields:
- Active role.
- Tooling or build change made.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Dependency or tooling blocker.

Handoff notes:
- State exact commands future agents should use.
- Report missing local dependencies exactly.

## QA Agent

Purpose:
Defines and maintains tests/checks appropriate to each phase.

Responsibilities:
- Add minimal tests only when phase allows.
- Verify files exist.
- Verify JSON parses.
- Verify TypeScript builds.
- Report missing dependencies exactly.
- Avoid expanding scope.

Allowed files:
- `tests/**`
- `docs/QUALITY_GATES.md`
- Package scripts only when needed for checks.

Forbidden actions:
- Feature implementation.
- Broad refactors.
- Test frameworks unless phase approves them.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify required files exist.
- Verify JSON files parse when relevant.
- Run TypeScript check when available.
- Run any phase-specific tests.
- Run `git status`.

Final report fields:
- Active role.
- Quality gate reviewed.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Test gap or blocker.

Handoff notes:
- List exact checks run and exact failures or missing dependencies.
- Keep test recommendations scoped to the current phase.

## Documentation Agent

Purpose:
Keeps project docs accurate, compact, bilingual where needed, and aligned with phase state.

Responsibilities:
- Maintain `README.md` and `README.fa.md`.
- Maintain docs.
- Keep English and Persian README aligned at summary level.
- Avoid duplicating `AGENTS.md` rules in every doc.
- Record phase status clearly.

Allowed files:
- `README.md`
- `README.fa.md`
- `AGENTS.md`
- `docs/**`

Forbidden actions:
- Source code changes.
- Tool implementation.
- Runtime behavior.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/API_BOUNDARIES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify required files exist.
- Verify edited docs cover requested scope.
- Run available documentation or repository checks.
- Run typecheck when required by `AGENTS.md` or changed scope.
- Run `git status`.

Final report fields:
- Active role.
- Documentation scope updated.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Next suggested phase or blocker.

Handoff notes:
- State which docs are authoritative for the next prompt.
- Identify any README alignment or translation work left.

## Release and Repository Agent

Purpose:
Maintains GitHub repository hygiene and release metadata when requested.

Responsibilities:
- Maintain repository metadata docs.
- Maintain changelog/release notes when requested.
- Ensure local and GitHub versions are synced.
- Do not publish packages unless explicitly requested.

Allowed files:
- `README.md`
- `README.fa.md`
- `CHANGELOG.md`
- `docs/**`
- `.github/**`

Forbidden actions:
- `npm publish`.
- GitHub release publishing.
- Deployment automation unless explicitly requested.

Required reading:
- `AGENTS.md`
- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/NEXT_PHASES.md`
- `docs/CLEAN_ROOM.md`

Required checks:
- Verify repository metadata docs are accurate.
- Run available documentation checks.
- Verify Git sync after accepted changes.
- Run `git status`.

Final report fields:
- Active role.
- Repository or release metadata changed.
- Changed files.
- Checks run or skipped.
- Forbidden changes not made.
- Latest commit hash and message.
- Working tree status.
- Release or sync blocker.

Handoff notes:
- State whether local and remote repository state are synchronized.
- State whether any publish or release action was intentionally not performed.
