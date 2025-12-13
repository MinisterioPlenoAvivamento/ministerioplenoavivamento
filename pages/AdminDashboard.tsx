import React, { useState, useEffect } from 'react';
import { useChurchData } from '../context/ChurchContext';
import Button from '../components/Button';
import { Save, Video, DollarSign, FileText, Settings, Plus, Trash2, ArrowLeft, Image as ImageIcon, CheckCircle, Flame, X, ExternalLink, MessageCircle, AlertTriangle, RotateCcw, Loader2, Radio, GalleryHorizontal, Music, LogOut, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUploader, { deleteImageByUrl } from '../components/ImageUploader'; // Importando deleteImageByUrl
import ContactMessagesManager from '../components/ContactMessagesManager'; // Importando o novo componente
import GalleryUploader from '../components/GalleryUploader'; // NOVO: Importando o GalleryUploader
import { showSuccess, showError, showLoading, dismissToast } from '../utils/toast'; // Importando showError e showLoading

const ADMIN_AUTH_KEY = 'admin_authenticated'; // Definindo a chave de autenticação aqui

const AdminDashboard: React.FC = () => {
  const { data, updateData, resetData } = useChurchData();
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(data);
  const navigate = useNavigate();

  // Removida dependência [data] para evitar sobrescrita durante digitação
  useEffect(() => {
    // Carrega dados iniciais apenas uma vez ou quando mudar de aba
    setFormData(data);
  }, [activeTab]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Impede cliques duplos ou propagação
    
    if (saveStatus === 'saving') return;

    // Confirmação Visual de Dados Críticos
    if (activeTab === 'general') {
       const confirmMsg = `CONFIRME OS DADOS ANTES DE SALVAR:\n\nWhatsApp: ${formData.contact.whatsapp}\nCidade: ${formData.contact.cityState}\n\nEstão corretos?`;
       if (!window.confirm(confirmMsg)) {
          return;
       }
    }

    // 1. MUDANÇA VISUAL IMEDIATA (AZUL)
    setSaveStatus('saving');

    // 2. PEQUENO DELAY PARA GARANTIR QUE O USUÁRIO VEJA O AZUL
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        // 3. Tenta SALVAR
        const success = updateData(formData); // updateData retorna true/false

        if (success) {
            // 4. MUDANÇA VISUAL PARA SUCESSO (VERDE)
            setSaveStatus('success');
            
            // 5. ESPERA 1.5 SEGUNDOS PARA O USUÁRIO VEJA O VERDE
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert('✅ DADOS SALVOS COM SUCESSO!\n\nA página será recarregada para confirmar a atualização.');
            
            // 6. LIMPA E RECARREGA
            setSaveStatus('idle');
            window.location.reload(); 
        } else {
            throw new Error("Falha ao gravar no LocalStorage");
        }
    } catch (error) {
        console.error("CRITICAL SAVE ERROR:", error);
        alert("❌ ERRO: Memória cheia ou falha no navegador. Tente limpar o cache.");
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleReset = () => {
    if (confirm('ATENÇÃO: Restaurar padrão de fábrica? Isso apagará suas edições.')) {
      resetData();
      window.location.reload(); 
    }
  };
  
  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      navigate('/', { replace: true });
    }
  };

  const updateNested = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section] as any, [field]: value }
    }));
  };

  const handleDeleteItem = async (section: 'sermons' | 'gallery' | 'services' | 'events', id: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este item?')) return;

    const itemToDelete = (formData[section] || []).find(item => String(item.id) === String(id));
    const toastId = showLoading('Excluindo item...');

    try {
      if (section === 'gallery' && itemToDelete && 'url' in itemToDelete) {
        // 1. Tenta deletar do Supabase Storage
        const success = await deleteImageByUrl(itemToDelete.url);
        if (!success) {
          // Se falhar, avisa, mas permite a exclusão local para não travar o painel
          showError('Falha ao apagar arquivo do servidor. Removendo apenas o registro local.');
        } else {
          showSuccess('Arquivo do servidor apagado.');
        }
      }
      
      // 2. Remove do estado local
      setFormData(prev => ({
        ...prev,
        [section]: (prev[section] || []).filter(item => String(item.id) !== String(id))
      }));
      
      dismissToast(toastId);
      showSuccess('Item removido localmente. Clique em SALVAR para confirmar a alteração.');
      setSaveStatus('idle'); // Garante que o botão de salvar fique visível

    } catch (error) {
      dismissToast(toastId);
      showError('Erro ao tentar excluir o item.');
      console.error(error);
    }
  };

  const handleUpdateSermon = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      sermons: prev.sermons.map((item) => String(item.id) === String(id) ? { ...item, [field]: value } : item)
    }));
  };
  
  const handleUpdateGallery = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.map((item) => String(item.id) === String(id) ? { ...item, [field]: value } : item)
    }));
  };
  
  const handleUpdateService = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((item) => String(item.id) === String(id) ? { ...item, [field]: value } : item)
    }));
  };
  
  const handleUpdateEvent = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.map((item) => String(item.id) === String(id) ? { ...item, [field]: value } : item)
    }));
  };
  
  const handleNewImageAdded = (newImage: any) => {
    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), newImage]
    }));
  };

  // Styles optimized for touch/mobile
  const inputClass = "w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-base focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all placeholder-zinc-600";
  const labelClass = "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide ml-1";
  const sectionClass = "bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-sm";

  return (
    <div className="min-h-screen bg-black text-gray-300 flex font-sans flex-col md:flex-row pb-32 md:pb-0">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-zinc-800">
           <div className="flex items-center gap-2 mb-2">
             <Flame className="text-church-red" />
             <span className="font-bold text-white tracking-wide">ADMIN</span>
           </div>
           <p className="text-xs text-gray-500">Gestão v4.0 Mobile</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'general', icon: Settings, label: 'Geral & Contato' },
            { id: 'history', icon: FileText, label: 'História & Textos' },
            { id: 'financial', icon: DollarSign, label: 'Financeiro' },
            { id: 'sermons', icon: Video, label: 'Mídia & Cultos' },
            { id: 'gallery', icon: GalleryHorizontal, label: 'Galeria de Fotos' },
            { id: 'messages', icon: Mail, label: 'Mensagens de Contato' } // Nova aba
          ].map((item) => (
             <button 
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-bold ${activeTab === item.id ? 'bg-church-red text-white shadow-lg shadow-red-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-3">
           <button 
              onClick={handleLogout} 
              className="w-full flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm font-bold bg-zinc-800/50 p-3 rounded-lg"
           >
             <LogOut size={16} />
             <span>Sair (Logout)</span>
           </button>
           <Link to="/" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors text-sm font-bold">
             <ArrowLeft size={16} />
             <span>Voltar ao Site</span>
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-black relative flex flex-col min-h-screen">
        
        {/* Mobile Header & Navigation */}
        <div className="sticky top-0 z-[60] bg-black/95 backdrop-blur-xl border-b border-zinc-800">
            <div className="px-4 py-4 flex justify-between items-center md:hidden">
               <div className="flex items-center gap-2">
                  <Flame className="text-church-red" size={20} />
                  <div className="flex flex-col">
                    <span className="font-bold text-white leading-none">Painel</span>
                    <span className="text-[10px] text-church-red font-bold uppercase">v4.0 Mobile</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-300 bg-zinc-800/50 rounded-full" title="Sair">
                    <LogOut size={18} />
                  </button>
                  <button onClick={handleReset} className="p-2 text-gray-400 hover:text-white bg-zinc-800/50 rounded-full" title="Restaurar Padrão">
                    <RotateCcw size={18} />
                  </button>
                  <Link to="/" className="p-2 bg-zinc-800 rounded-full text-white">
                      <ArrowLeft size={18} />
                  </Link>
               </div>
            </div>

            {/* Mobile Scrollable Tabs */}
            <div className="flex md:hidden overflow-x-auto pb-2 px-2 gap-2 scrollbar-hide">
              {[
                { id: 'general', label: 'Geral' },
                { id: 'history', label: 'História' },
                { id: 'financial', label: 'Financeiro' },
                { id: 'sermons', label: 'Mídia' },
                { id: 'gallery', label: 'Galeria' },
                { id: 'messages', label: 'Mensagens' } // Nova aba mobile
              ].map((item) => (
                 <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-shrink-0 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        activeTab === item.id 
                        ? 'bg-church-red text-white border border-church-red shadow-lg shadow-red-900/40' 
                        : 'bg-zinc-900 text-gray-400 border border-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
              ))}
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center px-8 py-4 bg-zinc-900/50">
               <h1 className="text-xl font-bold text-white uppercase tracking-wider">
                {activeTab === 'general' && 'Configurações Gerais'}
                {activeTab === 'history' && 'Conteúdo Institucional'}
                {activeTab === 'financial' && 'Dados Bancários'}
                {activeTab === 'sermons' && 'Central de Mídia'}
                {activeTab === 'gallery' && 'Galeria de Fotos'}
                {activeTab === 'messages' && 'Mensagens de Contato'}
              </h1>
              <div className="flex gap-3">
                 <button onClick={handleReset} className="px-4 py-2 border border-zinc-700 text-gray-400 rounded hover:text-white text-xs font-bold uppercase flex items-center gap-2">
                   <RotateCcw size={14} /> Reset
                 </button>
              </div>
            </div>
        </div>

        {/* Floating Save Button (Mobile & Desktop) - Reposicionado e com Z-Index Máximo */}
        {activeTab !== 'messages' && (
            <button 
                type="button" 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className={`
                    fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] rounded-full w-16 h-16 md:w-20 md:h-20 shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-black/50 backdrop-blur
                    ${saveStatus === 'idle' ? 'bg-church-red text-white hover:scale-110 shadow-red-900/50 animate-bounce-slow' : ''}
                    ${saveStatus === 'saving' ? 'bg-blue-600 text-white scale-110 cursor-wait ring-4 ring-blue-500/50' : ''}
                    ${saveStatus === 'success' ? 'bg-green-500 text-white scale-110 ring-4 ring-green-500/50' : ''}
                    ${saveStatus === 'error' ? 'bg-red-900 text-white' : ''}
                `}
            >
                {saveStatus === 'idle' && <Save size={32} strokeWidth={2.5} />}
                {saveStatus === 'saving' && <Loader2 size={32} className="animate-spin" />}
                {saveStatus === 'success' && <CheckCircle size={36} />}
                {saveStatus === 'error' && <X size={32} />}
            </button>
        )}

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            
            {/* --- GENERAL TAB --- */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-fade-in-up">
                
                <div className={sectionClass}>
                    <h3 className="text-white font-bold mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
                      <Music size={18} className="text-church-red" /> Áudio de Fundo
                    </h3>
                    <div>
                        <label className={labelClass}>Link Direto do Áudio (MP3)</label>
                        <input type="text" className={inputClass} placeholder="https://..." value={formData.general.backgroundAudioUrl || ''} onChange={(e) => updateNested('general', 'backgroundAudioUrl', e.target.value)} />
                        <p className="text-[10px] text-gray-500 mt-2">Use um link direto para um arquivo MP3. O player aparecerá no canto inferior direito.</p>
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className="text-white font-bold mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
                      <ImageIcon size={18} className="text-church-red" /> Imagens & Vídeo
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                       <div>
                          <ImageUploader
                            onUploadSuccess={(url) => updateNested('general', 'pastorImage', url)}
                            currentImageUrl={formData.general.pastorImage}
                            folder="pastor"
                            label="Upload da Foto da Liderança"
                          />
                          <div className="mt-4">
                            <label className={labelClass}>Link da Imagem (URL)</label>
                            <input type="text" className={inputClass} placeholder="http://..." value={formData.general.pastorImage || ''} onChange={(e) => updateNested('general', 'pastorImage', e.target.value)} />
                          </div>
                          {formData.general.pastorImage && (
                              <div className="mt-3 w-full h-48 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 relative">
                                <img src={formData.general.pastorImage} className="w-full h-full object-cover" />
                              </div>
                          )}
                       </div>
                       
                       <div className="grid md:grid-cols-2 gap-6">
                         <div className="p-4 bg-zinc-900/50 border border-zinc-700 rounded-xl">
                            <label className={`${labelClass} text-church-red`}>★ Link do Vídeo de Fundo (MP4)</label>
                            <input type="text" className={inputClass} placeholder="Cole o link do vídeo aqui..." value={formData.general.heroVideo || ''} onChange={(e) => updateNested('general', 'heroVideo', e.target.value)} />
                            <p className="text-[10px] text-gray-500 mt-2">Se preenchido, o vídeo substituirá a imagem do Leão na capa.</p>
                         </div>
                         <div>
                            <ImageUploader
                              onUploadSuccess={(url) => updateNested('general', 'heroImage', url)}
                              currentImageUrl={formData.general.heroImage}
                              folder="hero"
                              label="Upload da Capa do Site (Imagem de Fundo)"
                            />
                            <div className="mt-4">
                              <label className={labelClass}>Link da Imagem (URL)</label>
                              <input type="text" className={inputClass} value={formData.general.heroImage || ''} onChange={(e) => updateNested('general', 'heroImage', e.target.value)} />
                              <p className="text-[10px] text-gray-500 mt-2">Padrão: Leão (se vídeo estiver vazio).</p>
                            </div>
                         </div>
                       </div>
                       
                       {(formData.general.heroImage || formData.general.heroVideo) && (
                           <div className="mt-3 w-full h-48 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 relative">
                              {formData.general.heroVideo ? (
                                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                  <source src={formData.general.heroVideo} type="video/mp4" />
                                </video>
                              ) : (
                                <img src={formData.general.heroImage} className="w-full h-full object-cover" />
                              )}
                              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Pré-visualização</div>
                           </div>
                       )}
                    </div>
                </div>

                <div className={sectionClass}>
                  <h3 className="text-white font-bold mb-6 border-b border-zinc-800 pb-2">Identidade</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className={labelClass}>Nome da Igreja</label>
                      <input type="text" className={inputClass} value={formData.general.churchName || ''} onChange={(e) => updateNested('general', 'churchName', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Pastor Presidente</label>
                      <input type="text" className={inputClass} value={formData.general.pastorName || ''} onChange={(e) => updateNested('general', 'pastorName', e.target.value)} />
                    </div>
                  </div>
                </div>
                
                {/* NEW SOCIAL MEDIA SECTION */}
                <div className={sectionClass}>
                  <h3 className="text-white font-bold mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
                    <Instagram size={18} className="text-church-red" /> Redes Sociais
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className={labelClass}>Link do Instagram</label>
                      <div className="relative">
                        <Instagram size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input type="url" className={`${inputClass} pl-12`} value={formData.social.instagram || ''} onChange={(e) => updateNested('social', 'instagram', e.target.value)} placeholder="https://instagram.com/..." />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Link do Facebook</label>
                      <div className="relative">
                        <Facebook size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input type="url" className={`${inputClass} pl-12`} value={formData.social.facebook || ''} onChange={(e) => updateNested('social', 'facebook', e.target.value)} placeholder="https://facebook.com/..." />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Link do YouTube</label>
                      <div className="relative">
                        <Youtube size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input type="url" className={`${inputClass} pl-12`} value={formData.social.youtube || ''} onChange={(e) => updateNested('social', 'youtube', e.target.value)} placeholder="https://youtube.com/..." />
                      </div>
                    </div>
                  </div>
                </div>
                {/* END NEW SOCIAL MEDIA SECTION */}

                <div className={sectionClass}>
                  <h3 className="text-white font-bold mb-6 border-b border-zinc-800 pb-2">Contato</h3>
                  <div className="grid grid-cols-1 gap-8">
                    
                    {/* WhatsApp Highlight - EXTREMO */}
                    <div className="bg-green-950/30 border-2 border-green-500 p-6 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.1)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase">Prioridade</div>
                      <label className="text-sm font-black text-green-400 mb-3 uppercase tracking-wide ml-1 flex items-center gap-2">
                        <MessageCircle size={18} fill="currentColor" /> WhatsApp (Principal)
                      </label>
                      <input 
                        type="tel" 
                        inputMode="numeric"
                        className="w-full p-4 bg-black border border-green-500/50 rounded-xl text-white text-xl font-bold focus:ring-4 focus:ring-green-500/30 focus:border-green-400 outline-none transition-all placeholder-zinc-700 tracking-widest" 
                        value={formData.contact.whatsapp || ''} 
                        onChange={(e) => updateNested('contact', 'whatsapp', e.target.value)} 
                        placeholder="(00) 00000-0000"
                      />
                      <p className="text-xs text-green-300/70 mt-3 font-medium flex items-center gap-1">
                        <AlertTriangle size={12} /> Confirme este número ao salvar.
                      </p>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Telefone Fixo / Alternativo</label>
                      <input type="tel" className={inputClass} value={formData.contact.phone || ''} onChange={(e) => updateNested('contact', 'phone', e.target.value)} />
                    </div>

                    <div>
                      <label className={labelClass}>E-mail</label>
                      <input type="email" className={inputClass} value={formData.contact.email || ''} onChange={(e) => updateNested('contact', 'email', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Endereço Completo</label>
                      <input type="text" className={inputClass} value={formData.contact.address || ''} onChange={(e) => updateNested('contact', 'address', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Cidade / Estado</label>
                      <input type="text" className={inputClass} value={formData.contact.cityState || ''} onChange={(e) => updateNested('contact', 'cityState', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- HISTORY TAB --- */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                 <div className={sectionClass}>
                    <label className={labelClass}>Frase de Boas Vindas</label>
                    <input type="text" className={inputClass} value={formData.general.welcomeMessage || ''} onChange={(e) => updateNested('general', 'welcomeMessage', e.target.value)} />
                    
                    <div className="mt-6">
                        <label className={labelClass}>Versículo Destaque</label>
                        <textarea className={`${inputClass} h-32`} value={formData.general.verse || ''} onChange={(e) => updateNested('general', 'verse', e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <label className={labelClass}>Referência Bíblica</label>
                        <input type="text" className={inputClass} value={formData.general.verseReference || ''} onChange={(e) => updateNested('general', 'verseReference', e.target.value)} />
                    </div>
                  </div>
                  
                  <div className={sectionClass}>
                    <label className={labelClass}>História da Igreja (Texto)</label>
                    <textarea className={`${inputClass} h-96 font-mono text-sm leading-relaxed`} value={formData.history || ''} onChange={(e) => setFormData(prev => ({...prev, history: e.target.value}))} />
                  </div>
              </div>
            )}

            {/* --- FINANCIAL TAB --- */}
            {activeTab === 'financial' && (
              <div className="space-y-6">
                <div className={sectionClass}>
                  <div className="grid grid-cols-1 gap-6">
                    
                    {/* Novo Seletor de Tipo de Chave PIX */}
                    <div>
                        <label className={labelClass}>Tipo de Chave PIX</label>
                        <select
                            className={inputClass}
                            value={formData.bank.pixKeyType}
                            onChange={(e) => updateNested('bank', 'pixKeyType', e.target.value as 'CPF' | 'E-mail' | 'Telefone' | 'Aleatória' | 'CNPJ')}
                        >
                            <option value="CPF">CPF</option>
                            <option value="E-mail">E-mail</option>
                            <option value="Telefone">Telefone</option>
                            <option value="Aleatória">Aleatória</option>
                            <option value="CNPJ">CNPJ</option>
                        </select>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Chave PIX (Valor)</label>
                      <input type="text" className={inputClass} value={formData.bank.pixKey || ''} onChange={(e) => updateNested('bank', 'pixKey', e.target.value)} />
                      <p className="text-[10px] text-gray-500 mt-2">O valor da chave PIX que será exibido e copiado.</p>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Código PIX Completo (BR Code)</label>
                      <textarea className={`${inputClass} h-32`} value={formData.bank.pixCode || ''} onChange={(e) => updateNested('bank', 'pixCode', e.target.value)} />
                      <p className="text-[10px] text-church-red mt-2 font-bold">Use o código gerado pelo seu banco (Copia e Cola) para que o QR Code funcione corretamente.</p>
                    </div>
                    
                    <div>
                      <label className={labelClass}>CNPJ</label>
                      <input type="text" className={inputClass} value={formData.bank.cnpj || ''} onChange={(e) => updateNested('bank', 'cnpj', e.target.value)} />
                    </div>
                  </div>
                </div>
                
                <div className={sectionClass}>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><DollarSign className="text-church-red" /> Transferência Bancária</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className={labelClass}>Nome do Banco</label>
                            <input type="text" className={inputClass} value={formData.bank.bank || ''} onChange={(e) => updateNested('bank', 'bank', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Favorecido (Titular)</label>
                            <input type="text" className={inputClass} value={formData.bank.favored || ''} onChange={(e) => updateNested('bank', 'favored', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Agência</label>
                                <input type="text" className={inputClass} value={formData.bank.agency || ''} onChange={(e) => updateNested('bank', 'agency', e.target.value)} />
                            </div>
                            <div>
                                <label className={labelClass}>Conta</label>
                                <input type="text" className={inputClass} value={formData.bank.account || ''} onChange={(e) => updateNested('bank', 'account', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {/* --- MEDIA TAB --- */}
            {activeTab === 'sermons' && (
              <div className="space-y-8">
                 {/* Live Stream Config */}
                 <div className={`${sectionClass} border-church-red/20`}>
                    <h3 className="text-lg font-bold text-church-red mb-6 flex items-center gap-2 uppercase tracking-wider">
                       <Radio size={20} className="animate-pulse" /> Transmissão Ao Vivo
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                       <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, multimedia: { ...prev.multimedia, isLiveNow: !prev.multimedia?.isLiveNow } }))}>
                          <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.multimedia?.isLiveNow ? 'bg-church-red border-church-red' : 'border-gray-500'}`}>
                              {formData.multimedia?.isLiveNow && <CheckCircle size={16} className="text-white" />}
                          </div>
                          <div className="flex-1">
                             <label className="font-bold text-white uppercase tracking-wide cursor-pointer select-none">Estamos Ao Vivo?</label>
                             <p className="text-xs text-gray-500">Ative para mostrar o botão pulsante no site.</p>
                          </div>
                       </div>
                       
                       <div>
                           <label className={labelClass}>Título da Transmissão</label>
                           <input type="text" className={inputClass} value={formData.multimedia?.liveTitle || ''} onChange={(e) => updateNested('multimedia', 'liveTitle', e.target.value)} />
                       </div>
                       
                       <div>
                           <label className={labelClass}>Link do YouTube</label>
                           <input type="text" className={inputClass} value={formData.multimedia?.liveUrl || ''} onChange={(e) => updateNested('multimedia', 'liveUrl', e.target.value)} />
                       </div>
                       
                       <div>
                           <label className={labelClass}>Link do Facebook Live</label>
                           <input type="text" className={inputClass} value={formData.multimedia?.facebookLiveUrl || ''} onChange={(e) => updateNested('multimedia', 'facebookLiveUrl', e.target.value)} />
                       </div>
                       
                       <div>
                           <label className={labelClass}>Link do Instagram Live</label>
                           <input type="text" className={inputClass} value={formData.multimedia?.instagramLiveUrl || ''} onChange={(e) => updateNested('multimedia', 'instagramLiveUrl', e.target.value)} />
                       </div>
                    </div>
                 </div>
                 
                 {/* SERVICES LIST (Cultos Semanais) */}
                 <div className={sectionClass}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2"><Flame size={18} /> Cultos Semanais</h3>
                        <Button 
                            type="button"
                            variant="white"
                            className="px-6 py-2 text-xs h-10"
                            onClick={() => setFormData(prev => ({
                            ...prev,
                            services: [...(prev.services || []), { id: Date.now().toString(), day: 'Novo Dia', time: '00:00h', name: 'Novo Culto' }]
                            }))}
                        >
                            <Plus size={16} className="mr-1" /> Adicionar Culto
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {(formData.services || []).map((service) => (
                            <div key={service.id} className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl relative">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className={labelClass}>Dia</label>
                                        <input type="text" className={inputClass} value={service.day || ''} onChange={(e) => handleUpdateService(service.id, 'day', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Horário</label>
                                        <input type="text" className={inputClass} value={service.time || ''} onChange={(e) => handleUpdateService(service.id, 'time', e.target.value)} />
                                    </div>
                                    <div className="col-span-3 md:col-span-1">
                                        <label className={labelClass}>Nome do Culto</label>
                                        <input type="text" className={inputClass} value={service.name || ''} onChange={(e) => handleUpdateService(service.id, 'name', e.target.value)} />
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteItem('services', service.id)} 
                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
                 
                 {/* EVENTS LIST */}
                 <div className={sectionClass}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2"><Flame size={18} /> Próximos Eventos</h3>
                        <Button 
                            type="button"
                            variant="white"
                            className="px-6 py-2 text-xs h-10"
                            onClick={() => setFormData(prev => ({
                            ...prev,
                            events: [...(prev.events || []), { id: Date.now().toString(), title: 'Novo Evento', date: 'DD/MM', time: 'HH:MM', image: 'https://picsum.photos/800/500', description: 'Descrição do evento', tag: 'Evento' }]
                            }))}
                        >
                            <Plus size={16} className="mr-1" /> Adicionar Evento
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {(formData.events || []).map((event) => (
                            <div key={event.id} className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Título</label>
                                        <input type="text" className={inputClass} value={event.title || ''} onChange={(e) => handleUpdateEvent(event.id, 'title', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Descrição</label>
                                        <textarea className={`${inputClass} h-20`} value={event.description || ''} onChange={(e) => handleUpdateEvent(event.id, 'description', e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 col-span-2">
                                        <div>
                                            <label className={labelClass}>Data</label>
                                            <input type="text" className={inputClass} value={event.date || ''} onChange={(e) => handleUpdateEvent(event.id, 'date', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Horário</label>
                                            <input type="text" className={inputClass} value={event.time || ''} onChange={(e) => handleUpdateEvent(event.id, 'time', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Tag</label>
                                            <input type="text" className={inputClass} value={event.tag || ''} onChange={(e) => handleUpdateEvent(event.id, 'tag', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <ImageUploader
                                            onUploadSuccess={(url) => handleUpdateEvent(event.id, 'image', url)}
                                            currentImageUrl={event.image}
                                            folder={`events/${event.id}`}
                                            label="Upload da Imagem do Evento"
                                        />
                                        <div className="mt-4">
                                            <label className={labelClass}>Link da Imagem (URL)</label>
                                            <input type="text" className={inputClass} value={event.image || ''} onChange={(e) => handleUpdateEvent(event.id, 'image', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteItem('events', event.id)} 
                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* SERMONS LIST */}
                 <div>
                    <div className="flex justify-between items-center mb-4 sticky top-14 bg-black z-30 py-4 border-b border-zinc-900">
                        <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2"><Video size={18} /> Vídeos / Sermões</h3>
                        <Button 
                            type="button"
                            variant="white"
                            className="px-6 py-2 text-xs h-10"
                            onClick={() => setFormData(prev => ({
                            ...prev,
                            sermons: [...(prev.sermons || []), { id: Date.now().toString(), title: 'Nova Mensagem', preacher: prev.general.pastorName, date: 'Hoje', duration: '00:00', thumbnail: 'https://picsum.photos/600/400', videoUrl: '' }]
                            }))}
                        >
                            <Plus size={16} className="mr-1" /> Adicionar
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {(formData.sermons || []).map((sermon) => (
                            <div key={sermon.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-4 shadow-lg relative">
                                {/* Mobile: Stacked Layout */}
                                <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 bg-black rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                                        <img src={sermon.thumbnail} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <label className={labelClass}>Título</label>
                                        <input type="text" className={`${inputClass} mb-3`} value={sermon.title || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'title', e.target.value)} />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Pregador</label>
                                        <input type="text" className={inputClass} value={sermon.preacher || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'preacher', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <ImageUploader
                                            onUploadSuccess={(url) => handleUpdateSermon(sermon.id, 'thumbnail', url)}
                                            currentImageUrl={sermon.thumbnail}
                                            folder={`sermons/${sermon.id}`}
                                            label="Upload da Capa do Vídeo (Thumbnail)"
                                        />
                                        <div className="mt-4">
                                            <label className={labelClass}>Link da Imagem (Thumbnail)</label>
                                            <input type="text" className={inputClass} value={sermon.thumbnail || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'thumbnail', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Data</label>
                                            <input type="text" className={inputClass} value={sermon.date || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'date', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Duração</label>
                                            <input type="text" className={inputClass} value={sermon.duration || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'duration', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Link do Vídeo (YouTube/Vimeo)</label>
                                        <input type="text" className={inputClass} value={sermon.videoUrl || ''} onChange={(e) => handleUpdateSermon(sermon.id, 'videoUrl', e.target.value)} />
                                    </div>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteItem('sermons', sermon.id)} 
                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
            )}
            
            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between items-center mb-4 sticky top-14 bg-black z-30 py-4 border-b border-zinc-900">
                        <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2"><GalleryHorizontal size={18} /> Galeria de Fotos</h3>
                        {/* NOVO: Removido o botão de adicionar manual, substituído pelo GalleryUploader */}
                    </div>
                    
                    {/* NOVO: Componente de Upload Simplificado */}
                    <GalleryUploader onNewImageAdded={handleNewImageAdded} />

                    <div className="space-y-6 mt-8">
                        {(formData.gallery || []).map((photo) => (
                            <div key={photo.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-4 shadow-lg relative">
                                <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 bg-black rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                                        <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-3">
                                        {/* Removido ImageUploader interno, pois o upload é feito pelo componente GalleryUploader */}
                                        <div>
                                            <label className={labelClass}>Link da Imagem (URL)</label>
                                            <input type="text" className={inputClass} value={photo.url || ''} onChange={(e) => handleUpdateGallery(photo.id, 'url', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Descrição (Nome do Evento)</label>
                                            <input type="text" className={inputClass} value={photo.alt || ''} onChange={(e) => handleUpdateGallery(photo.id, 'alt', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteItem('gallery', photo.id)} 
                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
            )}
            
            {/* --- MESSAGES TAB --- */}
            {activeTab === 'messages' && (
              <div className="space-y-8">
                <ContactMessagesManager />
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;