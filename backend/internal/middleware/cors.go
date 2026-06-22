package middleware

import "net/http"

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// allow requests from the frontend origin
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		
		// allow cookies to be sent cross-origin
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		
		// allowed HTTP methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		
		// allowed headers
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// handle preflight requests — browser sends OPTIONS first to check if request is allowed
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}