package handler

import (
	"embed"
	"encoding/json"
	"net/http"
	"log"
)

//go:embed trains-data.json
var trainsJSON []byte

type ClassInfo struct {
	Type   string `json:"type"`
	Status string `json:"status"`
	Quota  string `json:"quota"`
	Price  string `json:"price"`
}

type StationInfo struct {
	Time    string `json:"time"`
	Date    string `json:"date"`
	Station string `json:"station"`
}

type Train struct {
	ID        string      `json:"id"`
	Number    int         `json:"number"`
	Name      string      `json:"name"`
	RunsOn    string      `json:"runsOn"`
	Duration  string      `json:"duration"`
	Departure StationInfo `json:"departure"`
	Arrival   StationInfo `json:"arrival"`
	Classes   []ClassInfo `json:"classes"`
}

// func LoadTrains() ([]Train, error) {
// 	file, err := os.Open("trains-data.json")
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer file.Close()
// 	data, err := io.ReadAll(file)
// 	if err != nil {
// 		return nil, err
// 	}
// 	var trains []Train
// 	err = json.Unmarshal(data, &trains)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return trains, nil
// }

func LoadTrains() ([]Train, error) {
	var trains []Train
	err := json.Unmarshal(trainsJSON, &trains)
	if err != nil {
		return nil, err
	}
	return trains, nil
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	trains, err := LoadTrains()
	if err != nil {
		log.Printf("ERROR: Failed to load trains: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_ = json.NewEncoder(w).Encode(trains)
}
