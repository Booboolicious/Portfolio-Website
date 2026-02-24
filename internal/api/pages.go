package api

import (
	"html/template"
	"net/http"
	"path/filepath"
	"portfolio-website/internal/models"
	"portfolio-website/internal/store"
	"strings"
)

type PageData struct {
	Page  string
	Title string
	Data  models.Portfolio
}

func UserPage(w http.ResponseWriter, r *http.Request) {
	pages := map[string]string{
		"/":                    "web/home_page.html",
		"/professional_resume": "web/professional_resume.html",
		"/projects_gallery":    "web/projects_gallery.html",
		"/skills_&_expertise":  "web/skills_&_expertise.html",
		"/contact_information": "web/contact_information.html",
		"/about_me":            "web/about_me.html",
	}

	filePath := pages[r.URL.Path]
	if filePath == "" {
		filePath = "web/home_page.html"
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
	t, err := t.ParseGlob("web/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	u, err := store.UserDisplay()
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

func AdminPage(w http.ResponseWriter, r *http.Request) {
	admin := map[string]string{
		"/adminDashboard/":                             "web/adminDashboard/admin_analytics_dashboard.html",
		"/adminDashboard/login":                        "web/adminDashboard/login.html",
		"/adminDashboard/page_content_manager":         "web/adminDashboard/page_content_manager.html",
		"/adminDashboard/project_management_dashboard": "web/adminDashboard/project_management_dashboard.html",
		"/adminDashboard/skills_&_proficiency_manager": "web/adminDashboard/skills_&_proficiency_manager.html",
		"/adminDashboard/contact_manager":              "web/adminDashboard/contact_manager.html",
		"/adminDashboard/experience_manager":           "web/adminDashboard/experience_manager.html",
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
	t, err := t.ParseGlob("web/adminDashboard/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	u, err := store.UserDisplay()
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
