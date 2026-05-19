# API Boundaries

Allowed future boundaries:

- TypeScript MCP server may expose MCP tools.
- TypeScript MCP server may connect only to `127.0.0.1`.
- Godot plugin may expose editor operations only through an internal command router.
- Godot plugin may use Editor APIs only through named service classes.
- Runtime inspection must be isolated from editor operations.
- File writes must pass through a path guard.

Forbidden by default:

- External command execution
- Arbitrary GDScript execution
- Editing files outside the project
- Binding network services to `0.0.0.0`
- Deleting scenes or resources without snapshot and approval
- Adding dangerous tools without explicit approval

