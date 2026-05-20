@tool
extends RefCounted

const SKIPPED_NAMES := {
	".git": true,
	".godot": true,
	".import": true,
	"dist": true,
	"node_modules": true
}
const DEFAULT_MAX_DEPTH := 3

var editor_interface: EditorInterface

func _init(next_editor_interface: EditorInterface) -> void:
	editor_interface = next_editor_interface

func get_info(bridge_status: String) -> Dictionary:
	var version_info := Engine.get_version_info()
	var godot_version := ""
	if typeof(version_info) == TYPE_DICTIONARY:
		godot_version = str(version_info.get("string", ""))

	return {
		"ok": true,
		"projectName": str(ProjectSettings.get_setting("application/config/name", "")),
		"godotVersion": godot_version,
		"projectPath": ProjectSettings.globalize_path("res://"),
		"pluginPhase": "Phase 5",
		"bridgeStatus": bridge_status
	}

func get_filesystem_tree() -> Dictionary:
	return {
		"ok": true,
		"root": "res://",
		"maxDepth": DEFAULT_MAX_DEPTH,
		"children": _read_directory("res://", 0)
	}

func _read_directory(path: String, depth: int) -> Array:
	if depth >= DEFAULT_MAX_DEPTH:
		return []

	var dir := DirAccess.open(path)
	if dir == null:
		return []

	var entries := []
	dir.list_dir_begin()
	var entry_name := dir.get_next()
	while not entry_name.is_empty():
		if not entry_name.begins_with(".") or SKIPPED_NAMES.has(entry_name):
			if not SKIPPED_NAMES.has(entry_name):
				var entry_path := path.path_join(entry_name)
				if dir.current_is_dir():
					entries.append({
						"path": entry_path + "/",
						"type": "directory",
						"children": _read_directory(entry_path, depth + 1)
					})
				else:
					entries.append({
						"path": entry_path,
						"type": "file",
						"extension": entry_name.get_extension()
					})
		entry_name = dir.get_next()
	dir.list_dir_end()

	return entries
