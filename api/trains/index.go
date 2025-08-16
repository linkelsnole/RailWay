package handler

import (
	"encoding/json"
	"log"
	"net/http"
)

var trainsJSONString = `
[
  {
    "id": "1",
    "number": 22426,
    "name": "VANDE BHARAT",
    "runsOn": "Everyday",
    "duration": "8 hours",
    "departure": {
      "time": "23:25",
      "date": "Aug 25",
      "station": "New Delhi - NDLS"
    },
    "arrival": {
      "time": "07:25",
      "date": "Aug 26",
      "station": "Lucknow - LJN"
    },
    "classes": [
      { "type": "3A", "status": "Avl - 046", "quota": "Tatkal", "price": "800" },
      { "type": "2A", "status": "Avl - 006", "quota": "Tatkal", "price": "1000" },
      { "type": "1A", "status": "WL - 36",  "quota": "Tatkal", "price": "1200" }
    ]
  }
]
`


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


func LoadTrains() ([]Train, error) {
	var trains []Train
	err := json.Unmarshal([]byte(trainsJSONString), &trains)
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
		log.Printf("FATAL ERROR: Failed to unmarshal hardcoded JSON: %v", err)
		http.Error(w, "An internal error occurred", http.StatusInternalServerError)
		return
	}
	_ = json.NewEncoder(w).Encode(trains)
}