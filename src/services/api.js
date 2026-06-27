/*
|--------------------------------------------------------------------------
| File: services/api.js
|--------------------------------------------------------------------------
|
| Description:
| Creates a centralized Axios instance for making HTTP requests.
|
| Responsibilities:
| - Define base configuration for API calls
| - Provide a reusable HTTP client across the application
| - Allow extension (interceptors, headers, auth tokens)
|
| Notes:
| - baseURL is set to "/api" (can be proxied in Vite or backend)
| - Add interceptors here for auth, error handling, logging
|
*/

const BASE_URL = "https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  return response;
}

export async function createTable(payload) {
  return request("/tables", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
