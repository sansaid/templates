package api

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

type StatusCode int32

const (
	StatusInternalServerError = iota
	StatusSuccess
	StatusNotImplemented
)

type Proxy struct{}

func NewProxy() *Proxy {
	return &Proxy{}
}

func NewStatus(i StatusCode, m string) *Status {
	return &Status{
		Code:    int32(i),
		Message: m,
	}
}

func statusCode(s StatusCode, customMessage string) *Status {
	switch s {
	case StatusInternalServerError:
		return NewStatus(s, fmt.Sprintf("Something bad happened, but we're not sure why. Error: %s", customMessage))
	case StatusSuccess:
		return NewStatus(s, "All good here homie")
	case StatusNotImplemented:
		return NewStatus(s, fmt.Sprintf("Sorry bruh, I'm not a real boy yet. Failed at method: %s", customMessage))
	}

	return NewStatus(s, fmt.Sprintf("I don't know what to tell you kiddo, but here's a code you can use to figure it out: %s", customMessage))
}

func proxyEndpoint(ctx echo.Context, endpoint string, marshalObject any) error {
	resp, err := http.Get(endpoint)

	if err != nil {
		errorMessage := fmt.Sprintf("Error getting response from %s: %s", endpoint, err.Error())

		return ctx.JSON(http.StatusInternalServerError, statusCode(StatusInternalServerError, errorMessage))
	}

	// Limit request bodies to 5MB
	reader := io.LimitReader(resp.Body, 1048576)
	body, err := ioutil.ReadAll(reader)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, statusCode(StatusInternalServerError, err.Error()))
	}

	json.Unmarshal(body, &marshalObject)

	return ctx.JSON(http.StatusOK, marshalObject)
}

func (p *Proxy) GetAddresses(ctx echo.Context, postcode string) error {
	endpoint := fmt.Sprintf("https://api.reading.gov.uk//rbc/getaddresses/%s", postcode)
	var addresses Addresses

	return proxyEndpoint(ctx, endpoint, addresses)
}

func (p *Proxy) Subscribe(ctx echo.Context) error {
	return ctx.JSON(http.StatusNotImplemented, statusCode(StatusNotImplemented, "Subscribe"))
}

func (p *Proxy) GetSubscriptionDetails(ctx echo.Context, subscriptionId string) error {
	return ctx.JSON(http.StatusNotImplemented, statusCode(StatusNotImplemented, "GetSubscriptionDetails"))
}
