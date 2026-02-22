package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
	"portfolio-website/internal"
	"strings"
)

type PageData struct {
	Page  string
	Title string
	Data  internal.Portfolio // Change this to Portfolio
}


// Global variable to act as our temporary "Database"

func main() {
	// My API's
	http.HandleFunc("GET /api/data", getRoute)
	http.HandleFunc("PATCH /api/data", patchRoute)
	http.HandleFunc("/api/data/personal", biRequest)
	http.HandleFunc("/api/data/projects", biRequest)
	http.HandleFunc("/api/data/skills", biRequest)
	http.HandleFunc("/api/data/experience", biRequest)
	http.HandleFunc("/api/data/contact", biRequest)

	http.HandleFunc("/", userPage)
	http.HandleFunc("/professional_resume", userPage)
	http.HandleFunc("/projects_gallery", userPage)
	http.HandleFunc("/skills_&_expertise", userPage)
	http.HandleFunc("/contact_information", userPage)
	http.HandleFunc("/about_me", userPage)

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("dev/css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("dev/js"))))

	http.HandleFunc("/adminDashboard/", adminPage)
	http.HandleFunc("/adminDashboard/login", adminPage)
	http.HandleFunc("/adminDashboard/project_management_dashboard", adminPage)
	http.HandleFunc("/adminDashboard/skills_&_proficiency_manager", adminPage)
	http.HandleFunc("/adminDashboard/contact_manager", adminPage)
	http.HandleFunc("/adminDashboard/experience_manager", adminPage)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("dev/adminDashboard/static"))))

	fmt.Println("server running on http://127.0.0.1:8081/")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func biRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getRoute(w, r)
	case http.MethodPatch:
		patchRoute(w, r)
	default:
		w.Header().Set("Allow", "GET, PATCH")
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}

func writeJSON(w http.ResponseWriter, status int, payload any, message string) {
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

func decodeJSON(r *http.Request, payload any) error {
	if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
		return fmt.Errorf("decodeJSON: %w", err)
	}
	return nil
}

func writeError(w http.ResponseWriter, status int, message string) {
	resp := map[string] any{
		"Error": message,
		"Code":  status,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("writeError encode failed: %v", err)
	}
}

func postRoute()  {
	
}

func getRoute(w http.ResponseWriter, r *http.Request) {
	data, err := internal.ViewData()
	if err != nil {
		log.Printf("getRoute: ViewData failed: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, data, "writeJSON: encode failed:")

}

func putRoute()  {
	
}

func patchRoute(w http.ResponseWriter, r *http.Request) {
	data, err := internal.ViewData()
	if err != nil {
		fmt.Println("getRoute: ViewData failed:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}

	if err := decodeJSON(r, &data); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON")
		return 
	}
	internal.SaveData(&data)

	writeJSON(w, http.StatusOK, data, "writeJSON: encode failed:")
}

func deleteRoute()  {
	
}

func userPage(w http.ResponseWriter, r *http.Request) {

	pages := map[string]string{
		"/":                    "dev/home_page.html",
		"/professional_resume": "dev/professional_resume.html",
		"/projects_gallery":    "dev/projects_gallery.html",
		"/skills_&_expertise":  "dev/skills_&_expertise.html",
		"/contact_information": "dev/contact_information.html",
		"/about_me":            "dev/about_me.html",
	}

	filePath := pages[r.URL.Path]
	if filePath == "" {
		filePath = "dev/home_page.html"
	}

	page := "home"
	if strings.Contains(r.URL.Path, "professional_resume") {
		page = "resume"
	} else if strings.Contains(r.URL.Path, "projects_gallery") {
		page = "projects"
	} else if strings.Contains(r.URL.Path, "skills_&_expertise") {
		page = "skills"
	} else if strings.Contains(r.URL.Path, "contact_information") {
		page = "contact"
	} else if strings.Contains(r.URL.Path, "about_me") {
		page = "about"
	}

	funcMap := template.FuncMap{
		"sub":  func(a, b int) int { return a - b },
		"dict": func() map[string]interface{} { return make(map[string]interface{}) },
		"set": func(m map[string]interface{}, key string, value interface{}) map[string]interface{} {
			m[key] = value
			return m
		},
	}

	t := template.New("").Funcs(funcMap)
	t, err := t.ParseGlob("dev/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	u, err := internal.UserDisplay()
	if err != nil {
		http.Error(w, "Critical Error:"+err.Error(), 500)
		return
	}

	data := PageData{
		Page: page,
		Data: u,
	}
	templateName := filepath.Base(filePath)

	err = t.ExecuteTemplate(w, templateName, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func adminPage(w http.ResponseWriter, r *http.Request) {
	admin := map[string]string{
		"/adminDashboard/":                             "dev/adminDashboard/admin_analytics_dashboard.html",
		"/adminDashboard/login":                        "dev/adminDashboard/login.html",
		"/adminDashboard/page_content_manager":         "dev/adminDashboard/page_content_manager.html",
		"/adminDashboard/project_management_dashboard": "dev/adminDashboard/project_management_dashboard.html",
		"/adminDashboard/skills_&_proficiency_manager": "dev/adminDashboard/skills_&_proficiency_manager.html",
		"/adminDashboard/contact_manager":              "dev/adminDashboard/contact_manager.html",
		"/adminDashboard/experience_manager":           "dev/adminDashboard/experience_manager.html",
	}

	filePath := admin[r.URL.Path]
	if filePath == "" {
		filePath = admin["/adminDashboard/"]
	}

	page := "admin_analytics_dashboard"
	title := "Master Control Panel"
	if strings.Contains(r.URL.Path, "login") {
		page = "login"
		title = "Admin Login"
	} else if strings.Contains(r.URL.Path, "page_content_manager") {
		page = "content"
		title = "Content Manager"
	} else if strings.Contains(r.URL.Path, "project_management_dashboard") {
		page = "management"
		title = "Project Manager"
	} else if strings.Contains(r.URL.Path, "skills_&_proficiency_manager") {
		page = "skills_&_proficiency"
		title = "Skills & Proficiency"
	} else if strings.Contains(r.URL.Path, "contact_manager") {
		page = "contact"
		title = "Contact Manager"
	} else if strings.Contains(r.URL.Path, "experience_manager") {
		page = "experience"
		title = "Experience Manager"
	}

	funcMap := template.FuncMap{
		"sub":  func(a, b int) int { return a - b },
		"dict": func() map[string]interface{} { return make(map[string]interface{}) },
		"set": func(m map[string]interface{}, key string, value interface{}) map[string]interface{} {
			m[key] = value
			return m
		},
	}

	t := template.New("").Funcs(funcMap)
	t, err := t.ParseGlob("dev/adminDashboard/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	u, err := internal.UserDisplay()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageData{
		Page:  page,
		Title: title,
		Data:  u,
	}

	templateName := filepath.Base(filePath)

	err = t.ExecuteTemplate(w, templateName, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
