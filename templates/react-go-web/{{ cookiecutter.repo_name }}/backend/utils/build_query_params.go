package utils

import "strings"

func BuildQueryParams(params []string) string {
	return strings.Join(params, "&")
}
