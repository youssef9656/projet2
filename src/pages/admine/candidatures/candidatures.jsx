"use client"



import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Tag,
  Space,
  Card,
  Row,
  Col,
  Statistic,
  Tabs,
  Descriptions,
  Divider,
  Typography,
  DatePicker,
  Popconfirm,
  Badge,
} from "antd"
import {
  PlusOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
  FileTextOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  GlobalOutlined,
  SendOutlined,
} from "@ant-design/icons"
import moment from "moment"
import EmailSender from "./EmailSender"

import useAuth from "./../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"


const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const CandidaturesAdmin = () => {
  const { userEmail, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/")
    }
  }, [loading, isAuthenticated, navigate])

  
  const [candidatures, setCandidatures] = useState([])
const [loadingCandidatures, setloadingCandidatures] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [filters, setFilters] = useState({
    search: "",
    statut: "",
    nationalite: "",
    emailsEnvoyes: "", // nouveau filtre
  })
  const [selectedCandidature, setSelectedCandidature] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedCandidatures, setSelectedCandidatures] = useState([])
  const [form] = Form.useForm()



  const token = sessionStorage.getItem("authToken")

  // Charger les candidatures
  const loadCandidatures = async (page = 1, pageSize = 10) => {
    setloadingCandidatures(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      })

      if (filters.statut) params.append("statut", filters.statut)
      if (filters.nationalite) params.append("nationalite", filters.nationalite)

      const response = await fetch(`${API_BASE_URL}/candidatures?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Ajouter un champ emailsEnvoyes si pas présent
        const candidaturesWithEmails = data.data.map((candidature) => ({
          ...candidature,
          emailsEnvoyes: candidature.emailsEnvoyes || 0,
        }))
        setCandidatures(candidaturesWithEmails)
        setPagination({
          current: data.pagination.page,
          pageSize: data.pagination.limit,
          total: data.pagination.total,
        })
      } else {
        message.error("Impossible de charger les candidatures")
      }
    } catch (error) {
      message.error("Erreur de connexion")
    } finally {
      setloadingCandidatures(false)
    }
  }

  // Ajouter une candidature
  const handleAddCandidature = async (values) => {
    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (key === "cv" && values[key]?.fileList?.length > 0) {
        formData.append("cv", values[key].fileList[0].originFileObj)
      } else if (key === "domainesIntervention" && Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]))
      } else if (key === "dateNaissance") {
        formData.append(key, values[key].format("YYYY-MM-DD"))
      } else if (values[key]) {
        formData.append(key, values[key])
      }
    })

    try {
      const response = await fetch(`${API_BASE_URL}/candidature`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        message.success("Candidature ajoutée avec succès")
        setShowAddModal(false)
        form.resetFields()
        loadCandidatures()
      } else {
        const error = await response.json()
        message.error(error.error || "Erreur lors de l'ajout")
      }
    } catch (error) {
      message.error("Erreur de connexion")
    }
  }

  // Mettre à jour le statut
  const updateStatus = async (id, statut) => {
    try {
      const response = await fetch(`${API_BASE_URL}/candidature/${id}/statut`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut }),
      })

      if (response.ok) {
        message.success("Statut mis à jour")
        loadCandidatures()
      } else {
        message.error("Erreur lors de la mise à jour")
      }
    } catch (error) {
      message.error("Erreur de connexion")
    }
  }

  // Supprimer une candidature
  const deleteCandidature = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/candidature/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        message.success("Candidature supprimée")
        loadCandidatures()
      } else {
        message.error("Erreur lors de la suppression")
      }
    } catch (error) {
      message.error("Erreur de connexion")
    }
  }

  // Télécharger le CV - Utilisation de votre API spécifique
  const downloadCV = async (candidature) => {
    try {
      // Utiliser votre endpoint spécifique avec le nom du document
      const downloadUrl = `${API_BASE_URL}/cv/${encodeURIComponent(candidature.cvFileName)}`

      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // Créer un blob à partir de la réponse
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        // Créer un lien de téléchargement
        const link = document.createElement("a")
        link.href = url
        link.download = candidature.cvOriginalName || candidature.cvFileName
        document.body.appendChild(link)
        link.click()

        // Nettoyer
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        message.success("CV téléchargé avec succès")
      } else if (response.status === 401) {
        message.error("Token d'authentification invalide ou expiré")
      } else if (response.status === 404) {
        message.error("Fichier CV non trouvé sur le serveur")
      } else {
        const errorData = await response.json().catch(() => ({}))
        message.error(errorData.message || "Erreur lors du téléchargement du CV")
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error)
      message.error("Impossible de télécharger le CV. Vérifiez votre connexion.")
    }
  }

  // Voir les détails du CV
  const viewCVDetails = (candidature) => {
    setSelectedCandidature(candidature)
    setShowDetailsModal(true)
  }

  // Obtenir la couleur du tag selon le statut
  const getStatusColor = (statut) => {
    switch (statut) {
      case "Accepté":
        return "green"
      case "Refusé":
        return "red"
      case "En cours d'évaluation":
        return "blue"
      default:
        return "orange"
    }
  }

  // Obtenir la couleur du badge selon le nombre d'emails
  const getEmailBadgeColor = (count) => {
    if (count === 0) return "red"
    if (count === 1) return "orange"
    if (count <= 3) return "blue"
    return "green"
  }

  // Callback après envoi d'email réussi
  const onEmailSent = () => {
    loadCandidatures() // Recharger les données pour mettre à jour les compteurs
    setShowEmailModal(false)
    setSelectedCandidatures([])
  }

  // Colonnes du tableau
  const columns = [
    {
      title: "Candidat",
      key: "candidat",
      width: 200,
      fixed: "left",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {record.prenom} {record.nom}
          </div>
          <div style={{ color: "#666", fontSize: "12px" }}>{record.diplomes}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      width: 200,
      responsive: ["md"],
      render: (_, record) => (
        <div>
          <div style={{ fontSize: "12px", marginBottom: 4 }}>
            <MailOutlined style={{ marginRight: 4 }} />
            {record.email}
          </div>
          <div style={{ fontSize: "12px" }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {record.telephone}
          </div>
        </div>
      ),
    },
    {
      title: "Nationalité",
      dataIndex: "nationalite",
      key: "nationalite",
      width: 120,
      responsive: ["lg"],
      render: (nationalite) => (
        <div>
          <GlobalOutlined style={{ marginRight: 4 }} />
          {nationalite}
        </div>
      ),
    },
    {
      title: "Statut",
      key: "statut",
      width: 180,
      render: (_, record) => (
        <Select
          value={record.statut}
          style={{ width: "100%" }}
          onChange={(value) => updateStatus(record._id, value)}
          size="small"
        >
          <Option value="En attente">
            <Tag color="orange">En attente</Tag>
          </Option>
          <Option value="En cours d'évaluation">
            <Tag color="blue">En cours d'évaluation</Tag>
          </Option>
          <Option value="Accepté">
            <Tag color="green">Accepté</Tag>
          </Option>
          <Option value="Refusé">
            <Tag color="red">Refusé</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Emails envoyés",
      key: "emailsEnvoyes",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Badge
          count={record.emailsEnvoyes || 0}
          style={{ backgroundColor: getEmailBadgeColor(record.emailsEnvoyes || 0) }}
        />
      ),
    },
    {
      title: "Date",
      key: "date",
      width: 100,
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ fontSize: "12px" }}>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {moment(record.dateCreation).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "CV",
      key: "cv",
      width: 80,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => viewCVDetails(record)}
            title="Voir détails du CV"
            size="small"
          />
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => downloadCV(record)}
            title="Télécharger le CV"
            size="small"
          />
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCandidature(record)
              setShowDetailsModal(true)
            }}
            size="small"
          />
          <Button
            icon={<SendOutlined />}
            onClick={() => {
              setSelectedCandidatures([record])
              setShowEmailModal(true)
            }}
            title="Envoyer un email"
            size="small"
          />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette candidature ?"
            onConfirm={() => deleteCandidature(record._id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // Filtrer les candidatures
  const filteredCandidatures = candidatures.filter((candidature) => {
    const matchesSearch =
      candidature.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
      candidature.prenom.toLowerCase().includes(filters.search.toLowerCase()) ||
      candidature.email.toLowerCase().includes(filters.search.toLowerCase())

    const matchesEmailFilter = () => {
      if (!filters.emailsEnvoyes) return true
      const emailCount = candidature.emailsEnvoyes || 0
      switch (filters.emailsEnvoyes) {
        case "aucun":
          return emailCount === 0
        case "un":
          return emailCount === 1
        case "plusieurs":
          return emailCount > 1
        default:
          return true
      }
    }

    return matchesSearch && matchesEmailFilter()
  })

  // Statistiques
  const stats = {
    total: candidatures.length,
    enAttente: candidatures.filter((c) => c.statut === "En attente").length,
    acceptees: candidatures.filter((c) => c.statut === "Accepté").length,
    refusees: candidatures.filter((c) => c.statut === "Refusé").length,
    aucunEmail: candidatures.filter((c) => (c.emailsEnvoyes || 0) === 0).length,
    unEmail: candidatures.filter((c) => (c.emailsEnvoyes || 0) === 1).length,
  }

  // Configuration de sélection de lignes
  const rowSelection = {
    selectedRowKeys: selectedCandidatures.map((c) => c._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCandidatures(selectedRows)
    },
  }

  useEffect(() => {
    loadCandidatures()
  }, [filters.statut, filters.nationalite, filters.emailsEnvoyes])

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <Title level={2}>Gestion des Candidatures</Title>
          <Text type="secondary">Gérez les candidatures et les CV des candidats</Text>
        </div>
        <Space wrap>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => {
              setSelectedCandidatures(candidatures)
              setShowEmailModal(true)
            }}
            disabled={candidatures.length === 0}
          >
            Envoyer à tous
          </Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => setShowEmailModal(true)}
            disabled={selectedCandidatures.length === 0}
          >
            Envoyer aux sélectionnés ({selectedCandidatures.length})
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAddModal(true)}>
            Nouvelle Candidature
          </Button>
        </Space>
      </div>

      <Tabs
        defaultActiveKey="list"
        items={[
          {
            key: "list",
            label: "Liste des Candidatures",
            children: (
              <>
                {/* Filtres et recherche */}
                <Card style={{ marginBottom: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Input
                        placeholder="Rechercher..."
                        prefix={<SearchOutlined />}
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Select
                        placeholder="Filtrer par statut"
                        style={{ width: "100%" }}
                        value={filters.statut}
                        onChange={(value) => setFilters({ ...filters, statut: value })}
                        allowClear
                      >
                        <Option value="En attente">En attente</Option>
                        <Option value="En cours d'évaluation">En cours d'évaluation</Option>
                        <Option value="Accepté">Accepté</Option>
                        <Option value="Refusé">Refusé</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Select
                        placeholder="Filtrer par nationalité"
                        style={{ width: "100%" }}
                        value={filters.nationalite}
                        onChange={(value) => setFilters({ ...filters, nationalite: value })}
                        allowClear
                      >
                        <Option value="Française">Française</Option>
                        <Option value="Marocaine">Marocaine</Option>
                        <Option value="Tunisienne">Tunisienne</Option>
                        <Option value="Algérienne">Algérienne</Option>
                        <Option value="Camerounaise">Camerounaise</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Select
                        placeholder="Filtrer par emails envoyés"
                        style={{ width: "100%" }}
                        value={filters.emailsEnvoyes}
                        onChange={(value) => setFilters({ ...filters, emailsEnvoyes: value })}
                        allowClear
                      >
                        <Option value="aucun">Aucun email envoyé</Option>
                        <Option value="un">Un seul email envoyé</Option>
                        <Option value="plusieurs">Plusieurs emails envoyés</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 16 }}>
                    <Col span={24}>
                      <Button
                        onClick={() => setFilters({ search: "", statut: "", nationalite: "", emailsEnvoyes: "" })}
                      >
                        Réinitialiser tous les filtres
                      </Button>
                    </Col>
                  </Row>
                </Card>

                {/* Tableau des candidatures */}
                <Card title={`Candidatures (${pagination.total})`}>
                  <Table
                    columns={columns}
                    dataSource={filteredCandidatures}
                    rowKey="_id"
                    loading={loadingCandidatures}
                    rowSelection={rowSelection}
                    scroll={{ x: 1200 }}
                    pagination={{
                      current: pagination.current,
                      pageSize: pagination.pageSize,
                      total: pagination.total,
                      onChange: (page, pageSize) => loadCandidatures(page, pageSize),
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} candidatures`,
                      responsive: true,
                    }}
                    size="small"
                  />
                </Card>
              </>
            ),
          },
          {
            key: "stats",
            label: "Statistiques",
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Total" value={stats.total} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="En attente" value={stats.enAttente} valueStyle={{ color: "#fa8c16" }} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Acceptées" value={stats.acceptees} valueStyle={{ color: "#52c41a" }} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Refusées" value={stats.refusees} valueStyle={{ color: "#ff4d4f" }} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Aucun email" value={stats.aucunEmail} valueStyle={{ color: "#ff4d4f" }} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Un email" value={stats.unEmail} valueStyle={{ color: "#fa8c16" }} />
                  </Card>
                </Col>
              </Row>
            ),
          },
        ]}
      />

      {/* Modal pour ajouter une candidature */}
      <Modal
        title="Nouvelle Candidature"
        open={showAddModal}
        onCancel={() => {
          setShowAddModal(false)
          form.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCandidature}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nom" label="Nom" rules={[{ required: true, message: "Le nom est requis" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="prenom" label="Prénom" rules={[{ required: true, message: "Le prénom est requis" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "L'email est requis" },
                  { type: "email", message: "Email invalide" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telephone"
                label="Téléphone"
                rules={[{ required: true, message: "Le téléphone est requis" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateNaissance"
                label="Date de naissance"
                rules={[{ required: true, message: "La date de naissance est requise" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationalite"
                label="Nationalité"
                rules={[{ required: true, message: "La nationalité est requise" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="diplomes" label="Diplômes" rules={[{ required: true, message: "Les diplômes sont requis" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="emploiActuel" label="Emploi actuel">
            <Input />
          </Form.Item>

          <Form.Item name="domainesIntervention" label="Domaines d'intervention">
            <Select mode="tags" style={{ width: "100%" }} placeholder="Sélectionnez ou ajoutez des domaines">
              <Option value="Ingénierie de formation">Ingénierie de formation</Option>
              <Option value="Conseil en organisation">Conseil en organisation</Option>
              <Option value="Développement web">Développement web</Option>
              <Option value="Mobile">Mobile</Option>
              <Option value="IA">IA</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="experiencesProfessionnelles"
            label="Expériences professionnelles"
            rules={[{ required: true, message: "Les expériences sont requises" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item name="cv" label="CV (PDF, DOC, DOCX)" rules={[{ required: true, message: "Le CV est requis" }]}>
            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx" maxCount={1}>
              <Button icon={<UploadOutlined />}>Sélectionner le CV</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Ajouter la candidature
              </Button>
              <Button
                onClick={() => {
                  setShowAddModal(false)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal pour voir les détails */}
      <Modal
        title="Détails de la candidature"
        open={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={[
          <Button key="download" icon={<DownloadOutlined />} onClick={() => downloadCV(selectedCandidature)}>
            Télécharger le CV
          </Button>,
          <Button key="close" onClick={() => setShowDetailsModal(false)}>
            Fermer
          </Button>,
        ]}
        width={800}
      >
        {selectedCandidature && (
          <div>
            <Descriptions title="Informations personnelles" bordered column={2}>
              <Descriptions.Item label="Nom complet">
                {selectedCandidature.prenom} {selectedCandidature.nom}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{selectedCandidature.email}</Descriptions.Item>
              <Descriptions.Item label="Téléphone">{selectedCandidature.telephone}</Descriptions.Item>
              <Descriptions.Item label="Date de naissance">
                {moment(selectedCandidature.dateNaissance).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Nationalité">{selectedCandidature.nationalite}</Descriptions.Item>
              <Descriptions.Item label="Statut">
                <Tag color={getStatusColor(selectedCandidature.statut)}>{selectedCandidature.statut}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Emails envoyés">
                <Badge
                  count={selectedCandidature.emailsEnvoyes || 0}
                  style={{ backgroundColor: getEmailBadgeColor(selectedCandidature.emailsEnvoyes || 0) }}
                />
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Formation et expérience" bordered column={1}>
              <Descriptions.Item label="Diplômes">{selectedCandidature.diplomes}</Descriptions.Item>
              {selectedCandidature.emploiActuel && (
                <Descriptions.Item label="Emploi actuel">{selectedCandidature.emploiActuel}</Descriptions.Item>
              )}
              {selectedCandidature.domainesIntervention.length > 0 && (
                <Descriptions.Item label="Domaines d'intervention">
                  {selectedCandidature.domainesIntervention.map((domaine, index) => (
                    <Tag key={index} color="blue" style={{ margin: "2px" }}>
                      {domaine}
                    </Tag>
                  ))}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Expériences professionnelles">
                <div style={{ whiteSpace: "pre-wrap" }}>{selectedCandidature.experiencesProfessionnelles}</div>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Informations sur le CV" bordered column={2}>
              <Descriptions.Item label="Nom du fichier">
                <Space>
                  <FileTextOutlined />
                  {selectedCandidature.cvOriginalName}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Taille">
                {(selectedCandidature.cvSize / 1024 / 1024).toFixed(2)} MB
              </Descriptions.Item>
              <Descriptions.Item label="Type">{selectedCandidature.cvMimeType}</Descriptions.Item>
              <Descriptions.Item label="Date de création">
                {moment(selectedCandidature.dateCreation).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Modal pour envoyer des emails */}
      <EmailSender
        visible={showEmailModal}
        onCancel={() => {
          setShowEmailModal(false)
          setSelectedCandidatures([])
        }}
        candidatures={selectedCandidatures}
        onSuccess={onEmailSent}
      />
    </div>
  )
}

export default CandidaturesAdmin
