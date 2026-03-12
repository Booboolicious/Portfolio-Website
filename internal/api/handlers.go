package api

import (
	"log"
	"net/http"
	"portfolio-website/internal/models"
	"portfolio-website/internal/store"
	"strconv"
)

func GetRoute[T any](crud func(*models.Database) *T) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := store.ViewData()
		if err != nil {
			log.Printf("GetRoute: ViewData failed: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		if QueryP(w, r, "category", data.Portfolio) {
			return
		}

		collection := crud(&data)

		WriteJSON(w, http.StatusOK, *collection, "Data retrieved successfully")
	}
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

func PatchRoute[T any](crud func(*models.Database) *T) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
			WriteError(w, http.StatusInternalServerError, "Internal server error")
			return
		}

		WriteJSON(w, http.StatusOK, *sectionToUpdate, "Patched successfully")
	}
}

func DeleteRoute[T any](crud func(*models.Database) *[]T) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		data, err := store.ViewData()
		if err != nil {
			log.Printf("DeleteRoute: ViewData failed: %v", err)
			WriteError(w, http.StatusInternalServerError, "Internal server error")
			return
		}


		idStr := r.PathValue("id")
		i, err := strconv.Atoi(idStr)
		if err != nil {
			WriteError(w, http.StatusBadRequest, "Invalid ID format")
			return
		}

		collection := crud(&data)

		if i < 0 || i >= len(*collection) {
			WriteError(w, http.StatusNotFound, "Index out of bounds")
			return
		}

		*collection = append((*collection)[:i], (*collection)[i+1:]...)

		if err := store.SaveData(&data); err != nil {
			log.Printf("DeleteRoute: SaveData failed: %v", err)

			WriteError(w, http.StatusInternalServerError, "Internal server error")
			return
		}

		WriteJSON(w, http.StatusOK, *collection, "DELETE implemented")

	}
}
