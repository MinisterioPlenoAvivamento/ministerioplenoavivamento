import React from 'react';
import { Target, Eye, ShieldCheck, Flame } from 'lucide-react';
import { useChurchData } from '../context/ChurchContext';

const About: React.FC = () => {
  const { data } = useChurchData();

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      {/* Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1029/1920/600')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-church-black/80 via-church-black/90 to-church-black"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-church-red/20 rounded-full mb-6 border border-church-red/30 backdrop-blur-sm">
             <Flame className="text-church-red" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Nossa Essência</h1>
          <p className="text-xl text-gray-400 font-light">Conheça o coração, a visão e a história do {data.general.churchName}.</p>
        </div>
      </div>

      {/* History */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-church-dark border border-white/5 rounded-3xl p-10 md:p-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-church-red text-white px-6 py-2 rounded font-bold uppercase tracking-widest text-sm shadow-lg shadow-red-900/50">
                História
             </div>
             <div 
               className="prose prose-invert prose-lg mx-auto text-gray-300 text-justify leading-relaxed"
               dangerouslySetInnerHTML={{ __html: data.history }}
             />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-church-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-church-dark p-8 rounded-2xl border border-white/5 hover:border-church-red/50 transition-all duration-300 hover:-translate-y-2">
              <div className="bg-church-black w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-church-red group-hover:bg-church-red transition-colors">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Missão</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pregar o evangelho genuíno, promover o avivamento espiritual e discipular as nações, levando cada pessoa a um relacionamento profundo com Deus.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-church-dark p-8 rounded-2xl border border-white/5 hover:border-church-red/50 transition-all duration-300 hover:-translate-y-2">
              <div className="bg-church-black w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-church-red group-hover:bg-church-red transition-colors">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Visão</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ser uma igreja relevante, que influencia a sociedade através dos princípios bíblicos, reconhecida pelo amor, serviço e poder do Espírito Santo.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-church-dark p-8 rounded-2xl border border-white/5 hover:border-church-red/50 transition-all duration-300 hover:-translate-y-2">
              <div className="bg-church-black w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-church-red group-hover:bg-church-red transition-colors">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Valores</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-church-red rounded-full"></span> Centralidade de Cristo</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-church-red rounded-full"></span> Autoridade Bíblica</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-church-red rounded-full"></span> Santidade de Vida</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-church-red rounded-full"></span> Excelência no Serviço</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-church-red rounded-full"></span> Família como Projeto</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Bio */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-gradient-to-r from-church-dark to-church-black rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-church-red/10 blur-[100px]"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2">
               <div className="h-full min-h-[500px] relative overflow-hidden group">
                 {/* CORREÇÃO AQUI: Agora usa a imagem dinâmica e removemos a opacidade para ficar nítida */}
                 <img 
                    src={data.general.pastorImage || "https://picsum.photos/id/1012/800/800"} 
                    alt={data.general.pastorName} 
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                 />
                 {/* Gradiente sutil apenas na base para o texto não ficar ruim se sobrepor, mas mantendo o rosto limpo */}
                 <div className="absolute inset-0 bg-gradient-to-t from-church-dark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent"></div>
               </div>
               
               <div className="p-10 md:p-20 flex flex-col justify-center relative z-10 bg-church-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
                 <h3 className="text-church-red font-bold uppercase tracking-[0.2em] text-sm mb-4 shadow-glow">Liderança</h3>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-8">{data.general.pastorName}</h2>
                 <p className="text-gray-300 leading-relaxed mb-6 text-lg font-light">
                   O Ev. Wellington Villares é um homem apaixonado pela Palavra de Deus e pelo mover do Espírito Santo. Com 25 anos servindo a Deus e o ministério, tem dedicado sua vida ao ensino das Escrituras e ao pastoreio de vidas.
                 </p>
                 <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
                   Formado em Teologia e Liderança, seu ministério é marcado por mensagens impactantes, fé ousada e um profundo amor pelas pessoas. Casado com a Jacilene Pereira da Silva, acredita que a família é o primeiro ministério de um cristão.
                 </p>
                 <div className="mt-4 pt-8 border-t border-white/10">
                   <img src="https://picsum.photos/200/80" alt="Assinatura" className="h-12 opacity-50 invert" />
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;