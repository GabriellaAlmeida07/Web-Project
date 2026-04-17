"use client";

import { PedidoProps, prods_fake } from "@/entities/entities";
import { useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoClose } from "react-icons/io5";

export default function CardPedido({ pedido, user }: PedidoProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main className="w-full sm:w-[450px] shrink-0">
            {/* Card principal do pedido */}
            <div className="relative w-full h-[370px] border-2 border-[#14B8A6] rounded-lg p-5 flex flex-col bg-white shadow-sm hover:shadow-md transition text-black">
                {/* Cabeçalho do card: título e status */}
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3 gap-4">
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-lg text-gray-800 line-clamp-1">
                            Detalhes da compra
                        </span>

                        <span className="text-base text-gray-500 mt-0.5">
                            Realizada em: {pedido.data_registro ?? "Sem data"}
                        </span>
                    </div>

                    {pedido.entregue ? (
                        <span className="text-base font-bold bg-[#f08fafc1] text-white px-3 py-1 rounded-full text-center whitespace-nowrap shrink-0">
                            Enviado
                        </span>
                    ) : (
                        <span className="text-base font-bold bg-[#f08fafc1] text-white px-3 py-1 rounded-full text-center whitespace-nowrap shrink-0">
                            Em separação
                        </span>
                    )}
                </div>
                {/* Informações */}
                <div className="text-base space-y-2 mb-4 bg-gray-50 p-3 rounded border border-gray-100 break-words">
                    {user === "vendedor" && (
                        <div>
                            <span className="font-bold text-[#14B8A6]">
                                Cliente:
                            </span>{" "}
                            Maria
                        </div>
                    )}

                    <div>
                        <span className="font-bold text-[#14B8A6]">
                            Telefone:
                        </span>{" "}
                        (11) 99999-9999
                    </div>

                    <div>
                        <span className="font-bold text-[#14B8A6]">
                            Endereço:
                        </span>{" "}
                        {pedido.endereco_entrega}
                    </div>
                </div>
                {/* Botão ver produtos + total */}
                <div className="text-base flex justify-between items-center mb-4 gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-700 transition font-semibold text-white rounded shrink-0"
                    >
                        Ver produtos
                    </button>

                    <div className="font-bold text-lg text-right break-words">
                        Total: R$ {pedido.valor_total.toFixed(2)}
                    </div>
                </div>
                {/* Rodapé */}
                <div className="mt-2 pt-3 text-base border-t border-gray-200">
                    {user === "cliente" &&
                        (pedido.entregue ? (
                            <span className="block mt-3 w-full border border-gray-300 p-2 text-center font-semibold text-black rounded">
                                Já entregue
                            </span>
                        ) : (
                            <div className="flex mt-3 gap-2">
                                <button className="w-full h-10 bg-red-400 hover:bg-red-500 transition rounded font-semibold text-white">
                                    Cancelar
                                </button>

                                <button className="w-full h-10 bg-teal-500 hover:bg-teal-600 transition rounded font-semibold text-white">
                                    Editar
                                </button>
                            </div>
                        ))}

                    {user === "vendedor" && !pedido.entregue && (
                        <button className="w-full h-10 bg-[#14B8A6] hover:bg-teal-600 transition rounded font-semibold text-white">
                            Marcar como entregue
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de produtos */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white h-auto max-h-[85vh] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">
                                Itens do pedido
                            </h3>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-400 hover:text-white rounded-full transition-colors"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-[#FDF6F6]">
                            {pedido.prods_associados.map((prod) => {
                                const p = prods_fake.find(
                                    (p) => p.id === prod.prod_id
                                );

                                if (!p) return null;

                                return (
                                    <CardProdPedido
                                        key={prod.prod_id}
                                        {...p}
                                        quantidade={prod.qtd}
                                        tipo={user}
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
