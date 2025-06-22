"use client"

import { useState, useEffect } from "react"
import { Modal, Button, Avatar, Space, Tag, message, Card, Typography } from "antd"
import {
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  ReloadOutlined,
  CloseOutlined,
  MessageOutlined,
} from "@ant-design/icons"
import "./FloatingChatBot.css"

const { Text, Title, Paragraph } = Typography

export default function FloatingChatBot() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [questionsUsed, setQuestionsUsed] = useState(0)
  const [usedQuestions, setUsedQuestions] = useState([])
  const [hasNewMessage, setHasNewMessage] = useState(false)

  useEffect(() => {
    // Animation d'apparition après 2 secondes
    const timer = setTimeout(() => {
      setHasNewMessage(true)
    }, 2000)

    return () => clearTimeout(timer)
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

  const openChat = () => {
    setIsVisible(true)
    setHasNewMessage(false)
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content:
            "👋 Bonjour ! Je suis l'assistant virtuel IFPE. Je peux répondre à vos questions sur nos services. Vous avez droit à 5 questions maximum. Choisissez une question ci-dessous :",
          timestamp: new Date(),
        },
      ])
    }
  }

  const closeChat = () => {
    setIsVisible(false)
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

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
    <>
      {/* Floating Chat Button */}
      <div className={`floating-chat-button ${hasNewMessage ? "has-notification" : ""}`} onClick={openChat}>
        <Avatar
          size={56}
          style={{
            backgroundColor: "#0056b3",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0, 86, 179, 0.3)",
          }}
          icon={<RobotOutlined style={{ fontSize: "28px" }} />}
          className="floating-avatar"
        />
        {hasNewMessage && <div className="notification-dot"></div>}
        <div className="chat-tooltip">💬 Besoin d'aide ? Cliquez ici !</div>
      </div>

      {/* Chat Modal */}
      <Modal
        title={null}
        open={isVisible}
        onCancel={closeChat}
        footer={null}
        width={400}
        className="floating-chat-modal"
        style={{ top: 20 }}
        maskClosable={false}
        closable={false}
      >
        <div className="floating-chat-container">
          {/* Chat Header */}
          <div className="floating-chat-header">
            <Space>
              <Avatar
                size={32}
                style={{ backgroundColor: "#0056b3" }}
                icon={<RobotOutlined />}
                className="pulse-animation"
              />
              <div>
                <Text strong style={{ color: "#0056b3" }}>
                  Assistant IFPE
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: "11px" }}>
                  En ligne • Répond instantanément
                </Text>
              </div>
            </Space>
            <Space>
              <Tag color={questionsUsed >= 5 ? "red" : "blue"} style={{ fontSize: "10px" }}>
                {questionsUsed}/5
              </Tag>
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={resetChat}
                title="Réinitialiser"
                style={{ color: "#0056b3" }}
              />
              <Button
                type="text"
                size="small"
                icon={isMinimized ? <MessageOutlined /> : <CloseOutlined />}
                onClick={isMinimized ? minimizeChat : closeChat}
                title={isMinimized ? "Agrandir" : "Fermer"}
                style={{ color: "#0056b3" }}
              />
            </Space>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="floating-messages-area">
                {messages.map((message) => (
                  <div key={message.id} className={`floating-message ${message.type}-message`}>
                    <div className="floating-message-content">
                      <Avatar
                        size={24}
                        style={{
                          backgroundColor: message.type === "bot" ? "#0056b3" : "#3498db",
                        }}
                        icon={message.type === "bot" ? <RobotOutlined /> : <UserOutlined />}
                      />
                      <div className="floating-message-bubble">
                        <div className="floating-message-text">{message.content}</div>
                        <div className="floating-message-time">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Questions Buttons */}
              {questionsUsed < 5 && availableQuestions.length > 0 && (
                <div className="floating-questions-section">
                  <div className="floating-questions-header">
                    <QuestionCircleOutlined style={{ color: "#0056b3", marginRight: "6px", fontSize: "12px" }} />
                    <Text strong style={{ color: "#0056b3", fontSize: "12px" }}>
                      Questions disponibles :
                    </Text>
                  </div>
                  <div className="floating-questions-list">
                    {availableQuestions.slice(0, 4).map((questionObj) => (
                      <Button
                        key={questionObj.id}
                        size="small"
                        className="floating-question-button"
                        onClick={() => handleQuestionClick(questionObj)}
                        icon={<SendOutlined style={{ fontSize: "10px" }} />}
                      >
                        {questionObj.question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Limit Reached Message */}
              {questionsUsed >= 5 && (
                <div className="floating-limit-reached">
                  <div style={{ textAlign: "center", padding: "16px" }}>
                    <RobotOutlined style={{ fontSize: "32px", color: "#0056b3", marginBottom: "8px" }} />
                    <Text strong style={{ color: "#0056b3", display: "block", marginBottom: "8px" }}>
                      Limite atteinte !
                    </Text>
                    <Text style={{ fontSize: "12px", marginBottom: "12px", display: "block" }}>
                      Contactez-nous pour plus d'informations.
                    </Text>
                    <Space>
                      <Button size="small" type="primary" style={{ background: "#0056b3", fontSize: "11px" }}>
                        Nous contacter
                      </Button>
                      <Button size="small" onClick={resetChat} icon={<ReloadOutlined />} style={{ fontSize: "11px" }}>
                        Nouveau chat
                      </Button>
                    </Space>
                  </div>
                </div>
              )}
            </>
          )}

          {isMinimized && (
            <div className="minimized-content">
              <Text style={{ fontSize: "12px", color: "#666" }}>Chat réduit - Cliquez pour agrandir</Text>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
