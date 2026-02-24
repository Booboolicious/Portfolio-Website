package api

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

func WriteJSON(w http.ResponseWriter, status int, payload any, message string) {
	msg := map[string]any{
		"status": message,
		"data":   payload,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(msg); err != nil {
		log.Printf("Status: %s, Error: %v", msg["status"], err)
	}
}

func DecodeJSON(r *http.Request, payload any) error {
	if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
		return errors.New("decodeJSON: " + err.Error())
	}
	return nil
}

func WriteError(w http.ResponseWriter, status int, message string) {
	resp := map[string]any{
		"Error": message,
		"Code":  status,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("WriteError encode failed: %v", err)
	}
}
