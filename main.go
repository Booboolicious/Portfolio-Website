package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type PageData struct {
	Page string
}

func main(){
	http.HandleFunc("/dev/", servePage)

	http.ListenAndServe(":8081", nil)
	fmt.Println("hey")
}

func servePage(w http.ResponseWriter, r *http.Request)  {
	pages := map[string]string{
		"/dev/" : "dev/home_page.html",
	}

	page := pages[r.URL.Path]
	if page == ""{
		page = "dev/home_page.html"

	}

	t, err := template.ParseFiles("dev/navbar.html", "dev/footer.html", page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// data := PageData{Page: "home"}

	// t.ExecuteTemplate(w, "navbar.html", data)
	t.ExecuteTemplate(w, page, nil)
	// t.ExecuteTemplate(w, "footer.html", data)
}