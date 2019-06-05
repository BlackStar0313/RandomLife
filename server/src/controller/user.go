package controller

import "github.com/gin-gonic/gin"

func GetUser(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(200, gin.H{
		"status":  "posted",
		"message": "你个蛤蟆皮",
		"nick":    "caonizui",
	})
}
