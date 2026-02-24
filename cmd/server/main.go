package main

import (
	"log"
	"net/http"
	"portfolio-website/internal/api"
)

func main() {
	// API Routes
	http.HandleFunc("GET /api/data", api.GetRoute)
	http.HandleFunc("PATCH /api/data", api.PatchRoute)
	
	// Example Resource Routes using the new Go 1.22+ patterns
	http.HandleFunc("PUT /api/data/skills/frontend/{id}", api.PutRoute)
	http.HandleFunc("PUT /api/data/projects/{id}", api.PutRoute)

	// User Pages
	http.HandleFunc("/", api.UserPage)
	http.HandleFunc("/professional_resume", api.UserPage)
	http.HandleFunc("/projects_gallery", api.UserPage)
	http.HandleFunc("/skills_&_expertise", api.UserPage)
	http.HandleFunc("/contact_information", api.UserPage)
	http.HandleFunc("/about_me", api.UserPage)

	// Admin Dashboard
	http.HandleFunc("/adminDashboard/", api.AdminPage)
	http.HandleFunc("/adminDashboard/login", api.AdminPage)
	http.HandleFunc("/adminDashboard/project_management_dashboard", api.AdminPage)
	http.HandleFunc("/adminDashboard/skills_&_proficiency_manager", api.AdminPage)
	http.HandleFunc("/adminDashboard/contact_manager", api.AdminPage)
	http.HandleFunc("/adminDashboard/experience_manager", api.AdminPage)

	// Static Assets
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("web/css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("web/js"))))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("web/adminDashboard/static"))))

	log.Println("Server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
