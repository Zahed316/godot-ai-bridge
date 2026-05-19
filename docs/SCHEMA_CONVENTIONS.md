# Schema Conventions

Future schema rules:

- All tool inputs must have schemas.
- All tool outputs must have schemas.
- Tool descriptions must be short and precise.
- Tool names must use dot notation:
  - `bridge.status`
  - `project.get_info`
  - `scene.get_tree`
- Prefer progressive disclosure over exposing many tools at once.
- Every write tool must eventually support:
  - `dry_run`
  - `preview`
  - `apply`
- Dangerous tools must be disabled by default.
- See `docs/MCP_API_INDEX.md` for MCP schema concepts.
- See `docs/IMPLEMENTATION_GUARDRAILS.md` for schema-related implementation rules.
