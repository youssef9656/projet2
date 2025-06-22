"use client"

import { useEffect, useState } from "react"
import { Card, Button, Typography, Row, Col, Tag, Form, Input, message, Space } from "antd"
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons"
import "./Contact.css"

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Formulaire soumis:", values)
      message.success("Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
      form.resetFields()
    } catch (error) {
      message.error("Erreur lors de l'envoi du message. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="contact-icon" />,
      title: "Adresse",
      content: "[Votre adresse complète]",
      description: "Siège social et bureaux",
    },
    {
      icon: <PhoneOutlined className="contact-icon" />,
      title: "Téléphone",
      content: "[Votre numéro de téléphone]",
      description: "Lun-Ven: 8h00-18h00",
    },
    {
      icon: <MailOutlined className="contact-icon" />,
      title: "Email",
      content: "[votre@email.com]",
      description: "Réponse sous 24h",
    },
    {
      icon: <GlobalOutlined className="contact-icon" />,
      title: "Site web",
      content: "[nomdedomaine.com]",
      description: "Portail d'informations",
    },
  ]

  const horaires = [
    { jour: "Lundi - Vendredi", heures: "8h00 - 18h00" },
    { jour: "Samedi", heures: "9h00 - 13h00" },
    { jour: "Dimanche", heures: "Fermé" },
  ]

  return (
    <div className="contact-container">
      <div className="contact-content">
        {/* Header Section */}
        <div className={`contact-header ${isVisible ? "fade-in" : ""}`}>
          <Tag
            color="brown"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginBottom: "24px",
              borderRadius: "20px",
            }}
            className="bounce-in"
          >
            🟫 Nous contacter
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
            Contactez-nous
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
            Prêt à démarrer votre projet ? Notre équipe d'experts est là pour vous accompagner et répondre à toutes vos
            questions.
          </Paragraph>
        </div>

        {/* Contact Info Cards */}
        <Row
          gutter={[24, 24]}
          className={`contact-info-section ${isVisible ? "fade-in fade-in-delay-1" : ""}`}
          style={{ marginBottom: "64px" }}
        >
          {contactInfo.map((info, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="contact-info-card" hoverable>
                <div className="contact-info-content">
                  <div style={{ color: "var(--primary-color)", fontSize: "32px", marginBottom: "16px" }}>
                    {info.icon}
                  </div>
                  <Title level={5} style={{ marginBottom: "8px", color: "#262626" }}>
                    {info.title}
                  </Title>
                  <Text strong style={{ color: "var(--primary-color)", display: "block", marginBottom: "4px" }}>
                    {info.content}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {info.description}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Contact Section */}
        <Row gutter={[32, 32]} className={`${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          {/* Formulaire de contact */}
          <Col xs={24} lg={14}>
            <Card className="contact-form-card" title="Envoyez-nous un message">
              <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="nom"
                      label="Nom complet"
                      rules={[{ required: true, message: "Veuillez saisir votre nom" }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Votre nom complet" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Adresse email"
                      rules={[
                        { required: true, message: "Veuillez saisir votre email" },
                        { type: "email", message: "Format d'email invalide" },
                      ]}
                    >
                      <Input prefix={<MailOutlined />} placeholder="votre@email.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="telephone" label="Téléphone (optionnel)">
                  <Input prefix={<PhoneOutlined />} placeholder="Votre numéro de téléphone" />
                </Form.Item>

                <Form.Item name="sujet" label="Sujet" rules={[{ required: true, message: "Veuillez saisir un sujet" }]}>
                  <Input placeholder="Objet de votre message" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: "Veuillez saisir votre message" }]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Décrivez votre projet, vos besoins ou posez vos questions..."
                    prefix={<MessageOutlined />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    icon={<SendOutlined />}
                    style={{
                      width: "100%",
                      height: "48px",
                      fontWeight: "bold",
                      background: "var(--primary-color)",
                      borderColor: "var(--primary-color)",
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Informations complémentaires */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Horaires d'ouverture */}
              <Card className="horaires-card" title="Horaires d'ouverture" extra={<ClockCircleOutlined />}>
                {horaires.map((horaire, index) => (
                  <div key={index} className="horaire-item">
                    <Text strong>{horaire.jour}</Text>
                    <Text type="secondary">{horaire.heures}</Text>
                  </div>
                ))}
              </Card>

              {/* Pourquoi nous contacter */}
              <Card className="why-contact-card" title="Pourquoi nous contacter ?">
                <div className="why-contact-items">
                  <div className="why-contact-item">
                    <div className="why-contact-icon">✅</div>
                    <div>
                      <Text strong>Consultation gratuite</Text>
                      <br />
                      <Text type="secondary">Premier échange sans engagement</Text>
                    </div>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-icon">⚡</div>
                    <div>
                      <Text strong>Réponse rapide</Text>
                      <br />
                      <Text type="secondary">Retour sous 24h maximum</Text>
                    </div>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-icon">🎯</div>
                    <div>
                      <Text strong>Solutions sur mesure</Text>
                      <br />
                      <Text type="secondary">Adaptées à vos besoins spécifiques</Text>
                    </div>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-icon">🤝</div>
                    <div>
                      <Text strong>Accompagnement complet</Text>
                      <br />
                      <Text type="secondary">De l'analyse à la mise en œuvre</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}
