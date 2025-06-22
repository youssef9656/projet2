"use client"

import { useEffect, useState } from "react"
import { Spin } from "antd"

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

      if (token) {
        // Vérifier si le token est valide (optionnel)
        try {
          const payload = JSON.parse(atob(token.split(".")[1]))
          const currentTime = Date.now() / 1000

          if (payload.exp > currentTime) {
            setIsAuthenticated(true)
          } else {
            // Token expiré
            localStorage.removeItem("authToken")
            sessionStorage.removeItem("authToken")
            localStorage.removeItem("userEmail")
            sessionStorage.removeItem("userEmail")
            window.location.href = "/login"
          }
        } catch (error) {
          console.error("Token invalide:", error)
          window.location.href = "/login"
        }
      } else {
        window.location.href = "/login"
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return isAuthenticated ? children : null
}
