@tool
extends Node

var transactions := {}
var next_transaction_number := 1

func create_transaction(summary := {}) -> Dictionary:
	var transaction_id := "tx-" + str(next_transaction_number)
	next_transaction_number += 1

	var record := {
		"id": transaction_id,
		"state": "planned",
		"riskLevel": str(summary.get("riskLevel", "read")),
		"changes": summary.get("changes", []),
		"snapshotId": summary.get("snapshotId", null),
		"createdAt": Time.get_datetime_string_from_system(true),
		"metadataOnly": true
	}
	transactions[transaction_id] = record
	return {
		"ok": true,
		"transaction": record
	}

func get_transaction(transaction_id: String) -> Dictionary:
	if not transactions.has(transaction_id):
		return _error("TRANSACTION_NOT_FOUND", "Transaction record was not found.")
	return {
		"ok": true,
		"transaction": transactions[transaction_id]
	}

func cancel_transaction(transaction_id: String) -> Dictionary:
	if not transactions.has(transaction_id):
		return _error("TRANSACTION_NOT_FOUND", "Transaction record was not found.")

	var record: Dictionary = transactions[transaction_id]
	if record.get("state") != "planned" and record.get("state") != "previewed":
		return _error("TRANSACTION_NOT_APPLICABLE", "Only planned or previewed transaction records can be cancelled.")

	record["state"] = "cancelled"
	record["cancelledAt"] = Time.get_datetime_string_from_system(true)
	transactions[transaction_id] = record
	return {
		"ok": true,
		"transaction": record
	}

func clear_records() -> Dictionary:
	transactions.clear()
	next_transaction_number = 1
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
