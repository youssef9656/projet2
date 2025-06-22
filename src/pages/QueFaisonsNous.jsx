"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Row, Col, Tag, Space, Progress, Timeline, Statistic } from "antd"
import {
  RocketOutlined,
  TeamOutlined,
  ToolOutlined,
  BulbOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  AimOutlined, // Remplacer TargetOutlined par AimOutlined
  BookOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons"
import "./QueFaisonsNous.css"

const { Title, Paragraph, Text } = Typography

export default function QueFaisonsNous() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const activitesPrincipales = [
    {
      id: 1,
      title: "Formation Professionnelle",
      icon: <BookOutlined style={{ fontSize: "40px" }} />,
      color: "#1890ff",
      description: "Conception et mise en œuvre de programmes de formation adaptés aux besoins du marché",
      details: [
        "Analyse des besoins en compétences",
        "Développement de curricula sur mesure",
        "Formation des formateurs",
        "Évaluation et certification",
        "Suivi post-formation",
      ],
      pourcentage: 35,
    },
    {
      id: 2,
      title: "Ingénierie de Formation",
      icon: <ToolOutlined style={{ fontSize: "40px" }} />,
      color: "#52c41a",
      description: "Structuration complète de systèmes de formation professionnelle",
      details: [
        "Études de faisabilité sectorielles",
        "Conception d'offres de formation",
        "Mise en place d'infrastructures",
        "Développement d'outils pédagogiques",
        "Accompagnement institutionnel",
      ],
      pourcentage: 30,
    },
    {
      id: 3,
      title: "Coaching Professionnel",
      icon: <UserOutlined style={{ fontSize: "40px" }} />,
      color: "#fa8c16",
      description: "Accompagnement personnalisé pour le développement des compétences",
      details: [
        "Coaching individuel et collectif",
        "Développement du leadership",
        "Gestion de carrière",
        "Accompagnement au changement",
        "Mentoring professionnel",
      ],
      pourcentage: 20,
    },
    {
      id: 4,
      title: "Conseil Stratégique",
      icon: <BulbOutlined style={{ fontSize: "40px" }} />,
      color: "#722ed1",
      description: "Conseil en stratégie et optimisation organisationnelle",
      details: [
        "Diagnostic organisationnel",
        "Stratégies de développement",
        "Optimisation des processus",
        "Gestion du changement",
        "Accompagnement décisionnel",
      ],
      pourcentage: 15,
    },
  ]

  const methodologie = [
    {
      etape: 1,
      titre: "Analyse & Diagnostic",
      description: "Étude approfondie des besoins et du contexte",
      icone: <AimOutlined />,
      couleur: "#1890ff",
    },
    {
      etape: 2,
      titre: "Conception & Planification",
      description: "Élaboration de solutions sur mesure",
      icone: <BulbOutlined />,
      couleur: "#52c41a",
    },
    {
      etape: 3,
      titre: "Mise en Œuvre",
      description: "Déploiement des solutions avec accompagnement",
      icone: <RocketOutlined />,
      couleur: "#fa8c16",
    },
    {
      etape: 4,
      titre: "Suivi & Évaluation",
      description: "Mesure des résultats et ajustements",
      icone: <TrophyOutlined />,
      couleur: "#722ed1",
    },
  ]

  const secteurs = [
    { nom: "Agriculture & Agro-alimentaire", pourcentage: 25, projets: 45 },
    { nom: "BTP & Infrastructure", pourcentage: 20, projets: 38 },
    { nom: "Services & Commerce", pourcentage: 18, projets: 32 },
    { nom: "Industrie & Artisanat", pourcentage: 15, projets: 28 },
    { nom: "Technologies & Innovation", pourcentage: 12, projets: 22 },
    { nom: "Santé & Social", pourcentage: 10, projets: 18 },
  ]

  const chiffres = [
    { nombre: "500+", label: "Projets réalisés", icone: <AimOutlined /> },
    { nombre: "15+", label: "Pays d'intervention", icone: <GlobalOutlined /> },
    { nombre: "26000+", label: "Bénéficiaires formés", icone: <TeamOutlined /> },
    { nombre: "98%", label: "Taux de satisfaction", icone: <CheckCircleOutlined /> },
  ]

  return (
    <div className="que-faisons-nous-container">
      <div className="que-faisons-nous-content">
        {/* Header Section */}
        <div className={`que-faisons-nous-header ${isVisible ? "fade-in" : ""}`}>
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
            🟪 Que faisons-nous ?
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
            Nos Activités & Expertise
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
            Découvrez en détail nos domaines d'activité, notre méthodologie de travail et les secteurs dans lesquels
            nous excellons pour transformer vos projets en succès.
          </Paragraph>
        </div>

        {/* Activités Principales */}
        <div className={`activites-section ${isVisible ? "fade-in fade-in-delay-1" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Nos Domaines d'Activité
          </Title>
          <Row gutter={[24, 32]}>
            {activitesPrincipales.map((activite, index) => (
              <Col xs={24} lg={12} key={activite.id}>
                <Card className="activite-card" hoverable>
                  <div className="activite-header">
                    <div className="activite-icon" style={{ backgroundColor: activite.color }}>
                      {activite.icon}
                    </div>
                    <div className="activite-title-section">
                      <Title level={4} style={{ marginBottom: "8px", color: "#262626" }}>
                        {activite.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {activite.description}
                      </Text>
                    </div>
                  </div>

                  <div className="activite-progress">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <Text strong style={{ fontSize: "12px" }}>
                        Part d'activité
                      </Text>
                      <Text strong style={{ fontSize: "12px", color: activite.color }}>
                        {activite.pourcentage}%
                      </Text>
                    </div>
                    <Progress
                      percent={activite.pourcentage}
                      strokeColor={activite.color}
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>

                  <div className="activite-details">
                    {activite.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="detail-item">
                        <CheckCircleOutlined style={{ color: activite.color, marginRight: "8px" }} />
                        <Text style={{ fontSize: "13px" }}>{detail}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Méthodologie */}
        <div className={`methodologie-section ${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Notre Méthodologie de Travail
          </Title>
          <Card className="methodologie-card">
            <Timeline
              mode="horizontal"
              items={methodologie.map((etape, index) => ({
                dot: (
                  <div
                    style={{
                      backgroundColor: etape.couleur,
                      color: "white",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    {etape.icone}
                  </div>
                ),
                children: (
                  <div className="methodologie-etape">
                    <Title level={5} style={{ color: etape.couleur, marginBottom: "8px" }}>
                      Étape {etape.etape}: {etape.titre}
                    </Title>
                    <Text style={{ fontSize: "13px", color: "#666" }}>{etape.description}</Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>

        {/* Secteurs d'Intervention */}
        <div className={`secteurs-section ${isVisible ? "fade-in fade-in-delay-3" : ""}`}>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={14}>
              <Title level={2} style={{ marginBottom: "32px", color: "#262626" }}>
                Secteurs d'Intervention
              </Title>
              <div className="secteurs-list">
                {secteurs.map((secteur, index) => (
                  <div key={index} className="secteur-item">
                    <div className="secteur-header">
                      <Text strong style={{ fontSize: "14px" }}>
                        {secteur.nom}
                      </Text>
                      <Space>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {secteur.projets} projets
                        </Text>
                        <Text strong style={{ color: "var(--primary-color)" }}>
                          {secteur.pourcentage}%
                        </Text>
                      </Space>
                    </div>
                    <Progress
                      percent={secteur.pourcentage}
                      strokeColor="var(--primary-color)"
                      showInfo={false}
                      strokeWidth={6}
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <Card className="impact-card">
                <Title level={3} style={{ color: "var(--primary-color)", marginBottom: "24px", textAlign: "center" }}>
                  Notre Impact en Chiffres
                </Title>
                <Row gutter={[16, 24]}>
                  {chiffres.map((chiffre, index) => (
                    <Col xs={12} key={index}>
                      <div className="chiffre-item">
                        <div style={{ color: "var(--primary-color)", fontSize: "24px", marginBottom: "8px" }}>
                          {chiffre.icone}
                        </div>
                        <Statistic
                          value={chiffre.nombre}
                          valueStyle={{
                            color: "var(--primary-color)",
                            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                            fontWeight: "bold",
                          }}
                        />
                        <Text type="secondary" style={{ fontSize: "11px", fontWeight: "500" }}>
                          {chiffre.label}
                        </Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Call to Action */}
        <div className={`cta-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Card className="cta-card">
            <div style={{ textAlign: "center" }}>
              <RocketOutlined style={{ fontSize: "64px", color: "var(--primary-color)", marginBottom: "24px" }} />
              <Title level={2} style={{ color: "var(--primary-color)", marginBottom: "16px" }}>
                Prêt à démarrer votre projet ?
              </Title>
              <Paragraph style={{ fontSize: "16px", marginBottom: "32px", color: "#666" }}>
                Contactez-nous pour discuter de vos besoins et découvrir comment notre expertise peut transformer vos
                objectifs en réalisations concrètes.
              </Paragraph>
              <Space size="large">
                <Card className="cta-mini-card" hoverable>
                  <AimOutlined style={{ fontSize: "24px", color: "var(--primary-color)", marginBottom: "8px" }} />
                  <Text strong style={{ display: "block", fontSize: "12px" }}>
                    Consultation Gratuite
                  </Text>
                  <Text type="secondary" style={{ fontSize: "10px" }}>
                    Analyse de vos besoins
                  </Text>
                </Card>
                <Card className="cta-mini-card" hoverable>
                  <BulbOutlined style={{ fontSize: "24px", color: "var(--primary-color)", marginBottom: "8px" }} />
                  <Text strong style={{ display: "block", fontSize: "12px" }}>
                    Solutions Sur Mesure
                  </Text>
                  <Text type="secondary" style={{ fontSize: "10px" }}>
                    Adaptées à votre contexte
                  </Text>
                </Card>
                <Card className="cta-mini-card" hoverable>
                  <CheckCircleOutlined
                    style={{ fontSize: "24px", color: "var(--primary-color)", marginBottom: "8px" }}
                  />
                  <Text strong style={{ display: "block", fontSize: "12px" }}>
                    Résultats Garantis
                  </Text>
                  <Text type="secondary" style={{ fontSize: "10px" }}>
                    Accompagnement complet
                  </Text>
                </Card>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
