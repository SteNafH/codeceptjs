package renderer

import (
	"github.com/labstack/echo/v4"
	"html/template"
	"io"
)

type Renderer struct {
	tmpl *template.Template
}

func New() *Renderer {
	return &Renderer{
		tmpl: template.Must(template.ParseGlob("views/*.html")),
	}
}

func (r *Renderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return r.tmpl.ExecuteTemplate(w, name, data)
}
