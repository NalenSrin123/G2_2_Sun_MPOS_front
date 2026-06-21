import axios from 'axios'

const api = axios.create({
  baseURL: 'https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1',
})

export async function loginAdmin(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export default api