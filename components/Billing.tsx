import React from 'react';
import { CreditCard, Check, AlertCircle, Receipt } from 'lucide-react';

const Billing: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Faturamento e Planos</h2>
        <p className="text-gray-500">Gerencie sua assinatura e métodos de pagamento.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-brand-500 to-brand-700 text-white">
               <div className="flex justify-between items-center">
                 <div>
                   <h3 className="text-lg font-bold">Plano Profissional</h3>
                   <p className="text-brand-100 text-sm">Renova em 15 de Outubro, 2025</p>
                 </div>
                 <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                   Ativo
                 </span>
               </div>
             </div>
             <div className="p-6">
               <div className="flex items-end mb-6">
                 <span className="text-4xl font-bold text-gray-900">R$ 149</span>
                 <span className="text-gray-500 mb-1 ml-1">/mês</span>
               </div>
               
               <div className="space-y-3 mb-6">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Mensagens (WhatsApp)</span>
                   <span className="font-medium text-gray-900">2.450 / 5.000</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                   <div className="bg-brand-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                 </div>
                 
                 <div className="flex justify-between text-sm pt-2">
                   <span className="text-gray-600">Atendentes</span>
                   <span className="font-medium text-gray-900">3 / 5</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                   <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                 </div>
               </div>

               <div className="flex space-x-4">
                 <button className="flex-1 bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                   Fazer Upgrade
                 </button>
                 <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                   Alterar Plano
                 </button>
               </div>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-100">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Histórico de Pagamentos</h3>
                <button className="text-brand-600 text-sm font-medium hover:text-brand-700">Baixar todos</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50 text-gray-500">
                   <tr>
                     <th className="px-6 py-3 font-medium">Data</th>
                     <th className="px-6 py-3 font-medium">Descrição</th>
                     <th className="px-6 py-3 font-medium">Valor</th>
                     <th className="px-6 py-3 font-medium">Status</th>
                     <th className="px-6 py-3 font-medium">Recibo</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {[1, 2, 3].map((i) => (
                     <tr key={i} className="hover:bg-gray-50">
                       <td className="px-6 py-4 text-gray-900">15 Set 2023</td>
                       <td className="px-6 py-4 text-gray-600">Plano Profissional - Mensal</td>
                       <td className="px-6 py-4 text-gray-900 font-medium">R$ 149,00</td>
                       <td className="px-6 py-4">
                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center">
                           <Check className="w-3 h-3 mr-1" /> Pago
                         </span>
                       </td>
                       <td className="px-6 py-4">
                         <button className="text-gray-400 hover:text-gray-600">
                           <Receipt className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Método de Pagamento</h3>
              <div className="space-y-4">
                <div className="border border-brand-200 bg-brand-50 rounded-lg p-4 flex items-center justify-between">
                   <div className="flex items-center">
                     <CreditCard className="w-6 h-6 text-brand-700 mr-3" />
                     <div>
                       <p className="font-bold text-gray-900 text-sm">Mastercard final 8822</p>
                       <p className="text-xs text-gray-500">Expira em 12/28</p>
                     </div>
                   </div>
                   <div className="h-4 w-4 rounded-full bg-brand-600 border-2 border-white shadow-sm"></div>
                </div>
                <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm font-medium hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 transition-colors">
                  + Adicionar novo cartão
                </button>
              </div>
           </div>

           <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Créditos Pré-pagos</h4>
                  <p className="text-blue-700 text-xs mb-3">
                    Você tem R$ 12,50 em créditos para envio de mensagens fora da janela de 24h (Marketing).
                  </p>
                  <button className="text-xs font-bold text-blue-800 bg-white px-3 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition-colors">
                    Recarregar Saldo
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;