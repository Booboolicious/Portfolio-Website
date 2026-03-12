package main

import (
	"log"
	"net/http"
	"portfolio-website/internal/api"
	"portfolio-website/internal/models"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	// API Routes
	mux := http.NewServeMux()

	// Global Data
	mux.HandleFunc("GET /api/data", api.GetRoute(func(d *models.Database) *models.Portfolio { return &d.Portfolio }))

	// Section Routes (GET/PATCH)
	mux.HandleFunc("GET /api/data/personal", api.GetRoute(func(d *models.Database) *models.Personal { return &d.Portfolio.Personal }))
	mux.HandleFunc("PATCH /api/data/personal", api.PatchRoute(func(d *models.Database) *models.Personal { return &d.Portfolio.Personal }))

	mux.HandleFunc("GET /api/data/stats", api.GetRoute(func(d *models.Database) *models.Stats { return &d.Portfolio.Stats }))
	mux.HandleFunc("PATCH /api/data/stats", api.PatchRoute(func(d *models.Database) *models.Stats { return &d.Portfolio.Stats }))

	mux.HandleFunc("GET /api/data/about", api.GetRoute(func(d *models.Database) *models.About { return &d.Portfolio.About }))
	mux.HandleFunc("PATCH /api/data/about", api.PatchRoute(func(d *models.Database) *models.About { return &d.Portfolio.About }))

	mux.HandleFunc("GET /api/data/contact", api.GetRoute(func(d *models.Database) *models.Contact { return &d.Portfolio.Contact }))
	mux.HandleFunc("PATCH /api/data/contact", api.PatchRoute(func(d *models.Database) *models.Contact { return &d.Portfolio.Contact }))

	// Collection Routes (GET/POST/DELETE)
	// Projects
	mux.HandleFunc("GET /api/data/projects", api.GetRoute(func(d *models.Database) *[]models.Project { return &d.Portfolio.Projects }))
	mux.HandleFunc("POST /api/data/projects", api.PostRoute(func(d *models.Database) *[]models.Project { return &d.Portfolio.Projects }))
	mux.HandleFunc("DELETE /api/data/projects/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Project { return &d.Portfolio.Projects }))

	// Timeline
	mux.HandleFunc("GET /api/data/timeline", api.GetRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))
	mux.HandleFunc("POST /api/data/timeline", api.PostRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))
	mux.HandleFunc("DELETE /api/data/timeline/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))

	// Experience
	mux.HandleFunc("GET /api/data/experience", api.GetRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))
	mux.HandleFunc("POST /api/data/experience", api.PostRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))
	mux.HandleFunc("DELETE /api/data/experience/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))

	// Skills (Generic for different skill types)
	mux.HandleFunc("GET /api/data/skills/frontend", api.GetRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))
	mux.HandleFunc("POST /api/data/skills/frontend", api.PostRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))
	mux.HandleFunc("DELETE /api/data/skills/frontend/{id}", api.DeleteRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))

	mux.HandleFunc("GET /api/data/skills/backend", api.GetRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))
	mux.HandleFunc("POST /api/data/skills/backend", api.PostRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))
	mux.HandleFunc("DELETE /api/data/skills/backend/{id}", api.DeleteRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))

	

	log.Println("Server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", enableCORS(mux)))
}
