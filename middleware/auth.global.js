// middleware/auth.global.js
import PageTemplateService from '~/services/page_template'
import { jwtDecode } from 'jwt-decode'

let tokenCheckInterval = null

function updateTokenExpiration(token) {
  try {
    const decodedToken = jwtDecode(token)
    const expiresIn = decodedToken.exp * 1000 - Date.now()
    const expirationTime = Date.now() + expiresIn
    localStorage.setItem('expiresAt', expirationTime.toString())
    return expirationTime
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

function isTokenExpired() {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('accessToken')
  if (!token) return true

  let expiresAt = localStorage.getItem('expiresAt')
  if (!expiresAt) {
    expiresAt = updateTokenExpiration(token)
    if (!expiresAt) return true
  }

  const now = Date.now()
  const expired = now > Number(expiresAt)
  
  return expired
}

function checkTokenExpiration() {
  if (isTokenExpired()) {
    clearToken()
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
  }
}

function clearToken() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('expiresAt')
}

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware triggered. Route:', to.path)
  if (process.server || !(to.path.includes('builder') || to.path.includes('menus') || to.path.includes('backups'))) {
    console.log('Skipping auth check (server-side or non-protected route)')
    return
  }

  const token = localStorage.getItem('accessToken')
  
  if (token) {
    console.log('Token found, updating expiration and checking validity')
    updateTokenExpiration(token)
    PageTemplateService.setAuthToken = token

    if (!tokenCheckInterval) {
      console.log('Setting up token check interval')
      tokenCheckInterval = setInterval(checkTokenExpiration, 60000) // Verifica cada minuto
    }

    if (to.path !== '/login') {
      const tokenExpired = isTokenExpired()
      console.log('Token expired check result:', tokenExpired)
      if (tokenExpired) {
        console.log('Token expired, redirecting to login')
        clearToken()
        return navigateTo('/login')
      }
    }
  } else {
    console.log('No token found')
    if (tokenCheckInterval) {
      console.log('Clearing token check interval')
      clearInterval(tokenCheckInterval)
      tokenCheckInterval = null
    }
    
    if (to.path !== '/login') {
      console.log('Auth required, redirecting to login')
      return navigateTo('/login')
    }
  }
  
  console.log('Auth check complete, continuing navigation')
})