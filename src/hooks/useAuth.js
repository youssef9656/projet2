"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

// Configuration API globale
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY: "/auth/verify",
    LOGOUT: "/auth/logout",
  },
}

// Fonction utilitaire pour les appels API
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

// Obtenir les tokens
const getTokens = () => {
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  const sessionToken = localStorage.getItem("sessionToken") || sessionStorage.getItem("sessionToken")
  const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail")
  return { authToken, sessionToken, userEmail }
}

// Nettoyer le stockage local
const clearStorage = () => {
  localStorage.removeItem("authToken")
  sessionStorage.removeItem("authToken")
  localStorage.removeItem("sessionToken")
  sessionStorage.removeItem("sessionToken")
  localStorage.removeItem("userEmail")
  sessionStorage.removeItem("userEmail")
}

export default function useAuth() {
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Ref pour gérer l'intervalle de vérification
  const tokenCheckInterval = useRef(null)

  // Vérification du token au chargement
  useEffect(() => {
    const { authToken, sessionToken, userEmail: email } = getTokens()

    if (!authToken || !sessionToken) {
      setLoading(false)
      setIsAuthenticated(false)
      return
    }

    verifyToken(authToken, sessionToken, email)
  }, [])

  // Vérification périodique du token
  useEffect(() => {
    if (isAuthenticated) {
      tokenCheckInterval.current = setInterval(() => {
        console.log("Vérification automatique du token...")
        const { authToken, sessionToken } = getTokens()
        if (authToken && sessionToken) {
          verifyTokenSilently(authToken, sessionToken)
        }
      }, 5 * 60 * 1000)

      return () => {
        if (tokenCheckInterval.current) {
          clearInterval(tokenCheckInterval.current)
        }
      }
    }
  }, [isAuthenticated])

  // Vérification initiale
  const verifyToken = async (authToken, sessionToken, email) => {
    try {
      await apiCall(API_CONFIG.ENDPOINTS.VERIFY, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token: sessionToken }),
      })

      setUserEmail(email)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      console.error("Erreur de vérification du token :", error)
      handleLogout(false) // pas d'appel API logout si token invalide
    }
  }

  // Vérification silencieuse
  const verifyTokenSilently = async (authToken, sessionToken) => {
    try {
      await apiCall(API_CONFIG.ENDPOINTS.VERIFY, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token: sessionToken }),
      })
      console.log("Token toujours valide")
    } catch (error) {
      console.error("Token expiré - Déconnexion automatique")
      handleLogout(false)
    }
  }

  // Déconnexion
  const handleLogout = async (callAPI = true) => {
    setLoading(true)

    // Nettoyage de l'intervalle
    if (tokenCheckInterval.current) {
      clearInterval(tokenCheckInterval.current)
      tokenCheckInterval.current = null
    }

    if (callAPI) {
      try {
        const { authToken, sessionToken } = getTokens()
        if (authToken && sessionToken) {
          await apiCall(API_CONFIG.ENDPOINTS.LOGOUT, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              token: sessionToken,
              email: userEmail,
            }),
          })
        }
      } catch (error) {
        console.error("Erreur lors du logout :", error)
      }
    }

    clearStorage()
    setUserEmail("")
    setIsAuthenticated(false)
    setLoading(false)
    navigate("/ifpe/admin/login")
  }

  // Appels API avec token auth
  const authenticatedApiCall = async (endpoint, options = {}) => {
    const { authToken } = getTokens()
    if (!authToken) {
      throw new Error("Token d'authentification manquant")
    }

    return apiCall(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      },
    })
  }

  // Redirection si déjà connecté
  const redirectIfAuthenticated = async () => {
    setLoading(true)

    try {
      const { authToken, sessionToken } = getTokens()
      if (!authToken || !sessionToken) {
        setLoading(false)
        return false
      }

      await apiCall(API_CONFIG.ENDPOINTS.VERIFY, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token: sessionToken }),
      })

      setIsAuthenticated(true)
      setLoading(false)
      navigate("/ifpe/admin/dashboard")
      return true
    } catch (error) {
      console.log("Tokens invalides, pas de redirection")
      clearStorage()
      setIsAuthenticated(false)
      setLoading(false)
      return false
    }
  }

  return {
    userEmail,
    loading,
    isAuthenticated,
    handleLogout,
    apiCall: authenticatedApiCall,
    redirectIfAuthenticated,
    API_CONFIG,
  }
}

// Exports utiles
export { apiCall, API_CONFIG, getTokens, clearStorage }
