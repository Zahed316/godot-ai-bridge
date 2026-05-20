@tool
extends Node

var snapshots := {}
var next_snapshot_number := 1

func create_snapshot_record(transaction_id := "", label := "metadata-only snapshot") -> Dictionary:
	var snapshot_id := "snap-" + str(next_snapshot_number)
	next_snapshot_number += 1

	var record := {
		"id": snapshot_id,
		"transactionId": transaction_id,
		"label": label,
		"createdAt": Time.get_datetime_string_from_system(true),
		"metadataOnly": true,
		"writesDisabled": true
	}
	snapshots[snapshot_id] = record
	return {
		"ok": true,
		"snapshot": record
	}

func get_snapshot_record(snapshot_id: String) -> Dictionary:
	if not snapshots.has(snapshot_id):
		return _error("SNAPSHOT_REQUIRED", "Snapshot metadata record was not found.")
	return {
		"ok": true,
		"snapshot": snapshots[snapshot_id]
	}

func clear_records() -> Dictionary:
	snapshots.clear()
	next_snapshot_number = 1
	return {
		"ok": true,
		"cleared": true
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
