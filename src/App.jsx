import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";

// Composants globaux
import Loader from "./components/Loader";
import FloatingChatBot from "./components/FloatingChatBot";
import ScrollToTopAdvanced from "./components/ScrollToTopAdvanced";

// Pages publiques
import Accueil from "./pages/Accueil";
import Services from "./pages/Services";
import Atouts from "./pages/Atouts";
import QuiSommesNous from "./pages/QuiSommesNous";
import QueFaisonsNous from "./pages/QueFaisonsNous";
import PourquoiNousFaireConfiance from "./pages/PourquoiNousFaireConfiance";
import Realisations from "./pages/Realisations";
import Contact from "./pages/Contact";
import Candidature from "./pages/Candidature";
import Brand from "./pages/Brand";
import NotFound from "./pages/NotFound/NotFound";

// Pages admin
import Login from "./pages/admine/Login";
import Dashboard from "./pages/admine/Dashboard";
import CandidaturesAdmin from "./pages/admine/candidatures/candidatures";
import ContactsTable from "./pages/admine/candidatures/contactsALL";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter basename="/projet2">
      <Routes>
        {/* Site public */}
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
          <Route path="Brand" element={<Brand />} />
          <Route path="ifpe/admin/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Espace admin */}
        <Route path="/ifpe/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="CandidaturesAdmin" element={<CandidaturesAdmin />} />
          <Route path="ContactsTable" element={<ContactsTable />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Composants globaux */}
      <FloatingChatBot />
      <ScrollToTopAdvanced />
    </BrowserRouter>
  );
}