package main

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
