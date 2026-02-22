package internal

import (
	"encoding/json"
	"fmt"
	"os"
)

type Database struct {
	Portfolio Portfolio `json:"portfolio"`
}

type Portfolio struct {
	Personal        Personal        `json:"personal"`
	Stats           Stats           `json:"stats"`
	About           About           `json:"about"`
	Timeline        []Timeline      `json:"timeline"`
	Experience      []Experience    `json:"experience"`
	Education       []Education     `json:"education"`
	Skills          Skills          `json:"skills"`
	Certifications  []Certification `json:"certifications"`
	Honors          []Honor         `json:"honors"`
	SpokenLanguages []SpokenLang    `json:"spoken_languages"`
	Projects        []Project       `json:"projects"`
	TechStack       []string        `json:"tech_stack"`
	Contact         Contact         `json:"contact"`
}

type Personal struct {
	Name         string   `json:"name"`
	Title        string   `json:"title"`
	Tagline      string   `json:"tagline"`
	Bio          string   `json:"bio"`
	Location     string   `json:"location"`
	Email        string   `json:"email"`
	Website      string   `json:"website"`
	Github       string   `json:"github"`
	Linkedin     string   `json:"linkedin"`
	Availability string   `json:"availability"`
	Hobbies      []string `json:"hobbies"`
}

type Stats struct {
	YearsOfExperience string `json:"years_of_experience"`
	ProjectsCompleted string `json:"projects_completed"`
	HappyClients      string `json:"happy_clients"`
	LinesOfCode       string `json:"lines_of_code"`
}

type About struct {
	Journey    string      `json:"journey"`
	Philosophy []Principle `json:"philosophy"`
}

type Principle struct {
	Principle   string `json:"principle"`
	Description string `json:"description"`
}

type Timeline struct {
	Year         string `json:"year"`
	Role         string `json:"role"`
	Organization string `json:"organization"`
	Note         string `json:"note,omitempty"`
}

type Experience struct {
	Title      string   `json:"title"`
	Company    string   `json:"company"`
	Period     string   `json:"period"`
	Highlights []string `json:"highlights"`
}

type Education struct {
	Degree         string `json:"degree"`
	Institution    string `json:"institution"`
	Period         string `json:"period"`
	Specialization string `json:"specialization,omitempty"`
	Note           string `json:"note,omitempty"`
}

type Skills struct {
	CoreCompetencies []Competency `json:"core_competencies"`
	Frontend         []SkillItem  `json:"frontend"`
	Backend          []SkillItem  `json:"backend"`
	DevopsTooling    []string     `json:"devops_tooling"`
	Languages        []string     `json:"languages"`
	SoftSkills       []string     `json:"soft_skills"`
}

type Competency struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type SkillItem struct {
	Name        string `json:"name"`
	Proficiency int    `json:"proficiency"`
}

type Certification struct {
	Name  string `json:"name"`
	Level string `json:"level"`
	Year  string `json:"year"`
}

type Honor struct {
	Title  string `json:"title"`
	Detail string `json:"detail"`
}

type SpokenLang struct {
	Language    string `json:"language"`
	Level       string `json:"level"`
	Proficiency int    `json:"proficiency"`
}

type Project struct {
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Category     string   `json:"category"`
	Technologies []string `json:"technologies"`
	Image        string   `json:"image"`
}

type Contact struct {
	Email        string   `json:"email"`
	Linkedin     string   `json:"linkedin"`
	Github       string   `json:"github"`
	Location     string   `json:"location"`
	FormSubjects []string `json:"form_subjects"`
}

func SaveData(s *Database) error {
	save, err := os.Create("internal/Database.json")
	if err != nil {
		return fmt.Errorf("could not create database file: %w", err)
	}

	defer save.Close()

	err = json.NewEncoder(save).Encode(s)
	if err != nil {
		return fmt.Errorf("failed to encode database json: %w", err)
	}		
	return nil
}



func ViewData() (Database, error){
	view, err := os.Open("internal/Database.json")
	if err != nil {
		return Database{}, fmt.Errorf("could not open database: %w", err)
	}
	
	defer view.Close()

	var v Database

	err = json.NewDecoder(view).Decode(&v)
	if err != nil {
		return Database{}, fmt.Errorf("failed to decode database: %w", err)
	}
	return v, nil
}

func UserDisplay() (Portfolio, error) {
	p, err := ViewData()
	if err != nil {
		return Portfolio{}, err
	}

	fullData:= p.Portfolio

	output := Portfolio{
		Personal: Personal{
			Name:         fullData.Personal.Name,
			Title:        fullData.Personal.Title,
			Tagline:      fullData.Personal.Tagline,
			Bio:          fullData.Personal.Bio,
			Location:     fullData.Personal.Location,
			Email:        fullData.Personal.Email,
			Website:      fullData.Personal.Website,
			Github:       fullData.Personal.Github,
			Linkedin:     fullData.Personal.Linkedin,
			Availability: fullData.Personal.Availability,
			Hobbies:      fullData.Personal.Hobbies,
		},
		Stats: Stats{
			YearsOfExperience: fullData.Stats.YearsOfExperience,
			ProjectsCompleted: fullData.Stats.ProjectsCompleted,
			HappyClients:      fullData.Stats.HappyClients,
			LinesOfCode:       fullData.Stats.LinesOfCode,
		},
		About: About{
			Journey:    fullData.About.Journey,
			Philosophy: fullData.About.Philosophy,
		},
		Timeline:        fullData.Timeline,
		Experience:      fullData.Experience,
		Education:       fullData.Education,
		Skills:          fullData.Skills,
		Certifications:  fullData.Certifications,
		Honors:          fullData.Honors,
		SpokenLanguages: fullData.SpokenLanguages,
		Projects:        fullData.Projects,
		TechStack:       fullData.TechStack,
		Contact: Contact{
			Email:        fullData.Contact.Email,
			Linkedin:     fullData.Contact.Linkedin,
			Github:       fullData.Contact.Github,
			Location:     fullData.Contact.Location,
			FormSubjects: fullData.Contact.FormSubjects,
		},
	}
	return output, nil
}
