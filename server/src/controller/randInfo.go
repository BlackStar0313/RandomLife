package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func readJson() (string, error) {
	// jsonFile, err := os.Open("./data/lang.json")
	var configPath = os.Getenv("CONFIG_PATH")
	jsonFile, err := os.Open(configPath + "/lang.json")
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	fmt.Println("success open lang.json")
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)
	// fmt.Println(result

	fmt.Printf("长度是 %d \n", len(result))
	length := len(result)
	rand.Seed(time.Now().UTC().UnixNano())
	idx := rand.Intn(length)
	value := result[strconv.Itoa(idx)]
	fmt.Printf("你这个傻屌 %s\n", value)
	returnValue, isSuccess := value.(string)
	if isSuccess == false {
		return "", err
	}
	return returnValue, err
}

func GetRandDesc(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	advice, err := readJson()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}
	c.JSON(200, gin.H{
		"success": true,
		"advice":  advice,
	})
}
