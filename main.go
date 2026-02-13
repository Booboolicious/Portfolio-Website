package main

import "net/http"


func main (){
	http.HandleFunc("/", servePage)
}

func servePage (w http.Response, r *http.Request)  {
	pages := map[string]string{
		"/" : "home_page.html"
	}

	page := pages[r.URL.Path]
	if page == ""{
		page = 
	}
}