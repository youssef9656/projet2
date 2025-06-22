import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Menu
      mode="horizontal"
      theme="light"
      selectedKeys={[selectedKey]}
      style={{ position: 'sticky', top: 0, zIndex: 999, boxShadow: '0 2px 8px #f0f1f2' }}
    >
      <Menu.Item key="/">
        <Link to="/">Accueil</Link>
      </Menu.Item>
      <Menu.Item key="/services">
        <Link to="/services">Nos Services</Link>
      </Menu.Item>
      <Menu.Item key="/projets">
        <Link to="/projets">Projets</Link>
      </Menu.Item>
      <Menu.Item key="/equipe">
        <Link to="/equipe">Qui sommes-nous ?</Link>
      </Menu.Item>
      <Menu.Item key="/contact">
        <Link to="/contact">Contact</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
