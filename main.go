package main

import (
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strings"
)

type PageData struct {
	Page  string
	Title string
}

func main() {
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
	http.ListenAndServe(":8081", nil)
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

	t, err := template.ParseGlob("dev/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageData{Page: page}
	templateName := filepath.Base(filePath)

	err = t.ExecuteTemplate(w, templateName, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// t.ExecuteTemplate(w, page, data)
}

func adminPage(w http.ResponseWriter, r *http.Request) {

	admin := map[string]string{
		"/adminDashboard/":                             "dev/adminDashboard/admin_analytics_dashboard.html",
		"/adminDashboard/login":                        "dev/adminDashboard/login.html",
		"/adminDashboard/page_content_manager":         "dev/adminDashboard/page_content_manager.html",
		"/adminDashboard/project_management_dashboard": "dev/adminDashboard/project_management_dashboard.html",
		"/adminDashboard/skills_&_proficiency_manager": "dev/adminDashboard/skills_&_proficiency_manager.html",
		"/adminDashboard/contact_manager":             "dev/adminDashboard/contact_manager.html",
		"/adminDashboard/experience_manager":          "dev/adminDashboard/experience_manager.html",
	}

	filePath := admin[r.URL.Path]
	if filePath == "" {
		filePath = "dev/adminDashboard/admin_analytics_dashboard.html"
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

	t, err := template.ParseGlob("dev/adminDashboard/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageData{
		Page:  page,
		Title: title,
	}

	templateName := filepath.Base(filePath)

	err = t.ExecuteTemplate(w, templateName, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}
