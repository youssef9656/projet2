// src/components/NavbarAdmin.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, theme, Row, Col, Grid } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import "./NavbarAdmin.css";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function NavbarAdmin() {
  const [current, setCurrent] = useState("dashboard");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const { handleLogout } = useAuth();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Active menu based on route
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    setCurrent(path);
  }, [location]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔧 Fermer le menu mobile quand on revient en desktop
  useEffect(() => {
    if (screens.md) {
      setMobileMenuVisible(false);
    }
  }, [screens.md]);

  // Ajout confirmation avant déconnexion
  const onLogout = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmed) {
      await handleLogout(true);
      setMobileMenuVisible(false);
    }
  };

  const items = [
    {
      label: <Link to="/ifpe/admin/dashboard">ACCUEIL</Link>,
      key: "dashboard",
    },
    {
      label: <Link to="/ifpe/admin/ContactsTable">Contacts</Link>,
      key: "statistiques",
    },
    {
      label: <Link to="/ifpe/admin/CandidaturesAdmin">Candidatures</Link>,
      key: "users",
    },
    // {
    //   label: <Link to="/admin/settings">PARAMÈTRES</Link>,
    //   key: "settings",
    //   icon: <SettingOutlined />,
    // },
    {
      label: (
        <span onClick={onLogout} style={{ cursor: "pointer", color: "#ff4d4f" }}>
          DÉCONNEXION
        </span>
      ),
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
    },
  ];

  const onClick = (e) => {
    if (e.key !== "logout") {
      setCurrent(e.key);
    }
    if (!screens.md) {
      setMobileMenuVisible(false);
    }
  };

  return (
    <>
      {/* Top info bar */}
      <div className="top-info-bar">
        <div className="container">
          <Row gutter={20} align="middle" justify="center">
            <Col>
              <span>Admin Panel - Gestion du site</span>
            </Col>
          </Row>
        </div>
      </div>

      {/* Navigation */}
      <Header
        className={`navbar-admin ${scrolled ? "scrolled" : ""}`}
        style={{
          background: colorBgContainer,
          padding: "0 20px",
        }}
      >
        <div className="navbar-container">
          <div className="logo">
            <Link to="/admin/dashboard">
              <img 
                src="/logo1.png" 
                alt="Logo Admin" 
                className="logo-image" 
              />
            </Link>
          </div>

          {/* Desktop menu */}
          {screens.md && (
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              className="desktop-menu"
              theme="light"
            />
          )}

          {/* Mobile menu button */}
          {!screens.md && (
            <div 
              className="mobile-menu-button" 
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            >
              {mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
            </div>
          )}
        </div>

        {/* Overlay */}
        <div 
          className={`mobile-menu-overlay ${mobileMenuVisible ? "visible" : ""}`} 
          onClick={() => setMobileMenuVisible(false)}
        ></div>

        {/* Mobile menu */}
        {!screens.md && (
          <div className={`mobile-menu ${mobileMenuVisible ? "open" : ""}`}>
            <Menu 
              onClick={onClick} 
              selectedKeys={[current]} 
              mode="inline" 
              items={items} 
            />
          </div>
        )}
      </Header>
    </>
  );
}
