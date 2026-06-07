/*
|--------------------------------------------------------------------------
| File: router/index.js
|--------------------------------------------------------------------------
|
| Description:
| Defines the application routes and navigation behavior using Vue Router.
|
| Responsibilities:
| - Map URL paths to page components
| - Configure default entry route
| - Organize public and feature routes
|
| Notes:
| - The root path ("/") currently redirects to "/preview" for demo purposes
| - Update the root route to Home when moving to production
|
*/

import { createRouter, createWebHistory } from 'vue-router'

// Page components

import Dashboard from '@/pages/dashboard/Dashboard.vue'
import ConfirmOTP from '@/pages/auth/ConfirmOTP.vue'
import Category_List from '../pages/dashboard/Category_List.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword  from '@/pages/auth/ResetPassword.vue'

import TableForm from '../pages/dashboard/TableForm.vue'
import SendEmail from '../pages/auth/SendEmail.vue'
import Setting from '@/pages/dashboard/Setting.vue'



import Sidebar from '@/components/layout/Sidebar.vue'
import Category from '../pages/dashboard/Category.vue'

/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [

  
  /**
   * Default entry route
   * Redirects "/" to "/preview" to showcase the project structure
   */
  { path: '/', redirect: '/preview' },

  /**
   * Preview page (landing/demo screen)
   * Displays project structure and navigation examples
   */
  { path: '/preview', component: Preview },
  { path: '/Sidebar', component: Sidebar },

  /**
   * Main application dashboard
   * Typically requires authentication (can add guards later)
   */
  { path: '/dashboard', component: Dashboard },
  // === table 
  {path: '/table', component: TableForm },
  { path: '/setting', component: Setting },
  { path: '/Category_List', component: Category_List },
  {path: '/category', component: Category },

  /**
   * Authentication routes
   */
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/reset_pasword', component: ResetPassword },
  { path: '/confirm-otp', component: ConfirmOTP },

  { path: '/forgot-password', component: SendEmail },
  /**
   * Optional home route (disabled for now)
   * Uncomment when switching from preview to real landing page
   */
  // { path: '/', component: Home },
  { path: '/home', component: Home },

  /**
   * Catch-all route
   * Displays a styled 404 page for unknown paths
   */
  { path: '/:pathMatch(.*)*', component: NotFound },
  
 
]

/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router