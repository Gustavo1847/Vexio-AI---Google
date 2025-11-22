import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Paperclip, Smile, Sparkles, MoreVertical, Search, Phone, Video } from 'lucide-react';
import { Contact, Message } from '../types';
import { generateDraftMessage } from '../services/geminiService';

const Messaging: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPromptText, setAiPromptText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    { id: '1', name: 'Maria Silva', avatar: 'https://picsum.photos/seed/maria/200', platform: 'whatsapp', lastMessage: 'Obrigada pelo retorno!', unreadCount: 0 },
    { id: '2', name: 'João Santos', avatar: 'https://picsum.photos/seed/joao/200', platform: 'instagram', lastMessage: 'Qual o valor do plano?', unreadCount: 2 },
    { id: '3', name: 'Tech Solutions', avatar: 'https://picsum.photos/seed/tech/200', platform: 'facebook', lastMessage: 'Podemos agendar uma call?', unreadCount: 0 },
  ];

  // Mock initial messages
  const [messages, setMessages] = useState<Message[]>([
    { id: '101', sender: 'contact', text: 'Olá, gostaria de saber mais sobre os serviços.', timestamp: '10:30', platform: 'whatsapp', type: 'text' },
    { id: '102', sender: 'user', text: 'Olá! Claro, será um prazer ajudar. O que você precisa especificamente?', timestamp: '10:32', platform: 'whatsapp', type: 'text' },
    { id: '103', sender: 'contact', text: 'Preciso automatizar o atendimento do meu delivery.', timestamp: '10:35', platform: 'whatsapp', type: 'text' },
  ]);

  useEffect(() => {
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: selectedContact?.platform || 'whatsapp',
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleAiGenerate = async () => {
    if (!aiPromptText.trim()) return;
    setIsGenerating(true);
    
    const draft = await generateDraftMessage(aiPromptText, "Profissional e empático");
    
    setMessageText(draft);
    setIsGenerating(false);
    setShowAiPrompt(false);
    setAiPromptText('');
  };

  const handleRecordAudio = () => {
    // Simulating audio recording state
    setIsRecording(!isRecording);
    if (isRecording) {
      // Stop recording logic would go here
      const audioMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: 'Mensagem de voz (0:14)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        platform: selectedContact?.platform || 'whatsapp',
        type: 'audio'
      };
      setMessages([...messages, audioMsg]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-brand-300 focus:ring-0 text-sm transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact?.id === contact.id ? 'bg-brand-50 border-r-4 border-brand-500' : ''}`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${contact.platform === 'whatsapp' ? 'bg-green-500' : contact.platform === 'instagram' ? 'bg-pink-500' : 'bg-blue-600'}`}>
                  {contact.platform === 'whatsapp' && <span className="text-[10px] text-white font-bold">W</span>}
                  {contact.platform === 'instagram' && <span className="text-[10px] text-white font-bold">I</span>}
                  {contact.platform === 'facebook' && <span className="text-[10px] text-white font-bold">F</span>}
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{contact.name}</h4>
                  <span className="text-xs text-gray-400">10:35</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unreadCount > 0 && (
                <div className="ml-2 bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {contact.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-gray-900">{selectedContact.name}</h3>
                  <span className="flex items-center text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Online agora
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                 <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><Phone className="w-5 h-5" /></button>
                 <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><Video className="w-5 h-5" /></button>
                 <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                    msg.sender === 'user' 
                    ? 'bg-brand-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.type === 'audio' ? (
                       <div className="flex items-center space-x-2">
                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                           <Mic className="w-4 h-4" />
                         </div>
                         <div className="h-1 w-24 bg-white/30 rounded-full"></div>
                         <span className="text-xs opacity-80">0:14</span>
                       </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                    <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'user' ? 'text-brand-100' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
               {showAiPrompt && (
                 <div className="mb-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-2">
                       <h5 className="text-xs font-bold text-indigo-800 flex items-center">
                         <Sparkles className="w-3 h-3 mr-1" />
                         Vexio Studio IA Composer
                       </h5>
                       <button onClick={() => setShowAiPrompt(false)} className="text-indigo-400 hover:text-indigo-800 text-xs">Cancelar</button>
                    </div>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={aiPromptText}
                        onChange={(e) => setAiPromptText(e.target.value)}
                        placeholder="Ex: Crie uma promoção de sexta-feira para pizza..."
                        className="flex-1 text-sm border-indigo-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                        onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                      />
                      <button 
                        onClick={handleAiGenerate}
                        disabled={isGenerating}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                      >
                        {isGenerating ? 'Gerando...' : 'Gerar'}
                      </button>
                    </div>
                 </div>
               )}

              <div className="flex items-center space-x-3">
                <button onClick={() => setShowAiPrompt(!showAiPrompt)} className="p-2 rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors" title="Ajuda IA">
                  <Sparkles className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem..." 
                    className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                  />
                  <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                {messageText.length > 0 ? (
                   <button onClick={handleSendMessage} className="p-3 rounded-full bg-brand-600 text-white hover:bg-brand-700 shadow-sm transition-transform transform active:scale-95">
                     <Send className="w-5 h-5" />
                   </button>
                ) : (
                  <button 
                    onClick={handleRecordAudio} 
                    className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Message />
            </div>
            <p>Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock icon component for empty state
const Message = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default Messaging;