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

import axios from "axios";

const API_BASE_URL =
  import.meta.env.DEV
    ? ""
    : "https://g2-sun-11-mpos-back.onrender.com"

const api = axios.create({
	baseURL: `${API_BASE_URL}/api/v1`,
	withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

async function ensureCsrfCookie() {
  await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  })
}

export async function loginAdmin(email, password) {
  await ensureCsrfCookie()
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function createTable(payload) {
  const response = await api.post("/tables", payload);
  return response.data;
}
export default api
