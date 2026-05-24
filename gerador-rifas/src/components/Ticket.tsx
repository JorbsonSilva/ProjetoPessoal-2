import React from 'react';
import type { RaffleData } from '../types';

interface TicketProps {
  data: RaffleData;
  number: number;
}

export const Ticket: React.FC<TicketProps> = ({ data, number }) => {
  const formattedNumber = String(number).padStart(3, '0');
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.price);

  return (

    <div className="flex border-2 border-solid border-gray-400 rounded-lg w-full max-w-[800px] h-36 bg-white overflow-hidden" style={{ borderColor: data.themeColor }}>
      <div className="w-1/3 p-3 flex flex-col justify-between border-r-2 border-dashed border-gray-400 bg-gray-50" style={{ borderColor: data.themeColor }}>
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase">Nº {formattedNumber}</p>
          <p className="text-sm font-bold mt-1 leading-tight line-clamp-1">{data.title}</p>
          <p className="text-xs font-semibold text-gray-600 line-clamp-1">{data.subtitle}</p>
        </div>
        <div className="space-y-1 mt-1 text-xs">
          <div className="border-b border-gray-300 pb-1">Nome:</div>
          <div className="border-b border-gray-300 pb-1">Telefone:</div>
        </div>
      </div>

      {/* Corpo Principal: padding reduzido para p-3 */}
      <div className="w-2/3 p-3 flex flex-col justify-between relative">
        <div className="absolute top-2 right-4 text-2xl font-black text-gray-400">
          Nº {formattedNumber}
        </div>
        
        <div>
          <h2 className="text-lg font-bold uppercase leading-tight pr-20" style={{ color: data.themeColor }}>
            {data.title}
          </h2>
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">
            {data.subtitle}
          </h3>
          <p className="text-sm text-gray-600 mt-1">Prêmio: <span className="font-bold text-gray-800">{data.prize}</span></p>
        </div>

        <div className="flex justify-between items-end mt-1">
          <div className="text-sm text-gray-600">
            <p>Data do Sorteio:</p>
            <p className="font-bold">{new Date(data.drawDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Valor do Bilhete</p>
            <p className="text-2xl font-black leading-none" style={{ color: data.themeColor }}>{formattedPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};