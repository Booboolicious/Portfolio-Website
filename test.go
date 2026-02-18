package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// type movie struct{
// 	ID int `json:"id"`
// 	Title string `json:"title"`
// 	Year int `json:"year"`
// 	IsGood bool `json:"is_good,omitempty"`
// }

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
	Name        string `json:"name"`
	Level       string `json:"level"`
	Percent     int		`json:"percentage"`
	Icon        string	`json:"icon"`
	Tags        []string	`json:"tags"`
}

type Project struct {
	Title    string	`json:"title"`
	Stack    []string	`json:"stack"`
	Status   string	`json:"status"`
	Image    string	`json:"image"`
	RepoLink string	`json:"repo_link"`
}

type Experience struct {
	Role         string	`json:"role"`
	Company      string	`json:"company"`
	Duration     string	`json:"duration"`
	Location     string	`json:"location"`
	Description  string	`json:"description"`
	Achievements []string	`json:"acheivment"`
}

type ContactData struct {
	Email    string	`json:"email"`
	Location string	`json:"location"`
	StatusMsg string	`json:"status_msg"`
	Socials  map[string]string	`json:"socials"`
}

type SiteData struct {
	Hero       HeroData	`json:"hero"`
	Stats      []StatData	`json:"stats"`
	About      AboutData	`json:"about"`
	Skills     []Skill	`json:"skills"`
	Projects   []Project	`json:"project"`
	Experience []Experience	`json:"experience"`
	Contact    ContactData	`json:"contact"`
}

type PageData struct {
	Page  string	`json:"page"`
	Title string	`json:"title"`
	Data  SiteData 	`json:"data"` // This holds all the editable content
}


func main(){

	// result1 := &movie{
	// ID: 1,
	// Title: "lord of the rings",
	// Year: 2019,
	// IsGood: true,
	// }

	result2 := &SiteData{
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


	// jsonGet(result1)
	// jsonGet(result2)
	fmt.Println(result2.Experience[0].Achievements[1])
	fmt.Println( jsonSet().Contact.Socials["GitHub"])



	// output := jsonSet()

	// fmt.Println(output)


}

func jsonGet(m *SiteData) {
	
	data, err := os.Create("Database.json") 
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

	fileData, err := os.Open("Database.json")
	if err != nil {
		fmt.Println("error reading file:", err)
		return  SiteData{}
	}

	var m SiteData
	err = json.NewDecoder(fileData).Decode(&m)
	if err != nil {
		fmt.Println("Error decoding:", err)
	}

	return m
}

func handleProfile(w http.ResponseWriter, r *http.Request){

	fullData := jsonSet()

		result2 := &SiteData{
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
	tmpl.Execute(w, result2)
}