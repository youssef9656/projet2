import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="logo-animation">
          <div className="letter-container">
            <span className="letter letter-i">I</span>
            <span className="letter letter-f">F</span>
            <span className="letter letter-p">P</span>
            <span className="letter letter-e">E</span>
          </div>
          <div className="cube-animation">
            <div className="cube cube-1"></div>
            <div className="cube cube-2"></div>
            <div className="cube cube-3"></div>
          </div>
        </div>
        <div className="loading-text">Chargement...</div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
