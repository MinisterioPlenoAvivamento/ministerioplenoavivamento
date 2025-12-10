import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { useChurchData } from '../context/ChurchContext';
import { supabase } from '../integrations/supabase/client';
import { showLoading, showSuccess, showError, dismissToast } from '../utils/toast';

const Contact: React.FC = () => {
  const { data } = useChurchData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'pedido_oracao'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const toastId = showLoading('Enviando sua mensagem...');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            type: formData.type,
          },
        ]);

      if (error) {
        throw error;
      }

      dismissToast(toastId);
      showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '', type: 'pedido_oracao' }); // Limpa o formulário

    } catch (error: any) {
      dismissToast(toastId);
      console.error('Submission Error:', error);
      showError(`Falha ao enviar: ${error.message || 'Erro desconhecido.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOpenGps = () => {
    const fullAddress = `${data.contact.address}, ${data.contact.cityState}, Brasil`;
    // Cria um link de busca universal para o Google Maps
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      <div className="bg-church-black py-16 text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Contato</h1>
          <p className="text-xl text-gray-400 font-light">Estamos aqui para ouvir e orar por você.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="space-y-8">
             <div className="grid gap-6">
                <div className="bg-church-dark p-6 rounded-2xl border border-white/5 flex items-start gap-5 hover:border-church-red/30 transition-colors group">
                   <div className="bg-zinc-800 p-4 rounded-xl group-hover:bg-church-red transition-colors">
                      <MapPin className="text-white" size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white mb-1">Visite-nos</h3>
                      <p className="text-gray-400 text-sm">{data.contact.address}</p>
                      <p className="text-gray-400 text-sm">{data.contact.cityState}</p>
                   </div>
                </div>

                <div className="bg-church-dark p-6 rounded-2xl border border-white/5 flex items-start gap-5 hover:border-church-red/30 transition-colors group">
                   <div className="bg-zinc-800 p-4 rounded-xl group-hover:bg-church-red transition-colors">
                      <Phone className="text-white" size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white mb-1">Ligue ou Zap</h3>
                      <p className="text-gray-400 text-sm">{data.contact.phone}</p>
                      <p className="text-gray-400 text-sm">{data.contact.whatsapp} (WhatsApp)</p>
                   </div>
                </div>

                <div className="bg-church-dark p-6 rounded-2xl border border-white/5 flex items-start gap-5 hover:border-church-red/30 transition-colors group">
                   <div className="bg-zinc-800 p-4 rounded-xl group-hover:bg-church-red transition-colors">
                      <Mail className="text-white" size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white mb-1">E-mail</h3>
                      <p className="text-gray-400 text-sm">{data.contact.email}</p>
                   </div>
                </div>
             </div>

             {/* Stylized Map Placeholder */}
             <div className="h-64 bg-zinc-900 rounded-2xl border border-white/5 relative overflow-hidden group">
                <img src="https://picsum.photos/id/122/800/400" alt="Map" className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Button 
                      variant="outline" 
                      className="backdrop-blur-sm bg-black/50 border-white/30 hover:bg-church-red hover:border-church-red"
                      onClick={handleOpenGps} // Adicionado o handler de clique
                   >
                      Abrir no GPS
                   </Button>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="bg-church-dark p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <MessageSquare size={100} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Envie uma Mensagem</h2>
            <p className="text-gray-500 mb-8 text-sm">Preencha o formulário abaixo e retornaremos em breve.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all placeholder-gray-700"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all placeholder-gray-700"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all placeholder-gray-700"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Motivo</label>
                <select
                  name="type"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all appearance-none"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="pedido_oracao">Pedido de Oração</option>
                  <option value="testemunho">Testemunho / Graça Alcançada</option>
                  <option value="visita">Solicitar Visita</option>
                  <option value="contato">Outros Assuntos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all placeholder-gray-700"
                  placeholder="Escreva aqui..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <Button type="submit" fullWidth className="mt-2 bg-gradient-to-r from-church-red to-red-800" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Enviar Agora <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;