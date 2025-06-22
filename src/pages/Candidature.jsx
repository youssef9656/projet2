"use client"

import { useState } from "react"
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  Select,
  message,
  Row,
  Col,
  Typography,
  Alert,
  Space,
  Divider,
} from "antd"
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  SaveOutlined,
  FileTextOutlined,
  GlobalOutlined,
  BankOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons"
import "./Candidature.css"

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input
const { Option } = Select

export default function Candidature() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])

  // États pour les messages d'alerte
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState("info")
  const [showAlert, setShowAlert] = useState(false)

  // Configuration des messages d'erreur selon les codes du backend
  const getErrorConfig = (errorCode, errorMessage, field = null) => {
    const errorConfigs = {
      FILE_TOO_LARGE: {
        type: "error",
        title: "Fichier trop volumineux",
        description:
          "Le fichier CV dépasse la taille maximale autorisée de 5MB. Veuillez compresser votre fichier ou utiliser un format plus léger.",
        icon: <WarningOutlined />,
        duration: 8000,
      },
      UPLOAD_ERROR: {
        type: "error",
        title: "Erreur d'upload",
        description: `Impossible de télécharger le fichier CV. ${errorMessage || "Vérifiez le format et la taille du fichier."}`,
        icon: <CloseCircleOutlined />,
        duration: 6000,
      },
      MISSING_CV: {
        type: "error",
        title: "CV manquant",
        description:
          "Le fichier CV est obligatoire pour soumettre votre candidature. Veuillez sélectionner un fichier PDF, DOC ou DOCX.",
        icon: <ExclamationCircleOutlined />,
        duration: 5000,
      },
      MISSING_FIELD: {
        type: "error",
        title: "Champ obligatoire manquant",
        description: `Le champ "${field || "requis"}" doit être rempli. Veuillez compléter tous les champs marqués d'un astérisque (*).`,
        icon: <ExclamationCircleOutlined />,
        duration: 5000,
      },
      INVALID_EMAIL: {
        type: "error",
        title: "Format d'email invalide",
        description: "L'adresse email saisie n'est pas valide. Veuillez vérifier le format (exemple: nom@domaine.com).",
        icon: <MailOutlined />,
        duration: 5000,
      },
      EMAIL_EXISTS: {
        type: "warning",
        title: "Email déjà enregistré",
        description:
          "Une candidature avec cette adresse email existe déjà dans notre système. Si vous souhaitez modifier votre candidature, contactez notre support.",
        icon: <ExclamationCircleOutlined />,
        duration: 8000,
      },
      INTERNAL_ERROR: {
        type: "error",
        title: "Erreur technique",
        description:
          "Une erreur technique s'est produite sur nos serveurs. Veuillez réessayer dans quelques minutes ou contacter notre support si le problème persiste.",
        icon: <CloseCircleOutlined />,
        duration: 10000,
      },
      NETWORK_ERROR: {
        type: "error",
        title: "Erreur de connexion",
        description:
          "Impossible de se connecter au serveur. Vérifiez votre connexion internet et que le serveur backend est démarré sur le port 5000.",
        icon: <CloseCircleOutlined />,
        duration: 8000,
      },
      TIMEOUT_ERROR: {
        type: "error",
        title: "Délai d'attente dépassé",
        description:
          "La requête a pris trop de temps à s'exécuter. Cela peut être dû à un fichier trop volumineux ou à une connexion lente.",
        icon: <CloseCircleOutlined />,
        duration: 8000,
      },
    }

    return (
      errorConfigs[errorCode] || {
        type: "error",
        title: "Erreur inconnue",
        description: errorMessage || "Une erreur inattendue s'est produite. Veuillez réessayer.",
        icon: <CloseCircleOutlined />,
        duration: 6000,
      }
    )
  }

  // Fonction pour afficher les alertes avec configuration automatique
  const showAlertMessage = (type, title, description, duration = 5000, icon = null) => {
    setAlertType(type)
    setAlertMessage({ title, description, icon })
    setShowAlert(true)

    // Masquer automatiquement l'alerte après la durée spécifiée
    setTimeout(() => {
      setShowAlert(false)
    }, duration)
  }

  // Fonction pour afficher les erreurs basées sur les codes du backend
  const showBackendError = (errorCode, errorMessage = null, field = null) => {
    const config = getErrorConfig(errorCode, errorMessage, field)
    showAlertMessage(config.type, config.title, config.description, config.duration, config.icon)
  }

  const handleSubmit = async (values) => {
    console.log("🚀 Début de la soumission du formulaire")
    console.log("📋 Valeurs du formulaire:", values)
    console.log("📁 Liste des fichiers:", fileList)

    // Masquer les alertes précédentes
    setShowAlert(false)

    // Vérifier que le CV est bien uploadé
    if (fileList.length === 0) {
      showBackendError("MISSING_CV")
      return
    }

    setLoading(true)

    // Afficher un message d'information pendant le traitement
    showAlertMessage(
      "info",
      "Traitement en cours...",
      "Votre candidature est en cours d'envoi. Veuillez patienter quelques instants.",
      2000,
      <InfoCircleOutlined />,
    )

    try {
      // Préparer les données avec le fichier CV
      const formData = new FormData()

      // Ajouter tous les champs du formulaire
      Object.keys(values).forEach((key) => {
        if (key !== "cv" && values[key] !== undefined && values[key] !== null) {
          if (key === "dateNaissance") {
            formData.append(key, values[key].format("YYYY-MM-DD"))
          } else if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]))
          } else {
            formData.append(key, String(values[key]))
          }
        }
      })

      // Gestion du fichier CV
      const cvFile = fileList[0]
      let fileToUpload = null

      if (cvFile) {
        if (cvFile.originFileObj) {
          fileToUpload = cvFile.originFileObj
        } else if (cvFile instanceof File) {
          fileToUpload = cvFile
        } else if (cvFile.file) {
          fileToUpload = cvFile.file
        }
      }

      if (!fileToUpload) {
        showBackendError("UPLOAD_ERROR", "Impossible de traiter le fichier CV")
        setLoading(false)
        return
      }

      if (!(fileToUpload instanceof File)) {
        showBackendError("UPLOAD_ERROR", "Format de fichier invalide")
        setLoading(false)
        return
      }

      formData.append("cv", fileToUpload, fileToUpload.name)

      // Envoyer à l'API backend
      const API_URL = "http://localhost:5000/api/candidature"
      console.log("🌐 Envoi vers:", API_URL)

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      })

      console.log("📡 Réponse reçue:", response.status, response.statusText)

      // Gérer les différents codes de statut HTTP
      if (response.ok) {
        const result = await response.json()
        console.log("📄 Données de réponse:", result)

        // Message de succès détaillé
        showAlertMessage(
          "success",
          "Candidature enregistrée avec succès !",
          `Votre candidature a été enregistrée avec l'ID: ${result.id || "N/A"}. Notre équipe examinera votre dossier et vous contactera dans les plus brefs délais.`,
          10000,
          <CheckCircleOutlined />,
        )

        // Réinitialiser le formulaire
        form.resetFields()
        setFileList([])
        message.success("🎉 Candidature enregistrée avec succès !")
      } else {
        // Gérer les erreurs HTTP avec codes spécifiques
        let errorData
        try {
          errorData = await response.json()
        } catch (parseError) {
          console.error("Erreur de parsing JSON:", parseError)
          showBackendError("INTERNAL_ERROR", "Réponse serveur invalide")
          return
        }

        console.log("❌ Erreur reçue:", errorData)

        // Gérer les erreurs selon leur code
        if (errorData.code) {
          showBackendError(errorData.code, errorData.error, errorData.field)
        } else {
          // Gérer les erreurs HTTP sans code spécifique
          switch (response.status) {
            case 400:
              showBackendError("INVALID_REQUEST", errorData.error || "Données de requête invalides")
              break
            case 413:
              showBackendError("FILE_TOO_LARGE")
              break
            case 500:
              showBackendError("INTERNAL_ERROR", errorData.error)
              break
            default:
              showBackendError(
                "INTERNAL_ERROR",
                `Erreur HTTP ${response.status}: ${errorData.error || "Erreur inconnue"}`,
              )
          }
        }
      }
    } catch (error) {
      console.error("💥 Erreur:", error)

      // Gérer les différents types d'erreurs de fetch
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        showBackendError("NETWORK_ERROR")
      } else if (error.name === "AbortError") {
        showBackendError("TIMEOUT_ERROR")
      } else if (error.message.includes("JSON")) {
        showBackendError("INTERNAL_ERROR", "Réponse serveur invalide")
      } else {
        showBackendError("INTERNAL_ERROR", error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      console.log("📁 Tentative d'upload du fichier:", file.name, file.type, file.size)

      const isPDF = file.type === "application/pdf"
      const isDoc =
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

      if (!isPDF && !isDoc) {
        showAlertMessage(
          "warning",
          "Format de fichier non supporté",
          `Le fichier "${file.name}" n'est pas dans un format accepté. Veuillez sélectionner un fichier PDF, DOC ou DOCX.`,
          5000,
          <WarningOutlined />,
        )
        return false
      }

      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        showBackendError("FILE_TOO_LARGE")
        return false
      }

      // Créer un objet file avec les bonnes propriétés
      const fileObj = {
        uid: file.uid || Date.now().toString(),
        name: file.name,
        status: "done",
        originFileObj: file,
        size: file.size,
        type: file.type,
      }

      setFileList([fileObj])
      console.log("✅ Fichier ajouté à fileList:", fileObj)

      // Message de succès pour l'upload
      showAlertMessage(
        "success",
        "Fichier CV sélectionné",
        `Le fichier "${file.name}" (${Math.round((file.size / 1024 / 1024) * 100) / 100}MB) a été sélectionné avec succès. Vous pouvez maintenant soumettre votre candidature.`,
        3000,
        <CheckCircleOutlined />,
      )

      return false // Empêche l'upload automatique
    },
    onRemove: () => {
      console.log("🗑️ Fichier supprimé")
      setFileList([])
      showAlertMessage(
        "info",
        "Fichier supprimé",
        "Le fichier CV a été supprimé. Veuillez en sélectionner un nouveau pour soumettre votre candidature.",
        3000,
        <InfoCircleOutlined />,
      )
    },
    maxCount: 1,
  }

  const nationalites = [
    "Française",
    "Sénégalaise",
    "Malienne",
    "Burkinabé",
    "Ivoirienne",
    "Camerounaise",
    "Marocaine",
    "Tunisienne",
    "Algérienne",
    "Autre",
  ]

  const domainesIntervention = [
    "Formation professionnelle",
    "Ingénierie de formation",
    "Coaching professionnel",
    "Conseil en organisation",
    "Gestion de projet",
    "Ressources humaines",
    "Agriculture",
    "BTP",
    "Technologies",
    "Santé",
    "Éducation",
    "Autre",
  ]

  // Fonction pour obtenir l'icône selon le type d'alerte
  const getAlertIcon = (type) => {
    if (alertMessage?.icon) return alertMessage.icon

    switch (type) {
      case "success":
        return <CheckCircleOutlined />
      case "error":
        return <CloseCircleOutlined />
      case "warning":
        return <ExclamationCircleOutlined />
      case "info":
      default:
        return <InfoCircleOutlined />
    }
  }

  return (
    <div className="candidature-container">
      <div className="candidature-content">
        {/* Alerte personnalisée avec gestion des erreurs backend */}
        {showAlert && alertMessage && (
          <div style={{ marginBottom: "24px", position: "sticky", top: "20px", zIndex: 1000 }}>
            <Alert
              message={
                <Space>
                  {getAlertIcon(alertType)}
                  <Text strong>{alertMessage.title}</Text>
                </Space>
              }
              description={alertMessage.description}
              type={alertType}
              showIcon={false}
              closable
              onClose={() => setShowAlert(false)}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: `1px solid ${
                  alertType === "success"
                    ? "#52c41a"
                    : alertType === "error"
                      ? "#ff4d4f"
                      : alertType === "warning"
                        ? "#faad14"
                        : "#1890ff"
                }`,
              }}
              action={
                alertType === "error" && (
                  <Button size="small" type="text" onClick={() => setShowAlert(false)}>
                    Fermer
                  </Button>
                )
              }
            />
          </div>
        )}

        {/* Header Section */}
        <div className="candidature-header">
          <Title level={1} className="main-title">
            POURQUOI REMPLIR CE FORMULAIRE ?
          </Title>
          <Paragraph className="subtitle">
            Rejoignez notre équipe d'experts et participez à des projets d'envergure internationale dans le domaine de
            la formation professionnelle.
          </Paragraph>

          <div className="benefits-section">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <div className="benefit-item">
                  <GlobalOutlined className="benefit-icon" />
                  <Text strong>Projets Internationaux</Text>
                  <Text type="secondary">Intervenez dans 15+ pays</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="benefit-item">
                  <BankOutlined className="benefit-icon" />
                  <Text strong>Expertise Reconnue</Text>
                  <Text type="secondary">Travaillez avec des experts</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="benefit-item">
                  <FileTextOutlined className="benefit-icon" />
                  <Text strong>Développement Continu</Text>
                  <Text type="secondary">Formations et certifications</Text>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Formulaire */}
        <Card className="form-card">
          <Title level={2} className="form-title">
            LAISSEZ NOUS VOS COORDONNÉES
          </Title>

          <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className="candidature-form">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item name="nom" label="Nom" rules={[{ required: true, message: "Veuillez saisir votre nom" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Votre nom de famille" className="form-input" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="prenom"
                  label="Prénom"
                  rules={[{ required: true, message: "Veuillez saisir votre prénom" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Votre prénom" className="form-input" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Veuillez saisir votre email" },
                    { type: "email", message: "Format d'email invalide" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="votre@email.com" className="form-input" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="telephone"
                  label="Téléphone"
                  rules={[{ required: true, message: "Veuillez saisir votre téléphone" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="+33 6 12 34 56 78" className="form-input" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="dateNaissance"
                  label="Date de Naissance"
                  rules={[{ required: true, message: "Veuillez saisir votre date de naissance" }]}
                >
                  <DatePicker
                    placeholder="Sélectionnez votre date de naissance"
                    className="form-input"
                    style={{ width: "100%" }}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="nationalite"
                  label="Nationalité"
                  rules={[{ required: true, message: "Veuillez sélectionner votre nationalité" }]}
                >
                  <Select
                    placeholder="Sélectionnez votre nationalité"
                    className="form-input"
                    suffixIcon={<GlobalOutlined />}
                  >
                    {nationalites.map((nat) => (
                      <Option key={nat} value={nat}>
                        {nat}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="diplomes"
              label="Diplômes obtenus"
              rules={[{ required: true, message: "Veuillez saisir vos diplômes" }]}
            >
              <Input placeholder="Ex: Master en Ingénierie de Formation, Licence en..." className="form-input" />
            </Form.Item>

            <Form.Item name="emploiActuel" label="Emploi actuel">
              <Input placeholder="Votre poste actuel (optionnel)" className="form-input" />
            </Form.Item>

            <Form.Item
              name="domainesIntervention"
              label="Domaines d'intervention"
              rules={[{ required: true, message: "Veuillez sélectionner vos domaines d'intervention" }]}
            >
              <Select mode="multiple" placeholder="Sélectionnez vos domaines d'expertise" className="form-input">
                {domainesIntervention.map((domaine) => (
                  <Option key={domaine} value={domaine}>
                    {domaine}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="experiencesProfessionnelles"
              label="Expériences professionnelles"
              rules={[{ required: true, message: "Veuillez décrire vos expériences" }]}
            >
              <TextArea
                rows={6}
                placeholder="Décrivez vos expériences professionnelles pertinentes, vos réalisations et vos compétences clés..."
                className="form-textarea"
              />
            </Form.Item>

            <Form.Item
              name="cv"
              label="Votre CV"
              rules={[
                {
                  validator: (_, value) => {
                    if (fileList.length > 0) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error("Veuillez télécharger votre CV"))
                  },
                },
              ]}
            >
              <div>
                <Upload {...uploadProps} className="cv-upload">
                  <Button icon={<UploadOutlined />} className="upload-button">
                    Choisir un fichier CV
                  </Button>
                </Upload>
                {fileList.length > 0 ? (
                  <div style={{ marginTop: "8px", color: "#52c41a" }}>
                    ✅ Fichier sélectionné : {fileList[0].name}
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Taille: {Math.round(fileList[0].originFileObj?.size / 1024)} KB
                    </Text>
                  </div>
                ) : (
                  <Text type="secondary" style={{ marginLeft: "12px" }}>
                    Aucun fichier choisi
                  </Text>
                )}
                <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
                  Formats acceptés : PDF, DOC, DOCX (max 5MB)
                </Text>
              </div>
            </Form.Item>

            <Divider />

            <Form.Item style={{ marginTop: "32px", textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="submit-button"
                size="large"
                disabled={fileList.length === 0}
              >
                {loading ? "ENREGISTREMENT EN COURS..." : "ENREGISTRER MA CANDIDATURE"}
              </Button>

              {fileList.length === 0 && (
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Veuillez sélectionner un fichier CV pour activer le bouton d'envoi
                  </Text>
                </div>
              )}
            </Form.Item>
          </Form>
        </Card>

        {/* Section d'aide avec codes d'erreur */}
        <Card style={{ marginTop: "24px", background: "#f0f8ff", border: "1px solid #e6f7ff" }}>
          <Title level={4} style={{ color: "#0056b3", marginBottom: "16px" }}>
            🔧 Guide de résolution des erreurs
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: "12px" }}>
                <Text strong style={{ color: "#ff4d4f" }}>
                  ❌ Erreurs de fichier
                </Text>
                <ul style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  <li>Fichier trop volumineux : Compressez votre CV (max 5MB)</li>
                  <li>Format non supporté : Utilisez PDF, DOC ou DOCX uniquement</li>
                  <li>CV manquant : Sélectionnez un fichier avant d'envoyer</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: "12px" }}>
                <Text strong style={{ color: "#faad14" }}>
                  ⚠️ Erreurs de validation
                </Text>
                <ul style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  <li>Champs manquants : Remplissez tous les champs obligatoires (*)</li>
                  <li>Email invalide : Vérifiez le format (nom@domaine.com)</li>
                  <li>Email existant : Contactez le support pour modifier</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: "12px" }}>
                <Text strong style={{ color: "#1890ff" }}>
                  🌐 Erreurs de connexion
                </Text>
                <ul style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  <li>Serveur inaccessible : Vérifiez le port 5000</li>
                  <li>Connexion lente : Patientez ou réessayez</li>
                  <li>Pare-feu : Autorisez l'accès au serveur</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: "12px" }}>
                <Text strong style={{ color: "#52c41a" }}>
                  📞 Support technique
                </Text>
                <ul style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  <li>Erreur persistante : Contactez l'administrateur</li>
                  <li>Problème technique : Redémarrez le serveur</li>
                  <li>Aide : Documentation disponible</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}
