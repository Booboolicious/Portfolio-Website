package main

import (
	"log"
	"net/http"
	"portfolio-website/internal/api"
)

func main() {
	// API Routes
	http.HandleFunc("GET /api/data", api.GetRoute)
	http.HandleFunc("/api/data/Personal", api.PatchRoute)
	http.HandleFunc("/api/data/Stats", api.PatchRoute)
	http.HandleFunc("/api/data/about", api.PatchRoute)
	http.HandleFunc("/api/data/about/timeline", api.PatchRoute)
	http.HandleFunc("/api/data/about/experience", api.PatchRoute)
	http.HandleFunc("/api/data/about/education", api.PatchRoute)
	http.HandleFunc("/api/data/about/skills", api.PatchRoute)
	http.HandleFunc("/api/data/about/certifications", api.PatchRoute)
	http.HandleFunc("/api/data/about/honors", api.PatchRoute)
	http.HandleFunc("/api/data/about/spokenLanguages", api.PatchRoute)
	http.HandleFunc("/api/data/about/projects", api.PatchRoute)
	http.HandleFunc("/api/data/about/techStack", api.PatchRoute)
	http.HandleFunc("/api/data/contact", api.PatchRoute)
	
	// Example Resource Routes using the new Go 1.22+ patterns
	// http.HandleFunc("PUT /api/data/skills/frontend/{id}", api.PutRoute)
	// http.HandleFunc("PUT /api/data/projects/{id}", api.PutRoute)

	log.Println("Server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
