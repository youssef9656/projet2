"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Form, Input, Button, Typography, Alert, Space, Divider, Row, Col, Checkbox } from "antd"
import {
  LockOutlined,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import useRedirectIfAuthenticated from "../hooks/useRedirectIfAuthenticated"
import "./Login.css"

const { Title, Text, Link } = Typography

export default function Login() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState("info")
  const [showAlert, setShowAlert] = useState(false)

  const navigate = useNavigate()

  // Redirige si déjà connecté
  useRedirectIfAuthenticated()

  const getErrorConfig = (errorMessage, isRegister = false) => {
    const errorConfigs = {
      "Email ou mot de passe invalide": {
        type: "error",
        title: "Identifiants incorrects",
        description: "L'email ou le mot de passe saisi est incorrect.",
        icon: <CloseCircleOutlined />,
        duration: 6000,
      },
      "Email déjà utilisé": {
        type: "warning",
        title: "Compte existant",
        description: "Un compte avec cet email existe déjà.",
        icon: <ExclamationCircleOutlined />,
        duration: 6000,
      },
      "Network Error": {
        type: "error",
        title: "Erreur de connexion",
        description: "Impossible de se connecter au serveur.",
        icon: <CloseCircleOutlined />,
        duration: 8000,
      },
      "Internal Server Error": {
        type: "error",
        title: "Erreur serveur",
        description: "Une erreur technique s'est produite.",
        icon: <CloseCircleOutlined />,
        duration: 8000,
      },
    }

    return (
      errorConfigs[errorMessage] || {
        type: "error",
        title: isRegister ? "Erreur d'inscription" : "Erreur de connexion",
        description: errorMessage || "Une erreur inattendue s'est produite.",
        icon: <CloseCircleOutlined />,
        duration: 6000,
      }
    )
  }

  const showAlertMessage = (type, title, description, duration = 5000, icon = null) => {
    setAlertType(type)
    setAlertMessage({ title, description, icon })
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), duration)
  }

  const showBackendError = (errorMessage, isRegister = false) => {
    const config = getErrorConfig(errorMessage, isRegister)
    showAlertMessage(config.type, config.title, config.description, config.duration, config.icon)
  }

  const handleSubmit = async (values) => {
    setShowAlert(false)
    setLoading(true)

    showAlertMessage(
      "info",
      isRegisterMode ? "Création du compte..." : "Connexion en cours...",
      "Veuillez patienter.",
      2000,
      <InfoCircleOutlined />
    )

    try {
      const API_URL = `http://localhost:5000/api/auth/${isRegisterMode ? "register" : "login"}`

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      if (response.ok) {
        const result = await response.json()

        if (isRegisterMode) {
          showAlertMessage(
            "success",
            "Compte créé",
            `Votre compte a été créé pour ${result.user.email}.`,
            8000,
            <CheckCircleOutlined />
          )
          setTimeout(() => {
            setIsRegisterMode(false)
            form.resetFields()
          }, 2000)
        } else {
          showAlertMessage(
            "success",
            "Connexion réussie",
            "Redirection vers le tableau de bord...",
            3000,
            <CheckCircleOutlined />
          )

          if (rememberMe) {
            localStorage.setItem("authToken", result.token)
            localStorage.setItem("sessionToken", result.sessionToken)
            localStorage.setItem("userEmail", values.email)
          } else {
            sessionStorage.setItem("authToken", result.token)
            sessionStorage.setItem("sessionToken", result.sessionToken)
            sessionStorage.setItem("userEmail", values.email)
          }

          setTimeout(() => {
            navigate("/dashboard")
          }, 2000)
        }

        form.resetFields()
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch (parseError) {
          showBackendError("Réponse serveur invalide", isRegisterMode)
          return
        }
        showBackendError(errorData.error || "Erreur inconnue", isRegisterMode)
      }
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        showBackendError("Network Error", isRegisterMode)
      } else {
        showBackendError(error.message, isRegisterMode)
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setShowAlert(false)
    form.resetFields()
  }

  const getAlertIcon = (type) => {
    if (alertMessage?.icon) return alertMessage.icon
    switch (type) {
      case "success":
        return <CheckCircleOutlined />
      case "error":
        return <CloseCircleOutlined />
      case "warning":
        return <ExclamationCircleOutlined />
      default:
        return <InfoCircleOutlined />
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        {showAlert && alertMessage && (
          <div className="login-alert">
            <Alert
              message={<Space>{getAlertIcon(alertType)} <Text strong>{alertMessage.title}</Text></Space>}
              description={alertMessage.description}
              type={alertType}
              closable
              onClose={() => setShowAlert(false)}
              style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", marginBottom: "24px" }}
            />
          </div>
        )}

        <div className="login-header">
          <Title level={1}>{isRegisterMode ? "Créer un compte" : "Connexion Admin"}</Title>
          <Text>
            {isRegisterMode
              ? "Créez votre compte administrateur"
              : "Connectez-vous à votre espace d'administration"}
          </Text>
        </div>

        <Card className="login-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              name="email"
              label="Adresse email"
              rules={[
                { required: true, message: "Veuillez saisir votre email" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="admin@exemple.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[
                { required: true, message: "Veuillez saisir votre mot de passe" },
                { min: isRegisterMode ? 6 : 1, message: "Mot de passe trop court" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                placeholder={isRegisterMode ? "Minimum 6 caractères" : "Votre mot de passe"}
              />
            </Form.Item>

            {isRegisterMode && (
              <Form.Item
                name="confirmPassword"
                label="Confirmer le mot de passe"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Veuillez confirmer votre mot de passe" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return !value || getFieldValue("password") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Les mots de passe ne correspondent pas"))
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirmez le mot de passe"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            )}

            {!isRegisterMode && (
              <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
                <Col>
                  <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                    Se souvenir de moi
                  </Checkbox>
                </Col>
                <Col>
                  <Link href="#">Mot de passe oublié ?</Link>
                </Col>
              </Row>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<LoginOutlined />}
                block
              >
                {loading
                  ? isRegisterMode
                    ? "Création en cours..."
                    : "Connexion..."
                  : isRegisterMode
                    ? "Créer le compte"
                    : "Se connecter"}
              </Button>
            </Form.Item>

            <Divider>ou</Divider>

            <div style={{ textAlign: "center" }}>
              <Text>
                {isRegisterMode ? "Vous avez déjà un compte ? " : "Vous n'avez pas de compte ? "}
                <Link onClick={toggleMode}>
                  {isRegisterMode ? "Se connecter" : "Créer un compte"}
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
