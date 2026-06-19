package middleware

import (
	"net/http"
)


type Middleware func(http.Handler) http.Handler


func ChainMiddlewares(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := 0; i < len(middlewares); i++ {
		handler = middlewares[i](handler)
	}
	return handler
}