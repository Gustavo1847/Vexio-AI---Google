import React, { useState } from 'react';
import { CheckCircle, XCircle, ExternalLink, RefreshCw, Settings } from 'lucide-react';
import { Integration } from '../types';

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'WhatsApp Business API',
      provider: 'whatsapp',
      connected: true,
      phoneNumber: '+55 11 99999-8888',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
    },
    {
      id: '2',
      name: 'Instagram Direct',
      provider: 'instagram',
      connected: false,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
    },
    {
      id: '3',
      name: 'Facebook Messenger',
      provider: 'facebook',
      connected: true,
      pageId: '1029384756',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg'
    }
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, connected: !item.connected };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Integrações</h2>
        <p className="text-gray-500">Gerencie suas conexões com as APIs oficiais da Meta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 p-2 border border-gray-100 flex items-center justify-center">
                  <img src={integration.icon} alt={integration.name} className="w-full h-full object-contain" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${integration.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {integration.connected ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Conectado
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" /> Desconectado
                    </>
                  )}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{integration.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {integration.provider === 'whatsapp' ? 'Envie mensagens, áudios e templates automáticos.' : 
                 integration.provider === 'instagram' ? 'Responda directs e mentions em tempo real.' : 'Gerencie conversas da sua página.'}
              </p>

              {integration.connected && (
                <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                   {integration.phoneNumber && <p>Tel: {integration.phoneNumber}</p>}
                   {integration.pageId && <p>Page ID: {integration.pageId}</p>}
                   <p className="text-green-600 flex items-center"><RefreshCw className="w-3 h-3 mr-1"/> Sincronizado agora mesmo</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <button className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center">
                <Settings className="w-4 h-4 mr-1" /> Configurar
              </button>
              <button 
                onClick={() => toggleConnection(integration.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  integration.connected 
                  ? 'bg-white text-red-600 border border-gray-200 hover:bg-red-50' 
                  : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                {integration.connected ? 'Desconectar' : 'Conectar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">Documentação da API Oficial</h3>
          <p className="text-indigo-200 mb-6">Para utilizar as integrações oficiais, você precisará de uma conta verificada no Meta Business Suite e tokens de acesso válidos.</p>
          <a href="#" className="inline-flex items-center bg-white text-indigo-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">
            Ler Documentação <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 transform skew-x-12 translate-x-12 bg-white"></div>
      </div>
    </div>
  );
};

export default Integrations;