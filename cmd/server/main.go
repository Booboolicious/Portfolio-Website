package main

import (
	"log"
	"net/http"
	"portfolio-website/internal/api"
	"portfolio-website/internal/models"
)

func main() {
	// API Routes
	http.HandleFunc("GET /api/data",api.GetRoute(func(d *models.Database) *models.Portfolio {return &d.Portfolio}))
	http.HandleFunc("GET /api/data/personal", api.GetRoute(func(d *models.Database) *models.Personal {return &d.Portfolio.Personal}))
	http.HandleFunc("PATCH /api/data/personal", api.PatchRoute(func(d *models.Database) *models.Personal {return &d.Portfolio.Personal}))
	http.HandleFunc("DELETE /api/data/projects/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Project {return &d.Portfolio.Projects}))
	http.HandleFunc("POST /api/data/projects", api.PostRoute(func(d *models.Database) *[]models.Project {return &d.Portfolio.Projects}))

	
	// Example Resource Routes using the new Go 1.22+ patterns
	// http.HandleFunc("PUT /api/data/skills/frontend/{id}", api.PutRoute)
	// http.HandleFunc("PUT /api/data/projects/{id}", api.PutRoute)

	log.Println("Server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
