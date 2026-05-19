@tool
extends EditorPlugin

func _enter_tree() -> void:
	print("godot_ai_bridge plugin bootstrap loaded")

func _exit_tree() -> void:
	print("godot_ai_bridge plugin bootstrap unloaded")

