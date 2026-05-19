# Agent Roles

Global rule:

- Only one agent may be active at a time.
- The main agent must wait for the active agent's result before invoking another agent.
- No parallel agent execution is allowed.

## Project Coordinator Agent

- Responsibilities: phase control, scope control, final sync.
- Allowed files: `AGENTS.md`, `README.md`, `README.fa.md`, `docs/NEXT_PHASES.md`.
- Forbidden actions: implementation code, tool logic, bridge logic.
- Required checks: `git status`, docs verification.
- Handoff notes: confirm current phase and next allowed phase.

## Architecture Agent

- Responsibilities: architecture docs and boundaries.
- Allowed files: `docs/ARCHITECTURE.md`, `docs/API_BOUNDARIES.md`, `docs/MCP_KNOWLEDGE.md`.
- Forbidden actions: runtime implementation, protocol handlers.
- Required checks: markdown review.
- Handoff notes: keep changes advisory only.

## Security Agent

- Responsibilities: security rules and risk boundaries.
- Allowed files: `docs/SECURITY.md`, `docs/API_BOUNDARIES.md`.
- Forbidden actions: weakening defaults, enabling risky execution.
- Required checks: boundary review.
- Handoff notes: report any default-deny gaps.

## Godot Plugin Agent

- Responsibilities: plugin docs and planned editor responsibilities.
- Allowed files: `docs/GODOT_KNOWLEDGE.md`, `addons/godot_ai_bridge/plugin.gd`, `addons/godot_ai_bridge/plugin.cfg`.
- Forbidden actions: WebSocket startup, command execution, runtime bridge logic.
- Required checks: file existence and syntax review.
- Handoff notes: keep plugin minimal until later phases.

## MCP Server Agent

- Responsibilities: MCP planning and server boundary docs.
- Allowed files: `docs/MCP_KNOWLEDGE.md`, `packages/mcp-server/package.json`, `packages/mcp-server/src/index.ts`.
- Forbidden actions: real MCP tool execution, transport implementation.
- Required checks: JSON validity and placeholder review.
- Handoff notes: remain placeholder-only unless a future phase is requested.

## Protocol Agent

- Responsibilities: shared protocol planning and schema notes.
- Allowed files: `packages/protocol/package.json`, `packages/protocol/src/index.ts`.
- Forbidden actions: runtime handlers, transport code.
- Required checks: JSON validity and placeholder review.
- Handoff notes: keep protocol surface minimal.

## QA Agent

- Responsibilities: verification planning and test guidance.
- Allowed files: `tests/**`, `docs/NEXT_PHASES.md`.
- Forbidden actions: feature implementation.
- Required checks: relevant docs and file checks.
- Handoff notes: report missing dependencies exactly.

## Documentation Agent

- Responsibilities: docs, README updates, knowledge pack maintenance.
- Allowed files: `README.md`, `README.fa.md`, `docs/**`, `AGENTS.md`.
- Forbidden actions: implementation code and unsafe defaults.
- Required checks: markdown review and required-file checks.
- Handoff notes: keep English and Persian docs aligned.

