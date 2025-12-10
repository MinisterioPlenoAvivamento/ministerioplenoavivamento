import React from 'react';
import { useChurchData } from '../context/ChurchContext';
import { Play, Mic, Video, Search } from 'lucide-react';

const Media: React.FC = () => {
  const { data } = useChurchData();
  const latestSermon = data.sermons[0];
  
  const handleVideoClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      <div className="bg-church-black text-white py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Mensagens</h1>
            <p className="mt-2 text-gray-400">Edifique sua vida através da Palavra de Deus.</p>
          </div>
          
          <div className="w-full md:w-auto relative">
             <input type="text" placeholder="Buscar mensagem..." className="w-full md:w-64 bg-church-dark border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-church-red text-white" />
             <Search size={16} className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Video - Latest */}
        {latestSermon && (
          <div className="mb-20">
            <h2 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1 h-4 bg-church-red"></div> Destaque
            </h2>
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-zinc-900 group cursor-pointer border border-white/5"
              onClick={() => handleVideoClick(latestSermon.videoUrl)}
            >
              <img 
                src="https://picsum.photos/id/1025/1200/675" 
                alt="Latest Sermon" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-church-black via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-church-red rounded-full flex items-center justify-center pl-2 shadow-[0_0_40px_rgba(220,38,38,0.5)] scale-90 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-10 w-10 text-white fill-white" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="bg-church-red text-white text-xs font-black px-3 py-1 rounded mb-4 inline-block uppercase tracking-wider">Novo Episódio</span>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-3">{latestSermon.title}</h3>
                <p className="text-gray-300 text-lg">{latestSermon.preacher} • {latestSermon.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 pb-4 border-b border-white/5">
          <button className="px-6 py-2 rounded-full bg-white text-church-black font-bold text-sm hover:bg-gray-200 transition-colors">Todos</button>
          <button className="px-6 py-2 rounded-full bg-church-dark text-gray-300 border border-white/10 hover:border-church-red hover:text-white font-bold text-sm transition-colors">Sermões</button>
          <button className="px-6 py-2 rounded-full bg-church-dark text-gray-300 border border-white/10 hover:border-church-red hover:text-white font-bold text-sm transition-colors">Estudos</button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.sermons.map((sermon) => (
            <div 
              key={sermon.id} 
              className="bg-church-dark rounded-xl overflow-hidden border border-white/5 group hover:border-church-red/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleVideoClick(sermon.videoUrl)}
            >
              <div className="relative aspect-video">
                <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-church-red rounded-full flex items-center justify-center pl-1 shadow-lg">
                    <Play className="h-5 w-5 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                  {sermon.duration}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-church-red transition-colors">{sermon.title}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-1 mb-4">
                  <Mic size={14} className="text-church-red" /> {sermon.preacher}
                </p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-xs text-gray-500 font-bold uppercase">{sermon.date}</span>
                  <button className="text-white text-xs font-black uppercase tracking-wider hover:text-church-red transition-colors flex items-center gap-1">
                    Assistir <Play size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;