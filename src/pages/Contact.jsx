"use client"

import { useEffect, useState } from "react"
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Tag,
  Form,
  Input,
  message,
  Space,
  Alert,
} from "antd"
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
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (values) => {
    setLoading(true)
    setAlertMessage("Envoi du message en cours...")

    try {
      const payload = {
        fullName: values.nom,
        email: values.email,
        phone: values.telephone || "",
        subject: values.sujet,
        message: values.message,
      }

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        message.success("Votre message a été envoyé avec succès !")
        setAlertMessage("✔ Message envoyé avec succès !")
        form.resetFields()
      } else {
        message.error(data.error || "Erreur lors de l'envoi.")
        setAlertMessage(null)
      }
    } catch (error) {
      console.error(error)
      message.error("Erreur lors de l'envoi du message.")
      setAlertMessage(null)
    } finally {
      setLoading(false)
      setTimeout(() => setAlertMessage(null), 5000)
    }
  }

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="contact-icon" />,
      title: "Adresse",
      content:
        "Lot El Houda, Résidence Nadia, Immeuble B, Appartement N°81, Boulevard Mohamed Belafrej, Sidi Maarouf, Casablanca – Maroc",
      description: "Siège social et bureaux",
    },
    {
      icon: <PhoneOutlined className="contact-icon" />,
      title: "Téléphone",
      content: "+212 (0) 661 22 74 96 / +212 (0) 627 15 01 30",
      description: "Lun-Ven: 8h00-18h00",
    },
    {
      icon: <MailOutlined className="contact-icon" />,
      title: "Email",
      content: "ifep.consulting@multiconsul.com",
      description: "Réponse sous 24h",
    },
    {
      icon: <GlobalOutlined className="contact-icon" />,
      title: "Site web",
      content: "www.ifep-consulting.com",
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
        <div className={`contact-header ${isVisible ? "fade-in" : ""}`}>
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

        {/* Informations de contact */}
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

        {/* Formulaire et horaires */}
        <Row gutter={[32, 32]} className={`${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
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

                {alertMessage && (
                  <Alert
                    message={alertMessage}
                    type={alertMessage.includes("Erreur") ? "error" : "info"}
                    showIcon
                    style={{ marginTop: 16 }}
                  />
                )}
              </Form>
            </Card>
          </Col>

          {/* Horaires & arguments */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card className="horaires-card" title="Horaires d'ouverture" extra={<ClockCircleOutlined />}>
                {horaires.map((horaire, index) => (
                  <div key={index} className="horaire-item">
                    <Text strong>{horaire.jour}</Text>
                    <Text type="secondary">{horaire.heures}</Text>
                  </div>
                ))}
              </Card>

              <Card className="why-contact-card" title="Pourquoi nous contacter ?">
                <div className="why-contact-items">
                  <div className="why-contact-item">
                    <Text strong>Consultation gratuite</Text>
                    <br />
                    <Text type="secondary">Premier échange sans engagement</Text>
                  </div>
                  <div className="why-contact-item">
                    <Text strong>Réponse rapide</Text>
                    <br />
                    <Text type="secondary">Retour sous 24h maximum</Text>
                  </div>
                  <div className="why-contact-item">
                    <Text strong>Solutions sur mesure</Text>
                    <br />
                    <Text type="secondary">Adaptées à vos besoins spécifiques</Text>
                  </div>
                  <div className="why-contact-item">
                    <Text strong>Accompagnement complet</Text>
                    <br />
                    <Text type="secondary">De l'analyse à la mise en œuvre</Text>
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
