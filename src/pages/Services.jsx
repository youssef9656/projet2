"use client"

import { useEffect, useState } from "react"
import { Card, Button, Typography, Row, Col, Tag, Space, Statistic } from "antd"
import {
  BookOutlined,
  TeamOutlined,
  BuildOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  AimOutlined,
  ContactsOutlined,
  TrophyOutlined,
  StarOutlined,
  RocketOutlined,
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const services = [
    {
      id: 1,
      title: "Développement de systèmes de formation professionnelle",
      icon: <BookOutlined style={{ fontSize: "32px" }} />,
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
      icon: <TeamOutlined style={{ fontSize: "32px" }} />,
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
      icon: <BuildOutlined style={{ fontSize: "32px" }} />,
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
      icon: <ReadOutlined style={{ fontSize: "32px" }} />,
      color: "#722ed1",
      description: "Méthodologie moderne centrée sur les compétences pratiques",
      features: [
        "Conception et évaluation de formations APC",
        "Élaboration de référentiels métiers et compétences",
        "Accompagnement des formateurs et des institutions",
      ],
    },
  ]

  const stats = [
    { number: "500+", label: "Projets réalisés", icon: <AimOutlined /> },
    { number: "50+", label: "Entreprises accompagnées", icon: <BuildOutlined /> },
    { number: "15+", label: "Années d'expérience", icon: <BookOutlined /> },
    { number: "95%", label: "Taux de satisfaction", icon: <StarOutlined /> },
  ]

  const advantages = [
    {
      title: "Expertise Reconnue",
      description: "Plus de 15 ans d'expérience dans le développement professionnel",
      icon: <TrophyOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
    {
      title: "Approche Personnalisée",
      description: "Solutions sur mesure adaptées à vos besoins spécifiques",
      icon: <AimOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
    {
      title: "Résultats Garantis",
      description: "Accompagnement jusqu'à l'atteinte de vos objectifs",
      icon: <CheckCircleOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)",
        padding: "0",
      }}
    >
      <style jsx global>{`
        /* Variables inspirées de votre logo IFPE */
        :root {
          --primary-color: #0056b3;
          --secondary-color: #0056b3;
          --accent-color: #3498db;
          --light-accent: #f7f9fc;
          --dark-gray: #2c3e50;
          --text-color: #333333;
          --light-text: #7f8c8d;
          --white: #ffffff;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .fade-in-delay-1 { animation-delay: 0.2s; }
        .fade-in-delay-2 { animation-delay: 0.4s; }
        .fade-in-delay-3 { animation-delay: 0.6s; }
        .fade-in-delay-4 { animation-delay: 0.8s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card {
          transition: var(--transition);
          height: 100%;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 86, 179, 0.15);
        }

        .service-card .ant-card-body {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .icon-container {
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .service-card:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-item {
          transition: var(--transition);
          padding: 8px 0;
          border-radius: 6px;
          margin: 4px 0;
        }

        .feature-item:hover {
          background: rgba(24, 144, 255, 0.05);
          transform: translateX(8px);
          padding-left: 12px;
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .floating-animation {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-section {
          background: linear-gradient(135deg, #0056b3, #3498db);
          border-radius: 16px;
          padding: 48px;
          text-align: center;
          color: white;
          margin: 48px 0;
        }

        .stat-card {
          text-align: center;
          padding: 24px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          transition: var(--transition);
          backdrop-filter: blur(10px);
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .advantage-card {
          text-align: center;
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          transition: var(--transition);
          height: 100%;
        }

        .advantage-card:hover {
          background: white;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Header Section */}
        <div className={`${isVisible ? "fade-in" : ""}`} style={{ textAlign: "center", marginBottom: "64px" }}>
          <Tag
            color="blue"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginBottom: "24px",
              borderRadius: "20px",
            }}
            className="bounce-in"
          >
            🟩 Nos Services
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
            Solutions Professionnelles
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
            Nous accompagnons votre développement avec des services sur mesure, alliant expertise technique et vision
            stratégique pour votre réussite professionnelle.
          </Paragraph>
        </div>

        {/* Services Grid */}
        <Row gutter={[24, 24]} style={{ marginBottom: "64px" }}>
          {services.map((service, index) => (
            <Col xs={24} lg={12} key={service.id}>
              <Card
                className={`service-card ${isVisible ? `fade-in fade-in-delay-${index + 1}` : ""}`}
                hoverable
                style={{ height: "100%" }}
              >
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                  <div className="icon-container" style={{ backgroundColor: service.color, color: "white" }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ marginBottom: "8px", color: "#262626" }}>
                      {service.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                      {service.description}
                    </Text>
                  </div>
                </div>

                <div style={{ marginTop: "24px" }}>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-item">
                      <Space align="start">
                        <CheckCircleOutlined style={{ color: "#52c41a", marginTop: "2px" }} />
                        <Text style={{ fontSize: "14px", lineHeight: "1.5" }}>{feature}</Text>
                      </Space>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action Section */}
        <div className={`cta-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <RocketOutlined style={{ fontSize: "64px", marginBottom: "24px" }} className="pulse-animation" />
          <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
            Prêt à transformer votre organisation ?
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", marginBottom: "32px" }}>
            Contactez-nous pour discuter de vos besoins et découvrir comment nos services peuvent accélérer votre
            développement et optimiser vos performances.
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
              Demander un devis
            </Button>
            <Button
              size="large"
              style={{
                borderColor: "white",
                color: "white",
                fontWeight: "bold",
                height: "48px",
                padding: "0 32px",
              }}
              icon={<ArrowRightOutlined />}
            >
              En savoir plus
            </Button>
          </Space>
        </div>

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

        {/* Advantages Section */}
        <div className={`${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Title level={3} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Pourquoi choisir nos services ?
          </Title>
          <Row gutter={[24, 24]}>
            {advantages.map((advantage, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="advantage-card">
                  <div style={{ marginBottom: "16px" }}>{advantage.icon}</div>
                  <Title level={5} style={{ marginBottom: "12px", color: "#262626" }}>
                    {advantage.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    {advantage.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}
