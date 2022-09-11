package main

import (
	"fmt"
	"os"

	oapimiddleware "github.com/deepmap/oapi-codegen/pkg/middleware"
	"github.com/fuz95esi/binboi/backboi/api"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func main() {
	// Echo instance
	e := echo.New()
	swagger, err := api.GetSwagger()

	proxy := api.NewProxy()

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}

	// Clear out the servers array in the swagger spec, that skips validating
	// that server names match. We don't know how this thing will be run.
	swagger.Servers = nil

	// Middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	e.Use(oapimiddleware.OapiRequestValidator(swagger))

	api.RegisterHandlers(e, proxy)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
