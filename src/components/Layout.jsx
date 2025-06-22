// src/components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopHeader from "./TopHeader";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="">
      {/* <TopHeader/> */}
            <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
