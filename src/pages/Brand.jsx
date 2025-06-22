"use client"

import { useEffect, useState } from "react"
import { Card, Typography, Row, Col, Tag, Space, Button, Divider } from "antd"
import {
  DownloadOutlined,
  CopyOutlined,
  EyeOutlined,
  BgColorsOutlined, // Remplacer PaletteOutlined par BgColorsOutlined
  DesktopOutlined,
  MobileOutlined,
  PrinterOutlined,
  StarOutlined,
} from "@ant-design/icons"
import "./Brand.css"

const { Title, Paragraph, Text } = Typography

export default function Brand() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const logoVariations = [
    {
      id: 1,
      name: "Logo Principal",
      description: "Version complète avec texte",
      image: "/images/logo-ifpe.jpeg",
      background: "white",
      usage: "Site web, documents officiels, cartes de visite",
    },
    {
      id: 2,
      name: "Logo sur fond sombre",
      description: "Version adaptée aux fonds sombres",
      image: "/images/logo-ifpe.jpeg",
      background: "#0056b3",
      usage: "Présentations, bannières, supports numériques",
    },
    {
      id: 3,
      name: "Logo monochrome",
      description: "Version en noir et blanc",
      image: "/images/logo-ifpe.jpeg",
      background: "white",
      filter: "grayscale(100%)",
      usage: "Impression noir et blanc, fax, tampons",
    },
    {
      id: 4,
      name: "Logo compact",
      description: "Version réduite pour petits formats",
      image: "/images/logo-ifpe.jpeg",
      background: "#f0f2f5",
      scale: "0.8",
      usage: "Favicon, réseaux sociaux, applications mobiles",
    },
  ]

  const brandColors = [
    {
      name: "Bleu Principal IFPE",
      hex: "#0056b3",
      rgb: "RGB(0, 86, 179)",
      cmyk: "C100 M52 Y0 K30",
      usage: "Couleur principale, textes importants, boutons",
    },
    {
      name: "Bleu Clair",
      hex: "#3498db",
      rgb: "RGB(52, 152, 219)",
      cmyk: "C76 M31 Y0 K14",
      usage: "Accents, liens, éléments secondaires",
    },
    {
      name: "Bleu Très Clair",
      hex: "#e6f7ff",
      rgb: "RGB(230, 247, 255)",
      cmyk: "C10 M3 Y0 K0",
      usage: "Arrière-plans, zones de contenu",
    },
    {
      name: "Gris Foncé",
      hex: "#2c3e50",
      rgb: "RGB(44, 62, 80)",
      cmyk: "C45 M23 Y0 K69",
      usage: "Textes principaux, titres",
    },
    {
      name: "Gris Clair",
      hex: "#f0f2f5",
      rgb: "RGB(240, 242, 245)",
      cmyk: "C2 M1 Y0 K4",
      usage: "Arrière-plans neutres, séparateurs",
    },
  ]

  const usageGuidelines = [
    {
      icon: <DesktopOutlined />,
      title: "Usage Numérique",
      rules: [
        "Résolution minimum : 300 DPI pour l'impression",
        "Format recommandé : PNG avec transparence",
        "Taille minimum : 120px de largeur",
        "Espace libre autour du logo : 2x la hauteur du symbole",
      ],
    },
    {
      icon: <PrinterOutlined />,
      title: "Usage Impression",
      rules: [
        "Format vectoriel recommandé : SVG ou EPS",
        "Couleurs : Pantone ou CMYK selon support",
        "Taille minimum : 25mm de largeur",
        "Papier blanc ou très clair recommandé",
      ],
    },
    {
      icon: <MobileOutlined />,
      title: "Réseaux Sociaux",
      rules: [
        "Facebook : 1200x630px pour les couvertures",
        "LinkedIn : 1584x396px pour les bannières",
        "Instagram : 1080x1080px format carré",
        "Twitter : 1500x500px pour l'en-tête",
      ],
    },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Vous pouvez ajouter une notification ici
  }

  return (
    <div className="brand-container">
      <div className="brand-content">
        {/* Header Section */}
        <div className={`brand-header ${isVisible ? "fade-in" : ""}`}>
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
            🎨 Identité Visuelle IFPE
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
            Notre Logo & Charte Graphique
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
            Découvrez l'identité visuelle d'IFPE, nos couleurs de marque et les guidelines d'utilisation de notre logo
            pour maintenir une image professionnelle cohérente.
          </Paragraph>
        </div>

        {/* Logo Principal en Grand */}
        <div className={`main-logo-section ${isVisible ? "fade-in fade-in-delay-1" : ""}`}>
          <Card className="main-logo-card">
            <div className="main-logo-container">
              <img
                src="/images/logo-ifpe.jpeg"
                alt="Logo IFPE - Formation Ingénierie de formation Coaching Professionnel"
                className="main-logo"
              />
            </div>
            <div className="logo-description">
              <Title level={3} style={{ color: "var(--primary-color)", marginBottom: "12px" }}>
                IFPE - Institut de Formation Professionnelle et d'Expertise
              </Title>
              <Text style={{ fontSize: "16px", color: "#666" }}>
                Formation • Ingénierie de formation • Coaching Professionnel
              </Text>
            </div>
          </Card>
        </div>

        {/* Variations du Logo */}
        <div className={`logo-variations-section ${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Variations du Logo
          </Title>
          <Row gutter={[24, 24]}>
            {logoVariations.map((variation, index) => (
              <Col xs={24} md={12} lg={6} key={variation.id}>
                <Card className="logo-variation-card" hoverable>
                  <div
                    className="logo-preview"
                    style={{
                      backgroundColor: variation.background,
                      padding: "24px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={variation.image || "/placeholder.svg"}
                      alt={variation.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80px",
                        filter: variation.filter || "none",
                        transform: variation.scale ? `scale(${variation.scale})` : "none",
                      }}
                    />
                  </div>
                  <Title level={5} style={{ marginBottom: "8px" }}>
                    {variation.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "12px", display: "block", marginBottom: "12px" }}>
                    {variation.description}
                  </Text>
                  <Text style={{ fontSize: "11px", color: "#666" }}>
                    <strong>Usage :</strong> {variation.usage}
                  </Text>
                  <div style={{ marginTop: "12px" }}>
                    <Space>
                      <Button size="small" icon={<DownloadOutlined />}>
                        PNG
                      </Button>
                      <Button size="small" icon={<DownloadOutlined />}>
                        SVG
                      </Button>
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Palette de Couleurs */}
        <div className={`brand-colors-section ${isVisible ? "fade-in fade-in-delay-3" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            <BgColorsOutlined style={{ marginRight: "12px", color: "var(--primary-color)" }} />
            Palette de Couleurs
          </Title>
          <Row gutter={[24, 24]}>
            {brandColors.map((color, index) => (
              <Col xs={24} sm={12} lg={8} xl={4} key={index}>
                <Card className="color-card" hoverable>
                  <div
                    className="color-preview"
                    style={{
                      backgroundColor: color.hex,
                      height: "80px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      border: color.hex === "#ffffff" ? "1px solid #f0f0f0" : "none",
                    }}
                  ></div>
                  <Title level={5} style={{ marginBottom: "8px", fontSize: "14px" }}>
                    {color.name}
                  </Title>
                  <div className="color-codes">
                    <div className="color-code">
                      <Text strong style={{ fontSize: "12px" }}>
                        HEX
                      </Text>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Text code style={{ fontSize: "11px" }}>
                          {color.hex}
                        </Text>
                        <Button
                          type="text"
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard(color.hex)}
                          style={{ padding: "0 4px" }}
                        />
                      </div>
                    </div>
                    <div className="color-code">
                      <Text strong style={{ fontSize: "12px" }}>
                        RGB
                      </Text>
                      <Text code style={{ fontSize: "11px" }}>
                        {color.rgb}
                      </Text>
                    </div>
                    <div className="color-code">
                      <Text strong style={{ fontSize: "12px" }}>
                        CMYK
                      </Text>
                      <Text code style={{ fontSize: "11px" }}>
                        {color.cmyk}
                      </Text>
                    </div>
                  </div>
                  <Divider style={{ margin: "12px 0" }} />
                  <Text style={{ fontSize: "10px", color: "#666" }}>
                    <strong>Usage :</strong> {color.usage}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Guidelines d'Usage */}
        <div className={`usage-guidelines-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "48px", color: "#262626" }}>
            Guidelines d'Utilisation
          </Title>
          <Row gutter={[24, 24]}>
            {usageGuidelines.map((guideline, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card className="guideline-card" hoverable>
                  <div className="guideline-header">
                    <div style={{ color: "var(--primary-color)", fontSize: "32px", marginBottom: "16px" }}>
                      {guideline.icon}
                    </div>
                    <Title level={4} style={{ marginBottom: "16px" }}>
                      {guideline.title}
                    </Title>
                  </div>
                  <div className="guideline-rules">
                    {guideline.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="rule-item">
                        <StarOutlined style={{ color: "var(--accent-color)", marginRight: "8px", fontSize: "12px" }} />
                        <Text style={{ fontSize: "13px", lineHeight: "1.4" }}>{rule}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Section Téléchargements */}
        <div className={`downloads-section ${isVisible ? "fade-in fade-in-delay-4" : ""}`}>
          <Card className="downloads-card">
            <Title level={3} style={{ textAlign: "center", marginBottom: "24px", color: "var(--primary-color)" }}>
              <DownloadOutlined style={{ marginRight: "12px" }} />
              Kit de Marque Complet
            </Title>
            <Paragraph style={{ textAlign: "center", marginBottom: "32px", color: "#666" }}>
              Téléchargez tous les éléments de notre identité visuelle dans différents formats pour vos projets.
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Button type="primary" size="large" icon={<DownloadOutlined />}>
                  Pack Logos (ZIP)
                </Button>
              </Col>
              <Col>
                <Button size="large" icon={<DownloadOutlined />}>
                  Charte Graphique (PDF)
                </Button>
              </Col>
              <Col>
                <Button size="large" icon={<EyeOutlined />}>
                  Aperçu Complet
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  )
}
