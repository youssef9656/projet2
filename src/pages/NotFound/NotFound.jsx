import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Vous pouvez implémenter votre logique de recherche ici
      console.log('Recherche:', searchTerm);
    }
  };

  if (!mounted) return null;

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Logo avec animation
        <div className="logo-container animate-bounce">
          <img
            src="logo1.png"
            alt="IFPE Logo"
            className="logo"
          />
        </div> */}

        {/* Numéro 404 avec animation */}
        <div className="error-number-container">
          <h1 className="error-number-bg">404</h1>
          <div className="error-number-overlay">
            <div className="error-title">Page non trouvée</div>
          </div>
        </div>

        {/* Message avec animation */}
        <div className="message-container animate-slide-up">
          <p className="message-primary">
            Oops ! Il semble que la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <p className="message-secondary">
            Ne vous inquiétez pas, nous sommes là pour vous aider à retrouver votre chemin.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="buttons-container animate-fade-in-delayed">
          <button
            onClick={handleGoHome}
            className="btn btn-primary"
          >
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l'accueil
          </button>

          <button
            onClick={handleGoBack}
            className="btn btn-secondary"
          >
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Page précédente
          </button>
        </div>

        {/* Barre de recherche
        <div className="search-container animate-slide-up-delayed">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher une page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </div> */}

        {/* Éléments décoratifs */}
        <div className="decoration decoration-1 animate-float"></div>
        <div className="decoration decoration-2 animate-float-delayed"></div>
        <div className="decoration decoration-3 animate-float-slow"></div>
      </div>
    </div>
  );
};

export default NotFound;
