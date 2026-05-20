# godot-ai-bridge

`godot-ai-bridge` is a clean-room open-source project for connecting AI coding agents to Godot 4 through a local, security-conscious bridge.

## Open Source

This project is open source under the MIT license. It uses public Godot MCP projects as benchmarks for scope and safety planning.

The public `youichi-uda/godot-mcp-pro` Godot plugin is MIT licensed, but its TypeScript MCP server is proprietary and is not reused here.

See:

- [Open source policy](docs/OPEN_SOURCE_POLICY.md)
- [Pro adoption plan](docs/PRO_ADOPTION_PLAN.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)

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

Current implementation status: Phase 6B provides a minimal MCP stdio server, a minimal Godot editor status panel, a localhost-only WebSocket bridge, first read-only Godot project and scene inspection tools, shared safe bridge foundations, and internal transaction/snapshot foundations.

The MCP server exposes exactly five read-only tools: `bridge.status`, `bridge.get_capabilities`, `project.get_info`, `project.get_filesystem_tree`, and `scene.get_tree`.

The bridge now has structured read-only error responses, heartbeat metadata, a string-level read-only path guard contract, and metadata-only internal transaction/snapshot helpers. No write tools or command execution exist yet.

The project now has compact official API indexes for Godot and MCP. These indexes link to official references and summarize project-specific guardrails without copying large documentation pages.

Target architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

The repository does not yet implement any Godot write automation logic.
