import React from 'react';
import { useChurchData } from '../context/ChurchContext';
import { Calendar as CalendarIcon, Clock, MapPin, Download } from 'lucide-react';
import Button from '../components/Button';

const Schedule: React.FC = () => {
  const { data } = useChurchData();

  return (
    <div className="pt-20">
      <div className="bg-church-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Agenda & Cultos</h1>
          <p className="mt-4 text-gray-400">Esteja conosco na casa do Pai. Confira nossa programação.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Weekly Schedule */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-church-blue mb-8 border-l-4 border-yellow-500 pl-4">
              Programação Semanal
            </h2>
            <div className="space-y-4">
              {data.services.map((service, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-church-blue font-bold p-4 rounded-lg min-w-[80px] text-center">
                      <span className="block text-sm uppercase tracking-wide opacity-70">{service.day.substring(0,3)}</span>
                      <span className="text-xl">{service.time}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin size={14} /> Templo Principal
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <button className="text-yellow-600 text-sm font-semibold hover:text-yellow-700">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Special Events */}
            <h2 className="text-2xl font-bold text-church-blue mb-8 mt-16 border-l-4 border-yellow-500 pl-4">
              Próximos Eventos
            </h2>
            
            {(!data.events || data.events.length === 0) ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-500">
                Nenhum evento especial cadastrado no momento.
              </div>
            ) : (
              <div className="space-y-8">
                {data.events.map((event) => (
                  <div key={event.id} className="group relative rounded-2xl overflow-hidden shadow-xl min-h-[300px] flex items-end">
                    {/* Background Image */}
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-8 w-full">
                      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                          <span className="bg-yellow-500 text-church-blue text-xs font-bold px-3 py-1 rounded-full uppercase mb-2 inline-block">
                            {event.tag || 'Evento'}
                          </span>
                          <h3 className="text-white text-3xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-300 mb-2 flex items-center gap-2">
                            <CalendarIcon size={16} /> {event.date}
                            <Clock size={16} className="ml-2" /> {event.time}
                          </p>
                          <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                        </div>
                        <Button variant="primary" className="whitespace-nowrap">Inscrever-se</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Google Calendar Widget (Visual Representation) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <CalendarIcon className="text-blue-600" /> Calendário
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
                <p className="mb-4">Visualize nossa agenda completa diretamente no seu celular.</p>
                <Button variant="white" fullWidth className="border border-gray-300">
                  <Download className="mr-2 h-4 w-4" /> Adicionar ao Google Agenda
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-church-blue rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4 text-yellow-400">Informações Importantes</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  Chegue 15 minutos antes para conseguir um bom lugar.
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  Temos estacionamento gratuito no local.
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  Espaço kids disponível para crianças de 2 a 10 anos.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Schedule;