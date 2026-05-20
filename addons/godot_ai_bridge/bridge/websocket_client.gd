@tool
extends Node

signal state_changed(state: String, last_handshake_at: String)

const WEBSOCKET_URL := "ws://127.0.0.1:6505/godot-ai-bridge"
const HANDSHAKE_PROTOCOL_VERSION := "phase-4-handshake"
const HANDSHAKE_CLIENT_NAME := "godot-editor-plugin"

var socket := WebSocketPeer.new()
var connection_state := "Not connected"
var last_handshake_at := ""
var handshake_sent := false
var request_handler: RefCounted

func _ready() -> void:
	set_process(true)
	_connect_to_bridge()

func _process(_delta: float) -> void:
	socket.poll()
	var ready_state := socket.get_ready_state()

	if ready_state == WebSocketPeer.STATE_OPEN:
		if connection_state != "Connected":
			_set_state("Connected")
		if not handshake_sent:
			_send_handshake()
		_read_packets()
	elif ready_state == WebSocketPeer.STATE_CONNECTING:
		_set_state("Connecting")
	elif ready_state == WebSocketPeer.STATE_CLOSED:
		if connection_state != "Not connected" and connection_state != "Error":
			_set_state("Not connected")

func get_websocket_url() -> String:
	return WEBSOCKET_URL

func set_request_handler(next_request_handler: RefCounted) -> void:
	request_handler = next_request_handler

func _connect_to_bridge() -> void:
	_set_state("Connecting")
	var error := socket.connect_to_url(WEBSOCKET_URL)
	if error != OK:
		_set_state("Error")

func _send_handshake() -> void:
	var payload := {
		"type": "bridge.handshake",
		"protocolVersion": HANDSHAKE_PROTOCOL_VERSION,
		"clientName": HANDSHAKE_CLIENT_NAME,
		"sentAt": Time.get_datetime_string_from_system(true)
	}
	var error := socket.send_text(JSON.stringify(payload))
	if error == OK:
		handshake_sent = true
	else:
		_set_state("Error")

func _read_packets() -> void:
	while socket.get_available_packet_count() > 0:
		var text := socket.get_packet().get_string_from_utf8()
		var payload = JSON.parse_string(text)
		if typeof(payload) != TYPE_DICTIONARY:
			_set_state("Error")
			return
		if payload.get("type") == "bridge.handshake.response" and payload.get("ok") == true:
			last_handshake_at = str(payload.get("receivedAt", ""))
			_set_state("Connected", true)
		elif payload.get("type") == "bridge.request":
			_handle_bridge_request(payload)
		elif payload.has("error"):
			_set_state("Error")

func _handle_bridge_request(payload: Dictionary) -> void:
	var response: Dictionary
	if request_handler == null:
		response = {
			"type": "bridge.response",
			"id": str(payload.get("id", "")),
			"result": {
				"ok": false,
				"error": {
					"code": "INTERNAL_ERROR",
					"message": "Read-only request handler is not available.",
					"details": {},
					"suggestions": []
				}
			}
		}
	else:
		response = request_handler.call("handle_request", payload, connection_state)

	var error := socket.send_text(JSON.stringify(response))
	if error != OK:
		_set_state("Error")

func _set_state(next_state: String, force_emit := false) -> void:
	if connection_state == next_state and not force_emit:
		return
	connection_state = next_state
	state_changed.emit(connection_state, last_handshake_at)
