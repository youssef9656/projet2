// src/hooks/useAuth.js
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useAuth() {
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
       const sessionToken =
      sessionStorage.getItem("sessionToken") || localStorage.getItem("sessionToken")
    const email =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail")

    if (!token) {
      navigate("/login")
      return
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({ token: sessionToken }), // ✅ token dans le body

        })

        if (!response.ok) {
          handleLogout()
        } else {
          setUserEmail(email)
          setLoading(false)
        }
      } catch (err) {
        console.error("Erreur de vérification du token :", err)
        handleLogout()
      }
    }

    verifyToken()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    sessionStorage.removeItem("authToken")
    localStorage.removeItem("sessionToken")
    sessionStorage.removeItem("sessionToken")
    localStorage.removeItem("userEmail")
    sessionStorage.removeItem("userEmail")
    navigate("/login")
  }

  return { userEmail, loading, handleLogout }
}
