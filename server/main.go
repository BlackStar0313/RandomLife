package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Profile struct {
	Name    string
	Hobbies []string
}

func sayHelloName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// r.ParseForm()
	fmt.Println("~~~ here is some one request")
	fmt.Fprintf(w, "hey , fuck u")
}

func fucku(w http.ResponseWriter, r *http.Request) {
	profile := Profile{"脏话", []string{"你大爷", "你妈妈"}}
	js, err := json.Marshal(profile)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(js)
}

func getUser(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(200, gin.H{
		"status":  "posted",
		"message": "你个蛤蟆皮",
		"nick":    "caonizui",
	})
}

func main() {
	// fmt.Println("starting server ")
	// http.HandleFunc("/nihao", sayHelloName)
	// http.HandleFunc("/nibuhao", fucku)
	// err := http.ListenAndServe(":9090", nil)
	// if err != nil {
	// 	log.Fatal(" nima hai ", err)
	// }

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello World")
	})
	router.GET("/user/get", getUser)
	router.Run(":9090")
}
