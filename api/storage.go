package main

import (
	"encoding/json"
	"os"
	"io"
)

func LoadTrains() ([]Train, error) {
	file, err := os.Open("trains.json")

	if err != nil {
		return nil, err
	}
	defer file.Close();
	data, err := io.ReadAll(file)
	if err != nil {
    return nil, err
}
	var trains []Train
	err = json.Unmarshal(data, &trains)
	if err != nil{
		return nil, err
	}

	return trains, nil
}

func SaveTrains(trains []Train) error {
	data, err := json.MarshalIndent(trains, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile("trains.json", data, 0644)
}

