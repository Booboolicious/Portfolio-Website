package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type PageData struct {
	Page string
}

func main() {
	http.HandleFunc("/dev/", servePage)
	http.HandleFunc("/dev/professional_resume", servePage)
	http.HandleFunc("/dev/projects_gallery", servePage)
	http.HandleFunc("/dev/skills_expertise", servePage)
	http.HandleFunc("/dev/contact_information", servePage)
	http.HandleFunc("/dev/about_me.html", servePage)

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
		"/dev/skills_expertise": "dev/skills_expertise.html",
		"/dev/contact_information": "dev/contact_information.html",
		"/dev/about_me": "dev/about_me.html",
	}

	page := "home" 
	if strings.Contains(r.URL.Path, "professional_resume"){
		page = "resume"
	}
	if strings.Contains(r.URL.Path, "projects_gallery"){
		page = "projects"
	}
	if strings.Contains(r.URL.Path, "skills_expertise"){
		page = "skills"
	}
	if strings.Contains(r.URL.Path, "contact_information"){
		page = "contact_information"
	}
	if strings.Contains(r.URL.Path, "about_me"){
		page = "about_me"
	}

	t, err := template.ParseFiles("dev/navbar.html", "dev/footer.html", page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageData{Page: "home"}


	// err = t.ExecuteTemplate(w, "home_page.html", data)
	// if err != nil {
	// 	fmt.Println("Execution error:", err)
	// }
	
	t.ExecuteTemplate(w, page, data)
}
