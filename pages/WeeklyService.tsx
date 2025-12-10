import React from 'react';
import { useChurchData } from '../context/ChurchContext';
import { Calendar, Clock, MapPin, Flame, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const WeeklyService: React.FC = () => {
  const { data } = useChurchData();
  
  // Filtrar o culto principal de Sábado
  const mainService = data.services.find(s => s.day === 'Sábado');

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      {/* Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-church-black/80 via-church-black/90 to-church-black"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-church-red/20 rounded-full mb-6 border border-church-red/30 backdrop-blur-sm">
             <Calendar className="text-church-red" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Culto Semanal</h1>
          <p className="text-xl text-gray-400 font-light">Nosso principal encontro de fé e avivamento.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Service Card */}
          <div className="lg:col-span-2 bg-zinc-900 p-8 md:p-12 rounded-3xl border border-church-red/50 shadow-2xl shadow-red-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-church-red/10 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-none flex items-center gap-4">
               <Flame className="text-church-red h-10 w-10" />
               {mainService?.name || 'Culto Principal'}
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-2xl">
              Junte-se a nós para um tempo de adoração intensa, Palavra poderosa e manifestação do Espírito Santo.
            </p>

            <div className="space-y-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <Calendar className="text-church-red flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Dia</p>
                  <p className="text-xl font-bold text-white">{mainService?.day || 'Sábado'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Clock className="text-church-red flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Horário</p>
                  <p className="text-xl font-bold text-white">{mainService?.time || '19:30h'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="text-church-red flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Local</p>
                  <p className="text-xl font-bold text-white">{data.contact.address}, {data.contact.cityState}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
               <Link to="/aovivo">
                  <Button variant="primary">
                     Assistir Ao Vivo <ArrowRight size={18} className="ml-2" />
                  </Button>
               </Link>
            </div>
          </div>

          {/* Sidebar - Other Services */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-zinc-900 rounded-2xl shadow-lg p-6 border border-white/5">
              <h3 className="font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                Outros Encontros
              </h3>
              <ul className="space-y-4">
                {data.services.filter(s => s.day !== 'Sábado').map((service, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm text-gray-400">
                    <span className="font-bold text-white">{service.day}</span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-church-red" /> {service.time}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-white/10">
                 <p className="text-xs text-gray-500">Confira a agenda completa para eventos especiais.</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-church-dark rounded-2xl shadow-lg p-6 border border-white/5">
              <h3 className="font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                Precisa de Ajuda?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Fale conosco para mais informações sobre o culto ou se precisar de oração.
              </p>
              <Link to="/contato">
                 <Button variant="outline" fullWidth className="py-3 text-sm">
                    Falar com a Equipe
                 </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyService;