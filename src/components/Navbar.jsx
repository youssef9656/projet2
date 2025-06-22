// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { Layout, Menu, theme, Space, Avatar } from "antd";
import { HomeOutlined, UserOutlined, SolutionOutlined, ProjectOutlined, ContactsOutlined, TeamOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./Navbar.css";

const { Header } = Layout;

export default function Navbar() {
  const [current, setCurrent] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

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
      label: <Link to="/services">Nos Services</Link>,
      key: "apropos",
    },
       {
      label: <Link to="/atouts">Nos Atouts</Link>,
      key: "realisations",
    },
    {
      label: <span>À la découverte de notre cabinet</span>,
      key: "domaines",
      children: [
        {
          label: <Link to="/QuiSommesNous">Qui sommes-nous ?</Link>,
          key: "education",
        },
        {
          label: <Link to="/QueFaisonsNous">Que faisons-nous ?</Link>,
          key: "appui",
        },
        {
          label: <Link to="/PourquoiNousFaireConfiance">Pourquoi nous faire confiance ?</Link>,
          key: "emploi",
        },
      ],
    },
       {
      label: <span>Implication et Réalisations</span>,
      key: "Implication",
      children: [
        {
         label: <Link to="/Realisations">Réalisations & Projets Clés</Link>,
          key: "Realisations",
        },
  
        {
      label: <Link to="/candidature">candidature</Link>,
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
    <Header
      className={`app-header scrolled ${mobileMenuVisible ? "mobile-menu-open" : ""}`}
      style={{
        position: "fixed",
        zIndex: 1000,
        width: "100%",
        padding: "0",
        transition: "all 0.3s ease",
        boxShadow: "rgb(255, 255, 255)",
        background: "rgba(255, 255, 255, 0.9)",
        height: "80px",
        lineHeight: "80px",
      }}
    >
      <div className="header-content">
        <div className="logo-container">
  <img 
    src="logo1.png" 
    alt="Logo" 
    style={{ height: "60px" }}
  />
        </div>

        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="desktop-menu"
          style={{
            borderBottom: "none",
            lineHeight: "80px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#333",
            width: "100%",
            justifyContent: "center",
            
          }}
        />

        <div 
          className="mobile-menu-button" 
          onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
        >
          <div className={`menu-icon-bar ${mobileMenuVisible ? "open" : ""}`} />
          <div className={`menu-icon-bar ${mobileMenuVisible ? "open" : ""}`} />
          <div className={`menu-icon-bar ${mobileMenuVisible ? "open" : ""}`} />
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuVisible && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            right: 0,
            background: "white",
            borderTop: "1px solid #f0f0f0",
            zIndex: 1000,
          }}
        />
      )}
    </Header>
  );
}
