import React from 'react';
import { ArrowRight, Video, Heart, ChevronDown, Play, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useChurchData } from '../context/ChurchContext';

const Home: React.FC = () => {
  const { data } = useChurchData();

  return (
    <div className="flex flex-col w-full bg-church-black overflow-x-hidden selection:bg-church-red selection:text-white">
      {/* Hero Section - CINEMATIC & DYNAMIC */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Background Layer (Video or Image) */}
        <div className="absolute inset-0 z-0">
          {data.general.heroVideo ? (
             <video 
               autoPlay 
               loop 
               muted 
               playsInline 
               poster={data.general.heroImage}
               className="w-full h-full object-cover opacity-60"
             >
                <source src={data.general.heroVideo} type="video/mp4" />
             </video>
          ) : (
             <img 
              src={data.general.heroImage || "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1920&auto=format&fit=crop"} 
              alt="Background" 
              className="w-full h-full object-cover object-center opacity-60 animate-pulse-glow"
              style={{ animationDuration: '8s' }}
            />
          )}
         
          {/* Overlays for readability and style */}
          <div className="absolute inset-0 bg-gradient-to-t from-church-black via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"></div>
          
          {/* Noise Texture for Film Grain effect */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Content - FLOATING TYPOGRAPHY */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 space-y-10 mt-16">
          
          {/* Animated Header */}
          <div className="flex flex-col items-center justify-center perspective-1000">
            <h1 className="flex flex-col items-center justify-center gap-0">
              {/* Line 1 */}
              <span className="font-display text-white text-[5rem] sm:text-[8rem] md:text-[10rem] leading-[0.8] tracking-tighter drop-shadow-2xl animate-float">
                MINISTÉRIO
              </span>
              {/* Line 2 */}
              <span className="font-display text-white text-[5rem] sm:text-[8rem] md:text-[10rem] leading-[0.8] tracking-tighter drop-shadow-2xl animate-float" style={{ animationDelay: '0.2s' }}>
                PLENO
              </span>
              {/* Line 3 - GLOWING RED */}
              <span className="font-display text-transparent bg-clip-text bg-gradient-to-b from-church-red to-red-800 text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none mt-2 tracking-widest animate-float-delayed drop-shadow-[0_0_35px_rgba(255,0,0,0.6)]" style={{ animationDelay: '0.4s' }}>
                AVIVAMENTO
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-church-red mt-8 mb-8 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-pulse"></div>

            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-200 font-sans font-light leading-relaxed animate-fade-in-up drop-shadow-md" style={{animationDelay: '0.6s'}}>
              {data.general.welcomeMessage}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <Link to="/aovivo" className="w-full sm:w-auto group">
               <button className="w-full sm:min-w-[240px] px-8 py-4 bg-church-red text-white font-display text-xl tracking-wide rounded-full shadow-[0_0_30px_rgba(255,0,0,0.5)] transition-all duration-300 transform group-hover:scale-105 group-hover:bg-red-600 group-hover:shadow-[0_0_50px_rgba(255,0,0,0.8)] flex items-center justify-center gap-2">
                  <Play className="fill-white w-5 h-5" /> ASSISTIR ONLINE
               </button>
            </Link>
            <Link to="/sobre" className="w-full sm:w-auto group">
              <button className="w-full sm:min-w-[240px] px-8 py-4 bg-transparent border border-white/30 text-white font-display text-xl tracking-wide rounded-full backdrop-blur-md transition-all duration-300 transform group-hover:bg-white/10 group-hover:border-white">
                CONHEÇA A IGREJA
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <ChevronDown className="text-white h-8 w-8 opacity-50" />
        </div>
      </section>

      {/* Scripture Highlight (Cinematic) */}
      <section className="bg-church-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-church-red/20 via-church-black to-church-black"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="text-3xl md:text-5xl font-serif text-white font-medium leading-tight drop-shadow-lg">
            "{data.general.verse}"
          </p>
          <div className="mt-10 inline-block border-t border-church-red/50 pt-4">
             <p className="text-church-red font-display tracking-widest uppercase text-xl">{data.general.verseReference}</p>
          </div>
        </div>
      </section>

      {/* Pastor Section (Clean & Modern) */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
             <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px] lg:h-auto">
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent lg:bg-gradient-to-r z-10"></div>
                   <img 
                      src={data.general.pastorImage || "https://picsum.photos/id/1012/600/800"}
                      alt={data.general.pastorName} 
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </div>
                <div className="p-12 lg:p-24 flex flex-col justify-center relative z-20">
                   <h3 className="text-church-red font-bold tracking-[0.3em] uppercase text-xs mb-6 flex items-center gap-3">
                      <span className="w-12 h-0.5 bg-church-red"></span> LIDERANÇA
                   </h3>
                   <h2 className="text-5xl md:text-6xl font-display text-white mb-8 leading-none">
                      UMA PALAVRA PARA <br/> O SEU CORAÇÃO
                   </h2>
                   <p className="text-gray-400 mb-10 font-light leading-relaxed text-lg">
                      O {data.general.churchName} é um lugar de novos começos. Sob a liderança do {data.general.pastorName}, temos vivido dias de glória e manifestação do poder de Deus.
                   </p>
                   <Link to="/sobre">
                      <button className="text-white hover:text-church-red border-b border-white/20 hover:border-church-red pb-1 transition-all uppercase tracking-widest text-sm font-bold">
                         Ler Biografia Completa
                      </button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards (Netflix Style) */}
      <section className="py-24 bg-church-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Card 1: AO VIVO */}
             <Link to="/aovivo" className="group relative h-80 overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:scale-[1.02]">
               {/* Nova imagem de fundo para o Live */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbe426643c4f?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                 <Video className="text-church-red mb-4 h-10 w-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                 <h3 className="text-4xl font-display text-white mb-2">AO VIVO</h3>
                 <p className="text-gray-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                   Assista Online <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </p>
               </div>
             </Link>

             {/* Card 2: CONTRIBUIR */}
             <Link to="/contribuir" className="group relative h-80 overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:scale-[1.02]">
               {/* Usando uma imagem mais genérica e confiável para Contribuir */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                 <Heart className="text-yellow-500 mb-4 h-10 w-10 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                 <h3 className="text-4xl font-display text-white mb-2">CONTRIBUIR</h3>
                 <p className="text-gray-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                   Faça sua oferta <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </p>
               </div>
             </Link>

             {/* Card 3: VISITE-NOS */}
             <Link to="/contato" className="group relative h-80 overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:scale-[1.02]">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                 <MapPin className="text-blue-500 mb-4 h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                 <h3 className="text-4xl font-display text-white mb-2">VISITE-NOS</h3>
                 <p className="text-gray-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                   Localização <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </p>
               </div>
             </Link>

           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;