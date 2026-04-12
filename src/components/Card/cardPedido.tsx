"use client";

import { Pedido, PedidoProps, prods_fake } from "@/entities/entities";
import { useState } from "react";
import CardProdPedido from "./cardProdPedido";


export default function CardPedido({ pedido }: PedidoProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main>
            <div className="relative w-72 h-[410px] md:w-[500px] border-2 border-[#F08FAF] rounded-lg p-3 flex flex-col justify-between">
                
                {/* Data do pedido */}
                <div className="flex justify-end text-sm font-medium">
                    {pedido.data_registro ?? "Sem data"}
                </div>

                {/* Infos fake */}
                <div className="text-sm space-y-1">
                    <div>
                        <span className="font-semibold">Cliente:</span> Maria
                    </div>
                    <div>
                        <span className="font-semibold">Telefone:</span> (11) 99999-9999
                    </div>
                    <div>
                        <span className="font-semibold">Endereço:</span> {pedido.endereco_entrega}
                    </div>
                </div>

                {/* Total + botão para visualizar produtos */}
                <div className="text-sm flex flex-row gap-3 items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-32 h-8 flex items-center justify-center bg-gray-400 font-semibold text-white rounded"
                    >
                        Ver Produtos
                    </button>

                    <div className="font-semibold">
                        Total: R$ {pedido.valor_total.toFixed(2)}
                    </div>
                </div>

                {/* Botões */}
                <div className="flex items-center justify-center font-semibold text-white gap-3 mt-2">
                    <button className="w-20 h-8 bg-red-400 rounded">
                        Excluir
                    </button>
                    <button className="w-20 h-8 bg-[#F08FAF] rounded">
                        Editar
                    </button>
                </div>
            </div>

            {/* Visualizar produtos */}
            {isOpen && (
                <div className="fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-4/5 w-[92%] z-50 shadow-2xl">
                    
                    <div className="p-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-[#F08FAF] text-white px-4 py-2 rounded"
                        >
                            Voltar
                        </button>
                    </div>

                    <div className="flex flex-wrap overflow-y-auto">
                        {pedido.prods_associados.map((prod) => {
                            const p = prods_fake.find(
                                (p) => p.id === prod.prod_id
                            );

                            if (!p) return null;

                            return (
                                <CardProdPedido
                                    key={prod.prod_id}
                                    id={p.id}
                                    nome={p.nome}
                                    img={p.img}
                                    desc={p.desc}
                                    qtd_disp={10}
                                    preco_venda={prod.preco_venda}
                                    quantidade={prod.qtd}
                                    onChangeQtd={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}