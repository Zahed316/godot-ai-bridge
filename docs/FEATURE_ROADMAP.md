# Feature Roadmap

This roadmap borrows product categories from Godot MCP Pro as a benchmark while keeping `godot-ai-bridge` safer and more incremental.

## Phase 5

- `project.get_info`
- `project.get_filesystem_tree`
- `scene.get_tree`
- `editor.get_errors` or `editor.get_output_log` if feasible

## Phase 6A

- shared internal read-only bridge envelope
- structured errors
- heartbeat/reconnect
- path guard read-only

## Phase 6B

- metadata-only transaction foundation
- metadata-only snapshot foundation
- undo/redo adapter skeleton

## Phase 7

- first safe write tool with `dry_run` only
- actual dry-run write planning starts here
- Coding-Solo compatibility mapping only; no compatibility tool behavior yet

## Phase 8

- preview/apply workflow

## Phase 9

- 2D workflow helpers

## Later

- input simulation
- runtime inspection
- screenshots
- TileMap helpers
- QA scenarios
- export helpers
- refactor tools

## Coding-Solo/Godot MCP compatibility targets

External tool names tracked for compatibility planning:

- `launch_editor`
- `run_project`
- `get_debug_output`
- `stop_project`
- `get_godot_version`
- `list_projects`
- `get_project_info`
- `create_scene`
- `add_node`
- `load_sprite`
- `export_mesh_library`
- `save_scene`
- `get_uid`
- `update_project_uids`

Mapped canonical `godot-ai-bridge` names:

- `editor.launch`
- `runtime.run_project` or `editor.play_project`
- `editor.get_output_log`
- `editor.get_errors`
- `runtime.stop_project`
- `godot.get_version` or `project.get_info`
- `workspace.list_projects`
- `project.get_info`
- `scene.create`
- `node.add`
- `node.add_sprite` or `sprite.load_into_node`
- `export.mesh_library`
- `scene.save`
- `resource.get_uid`
- `resource.update_project_uids`

Phase order:

- Already available: `project.get_info`
- Next read-only candidates: `editor.get_output_log`, `editor.get_errors`, `resource.get_uid`
- Phase 7 dry-run candidates: `scene.create`, `node.add`
- Phase 8+ apply candidates: `scene.create`, `node.add`, `scene.save`
- Deferred runtime/process: `editor.launch`, `runtime.run_project`, `runtime.stop_project`
- Later workflow/export: `node.add_sprite`, `export.mesh_library`, `resource.update_project_uids`

Not all compatibility targets are safe to implement immediately. External process, runtime, save, export, and UID update tools remain deferred until the matching safety boundaries exist.
