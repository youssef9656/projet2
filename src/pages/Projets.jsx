import { Row, Col, Card, Typography, Tag, Button, Timeline, Progress } from "antd"
import { CalendarOutlined, EnvironmentOutlined, TeamOutlined, TrophyOutlined, EyeOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

export default function Projets() {
  const projetsEnCours = [
    {
      title: "Modernisation de la Formation Hôtelière",
      client: "Ministère du Tourisme",
      description:
        "Refonte complète des programmes de formation dans le secteur hôtelier avec approche par compétences",
      statut: "En cours",
      progression: 75,
      duree: "18 mois",
      lieu: "Casablanca, Marrakech",
      equipe: "12 experts",
      tags: ["Hôtellerie", "APC", "Formation"],
    },
    {
      title: "Centre d'Excellence en Agriculture",
      client: "Région Souss-Massa",
      description: "Création d'un centre de formation agricole moderne avec équipements de pointe",
      statut: "En cours",
      progression: 45,
      duree: "24 mois",
      lieu: "Agadir",
      equipe: "8 experts",
      tags: ["Agriculture", "Centre", "Équipements"],
    },
    {
      title: "Programme d'Insertion Professionnelle",
      client: "ANAPEC",
      description: "Développement d'un programme national d'insertion pour les jeunes diplômés",
      statut: "En cours",
      progression: 60,
      duree: "12 mois",
      lieu: "National",
      equipe: "15 experts",
      tags: ["Insertion", "Jeunes", "Emploi"],
    },
  ]

  const projetsRealises = [
    {
      title: "Réforme de la Formation Professionnelle",
      client: "OFPPT",
      annee: "2023",
      description: "Accompagnement dans la mise en place de l'approche par compétences dans 50 établissements",
      resultats: ["2000+ formateurs formés", "50 établissements modernisés", "100+ programmes révisés"],
      impact: "Amélioration de 40% du taux d'insertion",
    },
    {
      title: "Développement de l'Artisanat",
      client: "Ministère de l'Artisanat",
      annee: "2022",
      description: "Création de centres de formation artisanale avec certification internationale",
      resultats: ["10 centres créés", "500+ artisans formés", "Certification ISO obtenue"],
      impact: "Augmentation de 60% des revenus des artisans",
    },
    {
      title: "Formation des Cadres Éducatifs",
      client: "Ministère de l'Éducation",
      annee: "2021",
      description: "Programme de renforcement des capacités des cadres pédagogiques",
      resultats: ["1000+ cadres formés", "20 régions couvertes", "Outils pédagogiques développés"],
      impact: "Amélioration de la qualité éducative",
    },
  ]

  const timeline = [
    {
      color: "blue",
      children: (
        <div>
          <Title level={5}>2024 - Expansion Régionale</Title>
          <Paragraph>Extension de nos activités vers l'Afrique de l'Ouest</Paragraph>
        </div>
      ),
    },
    {
      color: "green",
      children: (
        <div>
          <Title level={5}>2023 - Certification ISO</Title>
          <Paragraph>Obtention de la certification ISO 9001 pour nos processus</Paragraph>
        </div>
      ),
    },
    {
      color: "orange",
      children: (
        <div>
          <Title level={5}>2022 - Partenariat International</Title>
          <Paragraph>Signature d'accords avec des universités canadiennes</Paragraph>
        </div>
      ),
    },
    {
      color: "purple",
      children: (
        <div>
          <Title level={5}>2020 - Création CIDE Maroc</Title>
          <Paragraph>Lancement officiel de nos activités au Maroc</Paragraph>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: "40px 0" }}>
      {/* Header */}
      <section style={{ padding: "60px 0", background: "#f8f9fa", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={1}>Nos Projets</Title>
          <Paragraph style={{ fontSize: "1.2rem", color: "#666", maxWidth: "800px", margin: "0 auto" }}>
            Découvrez nos réalisations et projets en cours qui transforment l'éducation et la formation au Maroc
          </Paragraph>
        </div>
      </section>

      {/* Projets en cours */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ marginBottom: "40px" }}>
            Projets en Cours
          </Title>

          <Row gutter={[32, 32]}>
            {projetsEnCours.map((projet, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card
                  hoverable
                  style={{ height: "100%", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  actions={[
                    <Button type="link" icon={<EyeOutlined />} key="view">
                      Voir détails
                    </Button>,
                  ]}
                >
                  <div style={{ marginBottom: "16px" }}>
                    <Tag color="processing">{projet.statut}</Tag>
                  </div>

                  <Title level={4} style={{ marginBottom: "12px" }}>
                    {projet.title}
                  </Title>

                  <Paragraph style={{ color: "#666", marginBottom: "20px" }}>{projet.description}</Paragraph>

                  <div style={{ marginBottom: "20px" }}>
                    <Paragraph strong style={{ marginBottom: "8px" }}>
                      Progression: {projet.progression}%
                    </Paragraph>
                    <Progress percent={projet.progression} strokeColor="#1890ff" />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <CalendarOutlined style={{ marginRight: "8px", color: "#666" }} />
                      <span>{projet.duree}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <EnvironmentOutlined style={{ marginRight: "8px", color: "#666" }} />
                      <span>{projet.lieu}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                      <TeamOutlined style={{ marginRight: "8px", color: "#666" }} />
                      <span>{projet.equipe}</span>
                    </div>
                  </div>

                  <div>
                    {projet.tags.map((tag, idx) => (
                      <Tag key={idx} color="blue" style={{ marginBottom: "4px" }}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Projets réalisés */}
      <section style={{ padding: "80px 0", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ marginBottom: "40px" }}>
            Projets Réalisés
          </Title>

          <Row gutter={[32, 32]}>
            {projetsRealises.map((projet, index) => (
              <Col xs={24} key={index}>
                <Card
                  style={{ border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  bodyStyle={{ padding: "32px" }}
                >
                  <Row gutter={[32, 0]} align="middle">
                    <Col xs={24} md={16}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <Title level={3} style={{ margin: 0, marginRight: "16px" }}>
                          {projet.title}
                        </Title>
                        <Tag color="success">{projet.annee}</Tag>
                      </div>

                      <Paragraph style={{ fontSize: "1.1rem", color: "#666", marginBottom: "20px" }}>
                        {projet.description}
                      </Paragraph>

                      <Title level={5} style={{ marginBottom: "12px" }}>
                        Résultats obtenus :
                      </Title>
                      <ul style={{ marginBottom: "16px" }}>
                        {projet.resultats.map((resultat, idx) => (
                          <li key={idx} style={{ marginBottom: "4px" }}>
                            {resultat}
                          </li>
                        ))}
                      </ul>
                    </Col>

                    <Col xs={24} md={8}>
                      <Card
                        size="small"
                        style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
                        bodyStyle={{ textAlign: "center" }}
                      >
                        <TrophyOutlined style={{ fontSize: "2rem", color: "#1890ff", marginBottom: "12px" }} />
                        <Title level={5} style={{ marginBottom: "8px" }}>
                          Impact
                        </Title>
                        <Paragraph style={{ margin: 0, fontWeight: "bold", color: "#1890ff" }}>
                          {projet.impact}
                        </Paragraph>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "60px" }}>
            Notre Évolution
          </Title>

          <Timeline mode="left" items={timeline} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "#1890ff", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ color: "white" }}>
            Votre Projet, Notre Expertise
          </Title>
          <Paragraph style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", marginBottom: "40px" }}>
            Discutons de votre projet et voyons comment nous pouvons vous accompagner vers le succès
          </Paragraph>
          <Button type="primary" size="large" ghost style={{ height: "50px", fontSize: "16px" }}>
            Démarrer un projet
          </Button>
        </div>
      </section>
    </div>
  )
}
