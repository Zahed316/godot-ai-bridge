# API Boundaries

Allowed future boundaries:

- TypeScript MCP server may expose MCP tools.
- TypeScript MCP server may connect only to `127.0.0.1`.
- Godot plugin may expose editor operations only through an internal command router.
- Godot plugin may use Editor APIs only through named service classes.
- Runtime inspection must be isolated from editor operations.
- File writes must pass through a path guard.

Phase 6A remains read-only. It may define shared envelopes, structured errors, heartbeat metadata, and string-level read-only path guard contracts, but it must not add write tools, transaction apply behavior, runtime inspection, or command execution.

Phase 6B adds internal metadata-only transaction and snapshot foundation. MCP write exposure, dry-run tools, preview/apply tools, rollback tools, scene mutation, and scene saving remain forbidden.

Coding-Solo compatibility tools must follow `godot-ai-bridge` phase boundaries. Compatibility does not override security. Dot-notation internal tools are canonical. Snake_case external aliases are optional and disabled by default. Process execution tools require explicit approval.

Forbidden by default:

- External command execution
- Arbitrary GDScript execution
- Editing files outside the project
- Binding network services to `0.0.0.0`
- Deleting scenes or resources without snapshot and approval
- Adding dangerous tools without explicit approval

Reference indexes and guardrails:

- `docs/GODOT_API_INDEX.md`
- `docs/MCP_API_INDEX.md`
- `docs/IMPLEMENTATION_GUARDRAILS.md`
