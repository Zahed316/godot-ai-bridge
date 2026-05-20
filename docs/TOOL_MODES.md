# Tool Modes

Tool modes define which capabilities may be visible or implemented together. Compatibility aliases, if ever added, inherit the mode and risk checks of their canonical dot-notation tool.

## minimal

- `bridge.status`
- `bridge.get_capabilities`

## core-readonly

- `project.get_info`
- `project.get_filesystem_tree`
- `scene.get_tree`
- `editor.get_output_log`
- `editor.get_errors`
- `resource.get_uid`

## safe-write

- `scene.create dry_run`
- `node.add dry_run`
- later apply only after Phase 8

## qa-runtime

- `runtime.run_project`
- `runtime.stop_project`
- `editor.get_output_log`
- runtime inspection later

## full-dev

- `editor.launch`
- `list_projects`
- `export.mesh_library`
- `resource.update_project_uids`
