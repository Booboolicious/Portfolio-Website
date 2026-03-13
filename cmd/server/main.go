package main

import (
	"log"
	"net/http"
	"portfolio-website/internal/api"
	"portfolio-website/internal/models"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers for all requests
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		
		// If it's a preflight request, return immediately with 204
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
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
	mux.HandleFunc("PUT /api/data/projects/{id}", api.PutRoute(func(d *models.Database) *[]models.Project { return &d.Portfolio.Projects }))
	mux.HandleFunc("DELETE /api/data/projects/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Project { return &d.Portfolio.Projects }))

	// Timeline
	mux.HandleFunc("GET /api/data/timeline", api.GetRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))
	mux.HandleFunc("POST /api/data/timeline", api.PostRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))
	mux.HandleFunc("PUT /api/data/timeline/{id}", api.PutRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))
	mux.HandleFunc("DELETE /api/data/timeline/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Timeline { return &d.Portfolio.Timeline }))

	mux.HandleFunc("GET /api/data/experience", api.GetRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))
	mux.HandleFunc("POST /api/data/experience", api.PostRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))
	mux.HandleFunc("PUT /api/data/experience/{id}", api.PutRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))
	mux.HandleFunc("DELETE /api/data/experience/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Experience { return &d.Portfolio.Experience }))

	// Education
	mux.HandleFunc("GET /api/data/education", api.GetRoute(func(d *models.Database) *[]models.Education { return &d.Portfolio.Education }))
	mux.HandleFunc("POST /api/data/education", api.PostRoute(func(d *models.Database) *[]models.Education { return &d.Portfolio.Education }))
	mux.HandleFunc("PUT /api/data/education/{id}", api.PutRoute(func(d *models.Database) *[]models.Education { return &d.Portfolio.Education }))
	mux.HandleFunc("DELETE /api/data/education/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Education { return &d.Portfolio.Education }))

	// Certifications
	mux.HandleFunc("GET /api/data/certifications", api.GetRoute(func(d *models.Database) *[]models.Certification { return &d.Portfolio.Certifications }))
	mux.HandleFunc("POST /api/data/certifications", api.PostRoute(func(d *models.Database) *[]models.Certification { return &d.Portfolio.Certifications }))
	mux.HandleFunc("PUT /api/data/certifications/{id}", api.PutRoute(func(d *models.Database) *[]models.Certification { return &d.Portfolio.Certifications }))
	mux.HandleFunc("DELETE /api/data/certifications/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Certification { return &d.Portfolio.Certifications }))

	// Honors
	mux.HandleFunc("GET /api/data/honors", api.GetRoute(func(d *models.Database) *[]models.Honor { return &d.Portfolio.Honors }))
	mux.HandleFunc("POST /api/data/honors", api.PostRoute(func(d *models.Database) *[]models.Honor { return &d.Portfolio.Honors }))
	mux.HandleFunc("PUT /api/data/honors/{id}", api.PutRoute(func(d *models.Database) *[]models.Honor { return &d.Portfolio.Honors }))
	mux.HandleFunc("DELETE /api/data/honors/{id}", api.DeleteRoute(func(d *models.Database) *[]models.Honor { return &d.Portfolio.Honors }))

	// Spoken Languages
	mux.HandleFunc("GET /api/data/spoken_languages", api.GetRoute(func(d *models.Database) *[]models.SpokenLang { return &d.Portfolio.SpokenLanguages }))
	mux.HandleFunc("POST /api/data/spoken_languages", api.PostRoute(func(d *models.Database) *[]models.SpokenLang { return &d.Portfolio.SpokenLanguages }))
	mux.HandleFunc("PUT /api/data/spoken_languages/{id}", api.PutRoute(func(d *models.Database) *[]models.SpokenLang { return &d.Portfolio.SpokenLanguages }))
	mux.HandleFunc("DELETE /api/data/spoken_languages/{id}", api.DeleteRoute(func(d *models.Database) *[]models.SpokenLang { return &d.Portfolio.SpokenLanguages }))

	// Tech Stack (Array of strings)
	mux.HandleFunc("GET /api/data/tech_stack", api.GetRoute(func(d *models.Database) *[]string { return &d.Portfolio.TechStack }))
	mux.HandleFunc("POST /api/data/tech_stack", api.PostRoute(func(d *models.Database) *[]string { return &d.Portfolio.TechStack }))
	mux.HandleFunc("PUT /api/data/tech_stack/{id}", api.PutRoute(func(d *models.Database) *[]string { return &d.Portfolio.TechStack }))
	mux.HandleFunc("DELETE /api/data/tech_stack/{id}", api.DeleteRoute(func(d *models.Database) *[]string { return &d.Portfolio.TechStack }))

	// Skills (Generic for different skill types)
	mux.HandleFunc("GET /api/data/skills/frontend", api.GetRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))
	mux.HandleFunc("POST /api/data/skills/frontend", api.PostRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))
	mux.HandleFunc("PUT /api/data/skills/frontend/{id}", api.PutRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))
	mux.HandleFunc("DELETE /api/data/skills/frontend/{id}", api.DeleteRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Frontend }))

	mux.HandleFunc("GET /api/data/skills/backend", api.GetRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))
	mux.HandleFunc("POST /api/data/skills/backend", api.PostRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))
	mux.HandleFunc("PUT /api/data/skills/backend/{id}", api.PutRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))
	mux.HandleFunc("DELETE /api/data/skills/backend/{id}", api.DeleteRoute(func(d *models.Database) *[]models.SkillItem { return &d.Portfolio.Skills.Backend }))

	mux.HandleFunc("PATCH /api/data/skills", api.PatchRoute(func(d *models.Database) *models.Skills { return &d.Portfolio.Skills }))

	// Contact Form Messages
	mux.HandleFunc("POST /api/contact/messages", api.PostRoute(func(d *models.Database) *[]models.Message { return &d.Messages }))
	mux.HandleFunc("GET /api/data/messages", api.GetRoute(func(d *models.Database) *[]models.Message { return &d.Messages }))

	log.Println("Server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", enableCORS(mux)))

	// log.Fatal(http.ListenAndServe(":8081", enableCORS(mux)))
}
