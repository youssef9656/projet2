"use client"

import { Button, Typography } from "antd"
import { CheckOutlined } from "@ant-design/icons"
import "./Accueil.css"
import Loader from "../components/Loader"
import { useEffect, useState } from "react"

const { Title, Paragraph } = Typography

export default function Accueil() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // if (loading) return <Loader />

  const domaines = [
    {
      title: "Formation Professionnelle",
      description: "Conception et déploiement de programmes de formation adaptés au marché",
      icon: "🧩",
    },
    {
      title: "Ingénierie de Formation",
      description: "Analyse des besoins, élaboration du référentiel et dispositifs sur mesure",
      icon: "🔧",
    },
    {
      title: "Coaching Professionnel",
      description: "Accompagnement individuel et collectif pour le développement des compétences",
      icon: "🎯",
    },
  ]

  const avantages = [
    "Approche par compétences",
    "Expertise terrain",
    "Réseau d'experts formateurs",
    "Outils pédagogiques innovants",
  ]

  return (
    <div className="accueil-container">
      {/* Hero Section */}
      <section className="hero-section-ifpe">
        <div className="hero-background">
          <img
            src="imge.png"
            alt="Professional training presentation"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <h1 className="hero-main-title">
              Transformer la formation,
              <br />
              révéler le potentiel.
            </h1>

            <div className="hero-buttons-container">
              <Button className="btn-primary-hero">Nous rejoindre</Button>
              <Button className="btn-secondary-hero">Découvrir nos services</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines Section */}
      <section className="domaines-intervention-section">
        <div className="container-fluid">
          <h2 className="section-title-white">Nos Domaines d'intervention</h2>

          <div className="domaines-grid">
            {domaines.map((domaine, index) => (
              <div key={index} className="domaine-card-wrapper">
                <div className="domaine-card-content">
                  <div className="domaine-icon-container">
                    <span className="domaine-icon-emoji">{domaine.icon}</span>
                  </div>
                  <h3 className="domaine-card-title">{domaine.title}</h3>
                  <p className="domaine-card-description">{domaine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Section */}
      <section className="pourquoi-choisir-section">
        <div className="container-fluid">
          <div className="pourquoi-content-grid">
            <div className="pourquoi-text-column">
              <h2 className="pourquoi-section-title">Pourquoi choisir IFPE ?</h2>

              <div className="avantages-list-container">
                {avantages.map((avantage, index) => (
                  <div key={index} className="avantage-item-row">
                    <CheckOutlined className="avantage-check-icon" />
                    <span className="avantage-text">{avantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pourquoi-visual-column">{/* Espace pour contenu visuel si nécessaire */}</div>
          </div>
        </div>
      </section>

      {/* Contact Footer Section */}
      <section className="contact-footer-section">
        <div className="container-fluid">
          <div className="contact-info-grid">
            <div className="contact-item">
              <h3 className="contact-label">Email</h3>
              <p className="contact-value">contact@ifpe.ma</p>
            </div>
            <div className="contact-item">
              <h3 className="contact-label">Tél.</h3>
              <p className="contact-value">+212 5 XX XX XX</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
