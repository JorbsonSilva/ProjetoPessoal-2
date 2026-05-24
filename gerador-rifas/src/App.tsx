import React, { useState, useEffect } from 'react';
import { Ticket } from './components/Ticket';
import type { RaffleData } from './types';
import { Printer, Settings2 } from 'lucide-react';

function App() {
  const [raffleData, setRaffleData] = useState<RaffleData>(() => {
    const saved = localStorage.getItem('raffleData');
    if (saved) {
      const parsedData = JSON.parse(saved);
      return { subtitle: 'Ação Solidária', ...parsedData };
    }
    return {
      title: 'Comunidade Santa Dulce',
      subtitle: 'Ação Solidária',
      prize: 'Cesta de Dia dos Namorados',
      drawDate: '2026-06-12',
      price: 2.00,
      ticketCount: 10,
      themeColor: '#ef4444'
    };
  });

  useEffect(() => {
    localStorage.setItem('raffleData', JSON.stringify(raffleData));
  }, [raffleData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRaffleData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'ticketCount' ? Number(value) : value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const tickets = Array.from({ length: raffleData.ticketCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* PAINEL LATERAL */}
      <aside className="w-96 bg-white p-6 shadow-xl h-screen overflow-y-auto no-print fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <Settings2 size={24} />
          <h1 className="text-2xl font-bold">Configurar Rifa</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" name="title" value={raffleData.title} onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input type="text" name="subtitle" value={raffleData.subtitle} onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prêmio</label>
            <input type="text" name="prize" value={raffleData.prize} onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input type="number" name="price" value={raffleData.price} onChange={handleChange} min="0" step="0.50"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sorteio</label>
              <input type="date" name="drawDate" value={raffleData.drawDate} onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qtd. Bilhetes</label>
              <input type="number" name="ticketCount" value={raffleData.ticketCount} onChange={handleChange} min="1" max="1000"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Tema</label>
              <input type="color" name="themeColor" value={raffleData.themeColor} onChange={handleChange}
                className="w-full h-[42px] cursor-pointer border border-gray-300 rounded" />
            </div>
          </div>

          <button onClick={handlePrint}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors">
            <Printer size={20} />
            Imprimir Rifas
          </button>
        </div>
      </aside>

      {/* ÁREA DE PREVIEW */}
      {/* Aqui foi adicionado print:p-8 para dar margem na folha impressa */}
      <main className="ml-96 p-8 w-full print:ml-0 print:p-8">
        <div className="no-print mb-6">
          <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Preview de Impressão (Folha A4)</h2>
        </div>
        
        <div className="flex flex-col max-w-[800px] mx-auto">
          {tickets.map((num, index) => (
            <React.Fragment key={num}>
              <div className="break-inside-avoid py-4 print:py-2">
                <Ticket data={raffleData} number={num} />
              </div>
              
              {index < tickets.length - 1 && (
                <div className="w-full border-b-2 border-dashed border-gray-300 relative flex justify-center items-center my-2 print:my-1 break-inside-avoid">
                  <span className="text-[10px] text-gray-400 bg-gray-100 print:bg-white px-2 absolute uppercase tracking-widest no-print">
                     Linha de corte
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;