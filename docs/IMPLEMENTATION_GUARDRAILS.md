# Implementation Guardrails

These rules are derived from official Godot and MCP references plus this project's security model.

- stdout is reserved for MCP protocol messages.
- Logs go to stderr.
- Bind only to `127.0.0.1` for local network services.
- Never bind local services to `0.0.0.0`.
- No arbitrary GDScript execution by default.
- No external commands by default.
- All future write tools require `dry_run` before `apply`.
- Destructive operations require snapshot and approval.
- Tool descriptions must be short, factual, and non-manipulative.
- Avoid large tool catalogs by default.
- Prefer dynamic/progressive discovery.
- Validate all tool inputs with schemas.
- Validate structured outputs against declared schemas where supported.
- Validate resource URIs and paths before reads.
- Route file writes through a path guard.
- Treat `@tool` scripts as editor-executed code and keep them minimal.
- Use `EditorUndoRedoManager` for editor-integrated writes once write phases begin.
- No transaction apply or rollback may be exposed before Phase 8.
- No compatibility alias may bypass policy.
- No run, launch, or stop tool may be implemented before a runtime phase.
- No save or UID update tool may be implemented before snapshot/apply approval exists.
- No export tool may be implemented before a full-dev/export phase.
- First write tools must be `dry_run` only.
- Security-sensitive tools require Security Agent review before implementation.
