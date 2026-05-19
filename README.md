# godot-ai-bridge

`godot-ai-bridge` is a clean-room open-source project for connecting AI coding agents to Godot 4 through a local, security-conscious bridge.

## Languages

- [English](README.md)
- [فارسی](README.fa.md)

## Project Knowledge

Before implementing any feature, agents must read:

- `docs/GODOT_KNOWLEDGE.md`
- `docs/MCP_KNOWLEDGE.md`
- `docs/API_BOUNDARIES.md`
- `docs/AGENT_ROLES.md`
- `docs/NEXT_PHASES.md`
- `docs/OFFICIAL_REFERENCES.md`
- `docs/GODOT_API_INDEX.md`
- `docs/MCP_API_INDEX.md`
- `docs/IMPLEMENTATION_GUARDRAILS.md`

## Engineering Baseline

Before implementation, agents must follow:

- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/ADR/`

Current implementation status: Phase 4 provides a minimal MCP stdio server, a minimal Godot editor status panel, and a localhost-only WebSocket handshake between them. The MCP server exposes only two safe read-only bridge tools: `bridge.status` and `bridge.get_capabilities`.

No command execution exists yet. No project or scene inspection exists yet.

The project now has compact official API indexes for Godot and MCP. These indexes link to official references and summarize project-specific guardrails without copying large documentation pages.

Target architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

The repository does not yet implement any Godot automation logic.
