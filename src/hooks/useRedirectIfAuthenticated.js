// src/hooks/useRedirectIfAuthenticated.js
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const navigate = useNavigate()
  const   BASE_URL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

    if (!token) return

    const verifyToken = async () => {
      try {

        const response = await fetch(`${BASE_URL}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          navigate(redirectTo)
        }
      } catch (err) {
        console.error("Erreur lors de la vérification du token :", err)
      }
    }

    verifyToken()
  }, [navigate, redirectTo])
}
