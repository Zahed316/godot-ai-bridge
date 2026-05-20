@tool
extends RefCounted

var editor_interface: EditorInterface

func _init(next_editor_interface: EditorInterface) -> void:
	editor_interface = next_editor_interface

func get_tree() -> Dictionary:
	var root := editor_interface.get_edited_scene_root()
	if root == null:
		return {
			"ok": true,
			"currentScenePath": null,
			"message": "No scene is currently open in the editor.",
			"root": null
		}

	return {
		"ok": true,
		"currentScenePath": _get_scene_path(root),
		"root": _node_to_dictionary(root)
	}

func _get_scene_path(root: Node) -> Variant:
	var scene_file_path := root.scene_file_path
	if scene_file_path.is_empty():
		return null
	return scene_file_path

func _node_to_dictionary(node: Node) -> Dictionary:
	var children := []
	for child in node.get_children():
		if child is Node:
			children.append(_node_to_dictionary(child))

	return {
		"name": node.name,
		"type": node.get_class(),
		"path": str(node.get_path()),
		"childCount": node.get_child_count(),
		"children": children
	}
