// src/components/Navbar.jsx 
import { Link } from "react-router-dom";
import { Layout, Menu, theme, Row, Col } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./Navbar.css";

const { Header } = Layout;

export default function Navbar() {
  const [current, setCurrent] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  // Ferme le menu mobile si on repasse à l'écran large
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 992;
      setIsMobile(isNowMobile);
      if (!isNowMobile) {
        setMobileMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Change navbar avec scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      label: <Link to="/">ACCUEIL</Link>,
      key: "accueil",
    },
    {
      label: <Link to="/services">NOS SERVICES</Link>,
      key: "services",
    },
    {
      label: <Link to="/atouts">NOS ATOUTS</Link>,
      key: "atouts",
    },
    {
      label: <span>NOTRE CABINET</span>,
      key: "cabinet",
      children: [
        {
          label: <Link to="/QuiSommesNous">Qui sommes-nous ?</Link>,
          key: "quisommesnous",
        },
        {
          label: <Link to="/QueFaisonsNous">Que faisons-nous ?</Link>,
          key: "quefaisonsnous",
        },
        {
          label: <Link to="/PourquoiNousFaireConfiance">Pourquoi nous faire confiance ?</Link>,
          key: "confiance",
        },
      ],
    },
    {
      label: <span>NOS RÉALISATIONS</span>,
      key: "realisations",
      children: [
        {
          label: <Link to="/Realisations">Projets Clés</Link>,
          key: "projets",
        },
        {
          label: <Link to="/candidature">Candidature</Link>,
          key: "candidature",
        },
      ],
    },
    {
      label: <Link to="/contact">CONTACT</Link>,
      key: "contact",
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
    setMobileMenuVisible(false);
  };

  return (
    <>
      {/* Barre d'info en haut */}
      <div className="top-info-bar">
        <div className="container">
          <Row gutter={20} align="middle">
            <Col xs={24} sm={10}>
              <div className="info-item">
                <EnvironmentOutlined className="info-icon" />
                <span> Lot El Houda, Appt. 81, Casablanca – Maroc</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="info-item">
                <PhoneOutlined className="info-icon" />
                <span>+212 (0) 661 22 74 96  & <PhoneOutlined className="info-icon" /> +212 (0) 627 15 01 30 </span>
              </div>
              
            </Col>
            <Col xs={20} sm={6}>
              <div className="info-item">
                <MailOutlined className="info-icon" />
                <span>ifep.consulting@multiconsul.com</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <Header
        className={`navbar ${scrolled ? "scrolled" : ""} ${mobileMenuVisible ? "mobile-menu-open" : ""}`}
        style={{
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">
              <img src="/logo1.png" alt="Logo" className="logo-image" />
            </Link>
          </div>

          <div className="menu-container">
            {!isMobile && (
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                className="desktop-menu"
              />
            )}

            {isMobile && (
              <div
                className={`mobile-menu-button ${mobileMenuVisible ? "open" : ""}`}
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          {isMobile && (
            <div className={`mobile-menu ${mobileMenuVisible ? "open" : ""}`}>
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="inline"
                items={items}
              />
            </div>
          )}
        </div>
      </Header>
    </>
  );
}
