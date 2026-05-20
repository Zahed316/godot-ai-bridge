@tool
extends RefCounted

const PROJECT_READ_SERVICE := preload("res://addons/godot_ai_bridge/services/project_read_service.gd")
const SCENE_READ_SERVICE := preload("res://addons/godot_ai_bridge/services/scene_read_service.gd")

const ALLOWED_METHODS := {
	"project.get_info": true,
	"project.get_filesystem_tree": true,
	"scene.get_tree": true
}

var project_read_service: RefCounted
var scene_read_service: RefCounted

func _init(editor_interface: EditorInterface) -> void:
	project_read_service = PROJECT_READ_SERVICE.new(editor_interface)
	scene_read_service = SCENE_READ_SERVICE.new(editor_interface)

func handle_request(request: Dictionary, bridge_status: String) -> Dictionary:
	var request_id := str(request.get("id", ""))
	var method := str(request.get("method", ""))

	if request.get("type") != "bridge.request" or request_id.is_empty():
		return _response(request_id, _error("INVALID_PARAMS", "Invalid bridge request envelope."))

	if not ALLOWED_METHODS.has(method):
		return _response(request_id, _error("METHOD_NOT_FOUND", "Unsupported read-only bridge method: " + method))

	match method:
		"project.get_info":
			return _response(request_id, project_read_service.call("get_info", bridge_status))
		"project.get_filesystem_tree":
			return _response(request_id, project_read_service.call("get_filesystem_tree"))
		"scene.get_tree":
			return _response(request_id, scene_read_service.call("get_tree"))

	return _response(request_id, _error("METHOD_NOT_FOUND", "Unsupported read-only bridge method: " + method))

func _response(request_id: String, result: Dictionary) -> Dictionary:
	return {
		"type": "bridge.response",
		"id": request_id,
		"result": result
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
