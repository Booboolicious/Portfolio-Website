package api

import (
	"log"
	"net/http"
	"portfolio-website/internal/models"
	"portfolio-website/internal/store"
	"strconv"
	"strings"
)

func GetRoute(w http.ResponseWriter, r *http.Request) {
	data, err := store.ViewData()
	if err != nil {
		log.Printf("GetRoute: ViewData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	WriteJSON(w, http.StatusOK, data, "Data retrieved successfully")
}

func PatchRoute(w http.ResponseWriter, r *http.Request) {
	data, err := store.ViewData()
	if err != nil {
		log.Printf("PatchRoute: ViewData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := DecodeJSON(r, &data); err != nil {
		WriteError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if err := store.SaveData(&data); err != nil {
		log.Printf("PatchRoute: SaveData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	WriteJSON(w, http.StatusOK, data, "Data updated successfully")
}

// PutRoute handles specific item updates using path values
func PutRoute(w http.ResponseWriter, r *http.Request) {
	data, err := store.ViewData()
	if err != nil {
		log.Printf("PutRoute: ViewData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	idStr := r.PathValue("id")
	index, err := strconv.Atoi(idStr)
	if err != nil {
		WriteError(w, http.StatusBadRequest, "Invalid ID format")
		return
	}

	path := r.URL.Path
	switch {
	case strings.Contains(path, "skills/frontend"):
		var skill models.SkillItem
		if err := DecodeJSON(r, &skill); err == nil {
			if index >= 0 && index < len(data.Portfolio.Skills.Frontend) {
				data.Portfolio.Skills.Frontend[index] = skill
			} else {
				WriteError(w, http.StatusNotFound, "Index out of bounds")
				return
			}
		}
	case strings.Contains(path, "projects"):
		var project models.Project
		if err := DecodeJSON(r, &project); err == nil {
			if index >= 0 && index < len(data.Portfolio.Projects) {
				data.Portfolio.Projects[index] = project
			} else {
				WriteError(w, http.StatusNotFound, "Index out of bounds")
				return
			}
		}
	// Add other cases as needed
	default:
		WriteError(w, http.StatusNotFound, "Route not supported for PUT")
		return
	}

	if err := store.SaveData(&data); err != nil {
		log.Printf("PutRoute: SaveData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	WriteJSON(w, http.StatusOK, data, "Item updated successfully")
}

func PostRoute(w http.ResponseWriter, r *http.Request) {
	data, err := store.ViewData()
	if err != nil {
		log.Printf("PostRoute: SaveData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err:= DecodeJSON()
	WriteError(w, http.StatusNotImplemented, "POST not yet implemented")
}

func DeleteRoute(w http.ResponseWriter, r *http.Request) {
	// Implementation for deleting items
	WriteError(w, http.StatusNotImplemented, "DELETE not yet implemented")
}

