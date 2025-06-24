"use client"

import { useState, useEffect } from "react"
import { Table, Button, Card, Tag, Space, Typography, Spin, message, Tooltip, Select } from "antd"
import { MailOutlined, PhoneOutlined, CalendarOutlined, SendOutlined } from "@ant-design/icons"
import ReplyModal from "./reply-modal"
import { useNavigate } from "react-router-dom"
import useAuth from "./../../../hooks/useAuth"

const { Title, Text } = Typography
const { Option } = Select

export default function ContactsTable() {

    const { userEmail, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/")
    }
  }, [loading, isAuthenticated, navigate])

  const [contacts, setContacts] = useState([])
  const [loadingA, setLoadingA] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const   BASE_URL_api = import.meta.env.VITE_API_BASE_URL

  // Récupérer les contacts depuis l'API
  const fetchContacts = async () => {
    try {
      const token = sessionStorage.getItem("authToken")

      if (!token) {
        message.error("Token d'authentification manquant")
        return
      }

      const response = await fetch(`${BASE_URL_api}/contacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des contacts")
      }

      const result = await response.json()

      // Traiter les données MongoDB
      const processedContacts = (result.data || []).map((contact) => ({
        ...contact,
        _id: contact._id.$oid || contact._id, // Gérer l'ObjectId MongoDB
        createdAt: contact.createdAt.$date || contact.createdAt, // Gérer la date MongoDB
        // Mapper les statuts français vers les statuts anglais pour la logique interne
        status: mapStatusToEnglish(contact.status),
      }))

      setContacts(processedContacts)
    } catch (error) {
      console.error("Erreur:", error)
      message.error("Impossible de récupérer les contacts")
    } finally {
      setLoadingA(false)
    }
  }

  // Ouvrir le modal de réponse
  const openReplyModal = (contact) => {
    setSelectedContact(contact)
    setIsReplyModalVisible(true)
  }

  // Fermer le modal de réponse
  const closeReplyModal = () => {
    setIsReplyModalVisible(false)
    setSelectedContact(null)
  }

  // Callback après envoi réussi d'une réponse
  const handleReplySuccess = (result) => {
    // Actualiser la liste des contacts
    fetchContacts()
  }

  // Formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
    return mapStatusToFrench(status)
  }

  // Fonction pour mapper les statuts français vers anglais
  const mapStatusToEnglish = (frenchStatus) => {
    switch (frenchStatus) {
      case "En attente":
        return "pending"
      case "Répondu":
      case "Répondus":
        return "replied"
      default:
        return "pending"
    }
  }

  // Fonction pour mapper les statuts anglais vers français
  const mapStatusToFrench = (englishStatus) => {
    switch (englishStatus) {
      case "pending":
        return "En attente"
      case "replied":
        return "Répondu"
      default:
        return "En attente"
    }
  }

  // Filtrer les contacts selon le statut
  const filteredContacts = contacts.filter((contact) => {
    if (statusFilter === "all") return true
    return contact.status === statusFilter
  })

  // Colonnes du tableau responsive
  const columns = [
    {
      title: "Contact",
      key: "contact",
      responsive: ["xs"],
      render: (_, record) => (
        <Card size="small" style={{ marginBottom: 8 }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Space justify="space-between" style={{ width: "100%" }}>
              <Text strong>{record.fullName}</Text>
              <Tag color={getStatusColor(record.status || "pending")}>{getStatusText(record.status || "pending")}</Tag>
            </Space>
            <Space>
              <MailOutlined style={{ color: "#1890ff" }} />
              <Text copyable={{ text: record.email }}>{record.email}</Text>
            </Space>
            {record.phone && (
              <Space>
                <PhoneOutlined style={{ color: "#52c41a" }} />
                <Text copyable={{ text: record.phone }}>{record.phone}</Text>
              </Space>
            )}
            <Tag color="blue">{record.subject}</Tag>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {formatDate(record.createdAt)}
            </Text>
            <Space style={{ width: "100%" }}>
              <Button type="primary" icon={<SendOutlined />} onClick={() => openReplyModal(record)} size="small">
                Répondre
              </Button>
            </Space>
          </Space>
        </Card>
      ),
    },
    {
      title: "Nom complet",
      dataIndex: "fullName",
      key: "fullName",
      responsive: ["sm"],
      render: (text) => <Text strong>{text}</Text>,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
      render: (email, record) => (
        <Space>
          <MailOutlined style={{ color: "#1890ff" }} />
          <Text copyable={{ text: record.email }}>{email}</Text>
        </Space>
      ),
    },
    {
      title: "Téléphone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
      render: (phone, record) =>
        phone ? (
          <Space>
            <PhoneOutlined style={{ color: "#52c41a" }} />
            <Text copyable={{ text: record.phone }}>{phone}</Text>
          </Space>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
    {
      title: "Sujet",
      dataIndex: "subject",
      key: "subject",
      responsive: ["sm"],
      render: (subject) => <Tag color="blue">{subject}</Tag>,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      responsive: ["sm"],
      render: (status) => <Tag color={getStatusColor(status || "pending")}>{getStatusText(status || "pending")}</Tag>,
      filters: [
        { text: "En attente", value: "pending" },
        { text: "Répondu", value: "replied" },
      ],
      onFilter: (value, record) => (record.status || "pending") === value,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      responsive: ["lg"],
      width: 200,
      render: (message) => (
        <Tooltip title={message}>
          <Text ellipsis style={{ maxWidth: 150 }}>
            {message}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md"],
      render: (date) => (
        <Space>
          <CalendarOutlined style={{ color: "#faad14" }} />
          <Text type="secondary">{formatDate(date)}</Text>
        </Space>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      responsive: ["sm"],
      render: (_, record) => (
        <Button type="primary" icon={<SendOutlined />} onClick={() => openReplyModal(record)} size="small">
          Répondre
        </Button>
      ),
    },
  ]

  useEffect(() => {
    fetchContacts()
  }, [])

  if (loadingA) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Chargement des contacts...</Text>
        </div>
      </div>
    )
  }

  const pendingCount = contacts.filter((c) => (c.status || "pending") === "pending").length
  const repliedCount = contacts.filter((c) => c.status === "replied").length

  return (
    <div style={{ padding: "24px" }}>
      {/* Statistiques */}
      <div style={{ marginBottom: 24 }}>
        <Space size="large">
          <Card size="small">
            <Space>
              <Tag color="orange">{pendingCount}</Tag>
              <Text>En attente</Text>
            </Space>
          </Card>
          <Card size="small">
            <Space>
              <Tag color="green">{repliedCount}</Tag>
              <Text>Répondus</Text>
            </Space>
          </Card>
        </Space>
      </div>

      <Card>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Title level={3}>
              <MailOutlined style={{ marginRight: 8 }} />
              Gestion des Contacts
            </Title>
            <Text type="secondary">
              {filteredContacts.length} contact{filteredContacts.length > 1 ? "s" : ""} affiché
              {filteredContacts.length > 1 ? "s" : ""}
            </Text>
          </div>

          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
            <Option value="all">Tous les statuts</Option>
            <Option value="pending">En attente</Option>
            <Option value="replied">Répondu</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="_id"
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} contacts`,
            responsive: true,
          }}
          locale={{
            emptyText: "Aucun contact trouvé",
          }}
          size="middle"
        />
      </Card>

      {/* Composant Modal de Réponse */}
<ReplyModal
  visible={isReplyModalVisible}
  onClose={closeReplyModal}
  selectedContact={selectedContact}
  onReplySuccess={handleReplySuccess}
  apiEndpoint={`${BASE_URL_api}/reply`}
/>
    </div>
  )
}
