package api

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"
)

func WriteJSON(w http.ResponseWriter, status int, payload any, message string) {
	msg := map[string]any{
		"data": payload,
		"msg":  message,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(msg["data"]); err != nil {
		log.Printf("Status: %s, Error: %v", msg["msg"], err)
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

func FindCategory(m map[string]any, target string) (any, bool) {
	if val, ok := m[target]; ok {
		return val, true
	}

	for _, v := range m {
		if nestedMap, ok := v.(map[string]any); ok {
			if result, found := FindCategory(nestedMap, target); found {
				return result, true
			}
		}
	}

	return nil, false
}

func QueryP(w http.ResponseWriter, r *http.Request, queryKey string, data any) bool {
	queryValue := strings.ToLower(r.URL.Query().Get(queryKey))

	if queryValue != "" {
		jsonData, err := json.Marshal(data)
		if err != nil {
			WriteError(w, http.StatusInternalServerError, "Failed to encode portfolio")
			return true
		}

		var portfolioMap map[string]any
		if err := json.Unmarshal(jsonData, &portfolioMap); err != nil {
			WriteError(w, http.StatusInternalServerError, "Failed to decode portfolio")
			return true
		}

		sectionData, exist := FindCategory(portfolioMap, queryValue)
		if !exist {
			WriteError(w, http.StatusNotFound, "Category not found")
			return true
		}
		WriteJSON(w, http.StatusOK, sectionData, "Data retrieved")
		return true
	}
	return false
}
