package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

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

func readJson() {
	jsonFile, err := os.Open("./Language.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("success open Language.json")
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)
	// fmt.Println(result

	test := result["112"]
	fmt.Printf("你这个傻屌 %s", test)
}

func main() {
	// fmt.Println("starting server ")
	// http.HandleFunc("/nihao", sayHelloName)
	// http.HandleFunc("/nibuhao", fucku)
	// err := http.ListenAndServe(":9090", nil)
	// if err != nil {
	// 	log.Fatal(" nima hai ", err)
	// }

	// router := gin.Default()
	// router.GET("/", func(c *gin.Context) {
	// 	c.String(http.StatusOK, "fuck u ")
	// })
	// router.GET("/user/get", getUser)
	// router.Run(":9091")

	readJson()
}
