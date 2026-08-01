import { reactive } from 'vue'

const state = reactive({
  admin: typeof localStorage !== 'undefined'
    ? JSON.parse(localStorage.getItem('auth_admin') || 'null')
    : null,
})

function login(admin) {
  state.admin = admin
  localStorage.setItem('auth_admin', JSON.stringify(admin))
}

function logout() {
  state.admin = null
  localStorage.removeItem('auth_admin')
}

export default function useAuthStore() {
  return { state, login, logout }
}
export default function createOrder() {
  return { state, login, logout }
}
