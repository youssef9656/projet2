// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Services from "./pages/Services";
import Atouts from "./pages/Atouts";
import QuiSommesNous from "./pages/QuiSommesNous";
import QueFaisonsNous from "./pages/QueFaisonsNous"
import PourquoiNousFaireConfiance from "./pages/PourquoiNousFaireConfiance"
import Realisations from "./pages/Realisations";
import ChatBot from "./pages/ChatBot";

import Contact from "./pages/Contact";
import FloatingChatBot from "./components/FloatingChatBot"
import Candidature from "./pages/Candidature" // Ajouter l'import


// Ajouter les imports
// import ScrollToTop from "./components/ScrollToTop"
// ou pour la version avancée :
import ScrollToTopAdvanced from "./components/ScrollToTopAdvanced"
import Brand from "./pages/Brand"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'




export default function App() {
  return (
    <BrowserRouter basename="/projet2">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="services" element={<Services />} />
          <Route path="atouts" element={<Atouts />} />
          <Route path="QuiSommesNous" element={<QuiSommesNous />} />
          <Route path="QueFaisonsNous" element={<QueFaisonsNous />} />
          <Route path="PourquoiNousFaireConfiance" element={<PourquoiNousFaireConfiance />} />
          <Route path="Realisations" element={<Realisations />} />
          <Route path="Candidature" element={<Candidature />} />
          <Route path="contact" element={<Contact />} />
          <Route path="ChatBot" element={<ChatBot />} />
          <Route path="Brand" element={<Brand />} />
                    <Route path="Login" element={<Login />} />          
                              <Route path="Dashboard" element={<Dashboard />} />



          

        </Route>
      </Routes>
       <FloatingChatBot />
        <ScrollToTopAdvanced />

    </BrowserRouter>
  );
}
