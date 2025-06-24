import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer"; // ou un footer admin
import "./Loader.css";

export default function AdminLayout() {
  return (
    <>
      <div className="layout-containerY">
      <NavbarAdmin />
      <main className="main-contentY" style={{marginTop: "80px"}}>
        <Outlet />
      </main>
      <Footer />
      </div>
    </>
  );
}
    