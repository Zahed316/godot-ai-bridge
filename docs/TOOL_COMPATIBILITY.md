# Tool Compatibility

This map adapts common Coding-Solo/Godot MCP-style tool names into the `godot-ai-bridge` roadmap. It is a planning document only; it does not register aliases or implement behavior.

| External Tool | Proposed godot-ai-bridge Tool | Category | Risk | Earliest Phase | Mode | Status | Notes |
|---|---|---|---|---|---|---|---|
| `launch_editor` | `editor.launch` | editor/process | external | later, after explicit approval | full-dev only | deferred | Requires external process execution; not allowed by default. |
| `run_project` | `runtime.run_project` or `editor.play_project` | runtime | risky_write or runtime | qa-runtime phase | qa-runtime | deferred | Must not run until runtime and QA boundaries exist. |
| `get_debug_output` | `editor.get_output_log` and `editor.get_errors` | editor read-only | read | Phase 7A or Phase 7B if simple | core-readonly | candidate next read-only tool | Useful and safe if implemented through Godot plugin read-only service. |
| `stop_project` | `runtime.stop_project` | runtime | runtime | qa-runtime phase | qa-runtime | deferred | Only after `run_project` exists. |
| `get_godot_version` | `godot.get_version` or included in `project.get_info` | read-only | read | already partially available through `project.get_info` | minimal/core-readonly | partially covered | Avoid duplicate tool unless needed. |
| `list_projects` | `workspace.list_projects` | filesystem discovery | read/external boundary | later | full-dev | deferred | Must be limited to configured safe roots, not arbitrary filesystem. |
| `get_project_info` | `project.get_info` | project read-only | read | implemented | core-readonly | implemented | Keep existing dot notation. |
| `create_scene` | `scene.create` | scene write | safe_write | Phase 7 dry_run only; Phase 8 apply | safe-write | planned | First candidate for dry_run planning. |
| `add_node` | `node.add` | node write | safe_write | Phase 7 dry_run only; Phase 8 apply | safe-write | planned | Likely first dry_run write tool after transaction metadata. |
| `load_sprite` | `node.add_sprite` or `sprite.load_into_node` | 2D workflow/resource | safe_write | 2d-workflow phase | 2d-workflow | deferred | Depends on `node.add` and resource/path validation. |
| `export_mesh_library` | `export.mesh_library` | 3D/export | risky_write | advanced/export phase | full-dev | deferred | Not useful for initial 2D focus. |
| `save_scene` | `scene.save` | scene write | destructive/risky_write | after Phase 8 apply and snapshot approval | safe-write/full-dev | deferred | Requires snapshot, approval, and transaction apply. |
| `get_uid` | `resource.get_uid` | resource read-only | read | read-only resource phase | godot-readonly | planned | Safe if project-scoped. |
| `update_project_uids` | `resource.update_project_uids` | resource write/resave | risky_write | later after snapshot/apply | full-dev | deferred | Can resave resources; requires strong approval. |

## Naming Compatibility

- External compatibility names may be documented.
- Internal project names must use dot notation.
- Do not register snake_case aliases by default.
- If aliases are added later, they must be explicit compatibility wrappers.
- Each alias must map to exactly one dot-notation tool.
- Aliases must not bypass risk checks.

## Priority Import Plan

Priority 1, already implemented:

- `project.get_info`

Priority 2, next read-only candidates:

- `editor.get_output_log`
- `editor.get_errors`
- `resource.get_uid`
- `project.search_files` or `project.get_filesystem_tree` improvements

Priority 3, first dry-run write candidates:

- `scene.create dry_run`
- `node.add dry_run`

Priority 4, apply/write candidates only after Phase 8:

- `scene.create apply`
- `node.add apply`
- `scene.save`

Priority 5, deferred runtime/process:

- `editor.launch`
- `runtime.run_project`
- `runtime.stop_project`

Priority 6, 2D workflow:

- `node.add_sprite`
- tilemap helpers
- collision helpers
- HUD helpers
