package main

import (
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strings"
)

// Data Structures for the entire site
type HeroData struct {
	Title1    string
	Highlight string
	Title2    string
	Subtitle  string
	Status    string
}

type StatData struct {
	Label string
	Value string
}

type AboutData struct {
	Headline    string
	Bio         string
	CurrentRole string
	Company     string
}

type Skill struct {
	Name        string
	Level       string
	Percent     int
	Icon        string
	Tags        []string
}

type Project struct {
	Title    string
	Stack    []string
	Status   string
	Image    string
	RepoLink string
}

type Experience struct {
	Role         string
	Company      string
	Duration     string
	Location     string
	Description  string
	Achievements []string
}

type ContactData struct {
	Email    string
	Location string
	StatusMsg string
	Socials  map[string]string
}

type SiteData struct {
	Hero       HeroData
	Stats      []StatData
	About      AboutData
	Skills     []Skill
	Projects   []Project
	Experience []Experience
	Contact    ContactData
}

type PageData struct {
	Page  string
	Title string
	Data  SiteData // This holds all the editable content
}

// Global variable to act as our temporary "Database"
var globalSiteData SiteData

func init() {
	// Initialize with your current content
	globalSiteData = SiteData{
		Hero: HeroData{
			Title1:    "Building Scalable",
			Highlight: "Solutions",
			Title2:    "through Mastery.",
			Subtitle:  "Full-stack Software Engineer specializing in high-performance web applications and distributed systems. Crafting digital experiences that matter.",
			Status:    "Available for New Projects",
		},
		Stats: []StatData{
			{Label: "Years of Experience", Value: "5+"},
			{Label: "Project Completed", Value: "120+"},
			{Label: "Happy Clients", Value: "40+"},
			{Label: "Lines of Code", Value: "15k"},
		},
		About: AboutData{
			Headline:    "I Have Over 8 Years Of Experience Building Web Applications",
			Bio:         "I have over 8 years of experience building web applications for startups and enterprise clients. My journey started in C++ and transitioned into the modern web ecosystem where I found my passion for developer tools and UX.",
			CurrentRole: "Senior Software Engineer",
			Company:     "TechCorp",
		},
		Skills: []Skill{
			{Name: "TypeScript", Level: "Expert", Percent: 95, Icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQINyfUyaLOAUIDqJ1PyJUiDTaufIyJvZA3HjBawUqorlRdsp2NkFsxzEBbhkUmEooNRglGaKxxGbF_KU5VoV2ceuGeQKex3uy0LjGaxiuC_hJG46EqN2Q6vyIDEQOWCunY4VqFfAy99ezlr0wKBNcOplpY28slEQAAkBTJXDZcZW_Ly2V9x-pgC37hQC3a0v1xvy4qLedzVJBAsKBlshhwZ4XQYzEAfPjuei7S1Uob6fPkngsktFpIu7NJDOiJ4cEr7u-gVUTDOk", Tags: []string{"Architecture", "Tooling"}},
		},
		Projects: []Project{
			{Title: "CloudSync Engine", Stack: []string{"Go", "Redis", "AWS"}, Status: "Production Live", Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv7ldt_XQrAjgW6NnOzO2JOGuHx-ELuEcdZjVGnCgoEwk15iSqD9uTbuXxD5yX1c3MXA6VYZERl07FrRyhzL7RI0h58a21BJFFtcFzmtP0tvxnBOV9BT_AQ_mu-2MpvmRbieRw7OHdugdBQcWyXOkFc6RLbYl7D9Nhsr5NzDjpW_nDUwOqT1ggao99wyDyRlSpYNivA4OV6TtSYqUzowWquwE8T5XZo0jQ0V6hrmTfOF8wsSkB6y1ljzOMC40vDgbqoV6ZBXSwekY", RepoLink: "github.com/repo-link"},
		},
		Experience: []Experience{
			{
				Role: "Senior Software Engineer",
				Company: "TechCorp Systems",
				Duration: "Jan 2021 - Present",
				Location: "San Francisco (Hybrid)",
				Description: "Led the architectural redesign of the core data pipeline, resulting in a 40% reduction in latency. Managed a team of 4 engineers.",
				Achievements: []string{
					"Reduced cloud infrastructure spend by $200k/year via resource optimization.",
					"Pioneered the adoption of Go for high-concurrency microservices.",
				},
			},
		},
		Contact: ContactData{
			Email: "alex.rivera@dev.io",
			Location: "San Francisco, CA",
			StatusMsg: "Currently accepting high-priority consulting roles for Q3.",
			Socials: map[string]string{
				"GitHub": "github.com/arivera-dev",
				"LinkedIn": "linkedin.com/in/alex-rivera",
				"Twitter": "twitter.com/dev_rivera",
			},
		},
	}
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

	data := PageData{
		Page: page,
		Data: globalSiteData,
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
		Data:  globalSiteData,
	}

	templateName := filepath.Base(filePath)

	err = t.ExecuteTemplate(w, templateName, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
