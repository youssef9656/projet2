// src/components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import "./Layout.css"; // 👈 importe ton fichier CSS

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout-containerY">
      <Navbar />
      <main className="main-contentY">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
