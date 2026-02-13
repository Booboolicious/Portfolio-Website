package main

import (
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strings"
)

type PageData struct {
	Page string
}

func main() {
	http.HandleFunc("/dev/", servePage)
	http.HandleFunc("/dev/professional_resume", servePage)
	http.HandleFunc("/dev/projects_gallery", servePage)
	http.HandleFunc("/dev/skills_&_expertise", servePage)
	http.HandleFunc("/dev/contact_information", servePage)
	http.HandleFunc("/dev/about_me", servePage)

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("dev/css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("dev/js"))))

	fmt.Println("server running")
	http.ListenAndServe(":8081", nil)
}

func servePage(w http.ResponseWriter, r *http.Request) {
	pages := map[string]string{
		"/dev/": "dev/home_page.html",
		"/dev/professional_resume": "dev/professional_resume.html",
		"/dev/projects_gallery": "dev/projects_gallery.html",
		"/dev/skills_&_expertise": "dev/skills_&_expertise.html",
		"/dev/contact_information": "dev/contact_information.html",
		"/dev/about_me": "dev/about_me.html",
	}

	filePath := pages[r.URL.Path]
    if filePath == "" {
        filePath = "dev/home_page.html"
    }

	page := "home" 
	if strings.Contains(r.URL.Path, "professional_resume"){
		page = "resume"
	} else if strings.Contains(r.URL.Path, "projects_gallery"){
		page = "projects"
	}else if strings.Contains(r.URL.Path, "skills_&_expertise"){
		page = "skills"
	}else if strings.Contains(r.URL.Path, "contact_information"){
		page = "contact"
	}else if strings.Contains(r.URL.Path, "about_me"){
		page = "about"
	}

	t, err := template.ParseFiles("dev/navbar.html", "dev/footer.html", filePath)
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
