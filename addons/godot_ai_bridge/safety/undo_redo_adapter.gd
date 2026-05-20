@tool
extends Node

var editor_interface: EditorInterface
var active_action_name := ""

func configure(next_editor_interface: EditorInterface) -> void:
	editor_interface = next_editor_interface

func get_editor_undo_redo() -> Dictionary:
	if editor_interface == null:
		return _error("INTERNAL_ERROR", "Editor interface is not configured.")

	return {
		"ok": true,
		"available": editor_interface.get_editor_undo_redo() != null,
		"skeletonOnly": true,
		"writesDisabled": true
	}

func begin_action(action_name: String) -> Dictionary:
	if not active_action_name.is_empty():
		return _error("TRANSACTION_NOT_APPLICABLE", "An undo/redo action placeholder is already active.")

	active_action_name = action_name
	return {
		"ok": true,
		"action": active_action_name,
		"started": true,
		"skeletonOnly": true
	}

func commit_action() -> Dictionary:
	if active_action_name.is_empty():
		return _error("TRANSACTION_NOT_APPLICABLE", "No undo/redo action placeholder is active.")

	var committed_action := active_action_name
	active_action_name = ""
	return {
		"ok": true,
		"action": committed_action,
		"committed": false,
		"skeletonOnly": true
	}

func abort_action() -> Dictionary:
	if active_action_name.is_empty():
		return _error("TRANSACTION_NOT_APPLICABLE", "No undo/redo action placeholder is active.")

	var aborted_action := active_action_name
	active_action_name = ""
	return {
		"ok": true,
		"action": aborted_action,
		"aborted": true,
		"skeletonOnly": true
	}

func _error(code: String, message: String) -> Dictionary:
	return {
		"ok": false,
		"error": {
			"code": code,
			"message": message,
			"details": {},
			"suggestions": []
		}
	}
