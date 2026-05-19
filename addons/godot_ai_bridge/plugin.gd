@tool
extends EditorPlugin

const STATUS_PANEL_SCENE := preload("res://addons/godot_ai_bridge/ui/status_panel.tscn")

var status_panel: Control

func _enter_tree() -> void:
	if status_panel != null:
		return

	status_panel = STATUS_PANEL_SCENE.instantiate() as Control
	if status_panel == null:
		push_error("godot_ai_bridge status panel failed to load")
		return

	add_control_to_bottom_panel(status_panel, "AI Bridge")
	print("godot_ai_bridge plugin loaded")

func _exit_tree() -> void:
	if status_panel != null:
		remove_control_from_bottom_panel(status_panel)
		status_panel.queue_free()
		status_panel = null
	print("godot_ai_bridge plugin unloaded")
