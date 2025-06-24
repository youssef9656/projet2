"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Typography, Space, Avatar, Spin } from "antd"
import { UserOutlined, DashboardOutlined } from "@ant-design/icons"
import useAuth from "../../hooks/useAuth"

const { Title, Text } = Typography

export default function Dashboard() {
  const { userEmail, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/")
    }
  }, [loading, isAuthenticated, navigate])

  if (loading || !isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
        
        }}
      >
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <Text>Chargement / Vérification d'identité...</Text>
        </Space>
      </div>
    )
  }

  return (
    <div style={{minHeight: "100vh", background: "#f0f2f5"  ,  marginTop: "80px"}}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: "#1890ff" }} />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  <DashboardOutlined /> Tableau de bord Admin
                </Title>
                <Text type="secondary">
                  Connecté en tant que : <strong>{userEmail}</strong>
                </Text>
              </div>
            </Space>
            {/* Le bouton de déconnexion a été supprimé ici */}
          </div>

          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Title level={4}>Bienvenue dans votre espace d'administration !</Title>
            <Text>Vous êtes maintenant connecté et pouvez accéder à toutes les fonctionnalités.</Text>
          </div>
        </Space>
      </Card>
    </div>
  )
}
