import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flame, LayoutDashboard } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { showSuccess } from '../utils/toast';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const clickCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (clickCountRef.current >= 3) {
      e.preventDefault(); // <--- Adicionado para impedir a navegação padrão do NavLink
      showSuccess('Modo Admin ativado! Redirecionando para o login...');
      clickCountRef.current = 0;
      navigate('/admin/login');
    } else {
      // Reset counter after 1 second if not enough clicks
      timerRef.current = window.setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo Section - Clickable for Admin Activation */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center gap-3 group" onClick={handleLogoClick}>
              <div className="relative">
                <div className="absolute inset-0 bg-church-red blur-xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse"></div>
                <Flame className="h-10 w-10 text-church-red relative z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-white font-display text-4xl leading-none tracking-wide group-hover:text-red-500 transition-colors drop-shadow-md">
                  MINISTÉRIO PLENO
                </span>
                <span className="text-white font-sans font-bold text-[8px] tracking-[0.6em] uppercase pl-1 opacity-70">
                  Avivamento
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full font-sans ${
                    isActive 
                      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-4">
              {/* Link Admin Removido */}

              <NavLink to="/contribuir">
                <button className="px-8 py-3 rounded-full bg-church-red text-white font-display text-lg tracking-wide hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:-translate-y-1">
                  OFERTAR
                </button>
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8 text-church-red" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-church-red/20 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-5 text-xl font-display uppercase tracking-wider transition-colors border-l-2 ${
                  isActive
                    ? 'border-church-red text-white bg-gradient-to-r from-church-red/10 to-transparent'
                    : 'border-transparent text-gray-500 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* Link Admin Mobile Removido */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;