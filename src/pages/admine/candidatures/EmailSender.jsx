"use client"

import { useState } from "react"
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  List,
  Avatar,
  Typography,
  message,
  Radio,
  Card,
  Progress,
  Select,
  Collapse,
  InputNumber,
} from "antd"
import {
  SendOutlined,
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

const { TextArea } = Input
const { Title, Text } = Typography
const { Panel } = Collapse
const { Option } = Select

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const EmailSender = ({ visible, onCancel, candidatures, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [sendType, setSendType] = useState("selected")
  const [sendProgress, setSendProgress] = useState({ current: 0, total: 0, results: [] })
  const [showProgress, setShowProgress] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [emailFilter, setEmailFilter] = useState("tous")
  const [customEmailCount, setCustomEmailCount] = useState(0)

  // Templates prédéfinis côté frontend
  const templates = {
    acceptation: {
      nom: "Message d'acceptation",
      contenu: `Félicitations {{prenom}} {{nom}} !

Nous avons le plaisir de vous informer que votre candidature a été acceptée.

Votre profil correspond parfaitement à nos attentes :
- Diplômes : {{diplomes}}
- Domaines d'intervention : {{domainesIntervention}}
- Statut actuel : {{statut}}

Nous vous contacterons prochainement pour la suite du processus.

Cordialement,
L'équipe de recrutement`,
    },
    refus: {
      nom: "Message de refus",
      contenu: `Bonjour {{prenom}} {{nom}},

Nous vous remercions pour l'intérêt que vous portez à notre organisation.

Après étude attentive de votre candidature, nous regrettons de vous informer que nous ne pouvons pas donner suite à votre demande pour le moment.

Votre profil :
- Diplômes : {{diplomes}}
- Nationalité : {{nationalite}}
- Statut : {{statut}}

Nous conservons votre candidature dans notre base de données pour de futures opportunités.

Cordialement,
L'équipe de recrutement`,
    },
    relance: {
      nom: "Message de relance",
      contenu: `Bonjour {{prenom}} {{nom}},

Nous revenons vers vous concernant votre candidature déposée le {{dateCreation}}.

Statut actuel : {{statut}}
Nombre d'emails reçus : {{emailsEnvoyes}}

Nous souhaitons avoir des informations complémentaires sur votre profil.

Pourriez-vous nous confirmer votre disponibilité ?

Cordialement,
L'équipe de recrutement`,
    },
    information: {
      nom: "Message d'information",
      contenu: `Bonjour {{prenom}} {{nom}},

Nous vous contactons pour vous tenir informé(e) de l'évolution de votre candidature.

Vos informations :
- Email : {{email}}
- Téléphone : {{telephone}}
- Nationalité : {{nationalite}}
- Statut actuel : {{statut}}

N'hésitez pas à nous contacter si vous avez des questions.

Cordialement,
L'équipe de recrutement`,
    },
    convocation: {
      nom: "Convocation entretien",
      contenu: `Bonjour {{prenom}} {{nom}},

Suite à l'étude de votre candidature, nous souhaitons vous rencontrer pour un entretien.

Votre profil :
- Diplômes : {{diplomes}}
- Domaines d'intervention : {{domainesIntervention}}
- Expériences : {{experiencesProfessionnelles}}

Nous vous contacterons prochainement pour fixer un rendez-vous.

Cordialement,
L'équipe de recrutement`,
    },
  }

  const handleTemplateSelect = (templateKey) => {
    if (templates[templateKey]) {
      form.setFieldsValue({ message: templates[templateKey].contenu })
      setSelectedTemplate(templateKey)
    }
  }

  const handleSendEmail = async (values) => {
    setLoading(true)
    setShowProgress(true)

    try {
      const token = sessionStorage.getItem("authToken")

      // Déterminer la liste des candidats à qui envoyer
      let targetCandidatures = []
      if (sendType === "all") {
        const response = await fetch(`${API_BASE_URL}/candidatures?limit=1000`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          const data = await response.json()
          targetCandidatures = data.data
        }
      } else {
        // Utiliser les candidats sélectionnés
        targetCandidatures = candidatures
      }

      // Appliquer le filtre par nombre d'emails dans tous les cas
      switch (emailFilter) {
        case "aucun":
          targetCandidatures = targetCandidatures.filter((c) => (c.emailsEnvoyes || 0) === 0)
          break
        case "un":
          targetCandidatures = targetCandidatures.filter((c) => (c.emailsEnvoyes || 0) === 1)
          break
        case "plusieurs":
          targetCandidatures = targetCandidatures.filter((c) => (c.emailsEnvoyes || 0) >= 2)
          break
        case "personnalise":
          targetCandidatures = targetCandidatures.filter((c) => (c.emailsEnvoyes || 0) === customEmailCount)
          break
        default:
          // "tous" - pas de filtre supplémentaire
          break
      }

      setSendProgress({ current: 0, total: targetCandidatures.length, results: [] })

      let successCount = 0
      let errorCount = 0
      const results = []
      const successfulEmails = []

      // Envoyer un email à chaque candidat individuellement
      for (let i = 0; i < targetCandidatures.length; i++) {
        const candidature = targetCandidatures[i]

        try {
          // Envoyer les données complètes du candidat
          const emailData = {
            message: values.message, // Message template non formaté
            candidatureData: {
              _id: candidature._id,
              nom: candidature.nom,
              prenom: candidature.prenom,
              email: candidature.email,
              telephone: candidature.telephone,
              dateNaissance: candidature.dateNaissance,
              nationalite: candidature.nationalite,
              diplomes: candidature.diplomes,
              emploiActuel: candidature.emploiActuel,
              domainesIntervention: candidature.domainesIntervention,
              experiencesProfessionnelles: candidature.experiencesProfessionnelles,
              statut: candidature.statut,
              dateCreation: candidature.dateCreation,
              emailsEnvoyes: candidature.emailsEnvoyes || 0,
              dernierEmailEnvoye: candidature.dernierEmailEnvoye,
            },
          }

          const response = await fetch(`${API_BASE_URL}/candidature/envoyer-message`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(emailData),
          })

          if (response.ok) {
            const result = await response.json()
            successCount++
            successfulEmails.push(candidature.email)
            results.push({
              candidature,
              status: "success",
              message: "Email envoyé avec succès",
              messageFormate: result.messageFormate,
            })
          } else {
            const error = await response.json()
            errorCount++
            results.push({
              candidature,
              status: "error",
              message: error.error || "Erreur lors de l'envoi",
            })
          }
        } catch (error) {
          errorCount++
          results.push({
            candidature,
            status: "error",
            message: "Erreur de connexion",
          })
        }

        // Mettre à jour le progrès
        setSendProgress({
          current: i + 1,
          total: targetCandidatures.length,
          results: [...results],
        })

        // Petite pause pour éviter de surcharger le serveur
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Afficher le résultat final
      if (successCount > 0 && errorCount === 0) {
        message.success(`Tous les emails ont été envoyés avec succès (${successCount} candidats)`)
      } else if (successCount > 0 && errorCount > 0) {
        message.warning(`${successCount} emails envoyés avec succès, ${errorCount} échecs`)
      } else {
        message.error(`Aucun email n'a pu être envoyé (${errorCount} échecs)`)
      }

      // Attendre un peu avant de fermer
      setTimeout(() => {
        form.resetFields()
        setShowProgress(false)
        setSendProgress({ current: 0, total: 0, results: [] })
        setSelectedTemplate("")
        onSuccess(successfulEmails)
      }, 3000)
    } catch (error) {
      message.error("Erreur générale lors de l'envoi des emails")
      setShowProgress(false)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (!loading) {
      form.resetFields()
      setSendType("selected")
      setShowProgress(false)
      setSendProgress({ current: 0, total: 0, results: [] })
      setSelectedTemplate("")
      setEmailFilter("tous")
      setCustomEmailCount(0)
      onCancel()
    }
  }

  return (
    <Modal
      title="Envoyer un message aux candidats"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={900}
      destroyOnHidden
      closable={!loading}
      maskClosable={!loading}
    >
      {!showProgress ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <Radio.Group value={sendType} onChange={(e) => setSendType(e.target.value)} style={{ marginBottom: 16 }}>
              <Radio value="selected">Envoyer aux candidats sélectionnés ({candidatures.length})</Radio>
              <Radio value="all">Envoyer à tous les candidats</Radio>
            </Radio.Group>
          </div>

          {/* Filtres par nombre d'emails - maintenant disponible pour les deux options */}
          <Card title="Filtrer par nombre d'emails envoyés" size="small" style={{ marginBottom: 16 }}>
            <Radio.Group value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} style={{ width: "100%" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Radio value="tous">
                  {sendType === "all" ? "Tous les candidats" : "Tous les candidats sélectionnés"}
                </Radio>
                <Radio value="aucun">Candidats sans email envoyé (0 emails)</Radio>
                <Radio value="un">Candidats avec 1 seul email envoyé</Radio>
                <Radio value="plusieurs">Candidats avec plusieurs emails (2+)</Radio>
                <Radio value="personnalise">
                  <Space>
                    Nombre exact d'emails :
                    <InputNumber
                      min={0}
                      max={50}
                      value={customEmailCount}
                      onChange={setCustomEmailCount}
                      disabled={emailFilter !== "personnalise"}
                      style={{ width: 80 }}
                    />
                  </Space>
                </Radio>
              </Space>
            </Radio.Group>
          </Card>

          {sendType === "selected" && candidatures.length > 0 && (
            <Card
              title={`Candidats sélectionnés après filtrage`}
              size="small"
              style={{ marginBottom: 16, maxHeight: 200, overflow: "auto" }}
            >
              <div style={{ marginBottom: 8, fontSize: "12px", color: "#666" }}>
                {(() => {
                  let filteredCount = candidatures.length
                  switch (emailFilter) {
                    case "aucun":
                      filteredCount = candidatures.filter((c) => (c.emailsEnvoyes || 0) === 0).length
                      break
                    case "un":
                      filteredCount = candidatures.filter((c) => (c.emailsEnvoyes || 0) === 1).length
                      break
                    case "plusieurs":
                      filteredCount = candidatures.filter((c) => (c.emailsEnvoyes || 0) >= 2).length
                      break
                    case "personnalise":
                      filteredCount = candidatures.filter((c) => (c.emailsEnvoyes || 0) === customEmailCount).length
                      break
                  }
                  return `${filteredCount} candidat(s) sur ${candidatures.length} sélectionné(s) correspondent au filtre`
                })()}
              </div>
              <List
                dataSource={(() => {
                  let filtered = candidatures
                  switch (emailFilter) {
                    case "aucun":
                      filtered = candidatures.filter((c) => (c.emailsEnvoyes || 0) === 0)
                      break
                    case "un":
                      filtered = candidatures.filter((c) => (c.emailsEnvoyes || 0) === 1)
                      break
                    case "plusieurs":
                      filtered = candidatures.filter((c) => (c.emailsEnvoyes || 0) >= 2)
                      break
                    case "personnalise":
                      filtered = candidatures.filter((c) => (c.emailsEnvoyes || 0) === customEmailCount)
                      break
                    default:
                      filtered = candidatures
                  }
                  return filtered
                })()}
                renderItem={(candidature) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={`${candidature.prenom} ${candidature.nom}`}
                      description={
                        <div>
                          <div>
                            <MailOutlined style={{ marginRight: 4 }} />
                            {candidature.email} - Statut: {candidature.statut}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            Emails envoyés: {candidature.emailsEnvoyes || 0}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}

          <Form form={form} layout="vertical" onFinish={handleSendEmail}>
            {/* Templates prédéfinis */}
            <Form.Item label="Templates de messages">
              <Select
                placeholder="Choisir un template prédéfini"
                value={selectedTemplate}
                onChange={handleTemplateSelect}
                allowClear
                style={{ width: "100%" }}
              >
                {Object.keys(templates).map((key) => (
                  <Option key={key} value={key}>
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    {templates[key].nom}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="message" label="Message" rules={[{ required: true, message: "Le message est requis" }]}>
              <TextArea rows={10} placeholder="Rédigez votre message ici..." showCount maxLength={3000} />
            </Form.Item>

            <Collapse style={{ marginBottom: 16 }}>
              <Panel header="Variables disponibles" key="1">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px" }}>
                  <div>
                    <strong>Informations personnelles :</strong>
                    <ul style={{ margin: "8px 0", paddingLeft: "16px" }}>
                      <li>
                        <code>{"{{nom}}"}</code> - Nom du candidat
                      </li>
                      <li>
                        <code>{"{{prenom}}"}</code> - Prénom du candidat
                      </li>
                      <li>
                        <code>{"{{email}}"}</code> - Email du candidat
                      </li>
                      <li>
                        <code>{"{{telephone}}"}</code> - Téléphone
                      </li>
                      <li>
                        <code>{"{{dateNaissance}}"}</code> - Date de naissance
                      </li>
                      <li>
                        <code>{"{{nationalite}}"}</code> - Nationalité
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong>Informations professionnelles :</strong>
                    <ul style={{ margin: "8px 0", paddingLeft: "16px" }}>
                      <li>
                        <code>{"{{diplomes}}"}</code> - Diplômes
                      </li>
                      <li>
                        <code>{"{{emploiActuel}}"}</code> - Emploi actuel
                      </li>
                      <li>
                        <code>{"{{domainesIntervention}}"}</code> - Domaines
                      </li>
                      <li>
                        <code>{"{{statut}}"}</code> - Statut de la candidature
                      </li>
                      <li>
                        <code>{"{{dateCreation}}"}</code> - Date de candidature
                      </li>
                      <li>
                        <code>{"{{emailsEnvoyes}}"}</code> - Nombre d'emails envoyés
                      </li>
                    </ul>
                  </div>
                </div>
              </Panel>
            </Collapse>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={loading}>
                  Envoyer le message
                </Button>
                <Button onClick={handleCancel} disabled={loading}>
                  Annuler
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div>
          <Title level={4}>Envoi en cours...</Title>
          <Progress
            percent={Math.round((sendProgress.current / sendProgress.total) * 100)}
            status={loading ? "active" : "success"}
            format={() => `${sendProgress.current}/${sendProgress.total}`}
          />

          <div style={{ marginTop: 16, maxHeight: 400, overflow: "auto" }}>
            <List
              dataSource={sendProgress.results}
              renderItem={(result) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={result.status === "success" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                        style={{
                          backgroundColor: result.status === "success" ? "#52c41a" : "#ff4d4f",
                        }}
                      />
                    }
                    title={`${result.candidature.prenom} ${result.candidature.nom}`}
                    description={
                      <div>
                        <div>{result.candidature.email}</div>
                        <div
                          style={{
                            color: result.status === "success" ? "#52c41a" : "#ff4d4f",
                            fontSize: "12px",
                          }}
                        >
                          {result.message}
                        </div>
                        {result.messageFormate && (
                          <details style={{ marginTop: "8px", fontSize: "11px" }}>
                            <summary>Voir le message formaté</summary>
                            <div
                              style={{ background: "#f5f5f5", padding: "8px", marginTop: "4px", borderRadius: "4px" }}
                            >
                              {result.messageFormate.substring(0, 200)}...
                            </div>
                          </details>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </Modal>
  )
}

export default EmailSender
