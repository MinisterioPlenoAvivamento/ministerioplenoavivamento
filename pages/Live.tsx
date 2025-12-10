import React from 'react';
import { useChurchData } from '../context/ChurchContext';
import { Radio, Mic, Video, Play, ExternalLink, Youtube, Headphones, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import SocialLiveButton from '../components/SocialLiveButton';

const Live: React.FC = () => {
  const { data } = useChurchData();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const handleVideoClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      {/* Header */}
      <div className="bg-church-black text-white py-16 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-church-red/5 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-church-red/10 px-4 py-1.5 rounded-full mb-6 border border-church-red/20">
            <span className="w-2 h-2 bg-church-red rounded-full animate-pulse"></span>
            <span className="text-church-red text-xs font-black tracking-[0.2em] uppercase">Central de Transmissão</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">Ao Vivo & Arquivo</h1>
          <p className="text-gray-400 text-lg">Conecte-se com o céu onde quer que você esteja.</p>
        </div>
      </div>

      {/* Internal Navigation Menu */}
      <div className="sticky top-24 z-40 bg-church-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2 md:gap-4 py-4">
             <button 
                onClick={() => scrollToSection('live')} 
                className="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
             >
                <Radio size={16} /> <span className="hidden md:inline">Transmissão</span> Ao Vivo
             </button>
             <button 
                onClick={() => scrollToSection('archive')} 
                className="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
             >
                <Video size={16} /> <span className="hidden md:inline">Arquivo de</span> Lives
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* LIVE STREAM SECTION */}
        <section id="live" className="mb-24 scroll-mt-48">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-1 h-8 bg-church-red rounded-full"></div>
             <div>
                <h2 className="text-3xl font-bold text-white">Culto Ao Vivo</h2>
                <p className="text-gray-500 text-sm mt-1">Sinal direto do templo principal.</p>
             </div>
          </div>

          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video border border-white/10 group">
             {data.multimedia.isLiveNow ? (
               <div className="absolute top-6 right-6 z-20">
                  <span className="flex items-center gap-2 bg-church-red text-white px-4 py-2 rounded font-bold uppercase tracking-widest text-xs animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    No Ar
                  </span>
               </div>
             ) : (
                <div className="absolute top-6 right-6 z-20">
                  <span className="flex items-center gap-2 bg-black/60 backdrop-blur text-gray-400 px-4 py-2 rounded border border-white/10 font-bold uppercase tracking-widest text-xs">
                    Offline
                  </span>
               </div>
             )}

             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-church-black via-black/40 to-transparent z-10">
                <Radio className={`h-20 w-20 mb-6 drop-shadow-lg ${data.multimedia.isLiveNow ? 'text-church-red animate-pulse' : 'text-gray-600'}`} />
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 text-center px-4 tracking-tight drop-shadow-md">
                  {data.multimedia.liveTitle || 'Nossa Transmissão'}
                </h3>
                <p className="text-gray-300 mb-10 max-w-lg text-center px-4 font-light text-lg">
                  {data.multimedia.isLiveNow 
                    ? 'O céu está descendo! Clique para participar.' 
                    : 'Nossa transmissão está offline no momento. Assista aos cultos anteriores abaixo.'}
                </p>
                
                {/* Social Live Buttons - ADJUSTED FOR MOBILE: Stacked vertically */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-sm px-4">
                    <SocialLiveButton 
                        platform="youtube" 
                        url={data.multimedia.liveUrl || data.social.youtube} 
                        isLive={data.multimedia.isLiveNow} 
                    />
                    <SocialLiveButton 
                        platform="facebook" 
                        url={data.social.facebook} 
                        isLive={data.multimedia.isLiveNow} 
                    />
                    <SocialLiveButton 
                        platform="instagram" 
                        url={data.social.instagram} 
                        isLive={data.multimedia.isLiveNow} 
                    />
                </div>
             </div>
             
             {/* Background Image (Cover) */}
             <img 
               src="https://picsum.photos/id/452/1200/800" 
               alt="Background" 
               className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:scale-105 transition-transform duration-[2s]"
             />
          </div>
        </section>

        {/* RECENT LIVES ARCHIVE */}
        <section id="archive" className="scroll-mt-48">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-1 h-8 bg-church-red rounded-full"></div>
             <div>
                <h2 className="text-3xl font-bold text-white">Lives Anteriores</h2>
                <p className="text-gray-500 text-sm mt-1">Reviva o que Deus fez nos últimos cultos.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {data.sermons.map((sermon) => (
               <div 
                  key={sermon.id} 
                  className="group cursor-pointer"
                  onClick={() => handleVideoClick(sermon.videoUrl)}
                >
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/5 shadow-lg">
                     <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-church-red rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300">
                           <Play className="text-white h-5 w-5 fill-white" />
                        </div>
                     </div>
                     <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">{sermon.duration}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg leading-tight group-hover:text-church-red transition-colors mb-2">{sermon.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wide">
                     <span className="text-church-red">{sermon.preacher}</span>
                     <span>•</span>
                     {sermon.date}
                  </div>
               </div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline">
                Acessar Arquivo Completo
             </Button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Live;