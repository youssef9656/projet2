"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Row, Col, Tag, Space } from "antd"
import {
  TeamOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  StarOutlined,
  TrophyOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import "./QuiSommesNous.css"

const { Title, Paragraph, Text } = Typography

export default function QuiSommesNous() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: "30+", label: "Années d'expérience", icon: <StarOutlined /> },
    { number: "1000+", label: "Stagiaires formés", icon: <TeamOutlined /> },
    { number: "50+", label: "Entreprises accompagnées", icon: <TrophyOutlined /> },
    { number: "15+", label: "Pays d'intervention", icon: <GlobalOutlined /> },
  ]

  return (
    <div className="qui-sommes-nous-container">
      <div className="qui-sommes-nous-content">
        {/* Header Section */}
        <div className={`qui-sommes-nous-header ${isVisible ? "fade-in" : ""}`}>
          <Tag
            color="purple"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginBottom: "24px",
              borderRadius: "20px",
            }}
            className="bounce-in"
          >
            🟪 Qui sommes-nous ?
          </Tag>

          <Title
            level={1}
            className="gradient-text floating-animation"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            Notre Équipe d'Experts
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
            Une équipe passionnée et expérimentée qui met son expertise au service de votre développement professionnel
            et de vos projets de formation.
          </Paragraph>
        </div>

        {/* Équipe Section */}
        <div className={`${isVisible ? "fade-in fade-in-delay-1" : ""}`} style={{ marginBottom: "64px" }}>
          <Row gutter={[32, 32]}>
            {/* Consultant Principal */}
            <Col xs={24} lg={12}>
              <Card className="team-card founder-card" hoverable>
                <div className="team-header">
                  <div className="avatar-container founder-avatar">
                    <CrownOutlined style={{ fontSize: "48px", color: "white" }} />
                  </div>
                  <div className="team-info">
                    <Title level={3} style={{ marginBottom: "4px", color: "#262626" }}>
                      [Nom du consultant principal]
                    </Title>
                    <Text strong style={{ color: "var(--primary-color)", fontSize: "16px" }}>
                      Fondateur & Directeur
                    </Text>
                    <div style={{ marginTop: "8px" }}>
                      <Tag color="gold" style={{ marginRight: "8px" }}>
                        30+ ans d'expérience
                      </Tag>
                      <Tag color="blue">Spécialiste Formation & Conseil</Tag>
                    </div>
                  </div>
                </div>

                <div className="achievements">
                  <Title level={5} style={{ marginBottom: "16px", color: "#262626" }}>
                    Expertise & Réalisations :
                  </Title>
                  {[
                    "Encadrement de milliers de stagiaires et formateurs",
                    "Études de faisabilité, accompagnement de centres de formation",
                    "Appui organisationnel à des dizaines d'entreprises",
                    "Partenaire d'acteurs nationaux et internationaux",
                  ].map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <Space align="start">
                        <CheckCircleOutlined style={{ color: "var(--accent-color)", marginTop: "2px" }} />
                        <Text style={{ fontSize: "14px", lineHeight: "1.5" }}>{achievement}</Text>
                      </Space>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Équipe Dirigeante */}
            <Col xs={24} lg={12}>
              <Card className="team-card leadership-card" hoverable>
                <div className="team-header">
                  <div className="avatar-container leadership-avatar">
                    <TeamOutlined style={{ fontSize: "48px", color: "white" }} />
                  </div>
                  <div className="team-info">
                    <Title level={3} style={{ marginBottom: "4px", color: "#262626" }}>
                      [Votre nom] & [Bakari]
                    </Title>
                    <Text strong style={{ color: "var(--accent-color)", fontSize: "16px" }}>
                      Équipe dirigeante
                    </Text>
                    <div style={{ marginTop: "8px" }}>
                      <Tag color="cyan">Experts complémentaires</Tag>
                    </div>
                  </div>
                </div>

                <div className="team-description">
                  <Paragraph style={{ fontSize: "15px", lineHeight: "1.6", color: "#666", marginTop: "20px" }}>
                    Duo d'experts complémentaires pour couvrir toutes les dimensions : formation, insertion,
                    structuration, innovation.
                  </Paragraph>

                  <div className="expertise-areas">
                    <Title level={5} style={{ marginBottom: "12px", color: "#262626" }}>
                      Domaines d'expertise :
                    </Title>
                    <Row gutter={[8, 8]}>
                      <Col span={12}>
                        <Tag color="blue">Formation</Tag>
                      </Col>
                      <Col span={12}>
                        <Tag color="green">Insertion</Tag>
                      </Col>
                      <Col span={12}>
                        <Tag color="purple">Structuration</Tag>
                      </Col>
                      <Col span={12}>
                        <Tag color="orange">Innovation</Tag>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Vision & Mission */}
        <div className={`vision-mission-section ${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card className="vision-card" hoverable>
                <Title level={3} style={{ color: "var(--primary-color)", marginBottom: "16px" }}>
                  Notre Vision
                </Title>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
                  Être le partenaire de référence pour le développement des compétences et l'insertion professionnelle,
                  en offrant des solutions innovantes et adaptées aux besoins du marché du travail.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className="mission-card" hoverable>
                <Title level={3} style={{ color: "var(--accent-color)", marginBottom: "16px" }}>
                  Notre Mission
                </Title>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
                  Accompagner les individus et les organisations dans leur développement professionnel à travers des
                  formations de qualité, des conseils stratégiques et des solutions sur mesure.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <Row
          gutter={[24, 24]}
          className={`stats-section ${isVisible ? "fade-in fade-in-delay-3" : ""}`}
          style={{ marginTop: "64px" }}
        >
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className="stat-card">
                <div style={{ color: "var(--primary-color)", fontSize: "24px", marginBottom: "8px" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  {stat.number}
                </div>
                <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500" }}>
                  {stat.label}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
