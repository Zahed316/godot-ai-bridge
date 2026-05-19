@tool
extends EditorPlugin

const STATUS_PANEL_SCENE := preload("res://addons/godot_ai_bridge/ui/status_panel.tscn")
const WEBSOCKET_CLIENT_SCRIPT := preload("res://addons/godot_ai_bridge/bridge/websocket_client.gd")

var status_panel: Control
var websocket_client: Node

func _enter_tree() -> void:
	if status_panel != null:
		return

	status_panel = STATUS_PANEL_SCENE.instantiate() as Control
	if status_panel == null:
		push_error("godot_ai_bridge status panel failed to load")
		return

	add_control_to_bottom_panel(status_panel, "AI Bridge")
	_add_websocket_client()
	print("godot_ai_bridge plugin loaded")

func _exit_tree() -> void:
	if websocket_client != null:
		websocket_client.queue_free()
		websocket_client = null
	if status_panel != null:
		remove_control_from_bottom_panel(status_panel)
		status_panel.queue_free()
		status_panel = null
	print("godot_ai_bridge plugin unloaded")

func _add_websocket_client() -> void:
	if websocket_client != null:
		return

	websocket_client = WEBSOCKET_CLIENT_SCRIPT.new()
	if websocket_client.has_signal("state_changed"):
		websocket_client.connect("state_changed", _on_websocket_state_changed)
	add_child(websocket_client)
	if status_panel != null and status_panel.has_method("set_websocket_endpoint"):
		status_panel.call("set_websocket_endpoint", websocket_client.call("get_websocket_url"))

func _on_websocket_state_changed(state: String, last_handshake_at: String) -> void:
	if status_panel != null and status_panel.has_method("set_websocket_state"):
		status_panel.call("set_websocket_state", state, last_handshake_at)
