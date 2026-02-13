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

	fmt.Println("server running")
	http.ListenAndServe(":8081", nil)
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

	data := PageData{Page: "home"}

	err = t.ExecuteTemplate(w, "home_page.html", data) 
	if err != nil {
    fmt.Println("Execution error:", err)
	}
}

// 	t.ExecuteTemplate(w, "navbar", data)
// 	t.ExecuteTemplate(w, "dev/home_page.html", nil)
// 	t.ExecuteTemplate(w, "footer", data)