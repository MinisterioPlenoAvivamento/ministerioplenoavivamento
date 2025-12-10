import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, Flame, Lock, ArrowRight } from 'lucide-react';
import { useChurchData } from '../context/ChurchContext';

const Footer: React.FC = () => {
  const { data } = useChurchData();

  return (
    <footer className="bg-black text-gray-300 border-t border-church-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-church-red to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-church-red/10 border border-church-red/20 p-2 rounded-lg">
                <Flame className="h-6 w-6 text-church-red" />
              </div>
              <div>
                <h3 className="text-white font-sans font-black text-xl tracking-tight">MINISTÉRIO PLENO</h3>
                <p className="text-church-red text-xs font-bold tracking-[0.3em] uppercase">Avivamento</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Uma igreja apaixonada por Jesus, comprometida com o avivamento espiritual e a transformação de vidas através da Palavra de Deus.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-church-dark p-3 rounded-full text-gray-400 hover:text-white hover:bg-church-red transition-all duration-300 hover:-translate-y-1"><Instagram size={18} /></a>
              <a href={data.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-church-dark p-3 rounded-full text-gray-400 hover:text-white hover:bg-church-red transition-all duration-300 hover:-translate-y-1"><Facebook size={18} /></a>
              <a href={data.social.youtube} target="_blank" rel="noopener noreferrer" className="bg-church-dark p-3 rounded-full text-gray-400 hover:text-white hover:bg-church-red transition-all duration-300 hover:-translate-y-1"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-church-red pl-3">Explorar</h4>
            <ul className="space-y-4">
              <li><NavLink to="/sobre" className="group flex items-center text-sm text-gray-400 hover:text-church-red transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Nossa História</NavLink></li>
              <li><NavLink to="/mensagens" className="group flex items-center text-sm text-gray-400 hover:text-church-red transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Mensagens</NavLink></li>
              <li><NavLink to="/contribuir" className="group flex items-center text-sm text-gray-400 hover:text-church-red transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Dízimos e Ofertas</NavLink></li>
              <li><NavLink to="/aovivo" className="group flex items-center text-sm text-gray-400 hover:text-church-red transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Ao Vivo</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-church-red pl-3">Contato</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <MapPin className="text-church-red mt-1 flex-shrink-0 group-hover:animate-bounce" size={18} />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{data.contact.address}<br />{data.contact.cityState}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="text-church-red flex-shrink-0" size={18} />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{data.contact.phone}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="text-church-red flex-shrink-0" size={18} />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{data.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} {data.general.churchName}. Todos os direitos reservados.</p>
          {/* Link de Admin Removido */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;