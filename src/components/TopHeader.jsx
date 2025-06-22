// src/components/TopHeader.jsx
import { MailOutlined, PhoneOutlined, PrinterOutlined } from "@ant-design/icons";
import "./TopHeader.css";

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="top-header-content">
        <div className="logo-left">
          <div  alt="Logo" className="top-logo" />
        </div>
        <div className="contact-info">
          <div className="info-item">
            <PhoneOutlined /> <span>(+212) 5 22 94 11 71</span>
          </div>
          <div className="info-item">
            <PrinterOutlined /> <span>(+212) 5 22 39 60 22</span>
          </div>
          <div className="info-item">
            <MailOutlined /> <span>cide@cide.ma</span>
          </div>
        </div>
      </div>
    </div>
  );
}
