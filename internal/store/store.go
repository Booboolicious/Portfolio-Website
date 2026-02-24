package store

import (
	"encoding/json"
	"fmt"
	"os"
	"portfolio-website/internal/models"
)

const dbPath = "internal/Database.json"

func SaveData(s *models.Database) error {
	save, err := os.Create(dbPath)
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

func ViewData() (models.Database, error) {
	view, err := os.Open(dbPath)
	if err != nil {
		return models.Database{}, fmt.Errorf("could not open database: %w", err)
	}
	defer view.Close()

	var v models.Database
	err = json.NewDecoder(view).Decode(&v)
	if err != nil {
		return models.Database{}, fmt.Errorf("failed to decode database: %w", err)
	}
	return v, nil
}

func UserDisplay() (models.Portfolio, error) {
	p, err := ViewData()
	if err != nil {
		return models.Portfolio{}, err
	}

	fullData := p.Portfolio

	output := models.Portfolio{
		Personal: models.Personal{
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
		Stats: models.Stats{
			YearsOfExperience: fullData.Stats.YearsOfExperience,
			ProjectsCompleted: fullData.Stats.ProjectsCompleted,
			HappyClients:      fullData.Stats.HappyClients,
			LinesOfCode:       fullData.Stats.LinesOfCode,
		},
		About: models.About{
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
		Contact: models.Contact{
			Email:        fullData.Contact.Email,
			Linkedin:     fullData.Contact.Linkedin,
			Github:       fullData.Contact.Github,
			Location:     fullData.Contact.Location,
			FormSubjects: fullData.Contact.FormSubjects,
		},
	}
	return output, nil
}
