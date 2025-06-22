"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Row, Col, Tag, Progress, Statistic } from "antd"
import {
  GlobalOutlined,
  RocketOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  StarOutlined,
  FireOutlined,
  AimOutlined,
} from "@ant-design/icons"
import "./Realisations.css"

const { Title, Paragraph, Text } = Typography

export default function Realisations() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const realisations = [
    {
      id: 1,
      title: "Création de systèmes de formation professionnelle",
      description: "Développement complet de systèmes de formation dans plusieurs pays africains",
      icon: <GlobalOutlined style={{ fontSize: "40px" }} />,
      color: "var(--primary-color)",
      details: [
        "Analyse des besoins sectoriels par pays",
        "Conception de curricula adaptés",
        "Formation des formateurs locaux",
        "Mise en place d'infrastructures",
        "Suivi et évaluation des programmes",
      ],
      stats: { projets: 12, pays: 8, beneficiaires: "5000+" },
    },
    {
      id: 2,
      title: "Lancement de la formation alternée",
      description: "Déploiement à grande échelle de programmes de formation en alternance",
      icon: <RocketOutlined style={{ fontSize: "40px" }} />,
      color: "#52c41a",
      details: [
        "Partenariats entreprises-centres de formation",
        "Développement de modules pratiques",
        "Accompagnement des apprentis",
        "Certification des compétences",
        "Insertion professionnelle garantie",
      ],
      stats: { projets: 8, pays: 5, beneficiaires: "3000+" },
    },
    {
      id: 3,
      title: "Collaboration gouvernementale",
      description: "Partenariats stratégiques avec gouvernements et ONG pour l'emploi des jeunes",
      icon: <TeamOutlined style={{ fontSize: "40px" }} />,
      color: "#fa8c16",
      details: [
        "Politiques publiques d'emploi jeunes",
        "Programmes nationaux de formation",
        "Coordination multi-acteurs",
        "Financement de projets d'envergure",
        "Impact social mesurable",
      ],
      stats: { projets: 15, pays: 10, beneficiaires: "8000+" },
    },
    {
      id: 4,
      title: "Formation de milliers de professionnels",
      description: "Accompagnement d'entreprises et formation continue de professionnels",
      icon: <TrophyOutlined style={{ fontSize: "40px" }} />,
      color: "#722ed1",
      details: [
        "Formations sur mesure en entreprise",
        "Développement des compétences managériales",
        "Certification professionnelle",
        "Coaching et mentoring",
        "Amélioration des performances",
      ],
      stats: { projets: 25, pays: 12, beneficiaires: "10000+" },
    },
  ]

  const globalStats = [
    { number: "60+", label: "Projets réalisés", icon: <AimOutlined />, color: "var(--primary-color)" },
    { number: "35+", label: "Pays d'intervention", icon: <GlobalOutlined />, color: "#52c41a" },
    { number: "26000+", label: "Bénéficiaires formés", icon: <TeamOutlined />, color: "#fa8c16" },
    { number: "98%", label: "Taux de réussite", icon: <StarOutlined />, color: "#722ed1" },
  ]

  const secteurs = [
    { nom: "Agriculture & Agro-alimentaire", pourcentage: 25, color: "#52c41a" },
    { nom: "BTP & Infrastructure", pourcentage: 20, color: "var(--primary-color)" },
    { nom: "Services & Commerce", pourcentage: 18, color: "#fa8c16" },
    { nom: "Industrie & Artisanat", pourcentage: 15, color: "#722ed1" },
    { nom: "Technologies & Innovation", pourcentage: 12, color: "#13c2c2" },
    { nom: "Santé & Social", pourcentage: 10, color: "#f5222d" },
  ]

  return (
    <div className="realisations-container">
      <div className="realisations-content">
        {/* Header Section */}
        <div className={`realisations-header ${isVisible ? "fade-in" : ""}`}>
          <Tag
            color="volcano"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginBottom: "24px",
              borderRadius: "20px",
            }}
            className="bounce-in"
          >
            🟧 Réalisations & Projets Clés
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
            Nos Succès & Réalisations
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
            Découvrez nos projets phares et l'impact concret de notre expertise sur le développement professionnel à
            travers le monde.
          </Paragraph>
        </div>

        {/* Global Stats */}
        <Row
          gutter={[24, 24]}
          className={`global-stats ${isVisible ? "fade-in fade-in-delay-1" : ""}`}
          style={{ marginBottom: "64px" }}
        >
          {globalStats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <Card className="global-stat-card" hoverable>
                <div style={{ color: stat.color, fontSize: "32px", marginBottom: "12px", textAlign: "center" }}>
                  {stat.icon}
                </div>
                <Statistic
                  value={stat.number}
                  valueStyle={{
                    color: stat.color,
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
                <Text
                  type="secondary"
                  style={{ fontSize: "13px", fontWeight: "500", display: "block", textAlign: "center" }}
                >
                  {stat.label}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Réalisations principales */}
        <div className={`${isVisible ? "fade-in fade-in-delay-2" : ""}`} style={{ marginBottom: "64px" }}>
          <Row gutter={[24, 32]}>
            {realisations.map((realisation, index) => (
              <Col xs={24} lg={12} key={realisation.id}>
                <Card className={`realisation-card ${isVisible ? `fade-in fade-in-delay-${index + 3}` : ""}`} hoverable>
                  <div className="realisation-header">
                    <div className="realisation-icon" style={{ backgroundColor: realisation.color }}>
                      {realisation.icon}
                    </div>
                    <div className="realisation-title-section">
                      <Title level={4} style={{ marginBottom: "8px", color: "#262626" }}>
                        {realisation.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {realisation.description}
                      </Text>
                    </div>
                  </div>

                  <div className="realisation-details">
                    {realisation.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="detail-item">
                        <CheckCircleOutlined style={{ color: realisation.color, marginRight: "8px" }} />
                        <Text style={{ fontSize: "13px" }}>{detail}</Text>
                      </div>
                    ))}
                  </div>

                  <div className="realisation-stats">
                    <Row gutter={[16, 8]}>
                      <Col span={8}>
                        <Statistic
                          title="Projets"
                          value={realisation.stats.projets}
                          valueStyle={{ fontSize: "18px", color: realisation.color }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Pays"
                          value={realisation.stats.pays}
                          valueStyle={{ fontSize: "18px", color: realisation.color }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Bénéficiaires"
                          value={realisation.stats.beneficiaires}
                          valueStyle={{ fontSize: "18px", color: realisation.color }}
                        />
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Secteurs d'intervention */}
        <div className={`secteurs-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Secteurs d'Intervention
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card className="secteurs-card" title="Répartition par secteur">
                {secteurs.map((secteur, index) => (
                  <div key={index} className="secteur-item">
                    <div className="secteur-header">
                      <Text strong>{secteur.nom}</Text>
                      <Text type="secondary">{secteur.pourcentage}%</Text>
                    </div>
                    <Progress
                      percent={secteur.pourcentage}
                      strokeColor={secteur.color}
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>
                ))}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="impact-card" title="Impact & Reconnaissance">
                <div className="impact-items">
                  <div className="impact-item">
                    <FireOutlined style={{ color: "#f5222d", fontSize: "24px" }} />
                    <div>
                      <Text strong>Certifications Qualité</Text>
                      <br />
                      <Text type="secondary">Standards internationaux respectés</Text>
                    </div>
                  </div>
                  <div className="impact-item">
                    <TrophyOutlined style={{ color: "#fa8c16", fontSize: "24px" }} />
                    <div>
                      <Text strong>Prix & Distinctions</Text>
                      <br />
                      <Text type="secondary">Reconnaissance de l'excellence</Text>
                    </div>
                  </div>
                  <div className="impact-item">
                    <GlobalOutlined style={{ color: "var(--primary-color)", fontSize: "24px" }} />
                    <div>
                      <Text strong>Partenariats Stratégiques</Text>
                      <br />
                      <Text type="secondary">Alliances avec leaders du secteur</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
