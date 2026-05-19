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

Current implementation status: Phase 3 provides a minimal MCP stdio server and a minimal Godot editor status panel. The MCP server exposes only two safe read-only bridge tools: `bridge.status` and `bridge.get_capabilities`.

No WebSocket bridge exists yet. No command execution exists yet.

The project now has compact official API indexes for Godot and MCP. These indexes link to official references and summarize project-specific guardrails without copying large documentation pages.

Target architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

The repository does not yet implement the WebSocket bridge or any Godot automation logic.
