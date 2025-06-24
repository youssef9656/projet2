import { Layout, Row, Col, Typography, Divider, Space } from "antd"
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import "./Footer.css"

const { Footer } = Layout
const { Text, Title } = Typography

export default function AppFooter() {
  return (
    <Footer className="site-footer">
      <div className="footer-container">
        <Row gutter={[40, 40]}>
          {/* Colonne 1 - Logo et description */}
          <Col xs={24} md={8}>
            <div className="footer-logo">
              <div className="logo-container" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{ height: "60px", marginBottom: "10px" }}
                />
                <Title
                  level={3}
                  style={{ color: "var(--white)", marginLeft: "12px", marginBottom: 0 }}
                >
                  IFPE
                </Title>
              </div>
              <Text strong style={{ color: "var(--white)", display: "block", marginBottom: "8px" }}>
                MANYANI Mohamed – Fondateur, Consultant, Expert méthodologue
              </Text>
              <Text className="footer-description">
                Institut de Formation Professionnelle et d'Excellence - Spécialistes en ingénierie
                de formation et coaching professionnel pour transformer vos compétences et
                développer votre potentiel.
              </Text>
            </div>
            <Space size="middle" className="footer-social">
              <a href="#">
                <FacebookOutlined />
              </a>
              <a href="#">
                <TwitterOutlined />
              </a>
              <a href="#">
                <LinkedinOutlined />
              </a>
              <a href="#">
                <InstagramOutlined />
              </a>
            </Space>
          </Col>

          {/* Colonne 2 - Liens rapides */}
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">
              Liens rapides
            </Title>
            <div className="footer-links">
              <Link to="/">Accueil</Link>
              <Link to="/services">Nos services</Link>
              <Link to="/atouts">Nos atouts</Link>
              <Link to="/contact" style={{ marginTop: "10px", display: "block" }}>
                Contact
              </Link>
            </div>
          </Col>

          {/* Colonne 3 - Contact */}
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">
              Contactez-nous
            </Title>
            <div className="footer-contact">
              <Space direction="vertical" size="middle">
                <Text>
                  <PhoneOutlined /> +212 (0) 661 22 74 96
                </Text>
                <Text>
                  <PhoneOutlined /> +212 (0) 627 15 01 30
                </Text>
                <Text>
                  <MailOutlined /> ifep.consulting@multiconsul.com
                </Text>
                <Text>
                  <EnvironmentOutlined /> Lot El Houda, Résidence Nadia, Immeuble B, Appartement
                  N°81, Boulevard Mohamed Belafrej, Sidi Maarouf, Casablanca – Maroc
                </Text>
              </Space>
            </div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        {/* Copyright */}
        <div className="footer-copyright">
          <Row justify="space-between" align="middle">
            <Col>
              <Text>© {new Date().getFullYear()} IFPE Formation. Tous droits réservés.</Text>
            </Col>
            <Col>
              <Space size="middle">
                <Link to="/mentions-legales">Mentions légales</Link>
                <Link to="/confidentialite">Politique de confidentialité</Link>
                <Link to="/cgu">CGU</Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  )
}
