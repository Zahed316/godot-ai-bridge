@tool
extends PanelContainer

@onready var websocket_state_label: Label = %WebSocketState
@onready var websocket_endpoint_label: Label = %WebSocketEndpoint
@onready var last_handshake_label: Label = %LastHandshake

func set_websocket_endpoint(endpoint: String) -> void:
	if websocket_endpoint_label != null:
		websocket_endpoint_label.text = "WebSocket endpoint: " + endpoint

func set_websocket_state(state: String, last_handshake_at: String) -> void:
	if websocket_state_label != null:
		websocket_state_label.text = "WebSocket state: " + state
	if last_handshake_label != null:
		var value := "None"
		if not last_handshake_at.is_empty():
			value = last_handshake_at
		last_handshake_label.text = "Last handshake: " + value
