package api

import (
	"github.com/SteNafH/codeceptjs/pkg/renderer"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"time"
)

func New() *echo.Echo {
	e := echo.New()

	e.Renderer = renderer.New()
	e.Use(middleware.Logger())
	e.Static("/images", "images")
	e.Static("/css", "css")

	e.GET("/", func(c echo.Context) error {
		return c.Render(200, "index.html", nil)
	})

	e.POST("/login", func(c echo.Context) error {
		username := c.FormValue("username")
		password := c.FormValue("password")

		if username != "stefan" && password != "test" {
			return c.String(http.StatusUnauthorized, "Incorrect Login!")
		}

		c.SetCookie(&http.Cookie{
			Name:     "login",
			Value:    "logged in",
			Expires:  time.Now().Add(24 * time.Hour),
			Secure:   true,
			HttpOnly: true,
			SameSite: http.SameSiteNoneMode,
		})
		return c.String(http.StatusOK, "Successful Login!")
	})

	return e
}
