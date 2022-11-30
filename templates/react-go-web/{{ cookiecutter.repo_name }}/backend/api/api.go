package api

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/fuz95esi/binboi/backboi/utils"
	"github.com/labstack/echo/v4"
)

type StatusCode int32

const (
	StatusInternalServerError = iota
	StatusSuccess
	StatusNotImplemented
	StatusUnrecognisedUprn
)

type Proxy struct{}

func NewProxy() *Proxy {
	return &Proxy{}
}

func NewStatus(i StatusCode, m string) *Status {
	return &Status{
		Code:    int(i),
		Message: m,
	}
}

func statusCode(s StatusCode, customMessage string) *Status {
	switch s {
	case StatusInternalServerError:
		return NewStatus(s, fmt.Sprintf("Something bad happened, but we're not sure why. Error: %s", customMessage))
	case StatusSuccess:
		return NewStatus(s, "All good here homie")
	case StatusUnrecognisedUprn:
		return NewStatus(s, "UPRN %s is not recognised - your address is not within the Reading jurisdiction")
	case StatusNotImplemented:
		return NewStatus(s, fmt.Sprintf("Sorry bruh, I'm not a real boy yet. Failed at method: %s", customMessage))
	}

	return NewStatus(s, fmt.Sprintf("I don't know what to tell you kiddo, but here's a code you can use to figure it out: %s", customMessage))
}

func get(endpoint string, marshalObject any) error {
	resp, err := http.Get(endpoint)

	if err != nil {
		return fmt.Errorf("[binboi] Error getting response from %s: %s", endpoint, err.Error())
	}

	// Limit request bodies to 5MB
	reader := io.LimitReader(resp.Body, 1048576)
	body, err := ioutil.ReadAll(reader)

	if err != nil {
		return fmt.Errorf("[binboi] Error reading body from %s: %s", endpoint, err.Error())
	}

	fmt.Printf("%s", string(body))

	err = json.Unmarshal(body, &marshalObject)

	if err != nil {
		return fmt.Errorf("[binboi] Error parsing response from %s: %s", endpoint, err.Error())
	}

	return nil
}

func proxyEndpoint(ctx echo.Context, endpoint string, marshalObject any) error {
	err := get(endpoint, marshalObject)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, statusCode(StatusInternalServerError, err.Error()))
	}

	return ctx.JSON(http.StatusOK, marshalObject)
}

func (p *Proxy) GetCalendarFeed(ctx echo.Context, uprn string, params GetCalendarFeedParams) error {
	collectionsEndpoint := fmt.Sprintf("https://api.reading.gov.uk/api/collections/%s", uprn)
	var collections Collections

	queryParamsList := []string{}

	if params.FromDate != nil {
		queryParamsList = append(queryParamsList, "from_date="+*params.FromDate)
	}

	if params.ToDate != nil {
		queryParamsList = append(queryParamsList, "to_date="+*params.ToDate)
	}

	if len(queryParamsList) > 0 {
		queryParams := utils.BuildQueryParams(queryParamsList)
		collectionsEndpoint = collectionsEndpoint + "?" + queryParams
	}

	err := get(collectionsEndpoint, &collections)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, statusCode(StatusInternalServerError, err.Error()))
	}

	if len(*collections.Collections) == 0 {
		return ctx.JSON(http.StatusBadRequest, statusCode(StatusUnrecognisedUprn, uprn))
	}

	cal, err := CollectionsToCal(collections.Collections)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, statusCode(StatusInternalServerError, err.Error()))
	}

	return ctx.Blob(http.StatusOK, "text/calendar", []byte(cal.Serialize()))
}

func (p *Proxy) GetAddresses(ctx echo.Context, postcode string) error {
	endpoint := fmt.Sprintf("https://api.reading.gov.uk//rbc/getaddresses/%s", postcode)
	var addresses Addresses

	return proxyEndpoint(ctx, endpoint, &addresses)
}

func (p *Proxy) GetCollectionDates(ctx echo.Context, uprn string, params GetCollectionDatesParams) error {
	endpoint := fmt.Sprintf("https://api.reading.gov.uk/api/collections/%s", uprn)
	var collections Collections

	queryParamsList := []string{}

	if params.FromDate != nil {
		queryParamsList = append(queryParamsList, "from_date="+*params.FromDate)
	}

	if params.ToDate != nil {
		queryParamsList = append(queryParamsList, "to_date="+*params.ToDate)
	}

	if len(queryParamsList) > 0 {
		queryParams := utils.BuildQueryParams(queryParamsList)
		endpoint = endpoint + "?" + queryParams
	}

	return proxyEndpoint(ctx, endpoint, &collections)
}

func (p *Proxy) Health(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, statusCode(StatusSuccess, "health check successful"))
}
