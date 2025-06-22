import { Row, Col, Card, Typography, Avatar, Tag, Button } from "antd"
import { LinkedinOutlined, MailOutlined, TrophyOutlined, BookOutlined, GlobalOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

export default function Equipe() {
  const dirigeants = [
    {
      nom: "Dr. Mohamed ALAMI",
      poste: "Directeur Général",
      photo: "/placeholder.svg?height=200&width=200",
      experience: "30+ ans",
      specialites: ["Formation Professionnelle", "Réformes Éducatives", "Gestion de Projets"],
      description:
        "Expert reconnu en développement éducatif avec plus de 30 ans d'expérience. Ancien conseiller auprès du Ministère de l'Éducation, il a dirigé de nombreuses réformes structurelles.",
      formations: ["PhD en Sciences de l'Éducation - Université Laval", "MBA - HEC Montréal"],
      langues: ["Français", "Arabe", "Anglais"],
    },
    {
      nom: "Sarah BENALI",
      poste: "Directrice des Opérations",
      photo: "/placeholder.svg?height=200&width=200",
      experience: "15+ ans",
      specialites: ["Ingénierie Pédagogique", "Formation par Compétences", "Gestion d'Équipe"],
      description:
        "Spécialiste en ingénierie de formation et approche par compétences. Elle supervise la mise en œuvre de tous nos projets avec une expertise reconnue.",
      formations: ["Master en Ingénierie Pédagogique - Université de Montréal", "Licence en Psychologie"],
      langues: ["Français", "Arabe", "Anglais"],
    },
  ]

  const experts = [
    {
      nom: "Karim TAZI",
      poste: "Expert en Formation Hôtelière",
      specialites: ["Hôtellerie", "Tourisme", "Service Client"],
      experience: "12 ans",
    },
    {
      nom: "Fatima IDRISSI",
      poste: "Consultante en Agriculture",
      specialites: ["Agriculture", "Développement Rural", "Coopératives"],
      experience: "10 ans",
    },
    {
      nom: "Ahmed BENJELLOUN",
      poste: "Spécialiste en Artisanat",
      specialites: ["Artisanat", "Patrimoine", "Innovation"],
      experience: "8 ans",
    },
    {
      nom: "Laila MANSOURI",
      poste: "Experte en Insertion Professionnelle",
      specialites: ["Emploi", "Jeunesse", "Entrepreneuriat"],
      experience: "11 ans",
    },
    {
      nom: "Youssef ALAOUI",
      poste: "Consultant en Technologies",
      specialites: ["Digital", "Innovation", "E-learning"],
      experience: "9 ans",
    },
    {
      nom: "Nadia BERRADA",
      poste: "Formatrice Senior",
      specialites: ["Pédagogie", "Formation de Formateurs", "Évaluation"],
      experience: "14 ans",
    },
  ]

  const valeurs = [
    {
      icon: <TrophyOutlined style={{ fontSize: "2rem", color: "#1890ff" }} />,
      titre: "Excellence",
      description: "Nous visons l'excellence dans tous nos projets et accompagnements",
    },
    {
      icon: <BookOutlined style={{ fontSize: "2rem", color: "#52c41a" }} />,
      titre: "Innovation",
      description: "Nous intégrons les dernières innovations pédagogiques et technologiques",
    },
    {
      icon: <GlobalOutlined style={{ fontSize: "2rem", color: "#fa8c16" }} />,
      titre: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos partenaires et clients",
    },
  ]

  return (
    <div style={{ padding: "40px 0" }}>
      {/* Header */}
      <section style={{ padding: "60px 0", background: "#f8f9fa", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={1}>Notre Équipe</Title>
          <Paragraph style={{ fontSize: "1.2rem", color: "#666", maxWidth: "800px", margin: "0 auto" }}>
            Une équipe d'experts passionnés et expérimentés, dédiée à transformer l'éducation et la formation
            professionnelle
          </Paragraph>
        </div>
      </section>

      {/* Équipe dirigeante */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "60px" }}>
            Équipe Dirigeante
          </Title>

          <Row gutter={[48, 48]}>
            {dirigeants.map((membre, index) => (
              <Col xs={24} lg={12} key={index}>
                <Card
                  style={{ height: "100%", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  bodyStyle={{ padding: "32px" }}
                >
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <Avatar size={120} src={membre.photo} style={{ marginBottom: "16px" }} />
                    <Title level={3} style={{ marginBottom: "8px" }}>
                      {membre.nom}
                    </Title>
                    <Title level={5} style={{ color: "#1890ff", marginBottom: "8px" }}>
                      {membre.poste}
                    </Title>
                    <Tag color="blue">{membre.experience} d'expérience</Tag>
                  </div>

                  <Paragraph style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
                    {membre.description}
                  </Paragraph>

                  <div style={{ marginBottom: "20px" }}>
                    <Title level={5} style={{ marginBottom: "12px" }}>
                      Spécialités :
                    </Title>
                    <div>
                      {membre.specialites.map((spec, idx) => (
                        <Tag key={idx} color="processing" style={{ marginBottom: "4px" }}>
                          {spec}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <Title level={5} style={{ marginBottom: "12px" }}>
                      Formation :
                    </Title>
                    <ul style={{ paddingLeft: "20px" }}>
                      {membre.formations.map((formation, idx) => (
                        <li key={idx} style={{ marginBottom: "4px", color: "#666" }}>
                          {formation}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <Title level={5} style={{ marginBottom: "12px" }}>
                      Langues :
                    </Title>
                    <div>
                      {membre.langues.map((langue, idx) => (
                        <Tag key={idx} style={{ marginBottom: "4px" }}>
                          {langue}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <Button type="link" icon={<LinkedinOutlined />} style={{ marginRight: "8px" }}>
                      LinkedIn
                    </Button>
                    <Button type="link" icon={<MailOutlined />}>
                      Contact
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Experts et consultants */}
      <section style={{ padding: "80px 0", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "60px" }}>
            Nos Experts & Consultants
          </Title>

          <Row gutter={[24, 24]}>
            {experts.map((expert, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card hoverable style={{ height: "100%", textAlign: "center" }} bodyStyle={{ padding: "24px" }}>
                  <Avatar size={80} style={{ backgroundColor: "#1890ff", marginBottom: "16px" }}>
                    {expert.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Title level={4} style={{ marginBottom: "8px" }}>
                    {expert.nom}
                  </Title>
                  <Paragraph style={{ color: "#1890ff", marginBottom: "12px", fontWeight: "bold" }}>
                    {expert.poste}
                  </Paragraph>
                  <Tag color="orange" style={{ marginBottom: "16px" }}>
                    {expert.experience} d'expérience
                  </Tag>
                  <div>
                    {expert.specialites.map((spec, idx) => (
                      <Tag key={idx} color="blue" style={{ marginBottom: "4px" }}>
                        {spec}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Nos valeurs */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "60px" }}>
            Nos Valeurs
          </Title>

          <Row gutter={[32, 32]}>
            {valeurs.map((valeur, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  style={{
                    height: "100%",
                    textAlign: "center",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                  bodyStyle={{ padding: "40px 24px" }}
                >
                  <div style={{ marginBottom: "20px" }}>{valeur.icon}</div>
                  <Title level={4} style={{ marginBottom: "16px" }}>
                    {valeur.titre}
                  </Title>
                  <Paragraph style={{ color: "#666" }}>{valeur.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Rejoindre l'équipe */}
      <section style={{ padding: "80px 0", background: "#1890ff", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ color: "white" }}>
            Rejoignez Notre Équipe
          </Title>
          <Paragraph style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", marginBottom: "40px" }}>
            Nous recherchons constamment des experts passionnés pour renforcer notre équipe et accompagner nos clients
            vers l'excellence
          </Paragraph>
          <Button type="primary" size="large" ghost style={{ height: "50px", fontSize: "16px" }}>
            Voir les opportunités
          </Button>
        </div>
      </section>
    </div>
  )
}
