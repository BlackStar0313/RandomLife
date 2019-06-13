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

func readJson(fileName string) (map[string]interface{}, error) {
	var configPath = os.Getenv("CONFIG_PATH")
	jsonFile, err := os.Open(configPath + fileName)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println("success open json")
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)
	return result, nil
}

func getAdvice() (string, error) {
	var result, err = readJson("/life.json")
	if err != nil {
		fmt.Println(err)
		return "", err
	}

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

func getGoodBad() ([]string, error) {
	var result, err = readJson("/goodBad.json")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	randNum := 3
	returnValue := make([]string, randNum)

	for i := 0; i < randNum; i++ {
		length := len(result)
		rand.Seed(time.Now().UTC().UnixNano())
		idx := rand.Intn(length)
		temp := result[strconv.Itoa(idx)]
		value, isSuccess := temp.(string)
		if isSuccess == false {
			return nil, err
		}
		returnValue[i] = value
	}

	return returnValue, err
}

func getLove() int {
	length := 5
	rand.Seed(time.Now().UTC().UnixNano())
	idx := rand.Intn(length)
	return idx
}

func getSlogon() (string, error) {
	var result, err = readJson("/slogon.json")
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	length := len(result)
	rand.Seed(time.Now().UTC().UnixNano())
	idx := rand.Intn(length)
	value := result[strconv.Itoa(idx)]
	returnValue, isSuccess := value.(string)
	if isSuccess == false {
		return "", err
	}
	return returnValue, err
}

func getPos() (string, error) {
	var result, err = readJson("/pos.json")
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	length := len(result)
	rand.Seed(time.Now().UTC().UnixNano())
	idx := rand.Intn(length)
	value := result[strconv.Itoa(idx)]
	returnValue, isSuccess := value.(string)
	if isSuccess == false {
		return "", err
	}
	return returnValue, err
}

func getMoney() (string, error) {
	var result, err = readJson("/money.json")
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	length := len(result)
	rand.Seed(time.Now().UTC().UnixNano())
	idx := rand.Intn(length)
	value := result[strconv.Itoa(idx)]
	returnValue, isSuccess := value.(string)
	if isSuccess == false {
		return "", err
	}
	return returnValue, err
}

func GetRandDesc(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	advice, err := getAdvice()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	good, err := getGoodBad()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	bad, err := getGoodBad()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	loveLv := getLove()

	slogon, err := getSlogon()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	pos, err := getPos()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	money, err := getMoney()
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
		})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
		"advice":  advice,
		"good":    good,
		"bad":     bad,
		"loveLv":  loveLv,
		"slogon":  slogon,
		"pos":     pos,
		"money":   money,
	})
}
