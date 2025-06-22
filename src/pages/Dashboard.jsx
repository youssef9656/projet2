import { Card, Button, Typography, Space, Avatar, Spin } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import useAuth from "../hooks/useAuth" // adapte le chemin si nécessaire

const { Title, Text } = Typography

export default function Dashboard() {
  const { userEmail, loading, handleLogout } = useAuth()

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f0f2f5" }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <Avatar icon={<UserOutlined />} size="large" />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  Tableau de bord Admin
                </Title>
                <Text type="secondary">Connecté en tant que : {userEmail}</Text>
              </div>
            </Space>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>

          <div>
            <Title level={4}>Bienvenue dans votre espace d'administration !</Title>
            <Text>Vous êtes maintenant connecté et pouvez accéder à toutes les fonctionnalités.</Text>
          </div>
        </Space>
      </Card>
    </div>
  )
}
