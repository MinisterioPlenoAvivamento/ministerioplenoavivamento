import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Media from './pages/Media';
import Give from './pages/Give';
import Contact from './pages/Contact';
import Live from './pages/Live';
import WeeklyService from './pages/WeeklyService';
import Gallery from './pages/Gallery'; // Importando a Galeria
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRouteGuard from './components/AdminRouteGuard';
import { ChurchProvider, useChurchData } from './context/ChurchContext';
import BackgroundAudioPlayer from './components/BackgroundAudioPlayer'; 
import ToastProvider from './components/ToastProvider';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  // Verifica se a rota começa com /admin (incluindo /admin/login e /admin/dashboard)
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-church-black text-gray-100">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

const AppContent: React.FC = () => {
  const { data } = useChurchData();
  const audioUrl = data.general.backgroundAudioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <>
      <ScrollToTop />
      <BackgroundAudioPlayer audioUrl={audioUrl} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/cultosemanal" element={<WeeklyService />} />
          <Route path="/aovivo" element={<Live />} />
          <Route path="/mensagens" element={<Media />} />
          <Route path="/galeria" element={<Gallery />} /> {/* Rota da Galeria */}
          <Route path="/contribuir" element={<Give />} />
          <Route path="/contato" element={<Contact />} />
          
          {/* Rotas de Administração */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRouteGuard />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Redireciona /admin para /admin/dashboard se logado */}
            <Route index element={<AdminDashboard />} /> 
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

const App: React.FC = () => {
  return (
    <ChurchProvider>
      <Router>
        <ToastProvider />
        <AppContent />
      </Router>
    </ChurchProvider>
  );
};

export default App;