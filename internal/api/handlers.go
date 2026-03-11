package api

import (
	"encoding/json"
	"log"
	"net/http"
	"portfolio-website/internal/models"
	"portfolio-website/internal/store"
	"strings"
)

func GetRoute[T any](crud func(*models.Database) *T) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := store.ViewData()
		if err != nil {
			log.Printf("GetRoute: ViewData failed: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		category := strings.ToLower(r.URL.Query().Get("category"))

		var portfolioMap map[string]any

		jsonData, err := json.Marshal(data.Portfolio)
		if err != nil {
			WriteError(w, http.StatusNotFound, "No Database")
			return
		}
		
		json.Unmarshal(jsonData, &portfolioMap)

		if category !="" {
			sectionData, exist := FindCategory( portfolioMap,category)
			if !exist {
				WriteError(w,http.StatusNotFound, "Category not found")
				return
			}
			WriteJSON(w, http.StatusOK, sectionData, "Data retrieved")
        return
		}

		collection := crud(&data)

		WriteJSON(w, http.StatusOK, *collection, "Data retrieved successfully")
	}
}

func PatchRoute [T any] (crud func(*models.Database) *T) http.HandlerFunc{ return func (w http.ResponseWriter, r *http.Request) {
	data, err := store.ViewData()
	if err != nil {
		log.Printf("PatchRoute: ViewData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	sectionToUpdate := crud(&data)

	if err := DecodeJSON(r, sectionToUpdate); err != nil {
		WriteError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if err := store.SaveData(&data); err != nil {
		log.Printf("PatchRoute: SaveData failed: %v", err)
		WriteError(w,  http.StatusInternalServerError, "Internal server error")
		return
	}

	WriteJSON(w, http.StatusOK, *sectionToUpdate, "Patched successfully")}
}


func PostRoute[T any](crud func(*models.Database) *[]T) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := store.ViewData()
		if err != nil {
			log.Printf("PostRoute: ViewData failed: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		var item T

		if err := DecodeJSON(r, &item); err != nil {
			WriteError(w, http.StatusBadRequest, "Invalid JSON data")
			return
		}

		collection := crud(&data)
		*collection = append(*collection, item)

		err = store.SaveData(&data)
		if err != nil {
			log.Printf("PostRoute: SaveData failed: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		WriteJSON(w, http.StatusOK, *collection, "success")
	}
}

func DeleteRoute(w http.ResponseWriter, r *http.Request) {
	// Implementation for deleting items
	WriteError(w, http.StatusNotImplemented, "DELETE not yet implemented")
}
