"use client"

import { useState, useEffect } from "react"
import { Button, Progress } from "antd"
import { ArrowUpOutlined } from "@ant-design/icons"
import "./ScrollToTopAdvanced.css"

export default function ScrollToTopAdvanced() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [shouldPulse, setShouldPulse] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      // Calculer le pourcentage de scroll
      setScrollProgress(scrollPercent)

      // Afficher le bouton si l'utilisateur a scrollé plus de 300px
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Ajouter l'effet de pulsation si l'utilisateur a beaucoup scrollé
      if (scrollTop > 1000) {
        setShouldPulse(true)
      } else {
        setShouldPulse(false)
      }
    }

    // Throttle pour optimiser les performances
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll)

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={`scroll-to-top-advanced ${isVisible ? "visible" : "hidden"} ${shouldPulse ? "pulse" : ""}`}>
      <div className="scroll-progress-container">
        <Progress
          type="circle"
          percent={scrollProgress}
          size={50}
          strokeColor={{
            "0%": "#0056b3",
            "100%": "#3498db",
          }}
          trailColor="rgba(0, 86, 179, 0.1)"
          strokeWidth={6}
          showInfo={false}
          className="scroll-progress"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined style={{ fontSize: "18px" }} />}
          onClick={scrollToTop}
          className="scroll-button-advanced"
          title="Retour en haut"
          style={{
            backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            color: "#0056b3",
          }}
        />
      </div>
    </div>
  )
}
