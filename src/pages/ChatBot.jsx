"use client"

import { useEffect, useState } from "react"
import { Card, Button, Typography, Avatar, Space, Tag, message } from "antd"
import {
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  ReloadOutlined,
} from "@ant-design/icons"
import "./ChatBot.css"

const { Title, Paragraph, Text } = Typography

export default function ChatBot() {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [questionsUsed, setQuestionsUsed] = useState(0)
  const [usedQuestions, setUsedQuestions] = useState([])

  useEffect(() => {
    setIsVisible(true)
    // Message de bienvenue du bot
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "👋 Bonjour ! Je suis l'assistant virtuel IFPE. Je peux répondre à vos questions sur nos services. Vous avez droit à 5 questions maximum. Choisissez une question ci-dessous :",
        timestamp: new Date(),
      },
    ])
  }, [])

  const predefinedQuestions = [
    {
      id: 1,
      question: "Quels sont vos domaines d'expertise ?",
      answer:
        "Nos domaines d'expertise incluent :\n• Développement de systèmes de formation professionnelle\n• Insertion professionnelle et emploi\n• Conseil en structuration d'entreprise\n• Formation selon l'Approche par Compétences (APC)\n\nNous intervenons dans plus de 15 pays avec une équipe de 200+ experts.",
    },
    {
      id: 2,
      question: "Comment puis-je obtenir un devis ?",
      answer:
        "Pour obtenir un devis personnalisé :\n• Contactez-nous via notre formulaire de contact\n• Appelez-nous au [Votre numéro]\n• Envoyez-nous un email à [votre@email.com]\n\nNous vous répondrons sous 24h avec une proposition adaptée à vos besoins spécifiques.",
    },
    {
      id: 3,
      question: "Quels sont vos tarifs ?",
      answer:
        "Nos tarifs varient selon :\n• La complexité du projet\n• La durée de la mission\n• Le nombre de bénéficiaires\n• La zone géographique\n\nNous proposons toujours une consultation gratuite pour évaluer vos besoins et vous fournir un devis détaillé.",
    },
    {
      id: 4,
      question: "Dans quels pays intervenez-vous ?",
      answer:
        "Nous intervenons dans plus de 15 pays, principalement :\n• Afrique de l'Ouest (Sénégal, Mali, Burkina Faso, etc.)\n• Afrique Centrale (Cameroun, Tchad, etc.)\n• Maghreb (Maroc, Tunisie, etc.)\n\nNous avons également des partenariats en Europe et pouvons étendre nos services selon vos besoins.",
    },
    {
      id: 5,
      question: "Quelle est votre expérience ?",
      answer:
        "Notre expérience :\n• 30+ années dans la formation professionnelle\n• 500+ projets réalisés avec succès\n• 26000+ bénéficiaires formés\n• 50+ entreprises accompagnées\n• 98% de taux de satisfaction client\n\nNotre fondateur a plus de 30 ans d'expérience dans le secteur.",
    },
    {
      id: 6,
      question: "Proposez-vous des formations en ligne ?",
      answer:
        "Oui, nous proposons :\n• Formations hybrides (présentiel + distanciel)\n• Plateformes e-learning personnalisées\n• Webinaires et classes virtuelles\n• Contenus pédagogiques digitaux\n\nNous adaptons nos méthodes aux contraintes technologiques locales.",
    },
    {
      id: 7,
      question: "Comment garantissez-vous la qualité ?",
      answer:
        "Notre garantie qualité :\n• Certifications internationales respectées\n• Équipe d'experts qualifiés\n• Suivi et évaluation continus\n• Méthodologies éprouvées\n• Support post-formation\n\nNous nous engageons sur des résultats mesurables.",
    },
    {
      id: 8,
      question: "Quels sont vos délais d'intervention ?",
      answer:
        "Nos délais typiques :\n• Consultation initiale : 24-48h\n• Proposition détaillée : 5-7 jours\n• Démarrage projet : 2-4 semaines\n• Formations courtes : 1-2 semaines\n• Projets complexes : selon envergure\n\nNous nous adaptons à vos urgences si nécessaire.",
    },
  ]

  const handleQuestionClick = (questionObj) => {
    if (questionsUsed >= 5) {
      message.warning("Vous avez atteint la limite de 5 questions. Contactez-nous pour plus d'informations.")
      return
    }

    if (usedQuestions.includes(questionObj.id)) {
      message.info("Vous avez déjà posé cette question.")
      return
    }

    // Ajouter la question de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: questionObj.question,
      timestamp: new Date(),
    }

    // Ajouter la réponse du bot après un délai
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        content: questionObj.answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage, botMessage])
      setQuestionsUsed((prev) => prev + 1)
      setUsedQuestions((prev) => [...prev, questionObj.id])
    }, 500)

    setMessages((prev) => [...prev, userMessage])
  }

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "👋 Chat réinitialisé ! Je peux répondre à vos questions sur nos services. Vous avez droit à 5 nouvelles questions. Choisissez une question ci-dessous :",
        timestamp: new Date(),
      },
    ])
    setQuestionsUsed(0)
    setUsedQuestions([])
  }

  const availableQuestions = predefinedQuestions.filter((q) => !usedQuestions.includes(q.id))

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        {/* Header Section */}
        <div className={`chatbot-header ${isVisible ? "fade-in" : ""}`}>
          <Tag
            color="cyan"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginBottom: "24px",
              borderRadius: "20px",
            }}
            className="bounce-in"
          >
            🤖 Assistant Virtuel IFPE
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
            Chat avec notre Robot
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
            Posez vos questions à notre assistant virtuel. Limite de 5 questions par session pour une expérience
            optimale.
          </Paragraph>
        </div>

        {/* Chat Interface */}
        <div className={`chat-interface ${isVisible ? "fade-in fade-in-delay-1" : ""}`}>
          <Card className="chat-card">
            {/* Chat Header */}
            <div className="chat-header">
              <Space>
                <Avatar
                  size={40}
                  style={{ backgroundColor: "var(--primary-color)" }}
                  icon={<RobotOutlined />}
                  className="pulse-animation"
                />
                <div>
                  <Text strong style={{ color: "var(--primary-color)" }}>
                    Assistant IFPE
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    En ligne • Répond instantanément
                  </Text>
                </div>
              </Space>
              <div className="questions-counter">
                <Tag color={questionsUsed >= 5 ? "red" : "blue"}>
                  {questionsUsed}/5 questions utilisées
                </Tag>
                <Button
                  type="text"
                  icon={<ReloadOutlined />}
                  onClick={resetChat}
                  title="Réinitialiser le chat"
                  style={{ color: "var(--primary-color)" }}
                />
              </div>
            </div>

            {/* Messages Area */}
            <div className="messages-area">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}-message`}>
                  <div className="message-content">
                    <Avatar
                      size={32}
                      style={{
                        backgroundColor: message.type === "bot" ? "var(--primary-color)" : "var(--accent-color)",
                      }}
                      icon={message.type === "bot" ? <RobotOutlined /> : <UserOutlined />}
                    />
                    <div className="message-bubble">
                      <div className="message-text">{message.content}</div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Questions Buttons */}
            {questionsUsed < 5 && availableQuestions.length > 0 && (
              <div className="questions-section">
                <div className="questions-header">
                  <QuestionCircleOutlined style={{ color: "var(--primary-color)", marginRight: "8px" }} />
                  <Text strong style={{ color: "var(--primary-color)" }}>
                    Questions disponibles :
                  </Text>
                </div>
                <div className="questions-grid">
                  {availableQuestions.slice(0, 6).map((questionObj) => (
                    <Button
                      key={questionObj.id}
                      className="question-button"
                      onClick={() => handleQuestionClick(questionObj)}
                      icon={<SendOutlined />}
                    >
                      {questionObj.question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Limit Reached Message */}
            {questionsUsed >= 5 && (
              <div className="limit-reached">
                <Card className="limit-card">
                  <div style={{ textAlign: "center" }}>
                    <RobotOutlined style={{ fontSize: "48px", color: "var(--primary-color)", marginBottom: "16px" }} />
                    <Title level={4} style={{ color: "var(--primary-color)", marginBottom: "8px" }}>
                      Limite atteinte !
                    </Title>
                    <Paragraph style={{ marginBottom: "16px" }}>
                      Vous avez utilisé vos 5 questions. Pour plus d'informations détaillées, contactez-nous
                      directement.
                    </Paragraph>
                    <Space>
                      <Button type="primary" style={{ background: "var(--primary-color)" }}>
                        Nous contacter
                      </Button>
                      <Button onClick={resetChat} icon={<ReloadOutlined />}>
                        Nouveau chat
                      </Button>
                    </Space>
                  </div>
                </Card>
              </div>
            )}
          </Card>
        </div>

        {/* Info Section */}
        <div className={`chat-info ${isVisible ? "fade-in fade-in-delay-2" : ""}`}>
          <Card className="info-card">
            <Title level={4} style={{ color: "var(--primary-color)", marginBottom: "16px" }}>
              💡 Comment utiliser le chat ?
            </Title>
            <div className="info-items">
              <div className="info-item">
                <span className="info-number">1</span>
                <Text>Choisissez une question parmi celles proposées</Text>
              </div>
              <div className="info-item">
                <span className="info-number">2</span>
                <Text>Lisez la réponse détaillée de notre assistant</Text>
              </div>
              <div className="info-item">
                <span className="info-number">3</span>
                <Text>Vous avez droit à 5 questions maximum par session</Text>
              </div>
              <div className="info-item">
                <span className="info-number">4</span>
                <Text>Pour plus d'infos, contactez-nous directement</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
