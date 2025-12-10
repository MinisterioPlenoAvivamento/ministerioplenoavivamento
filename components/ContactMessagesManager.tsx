import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Mail, Loader2, CheckCircle, Trash2, MessageSquare, AlertTriangle, RotateCcw } from 'lucide-react';
import { showError, showSuccess } from '../utils/toast';
import Button from './Button';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const ContactMessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showError('Erro ao carregar mensagens: ' + error.message);
      console.error(error);
      setMessages([]);
    } else {
      setMessages(data as ContactMessage[]);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkAsRead = async (id: string, is_read: boolean) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: !is_read })
      .eq('id', id);

    if (error) {
      showError('Falha ao atualizar status.');
    } else {
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, is_read: !is_read } : msg
      ));
      showSuccess(is_read ? 'Mensagem marcada como não lida.' : 'Mensagem marcada como lida.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja apagar esta mensagem?')) return;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      showError('Falha ao apagar mensagem.');
    } else {
      setMessages(prev => prev.filter(msg => msg.id !== id));
      showSuccess('Mensagem apagada com sucesso.');
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages();
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'pedido_oracao': return 'bg-church-red text-white';
      case 'testemunho': return 'bg-yellow-500 text-black';
      case 'visita': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const formatType = (type: string) => {
    switch (type) {
      case 'pedido_oracao': return 'Pedido de Oração';
      case 'testemunho': return 'Testemunho';
      case 'visita': return 'Solicitar Visita';
      default: return 'Outros Assuntos';
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500">
        <Loader2 className="h-8 w-8 mx-auto animate-spin text-church-red" />
        <p className="mt-3">Carregando mensagens...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sticky top-14 bg-black z-30 py-4 border-b border-zinc-900">
        <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2"><Mail size={18} /> Caixa de Entrada</h3>
        <Button 
            type="button"
            variant="white"
            className="px-6 py-2 text-xs h-10"
            onClick={handleRefresh}
            disabled={isRefreshing}
        >
            {isRefreshing ? <Loader2 size={16} className="animate-spin mr-1" /> : <RotateCcw size={16} className="mr-1" />} 
            Atualizar
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 rounded-xl border border-zinc-800 text-gray-500">
          <MessageSquare className="h-10 w-10 mx-auto mb-4" />
          <p>Nenhuma mensagem de contato recebida ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-zinc-900 p-5 rounded-xl border transition-all duration-300 ${
                msg.is_read ? 'border-zinc-800 opacity-70' : 'border-church-red/50 shadow-lg shadow-red-900/10'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${getBadgeColor(msg.type)}`}>
                    {formatType(msg.type)}
                  </span>
                  <p className={`text-sm mt-2 ${msg.is_read ? 'text-gray-500' : 'text-white font-bold'}`}>
                    {new Date(msg.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleMarkAsRead(msg.id, msg.is_read)}
                    title={msg.is_read ? "Marcar como não lida" : "Marcar como lida"}
                    className={`p-2 rounded-full transition-colors ${
                      msg.is_read ? 'text-gray-500 hover:text-white hover:bg-zinc-800' : 'text-green-400 hover:bg-green-900/50'
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    title="Apagar Mensagem"
                    className="p-2 rounded-full text-red-500 hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2">{msg.name}</h4>
              <p className="text-gray-400 text-sm mb-3">
                <span className="font-mono mr-4">{msg.email}</span>
                {msg.phone && <span className="font-mono">{msg.phone}</span>}
              </p>
              
              <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessagesManager;