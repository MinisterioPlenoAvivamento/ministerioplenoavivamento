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
import AdminDashboard from './pages/AdminDashboard';
import { ChurchProvider, useChurchData } from './context/ChurchContext';
import BackgroundAudioPlayer from './components/BackgroundAudioPlayer'; 

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-church-black text-gray-100">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
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
          <Route path="/contribuir" element={<Give />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </>
  );
}

const App: React.FC = () => {
  return (
    <ChurchProvider>
      <Router>
        <AppContent />
      </Router>
    </ChurchProvider>
  );
};

export default App;