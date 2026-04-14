"use client";

import { PedidoProps, prods_fake } from "@/entities/entities";
import { useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoClose } from "react-icons/io5";

export default function CardPedido({ pedido }: PedidoProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main>
            {/* CARD PRINCIPAL DO PEDIDO */}
            <div className="relative w-full max-w-[450px] border-2 border-[#14B8A6] rounded-lg p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition text-black">
                
                {/* CABEÇALHO DO CARD: Título e Status*/}
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3 gap-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-gray-800 line-clamp-1">Detalhes da Compra</span>
                        <span className="text-xs text-gray-500 mt-0.5">
                            Realizada em: {pedido.data_registro ?? "Sem data"}
                        </span>
                    </div>
                    
                    {/* TAG DE STATUS: Informa a etapa logística atual do pedido */}
                    <span className="text-[11px] md:text-xs font-bold bg-teal-100 text-[#14B8A6] px-3 py-1 rounded-full uppercase tracking-wider text-center whitespace-nowrap">
                        Em Separação
                    </span>
                </div>

                {/* INFORMAÇÕES DO CLIENTE*/}
                <div className="text-sm space-y-2 mb-4 bg-gray-50 p-3 rounded border border-gray-100">
                    <div>
                        <span className="font-bold text-[#14B8A6]">Cliente:</span> Maria
                    </div>
                    <div>
                        <span className="font-bold text-[#14B8A6]">Telefone:</span> (11) 99999-9999
                    </div>
                    <div>
                        <span className="font-bold text-[#14B8A6]">Endereço:</span> {pedido.endereco_entrega}
                    </div>
                </div>

                {/* BOTÃO VER PRODUTOS E VALOR TOTAL */}
                <div className="text-sm flex flex-row justify-between items-center mb-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 transition font-semibold text-white rounded"
                    >
                        Ver Produtos
                    </button>
                    <div className="font-bold text-lg">
                        Total: R$ {pedido.valor_total.toFixed(2)}
                    </div>
                </div>

                {/* BOTÕES DE Editar e Excluir */}
                <div className="flex items-center justify-between font-semibold text-white mt-2 pt-3 border-t border-gray-200">
                    <button className="w-[48%] h-9 bg-red-400 hover:bg-red-500 transition rounded">
                        Excluir
                    </button>
                    <button className="w-[48%] h-9 bg-[#14B8A6] hover:bg-teal-600 transition rounded">
                        Editar
                    </button>
                </div>
            </div>

            {/* Modal de Itens */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white h-auto max-h-[85vh] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">Itens do Pedido</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-400 hover:text-white rounded-full transition-colors"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-[#FDF6F6]">
                            {pedido.prods_associados.map((prod) => {
                                const p = prods_fake.find((p) => p.id === prod.prod_id);
                                if (!p) return null;
                                return (
                                    <CardProdPedido
                                        key={prod.prod_id}
                                        {...p}
                                        quantidade={prod.qtd}
                                        preco_venda={prod.preco_venda}
                                        onChangeQtd={() => {}}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}