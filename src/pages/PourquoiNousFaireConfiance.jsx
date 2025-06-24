"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Row, Col, Tag, Rate, Avatar, Progress, Statistic } from "antd"
import {
  SafetyOutlined, // Remplacer ShieldCheckOutlined par SafetyOutlined
  TrophyOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  StarOutlined,
  CrownOutlined,
  FireOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  RocketOutlined,
} from "@ant-design/icons"
import "./PourquoiNousFaireConfiance.css"

const { Title, Paragraph, Text } = Typography

export default function PourquoiNousFaireConfiance() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const garanties = [
    {
      id: 1,
      title: "Expertise Reconnue",
      icon: <TrophyOutlined style={{ fontSize: "40px" }} />,
      color: "#1890ff",
      description: "Plus de 30 ans d'expérience dans la formation professionnelle",
      points: [
        "Équipe de 200+ experts qualifiés",
        "Certifications internationales",
        "Reconnaissance officielle des autorités",
        "Partenariats avec institutions prestigieuses",
      ],
    },
    {
      id: 2,
      title: "Résultats Prouvés",
      icon: <CheckCircleOutlined style={{ fontSize: "40px" }} />,
      color: "#52c41a",
      description: "Un track record exceptionnel avec 98% de satisfaction client",
      points: [
        "500+ projets réalisés avec succès",
        "26000+ bénéficiaires formés",
        "95% de taux d'insertion professionnelle",
        "Retour sur investissement démontré",
      ],
    },
    {
      id: 3,
      title: "Approche Personnalisée",
      icon: <HeartOutlined style={{ fontSize: "40px" }} />,
      color: "#fa8c16",
      description: "Solutions sur mesure adaptées à vos besoins spécifiques",
      points: [
        "Analyse approfondie de vos besoins",
        "Solutions 100% personnalisées",
        "Accompagnement dédié",
        "Flexibilité et adaptation continue",
      ],
    },
    {
      id: 4,
      title: "Innovation Continue",
      icon: <RocketOutlined style={{ fontSize: "40px" }} />,
      color: "#722ed1",
      description: "Technologies et méthodologies de pointe",
      points: [
        "Veille technologique permanente",
        "Méthodes pédagogiques innovantes",
        "Outils digitaux avancés",
        "Recherche et développement continus",
      ],
    },
  ]

  const temoignages = [
    {
      id: 1,
      nom: "Dr. Amadou DIALLO",
      poste: "Directeur Général, Ministère de la Formation",
      pays: "Sénégal",
      avatar: "AD",
      note: 5,
      commentaire:
        "IFPE a transformé notre système de formation professionnelle. Leur expertise et leur accompagnement ont été exceptionnels. Les résultats dépassent nos attentes.",
      projet: "Réforme du système de formation professionnelle",
    },
    {
      id: 2,
      nom: "Marie KOUASSI",
      poste: "DRH, Groupe Industriel SABC",
      pays: "Côte d'Ivoire",
      avatar: "MK",
      note: 5,
      commentaire:
        "Grâce à IFPE, nous avons pu former 500+ employés avec des résultats remarquables. Leur approche personnalisée fait toute la différence.",
      projet: "Programme de formation continue",
    },
    {
      id: 3,
      nom: "Ibrahim HASSAN",
      poste: "Coordinateur Projets, ONG DEVELOP",
      pays: "Mali",
      avatar: "IH",
      note: 5,
      commentaire:
        "Partenaire de confiance depuis 5 ans. IFPE allie professionnalisme et résultats concrets. Je recommande vivement leurs services.",
      projet: "Formation des jeunes entrepreneurs",
    },
  ]

  const certifications = [
    {
      nom: "ISO 9001:2015",
      description: "Système de management de la qualité",
      couleur: "#1890ff",
      pourcentage: 100,
    },
    {
      nom: "Certification AFNOR",
      description: "Organisme de formation certifié",
      couleur: "#52c41a",
      pourcentage: 100,
    },
    {
      nom: "Accréditation Gouvernementale",
      description: "Reconnaissance officielle multi-pays",
      couleur: "#fa8c16",
      pourcentage: 100,
    },
    {
      nom: "Partenaire UNESCO",
      description: "Collaboration institutionnelle",
      couleur: "#722ed1",
      pourcentage: 100,
    },
  ]

  const avantagesConcurrentiels = [
    {
      titre: "Réactivité Exceptionnelle",
      description: "Réponse sous 24h, démarrage rapide des projets",
      icone: <ThunderboltOutlined />,
      couleur: "#1890ff",
    },
    {
      titre: "Réseau International",
      description: "Présence dans 15+ pays, expertise multiculturelle",
      icone: <GlobalOutlined />,
      couleur: "#52c41a",
    },
    {
      titre: "Garantie Résultats",
      description: "Engagement sur les objectifs, suivi post-formation",
      icone: <SafetyOutlined />,
      couleur: "#fa8c16",
    },
    {
      titre: "Innovation Pédagogique",
      description: "Méthodes modernes, technologies de pointe",
      icone: <FireOutlined />,
      couleur: "#722ed1",
    },
  ]

  const statistiques = [
    { nombre: "98%", label: "Taux de satisfaction", icone: <StarOutlined />, couleur: "#1890ff" },
    { nombre: "95%", label: "Taux d'insertion", icone: <CheckCircleOutlined />, couleur: "#52c41a" },
    { nombre: "30+", label: "Années d'expérience", icone: <CrownOutlined />, couleur: "#fa8c16" },
    { nombre: "15+", label: "Pays d'intervention", icone: <GlobalOutlined />, couleur: "#722ed1" },
  ]

  return (
    <div className="pourquoi-confiance-container">
      <div className="pourquoi-confiance-content">
        {/* Header Section */}
        <div className={`pourquoi-confiance-header ${isVisible ? "fade-in" : ""}`}>
     

          <Title
            level={1}
            className="gradient-text floating-animation"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            Votre Partenaire de Confiance
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
            Découvrez pourquoi des centaines d'organisations nous font confiance pour leurs projets de formation et de
            développement professionnel à travers le monde.
          </Paragraph>
        </div>

        {/* Statistiques Clés */}
        <div className={`stats-section ${isVisible ? "fade-in fade-in-delay-1" : ""}`}>
          <Row gutter={[24, 24]} style={{ marginBottom: "64px" }}>
            {statistiques.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <Card className="stat-card" hoverable>
                  <div style={{ color: stat.couleur, fontSize: "32px", marginBottom: "12px", textAlign: "center" }}>
                    {stat.icone}
                  </div>
                  <Statistic
                    value={stat.nombre}
                    valueStyle={{
                      color: stat.couleur,
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
        </div>

        {/* Garanties */}
        <div className={`garanties-section ${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            <SafetyOutlined style={{ marginRight: "12px", color: "var(--primary-color)" }} />
            Nos Garanties de Qualité
          </Title>
          <Row gutter={[24, 32]}>
            {garanties.map((garantie, index) => (
              <Col xs={24} lg={12} key={garantie.id}>
                <Card className="garantie-card" hoverable>
                  <div className="garantie-header">
                    <div className="garantie-icon" style={{ backgroundColor: garantie.color }}>
                      {garantie.icon}
                    </div>
                    <div className="garantie-title-section">
                      <Title level={4} style={{ marginBottom: "8px", color: "#262626" }}>
                        {garantie.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {garantie.description}
                      </Text>
                    </div>
                  </div>

                  <div className="garantie-points">
                    {garantie.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="point-item">
                        <CheckCircleOutlined style={{ color: garantie.color, marginRight: "8px" }} />
                        <Text style={{ fontSize: "13px" }}>{point}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Témoignages */}
        <div className={`temoignages-section ${isVisible ? "fade-in fade-in-delay-3" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Ce que disent nos clients
          </Title>
          <Row gutter={[24, 24]}>
            {temoignages.map((temoignage, index) => (
              <Col xs={24} lg={8} key={temoignage.id}>
                <Card className="temoignage-card" hoverable>
                  <div className="temoignage-header">
                    <Avatar
                      size={48}
                      style={{ backgroundColor: "var(--primary-color)", fontSize: "18px", fontWeight: "bold" }}
                    >
                      {temoignage.avatar}
                    </Avatar>
                    <div className="temoignage-info">
                      <Text strong style={{ fontSize: "14px", display: "block" }}>
                        {temoignage.nom}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                        {temoignage.poste}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "11px" }}>
                        📍 {temoignage.pays}
                      </Text>
                    </div>
                  </div>

                  <div className="temoignage-rating">
                    <Rate disabled defaultValue={temoignage.note} style={{ fontSize: "16px" }} />
                  </div>

                  <div className="temoignage-commentaire">
                    <Text style={{ fontSize: "13px", lineHeight: "1.5", fontStyle: "italic" }}>
                      "{temoignage.commentaire}"
                    </Text>
                  </div>

                  <div className="temoignage-projet">
                    <Tag color="blue" style={{ fontSize: "10px" }}>
                      {temoignage.projet}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Certifications */}
        <div className={`certifications-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Title level={2} style={{ marginBottom: "32px", color: "#262626" }}>
                Certifications & Accréditations
              </Title>
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <div className="certification-header">
                      <Text strong style={{ fontSize: "14px" }}>
                        {cert.nom}
                      </Text>
                      <Text strong style={{ color: cert.couleur }}>
                        ✓ Certifié
                      </Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: "12px", display: "block", marginBottom: "8px" }}>
                      {cert.description}
                    </Text>
                    <Progress percent={cert.pourcentage} strokeColor={cert.couleur} showInfo={false} strokeWidth={6} />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={2} style={{ marginBottom: "32px", color: "#262626" }}>
                Avantages Concurrentiels
              </Title>
              <div className="avantages-list">
                {avantagesConcurrentiels.map((avantage, index) => (
                  <Card key={index} className="avantage-card" hoverable>
                    <div className="avantage-content">
                      <div style={{ color: avantage.couleur, fontSize: "24px", marginRight: "16px" }}>
                        {avantage.icone}
                      </div>
                      <div>
                        <Text strong style={{ fontSize: "14px", display: "block", marginBottom: "4px" }}>
                          {avantage.titre}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {avantage.description}
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
