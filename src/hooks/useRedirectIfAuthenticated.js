// src/hooks/useRedirectIfAuthenticated.js
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const navigate = useNavigate()

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

    if (!token) return

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/verify", {
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
