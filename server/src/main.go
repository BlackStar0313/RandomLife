package main

import (
	"net/http"

	"./controller"
	"github.com/gin-gonic/gin"
)

type Profile struct {
	Name    string
	Hobbies []string
}

var ROOT = map[string]gin.HandlerFunc{
	"/getRandDesc": controller.GetRandDesc,
	"/getUser":     controller.GetUser,
}

// func sayHelloName(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "text/html; charset=utf-8")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	// r.ParseForm()
// 	fmt.Println("~~~ here is some one request")
// 	fmt.Fprintf(w, "hey , fuck u")
// }

// func fucku(w http.ResponseWriter, r *http.Request) {
// 	profile := Profile{"脏话", []string{"你大爷", "你妈妈"}}
// 	js, err := json.Marshal(profile)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")

// 	w.Write(js)
// }

func configRouter(router *gin.Engine) {
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "fuck u ")
	})

	apiGroup := router.Group("/api")

	var action string
	var handler gin.HandlerFunc
	for action, handler = range ROOT {
		apiGroup.GET(action, handler)
	}
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
	configRouter(router)
	router.Run(":9091")

	// advice, _ := readJson()
	// fmt.Printf("啦啦啦啦啦 %s ", advice)
}
