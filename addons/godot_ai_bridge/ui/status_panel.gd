@tool
extends PanelContainer

@onready var websocket_state_label: Label = %WebSocketState
@onready var websocket_endpoint_label: Label = %WebSocketEndpoint
@onready var last_handshake_label: Label = %LastHandshake
@onready var last_heartbeat_label: Label = %LastHeartbeat
@onready var reconnect_attempts_label: Label = %ReconnectAttempts

func set_websocket_endpoint(endpoint: String) -> void:
	if websocket_endpoint_label != null:
		websocket_endpoint_label.text = "WebSocket endpoint: " + endpoint

func set_websocket_state(
	state: String,
	last_handshake_at: String,
	last_heartbeat_at: String,
	reconnect_attempt_count: int
) -> void:
	if websocket_state_label != null:
		websocket_state_label.text = "WebSocket state: " + state
	if last_handshake_label != null:
		var value := "None"
		if not last_handshake_at.is_empty():
			value = last_handshake_at
		last_handshake_label.text = "Last handshake: " + value
	if last_heartbeat_label != null:
		var heartbeat_value := "None"
		if not last_heartbeat_at.is_empty():
			heartbeat_value = last_heartbeat_at
		last_heartbeat_label.text = "Last heartbeat: " + heartbeat_value
	if reconnect_attempts_label != null:
		reconnect_attempts_label.text = "Reconnect attempts: " + str(reconnect_attempt_count)
