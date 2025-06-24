"use client"

import React from "react"

import { useState } from "react"
import { Modal, Form, Input, Card, Space, Typography, Button, message } from "antd"
import { SendOutlined, MailOutlined } from "@ant-design/icons"

const { Text } = Typography
const { TextArea } = Input
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function ReplyModal({
  visible,
  onClose,
  selectedContact,
  onReplySuccess,
  apiEndpoint = `${API_BASE_URL}/reply`,
}) {
  const [form] = Form.useForm()
  const [sending, setSending] = useState(false)

  // Envoyer un email de réponse
  const sendEmailResponse = async (values) => {
    setSending(true)
    try {
      const token = sessionStorage.getItem("authToken")

      if (!token) {
        message.error("Token d'authentification manquant")
        return
      }

      const requestBody = {
        email: values.to,
        subject: values.subject,
        replyMessage: values.message,
        contactId: selectedContact._id,
        contactName: selectedContact.fullName,
        originalSubject: selectedContact.subject,
        originalMessage: selectedContact.message,
        phone: selectedContact.phone,
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur lors de l'envoi de l'email")
      }

      const result = await response.json()
      message.success("Votre réponse a été envoyée avec succès")

      // Fermer le modal et réinitialiser le formulaire
      handleClose()

      // Callback pour actualiser les données parent
      if (onReplySuccess) {
        onReplySuccess(result)
      }
    } catch (error) {
      console.error("Erreur:", error)
      message.error(error.message || "Impossible d'envoyer l'email")
    } finally {
      setSending(false)
    }
  }

  // Fermer le modal
  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  // Obtenir la couleur du tag selon le statut
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange"
      case "replied":
        return "green"
      default:
        return "default"
    }
  }

  // Obtenir le texte du statut
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "replied":
        return "Répondu"
      default:
        return "En attente"
    }
  }

  // Pré-remplir le formulaire quand le contact sélectionné change
  const handleModalOpen = () => {
    if (selectedContact && visible) {
      form.setFieldsValue({
        to: selectedContact.email,
        subject: `Re: ${selectedContact.subject}`,
        message: `Bonjour ${selectedContact.fullName},\n\nMerci pour votre message concernant "${selectedContact.subject}".\n\n`,
      })
    }
  }

  // Effet pour pré-remplir le formulaire
  React.useEffect(() => {
    handleModalOpen()
  }, [selectedContact, visible])

  return (
 <Modal
  title={
    <Space>
      <MailOutlined />
      {selectedContact ? `Répondre à ${selectedContact.fullName}` : "Répondre"}
    </Space>
  }
  open={visible}
  onCancel={handleClose}
  footer={null}
  width={700}
  destroyOnHidden
>

      <Form form={form} layout="vertical" onFinish={sendEmailResponse}>
        <Form.Item
          label="Destinataire"
          name="to"
          rules={[
            { required: true, message: "Veuillez saisir l'email du destinataire" },
            { type: "email", message: "Format d'email invalide" },
          ]}
        >
          <Input placeholder="Email du destinataire" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label="Sujet" name="subject" rules={[{ required: true, message: "Veuillez saisir le sujet" }]}>
          <Input placeholder="Sujet de l'email" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            { required: true, message: "Veuillez saisir votre message" },
            { min: 10, message: "Le message doit contenir au moins 10 caractères" },
          ]}
        >
          <TextArea rows={6} placeholder="Votre message de réponse..." showCount maxLength={2000} />
        </Form.Item>

        {selectedContact && (
          <Card size="small" title="Message original" style={{ marginBottom: 16, backgroundColor: "#fafafa" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text>
                <Text strong>De :</Text> {selectedContact.fullName}
              </Text>
              <Text>
                <Text strong>Email :</Text> {selectedContact.email}
              </Text>
              {selectedContact.phone && (
                <Text>
                  <Text strong>Téléphone :</Text> {selectedContact.phone}
                </Text>
              )}
              <Text>
                <Text strong>Sujet :</Text> {selectedContact.subject}
              </Text>
              <Text>
                <Text strong>Message :</Text>
              </Text>
              <Text
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  display: "block",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedContact.message}
              </Text>
              {selectedContact.status && (
                <Text>
                  <Text strong>Statut :</Text>
                  <span
                    style={{
                      marginLeft: 8,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: getStatusColor(selectedContact.status) === "orange" ? "#fff7e6" : "#f6ffed",
                      color: getStatusColor(selectedContact.status) === "orange" ? "#d46b08" : "#389e0d",
                      border: `1px solid ${getStatusColor(selectedContact.status) === "orange" ? "#ffd591" : "#b7eb8f"}`,
                    }}
                  >
                    {getStatusText(selectedContact.status)}
                  </span>
                </Text>
              )}
            </Space>
          </Card>
        )}

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={handleClose} disabled={sending}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit" loading={sending} icon={<SendOutlined />}>
              {sending ? "Envoi en cours..." : "Envoyer la réponse"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}
