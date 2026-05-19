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

## Engineering Baseline

Before implementation, agents must follow:

- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/ADR/`

Current implementation status: Phase 2B provides a minimal MCP stdio server. It exposes only two safe read-only tools: `bridge.status` and `bridge.get_capabilities`.

No Godot connection or WebSocket bridge exists yet.

Target architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

The repository does not yet implement the WebSocket bridge or any Godot automation logic.
