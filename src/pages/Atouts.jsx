"use client"

import { useEffect, useState } from "react"
import { Card, Button, Typography, Row, Col, Tag, Space, Statistic } from "antd"
import {
  AimOutlined,
  TeamOutlined,
  ToolOutlined,
  BulbOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ContactsOutlined,
  RocketOutlined,
  TrophyOutlined,
  StarOutlined,
  FireOutlined,
} from "@ant-design/icons"
import "./Atouts.css"

const { Title, Paragraph, Text } = Typography

export default function Atouts() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const atouts = [
    {
      id: 1,
      title: "Expertise sectorielle multi-pays",
      icon: <AimOutlined style={{ fontSize: "40px" }} />,
      color: "#1890ff",
      description: "Une connaissance approfondie des marchés locaux et internationaux",
      details: [
        "Analyse comparative des systèmes de formation",
        "Adaptation aux contextes socio-économiques locaux",
        "Veille technologique et réglementaire internationale",
        "Benchmarking des meilleures pratiques mondiales",
      ],
    },
    {
      id: 2,
      title: "Équipe expérimentée",
      subtitle: "formateurs, consultants, gestionnaires",
      icon: <TeamOutlined style={{ fontSize: "40px" }} />,
      color: "#fa8c16",
      description: "Des professionnels qualifiés avec une expertise reconnue",
      details: [
        "Formateurs certifiés avec 10+ ans d'expérience",
        "Consultants spécialisés par secteur d'activité",
        "Gestionnaires de projet aguerris",
        "Équipe pluridisciplinaire et multiculturelle",
      ],
    },
    {
      id: 3,
      title: "Solutions clés en main",
      icon: <ToolOutlined style={{ fontSize: "40px" }} />,
      color: "#52c41a",
      description: "Des solutions complètes de A à Z pour vos projets",
      details: [
        "Conception et mise en œuvre intégrées",
        "Accompagnement personnalisé à chaque étape",
        "Outils et ressources pédagogiques inclus",
        "Support technique et maintenance assurés",
      ],
    },
    {
      id: 4,
      title: "Approche innovante et flexible",
      icon: <BulbOutlined style={{ fontSize: "40px" }} />,
      color: "#722ed1",
      description: "Innovation pédagogique et adaptation aux besoins évolutifs",
      details: [
        "Méthodologies pédagogiques modernes",
        "Technologies éducatives de pointe",
        "Personnalisation selon vos contraintes",
        "Évolution continue des programmes",
      ],
    },
    {
      id: 5,
      title: "Réseau national et international",
      icon: <GlobalOutlined style={{ fontSize: "40px" }} />,
      color: "#13c2c2",
      description: "Un réseau étendu de partenaires et collaborateurs",
      details: [
        "Partenariats avec institutions académiques",
        "Réseau d'experts internationaux",
        "Collaborations gouvernementales",
        "Alliances stratégiques sectorielles",
      ],
    },
    {
      id: 6,
      title: "Projets réalisés avec succès",
      subtitle: "institutions locales et internationales",
      icon: <CheckCircleOutlined style={{ fontSize: "40px" }} />,
      color: "#f5222d",
      description: "Un track record prouvé avec des références solides",
      details: [
        "Collaborations avec organismes publics",
        "Partenariats avec entreprises privées",
        "Projets financés par bailleurs internationaux",
        "Certifications et accréditations obtenues",
      ],
    },
  ]

  const stats = [
    { number: "15+", label: "Pays d'intervention", icon: <GlobalOutlined /> },
    { number: "200+", label: "Experts mobilisés", icon: <TeamOutlined /> },
    { number: "50+", label: "Partenaires actifs", icon: <FireOutlined /> },
    { number: "98%", label: "Taux de réussite", icon: <TrophyOutlined /> },
  ]

  const certifications = [
    {
      title: "Certifications Qualité",
      description: "Standards internationaux respectés",
      icon: <StarOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
    {
      title: "Accréditations",
      description: "Reconnaissance officielle des compétences",
      icon: <TrophyOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
    {
      title: "Partenariats Stratégiques",
      description: "Alliances avec leaders du secteur",
      icon: <GlobalOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
  ]

  return (
    <div className="atouts-container">
      <div className="atouts-content">
        {/* Header Section */}
        <div className={`atouts-header ${isVisible ? "fade-in" : ""}`}>
        

          <Title
            level={1}
            className="gradient-text floating-animation"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            Nos Forces & Avantages
          </Title>

          <Paragraph
            style={{
              fontSize: "18px",
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Découvrez les atouts qui font de nous votre partenaire de choix pour tous vos projets de formation et de
            développement professionnel.
          </Paragraph>
        </div>

        {/* Atouts Grid */}
        <Row gutter={[24, 24]} style={{ marginBottom: "64px" }}>
          {atouts.map((atout, index) => (
            <Col xs={24} lg={12} key={atout.id}>
              <Card
                className={`atout-card ${isVisible ? `fade-in fade-in-delay-${(index % 4) + 1}` : ""}`}
                hoverable
                style={{ height: "100%" }}
              >
                <div className="atout-header">
                  <div className="icon-container" style={{ backgroundColor: atout.color, color: "white" }}>
                    {atout.icon}
                  </div>
                  <div className="atout-title-section">
                    <Title level={4} style={{ marginBottom: "4px", color: "#262626" }}>
                      {atout.title}
                    </Title>
                    {atout.subtitle && (
                      <Text type="secondary" style={{ fontSize: "12px", fontStyle: "italic" }}>
                        {atout.subtitle}
                      </Text>
                    )}
                    <Paragraph style={{ fontSize: "14px", color: "#666", marginTop: "8px", marginBottom: "0" }}>
                      {atout.description}
                    </Paragraph>
                  </div>
                </div>

                <div className="atout-details">
                  {atout.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="detail-item">
                      <Space align="start">
                        <CheckCircleOutlined style={{ color: atout.color, marginTop: "2px", fontSize: "14px" }} />
                        <Text style={{ fontSize: "13px", lineHeight: "1.4" }}>{detail}</Text>
                      </Space>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats Section */}
        <Row
          gutter={[24, 24]}
          className={`${isVisible ? "fade-in fade-in-delay-4" : ""}`}
          style={{ marginBottom: "64px" }}
        >
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className="stat-card">
                <div style={{ color: "#1890ff", fontSize: "24px", marginBottom: "8px" }}>{stat.icon}</div>
                <Statistic
                  value={stat.number}
                  valueStyle={{
                    color: "#1890ff",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: "bold",
                  }}
                />
                <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500" }}>
                  {stat.label}
                </Text>
              </div>
            </Col>
          ))}
        </Row>

        {/* Certifications Section */}
        <div className={`${isVisible ? "fade-in fade-in-delay-4" : ""}`} style={{ marginBottom: "64px" }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Reconnaissance & Certifications
          </Title>
          <Row gutter={[24, 24]}>
            {certifications.map((cert, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="certification-card">
                  <div style={{ marginBottom: "16px" }}>{cert.icon}</div>
                  <Title level={5} style={{ marginBottom: "12px", color: "#262626" }}>
                    {cert.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    {cert.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Call to Action Section */}
        <div className={`cta-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <RocketOutlined style={{ fontSize: "64px", marginBottom: "24px" }} className="pulse-animation" />
          <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
            Prêt à bénéficier de notre expertise ?
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", marginBottom: "32px" }}>
            Faites confiance à notre équipe d'experts pour mener à bien vos projets de formation et de développement.
            Contactez-nous pour découvrir comment nos atouts peuvent servir vos objectifs.
          </Paragraph>
          <Space size="large" wrap>
        <Button
              type="primary"
              size="large"
              style={{
                background: "white",
                borderColor: "white",
                color: "#0056b3",
                fontWeight: "bold",
                height: "48px",
                padding: "0 32px",
              }}
              icon={<ContactsOutlined />}
            >
                  <a href="/contact">Nous contacter</a>
              
            </Button>
            <Button
              size="large"
              style={{
                borderColor: "white",
                color: "#0056b3",
                fontWeight: "bold",
                height: "48px",
                padding: "0 32px",
              }}
              icon={<ArrowRightOutlined />}
            >
              <a href="/Realisations"  >Voir nos réalisations</a>
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
