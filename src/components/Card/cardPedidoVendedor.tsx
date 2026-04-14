"use client";

import { PedidoProps, prods_fake } from "@/entities/entities";
import { useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoClose, IoRocketOutline } from "react-icons/io5";

export default function CardPedidoVendedor({ pedido }: PedidoProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [entregue, setEntregue] = useState(false);

    const handleEntregar = () => {
        alert(`Pedido #${pedido.id} marcado como enviado!`);
        setEntregue(true);
    };

    return (
        <main className="m-2">
            <div className={`relative w-full max-w-[450px] border-2 ${entregue ? 'border-gray-400' : 'border-[#14B8A6]'} rounded-lg p-5 flex flex-col justify-between bg-white shadow-sm transition text-black`}>
                
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-gray-800">Pedido #{pedido.id}</span>
                        <span className="text-xs text-gray-500">Data: {pedido.data_registro}</span>
                    </div>
                    <span className={`text-[11px] font-bold ${entregue ? 'bg-gray-100 text-gray-500' : 'bg-teal-100 text-[#14B8A6]'} px-3 py-1 rounded-full uppercase`}>
                        {entregue ? "Enviado" : "Em Separação"}
                    </span>
                </div>

                <div className="text-sm space-y-2 mb-4 bg-gray-50 p-3 rounded border border-gray-100">
                    <p><span className="font-bold text-[#14B8A6]">Destino:</span> {pedido.endereco_entrega}</p>
                    <p><span className="font-bold text-[#14B8A6]">ID Cliente:</span> {pedido.id_cliente}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition">
                        Ver Itens
                    </button>
                    <div className="font-bold text-lg">Total: R$ {pedido.valor_total.toFixed(2)}</div>
                </div>

                {/* BOTÃO ÚNICO DO VENDEDOR */}
                <button 
                    onClick={handleEntregar}
                    disabled={entregue}
                    className={`w-full h-10 flex items-center justify-center gap-2 rounded font-bold transition ${entregue ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#14B8A6] hover:bg-teal-600 text-white'}`}
                >
                    <IoRocketOutline size={20} />
                    {entregue ? "Pedido Despachado" : "Marcar como Entregue"}
                </button>
            </div>

            {/* Modal de Itens */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white max-h-[85vh] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden text-black">
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h3 className="font-bold text-lg">Itens para Separação</h3>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-400 rounded-full transition">
                                <IoClose size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-[#FDF6F6]">
                            {pedido.prods_associados.map((prod) => {
                                const p = prods_fake.find((item) => item.id === prod.prod_id);
                                return p ? (
                                    <CardProdPedido 
                                        key={prod.prod_id} 
                                        {...p} 
                                        quantidade={prod.qtd} 
                                        preco_venda={prod.preco_venda} 
                                        onChangeQtd={() => {}} 
                                        exibirAvaliacao={false}
                                    />
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}