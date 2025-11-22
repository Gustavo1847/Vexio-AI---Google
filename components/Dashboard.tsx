import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MessageSquare, Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { ChartData } from '../types';

const data: ChartData[] = [
  { name: 'Seg', messages: 400, cost: 24 },
  { name: 'Ter', messages: 300, cost: 18 },
  { name: 'Qua', messages: 550, cost: 35 },
  { name: 'Qui', messages: 450, cost: 28 },
  { name: 'Sex', messages: 700, cost: 45 },
  { name: 'Sab', messages: 350, cost: 22 },
  { name: 'Dom', messages: 200, cost: 10 },
];

const StatCard: React.FC<{ title: string; value: string; sub: string; icon: React.ReactNode; color: string }> = ({ title, value, sub, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        <p className={`text-xs mt-1 ${color.includes('green') ? 'text-green-600' : 'text-blue-600'}`}>{sub}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Geral</h2>
        <p className="text-gray-500">Visão geral das métricas de comunicação e custos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Mensagens" 
          value="2.950" 
          sub="+12% vs semana anterior" 
          icon={<MessageSquare className="h-6 w-6 text-brand-600" />} 
          color="bg-brand-50" 
        />
        <StatCard 
          title="Contatos Ativos" 
          value="843" 
          sub="+5% novos usuários" 
          icon={<Users className="h-6 w-6 text-purple-600" />} 
          color="bg-purple-50" 
        />
        <StatCard 
          title="Custo Estimado" 
          value="R$ 182,00" 
          sub="Previsão mensal: R$ 750" 
          icon={<DollarSign className="h-6 w-6 text-green-600" />} 
          color="bg-green-50" 
        />
        <StatCard 
          title="Taxa de Entrega" 
          value="98.5%" 
          sub="1.5% falhas (API)" 
          icon={<Activity className="h-6 w-6 text-blue-600" />} 
          color="bg-blue-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-brand-600" />
            Volume de Mensagens (7 dias)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="messages" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
            Custo Diário (BRL)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="cost" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;