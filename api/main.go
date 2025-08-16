package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/trains", GetTrainsHandler)
	log.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}