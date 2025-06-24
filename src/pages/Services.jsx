"use client"

import { useEffect, useState } from "react"
import { Card, Button, Typography, Row, Col, Space, Statistic, Grid } from "antd"
import {
  BookOutlined,
  TeamOutlined,
  BuildOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  AimOutlined,
  TrophyOutlined,
  StarOutlined,
} from "@ant-design/icons"
import "./Services.css"
const { Title, Paragraph, Text } = Typography
const { useBreakpoint } = Grid

export default function Services() {
  const [isMounted, setIsMounted] = useState(false)
  const { md, lg } = useBreakpoint()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const servicesData = [
    {
      id: 1,
      title: "Développement de systèmes de formation professionnelle",
      icon: <BookOutlined />,
      color: "#1890ff",
      description: "Solutions complètes pour créer et optimiser vos systèmes de formation",
      features: [
        "Études sectorielles et de faisabilité",
        "Détection des besoins du marché du travail",
        "Conception d'offres de formation adaptées",
        "Mise en place de centres de formation clés en main",
        "Formation axée sur l'insertion rapide",
      ],
    },
    {
      id: 2,
      title: "Insertion professionnelle et emploi",
      icon: <TeamOutlined />,
      color: "#fa8c16",
      description: "Accompagnement vers l'emploi et réduction du chômage",
      features: [
        "Programmes d'intégration des lauréats",
        "Réduction du chômage par des stratégies ciblées",
        "Partenariats entreprises-institutions",
      ],
    },
    {
      id: 3,
      title: "Conseil en structuration d'entreprise",
      icon: <BuildOutlined />,
      color: "#52c41a",
      description: "Optimisation organisationnelle et amélioration des performances",
      features: [
        "Diagnostic organisationnel",
        "Restructuration et amélioration des performances",
        "Mise en place de processus efficaces",
      ],
    },
    {
      id: 4,
      title: "Formation selon l'Approche par Compétences (APC)",
      icon: <ReadOutlined />,
      color: "#722ed1",
      description: "Méthodologie moderne centrée sur les compétences pratiques",
      features: [
        "Conception et évaluation de formations APC",
        "Élaboration de référentiels métiers et compétences",
        "Accompagnement des formateurs et des institutions",
      ],
    },
  ]

  const statsData = [
    { value: "500+", label: "Projets réalisés", icon: <AimOutlined /> },
    { value: "50+", label: "Entreprises accompagnées", icon: <BuildOutlined /> },
    { value: "15+", label: "Années d'expérience", icon: <BookOutlined /> },
    { value: "95%", label: "Taux de satisfaction", icon: <StarOutlined /> },
  ]

  const advantagesData = [
    {
      title: "Expertise Reconnue",
      description: "Plus de 15 ans d'expérience dans le développement professionnel",
      icon: <TrophyOutlined />,
    },
    {
      title: "Approche Personnalisée",
      description: "Solutions sur mesure adaptées à vos besoins spécifiques",
      icon: <AimOutlined />,
    },
    {
      title: "Résultats Garantis",
      description: "Accompagnement jusqu'à l'atteinte de vos objectifs",
      icon: <CheckCircleOutlined />,
    },
  ]

  const fadeInClass = (index) => 
    isMounted ? `fade-in fade-in-delay-${Math.min(index + 1, 4)}` : ""

  return (
    <main className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            Solutions Professionnelles <span className="highlight">Sur Mesure</span>
          </Title>
          <Paragraph className="hero-description">
            Nous transformons votre vision en réalité avec une expertise sectorielle
            et des méthodologies éprouvées.
          </Paragraph>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <Title level={2} className="section-title">
            Nos Domaines d'Expertise
          </Title>
          
          <Row gutter={[24, 24]} className="services-grid">
            {servicesData.map((service, index) => (
              <Col xs={24} lg={12} key={service.id}>
                <Card 
                  className={`service-card ${fadeInClass(index)}`}
                  hoverable
                >
                  <div className="service-header">
                    <div 
                      className="service-icon"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.icon}
                    </div>
                    <div className="service-title-wrapper">
                      <Title level={4} className="service-title">
                        {service.title}
                      </Title>
                      <Text className="service-description">
                        {service.description}
                      </Text>
                    </div>
                  </div>

                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i} className="feature-item">
                        <CheckCircleOutlined className="feature-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <Row gutter={[24, 24]} className="stats-grid">
            {statsData.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div className={`stat-card ${fadeInClass(index)}`}>
                  <div className="stat-icon">{stat.icon}</div>
                  <Statistic
                    value={stat.value}
                    className="stat-value"
                  />
                  <Text className="stat-label">{stat.label}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <div className="section-container">
          <Title level={2} className="section-title">
            Notre Valeur Ajoutée
          </Title>
          
          <Row gutter={[24, 24]} className="advantages-grid">
            {advantagesData.map((advantage, index) => (
              <Col xs={24} md={8} key={index}>
                <div className={`advantage-card ${fadeInClass(index)}`}>
                  <div className="advantage-icon">{advantage.icon}</div>
                  <Title level={4} className="advantage-title">
                    {advantage.title}
                  </Title>
                  <Paragraph className="advantage-description">
                    {advantage.description}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`cta-section ${isMounted ? "fade-in" : ""}`}>
        <div className="section-container">
          <div className="cta-content">
            <Title level={3} className="cta-title">
              Prêt à transformer votre organisation ?
            </Title>
            <Paragraph className="cta-text">
              Contactez-nous pour une consultation gratuite et sans engagement.
            </Paragraph>
            <Button 
              type="primary" 
              size="large"
              className="cta-button"
              icon={<ArrowRightOutlined />}
            >
              Demander un devis
            </Button>
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx global>{`
        
      `}</style>
    </main>
  )
}