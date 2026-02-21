package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

type HeroData struct {
	Title1    string `json:"title"`
	Highlight string `json:"highlight"`
	Title2    string `json:"title2"`
	Subtitle  string `json:"subtitle"`
	Status    string `json:"status"`
}

type StatData struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type AboutData struct {
	Headline    string `json:"headline"`
	Bio         string `json:"bio"`
	CurrentRole string `json:"current_role"`
	Company     string `json:"company"`
}

type Skill struct {
	Name    string   `json:"name"`
	Level   string   `json:"level"`
	Percent int      `json:"percentage"`
	Icon    string   `json:"icon"`
	Tags    []string `json:"tags"`
}

type Project struct {
	Title    string   `json:"title"`
	Stack    []string `json:"stack"`
	Status   string   `json:"status"`
	Image    string   `json:"image"`
	RepoLink string   `json:"repo_link"`
}

type Experience struct {
	Role         string   `json:"role"`
	Company      string   `json:"company"`
	Duration     string   `json:"duration"`
	Location     string   `json:"location"`
	Description  string   `json:"description"`
	Achievements []string `json:"acheivment"`
}

type ContactData struct {
	Email     string            `json:"email"`
	Location  string            `json:"location"`
	StatusMsg string            `json:"status_msg"`
	Socials   map[string]string `json:"socials"`
}

type PageData struct {
	Page string   `json:"page"`
	Data SiteData `json:"data"` // This holds all the editable content
}

type SiteData struct {
	Hero       HeroData     `json:"hero"`
	Stats      []StatData   `json:"stats"`
	About      AboutData    `json:"about"`
	Skills     []Skill      `json:"skills"`
	Projects   []Project    `json:"project"`
	Experience []Experience `json:"experience"`
	Contact    ContactData  `json:"contact"`
	// Page       PageData     `json:"page_data"`
}

var tmpl *template.Template

func main() {

	http.HandleFunc("/", test)
	http.HandleFunc("/admintest", adminTest)
	http.HandleFunc("/api/data", dual)

	var err error

	funcMap := template.FuncMap{"jsonify": func(v any)(template.JS, error){
		b, err := json.Marshal(v)
		return template.JS(b), err
	}}

	tmpl, err = template.New("").Funcs(funcMap).ParseGlob("template/*.html")
	if err != nil {
		fmt.Println("can't locate file:", err)
	}

	fmt.Println("running on http://127.0.0.1:3081 ")

	log.Fatal(http.ListenAndServe(":3081", nil))

}

func dual(w http.ResponseWriter, r *http.Request) {
    if r.Method == "PATCH" {
        apiPatchData(w, r)
    } else {
        apiGetData(w, r)
    }
}


func apiGetData(w http.ResponseWriter, r *http.Request)  {
	w.Header().Set("Content-type", "application/json")
	data := jsonSet()
	json.NewEncoder(w).Encode(data)
}

func apiPatchData(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	// var data SiteData
	data := jsonSet()
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	jsonGet(&data)

	json.NewEncoder(w).Encode(data)
	// json.NewEncoder(w).Encode(map[string]string{"status": "saved"})
}

func jsonGet(m *SiteData) {

	data, err := os.Create("myData.json")
	if err != nil {
		fmt.Println("error creating file:", err)
		return
	}
	defer data.Close()

	err = json.NewEncoder(data).Encode(m)
	if err != nil {
		fmt.Println("Error encoding:", err)
	}

}

func jsonSet() SiteData {

	fileData, err := os.Open("myData.json")
	if err != nil {
		fmt.Println("error reading file:", err)
		return SiteData{}
	}

	var m SiteData
	err = json.NewDecoder(fileData).Decode(&m)
	if err != nil {
		fmt.Println("Error decoding:", err)
	}

	return m
}

func handleProfile(w http.ResponseWriter, r *http.Request) SiteData {
	data := jsonSet()

	if r.Method == "POST" {
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			http.Error(w, "Bad JSON:"+err.Error(), http.StatusInternalServerError)
			return data
		}
		jsonGet(&data)

		return data
	}

	return data

}

func userDisplay() SiteData {
	fullData := jsonSet()

	result := SiteData{
		Hero: HeroData{
			Title1:    fullData.Hero.Title1,
			Highlight: fullData.Hero.Highlight,
			Title2:    fullData.Hero.Title2,
			Subtitle:  fullData.Hero.Subtitle,
			Status:    fullData.Hero.Status,
		},
		Stats: fullData.Stats,
		About: AboutData{
			Headline:    fullData.About.Headline,
			Bio:         fullData.About.Bio,
			CurrentRole: fullData.About.CurrentRole,
			Company:     fullData.About.Company,
		},
		Skills:     fullData.Skills,
		Projects:   fullData.Projects,
		Experience: fullData.Experience,
		Contact: ContactData{
			Email:     fullData.Contact.Email,
			Location:  fullData.Contact.Location,
			StatusMsg: fullData.Contact.StatusMsg,
			Socials:   fullData.Contact.Socials,
		},
	}
	return result
}

func test(w http.ResponseWriter, r *http.Request) {
	pageMap := map[string]string{
		"/": "template/test.html",
	}

	pages := pageMap["/"][len("template/"):]

	display := userDisplay()

	data := PageData{
		Page: pages,
		Data: display,
	}

	err := tmpl.ExecuteTemplate(w, "test.html", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func adminTest(w http.ResponseWriter, r *http.Request) {

	pages := "adminTest.html"
	display := handleProfile(w, r)

	data := PageData{
		Page: pages,
		Data: display,
	}

	err := tmpl.ExecuteTemplate(w, "adminTest.html", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
