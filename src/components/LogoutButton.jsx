"use client"

// Exemple d'utilisation du logout dans un composant
import { Button } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import useAuth from "../hooks/useAuth"

export default function LogoutButton() {
  const { handleLogout, loading } = useAuth()

  const onLogout = async () => {
    await handleLogout(true) // true = appel API logout
  }

  return (
    <Button type="primary" danger icon={<LogoutOutlined />} loading={loading} onClick={onLogout}>
      Se déconnecter
    </Button>
  )
}
