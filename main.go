package main

import (
	"html/template"
	"net/http"
)


func main (){
	http.HandleFunc("/", servePage)
}

func servePage (w http.Response, r *http.Request)  {
	pages := map[string]string{
		"/" : "home_page.html"
	}

	page := pages[r.URL.Path]
	if page == ""{
		page = "home_page.html"
	}

	t, err := template.ParseFiles("navbar.html", "footer.html", page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	t.ExecuteTemplate(w, "navbar.html", nil)
	t.ExecuteTemplate(w, page, nil)
	t.ExecuteTemplate(w, "footer.html", nil)
}