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
import "./Footer.css"

const { Footer } = Layout
const { Text, Link, Title } = Typography

export default function AppFooter() {
  return (
    <Footer className="site-footer">
      <div className="footer-container">
        <Row gutter={[40, 40]}>
          {/* Colonne 1 - Logo et description */}
          <Col xs={24} md={8}>
            <div className="footer-logo">
              <div className="logo-container">
            <img src="/logo.png" alt="Logo" style={{ height: "60px" ,marginBottom :"10px"}} />               
     <Title level={3} style={{ color: "var(--white)", marginLeft: "12px" }}>
                  IFPE 
                </Title>
              </div>
              <Text className="footer-description">
                Institut de Formation Professionnelle et d'Excellence - Spécialistes en ingénierie de formation et
                coaching professionnel pour transformer vos compétences et développer votre potentiel.
              </Text>
            </div>
            <Space size="middle" className="footer-social">
              <Link href="#">
                <FacebookOutlined />
              </Link>
              <Link href="#">
                <TwitterOutlined />
              </Link>
              <Link href="#">
                <LinkedinOutlined />
              </Link>
              <Link href="#">
                <InstagramOutlined />
              </Link>
            </Space>
          </Col>

          {/* Colonne 2 - Liens rapides */}
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">
              Liens rapides
            </Title>
            <div className="footer-links">
              <Link href="/formations">Nos formations</Link>
              <Link href="/methodologie">Notre méthodologie</Link>
              <Link href="/coaching">Coaching professionnel</Link>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contactez-nous</Link>
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
                  <PhoneOutlined /> +212 6 12 34 56 78
                </Text>
                <Text>
                  <MailOutlined /> contact@ifpeformation.ma
                </Text>
                <Text>
                  <EnvironmentOutlined /> 123 Avenue de la Formation, Casablanca
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
                <Link href="/mentions-legales">Mentions légales</Link>
                <Link href="/confidentialite">Politique de confidentialité</Link>
                <Link href="/cgu">CGU</Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  )
}
