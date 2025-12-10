import React from 'react';
import { Heart, Landmark, Copy, CheckCircle } from 'lucide-react';
import { useChurchData } from '../context/ChurchContext';

const Give: React.FC = () => {
  const { data } = useChurchData();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Chave PIX copiada com sucesso!');
  };
  
  // Determina qual dado usar para o QR Code: o código completo (BR Code) ou a chave PIX.
  const qrData = data.bank.pixCode || data.bank.pixKey;

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      <div className="bg-church-black py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-church-red/10 to-transparent opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block p-4 bg-church-dark rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <Heart className="h-8 w-8 text-church-red fill-church-red animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Generosidade</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            "Deus ama ao que dá com alegria." <br />
            <span className="text-church-red text-sm font-bold uppercase tracking-widest mt-2 block">2 Coríntios 9:7</span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* PIX Section (Highlighted) */}
          <div className="bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-1 border border-church-red/50 shadow-[0_0_40px_rgba(220,38,38,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-church-red text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-20">Recomendado</div>
            
            <div className="bg-church-black rounded-[20px] p-8 h-full flex flex-col items-center text-center relative z-10">
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" alt="Pix" className="h-8 mb-6 invert opacity-80" />
               
               <h2 className="text-2xl font-bold text-white mb-2">Faça um PIX</h2>
               <p className="text-gray-500 text-sm mb-8">Rápido, seguro e cai na hora.</p>
               
               <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 relative group">
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-2 tracking-widest">Chave PIX (CNPJ/Email)</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl md:text-2xl font-mono text-white font-bold tracking-tight">{data.bank.pixKey}</span>
                  </div>
                  <button 
                      onClick={() => copyToClipboard(data.bank.pixKey)}
                      className="absolute inset-0 w-full h-full bg-church-red/90 text-white font-bold uppercase tracking-widest flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl backdrop-blur-sm"
                    >
                      <Copy size={18} className="mr-2" /> Copiar Chave
                    </button>
               </div>

               {/* QR Code Generation - Uses pixCode if available, otherwise pixKey */}
               <div className="w-40 h-40 bg-white p-2 rounded-lg mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`} 
                    alt="QR Code PIX" 
                    className="w-full h-full" 
                  />
               </div>
               <p className="text-xs text-gray-600">Escaneie com o app do seu banco</p>
               
               {data.bank.pixCode && (
                   <button 
                      onClick={() => copyToClipboard(data.bank.pixCode!)}
                      className="mt-4 text-xs text-church-red font-bold uppercase tracking-wider hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Copy size={14} /> Copiar Código PIX (Copia e Cola)
                    </button>
               )}
            </div>
          </div>

          {/* Bank Transfer Section */}
          <div className="space-y-6">
            <div className="bg-church-dark rounded-3xl p-8 border border-white/5">
               <div className="flex items-center gap-4 mb-8">
                 <div className="bg-zinc-800 p-3 rounded-xl border border-white/5">
                   <Landmark className="text-white h-6 w-6" />
                 </div>
                 <h2 className="text-xl font-bold text-white">Transferência Bancária</h2>
               </div>
               
               <div className="space-y-5 text-sm">
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                   <span className="text-gray-500">Banco</span>
                   <span className="font-bold text-white text-right">{data.bank.bank}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                   <span className="text-gray-500">Agência</span>
                   <span className="font-bold text-white font-mono">{data.bank.agency}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                   <span className="text-gray-500">Conta Corrente</span>
                   <span className="font-bold text-white font-mono">{data.bank.account}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                   <span className="text-gray-500">Favorecido</span>
                   <span className="font-bold text-white text-right">{data.bank.favored}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">CNPJ</span>
                   <span className="font-bold text-white font-mono">{data.bank.cnpj}</span>
                 </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-church-red rounded-full opacity-20 blur-2xl"></div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="text-church-red" size={20} /> Transparência
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Todos os recursos são destinados para a manutenção do templo, ajuda social e expansão missionária. Sua fidelidade gera vida!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Give;