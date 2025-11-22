import React from 'react';
import { LayoutDashboard, MessageSquare, Layers, CreditCard, Settings, LogOut } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.MESSAGING, label: 'Mensagens', icon: MessageSquare },
    { id: AppView.INTEGRATIONS, label: 'Integrações', icon: Layers },
    { id: AppView.BILLING, label: 'Pagamentos', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <img src="/logo-laranja.png" alt="Vexio Studio" className="h-12 w-auto object-contain" />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-brand-50 text-brand-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Settings className="w-5 h-5 mr-3 text-gray-400" />
          Configurações
        </button>
        <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5 mr-3 text-red-400" />
          Sair
        </button>
      </div>
      
      <div className="p-6 pt-2">
         <div className="bg-gray-900 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-2">Precisa de ajuda?</p>
            <button className="text-xs font-bold bg-white text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-gray-100">
              Falar com Suporte
            </button>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;