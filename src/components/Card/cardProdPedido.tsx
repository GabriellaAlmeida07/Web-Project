"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function CardProdPedido({
    nome,
    img,
    desc,
    preco_venda,
    quantidade,
    exibirAvaliacao = true,
}: Props) {  
    // ESTADOS DE AVALIAÇÃO
    // avaliacaoAberta: Controla se a div com as estrelas está visível (true) ou se mostra o botão inicial "Avaliar" (false).
    const [avaliacaoAberta, setAvaliacaoAberta] = useState(false);
    // notaUser: Armazena a nota (1 a 5) que o usuário clicou. Começa em 0.
    const [notaUser, setNotaUser] = useState(0);

    return (
        <main className="w-full">
            {/* CONTAINER PRINCIPAL DO CARD */}
            <div className="w-full border-2 border-[#14B8A6] rounded-lg shadow-sm p-3 mb-4 flex flex-col md:flex-row items-center gap-4 bg-white transition-all">
                
                <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                        src={img!}
                        alt={nome}
                        className="w-full h-full object-contain rounded"
                        priority
                    />
                </div>

                {/* ÁREA DE INFORMAÇÕES DO PRODUTO */}
                <div className="flex flex-col flex-1 text-black text-sm text-center md:text-left">
                    <div className="font-bold text-base line-clamp-1">{nome}</div>
                    <div className="text-gray-600 text-xs line-clamp-2 mt-1">{desc}</div>
                    <div className="mt-2">
                        Preço: <span className="font-bold text-[#14B8A6]">R$ {preco_venda.toFixed(2)}</span>
                        <span className="ml-3 font-semibold bg-gray-100 px-2 py-1 rounded">Qtd: {quantidade}</span>
                    </div>
                </div>

                {/* ÁREA DE AVALIAÇÃO: Botão "Avaliar" ou as estrelas, dependendo do estado */}
                {exibirAvaliacao && (
                    <div className="w-full md:w-auto flex flex-col items-center justify-center">
                        {!avaliacaoAberta ? (
                            <button
                                onClick={() => setAvaliacaoAberta(true)}
                                className="w-full md:w-32 h-10 border-2 border-[#14B8A6] text-[#14B8A6] font-bold rounded hover:bg-[#14B8A6] hover:text-white transition-colors"
                            >
                                Avaliar
                            </button>
                        ) : (
                            <div className="flex flex-col items-center bg-gray-50 p-2 rounded-lg border border-gray-200 w-full md:w-auto shadow-inner animate-in fade-in zoom-in duration-200">
                                <span className="text-xs text-gray-500 mb-1 font-medium">Sua nota:</span>
                                
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => {
                                        const valorEstrela = i + 1;
                                        return (
                                            <FaStar
                                                key={valorEstrela}
                                                className="cursor-pointer transition-colors"
                                                color={valorEstrela <= notaUser ? "#FFD700" : "#e4e5e9"}
                                                size={22}
                                                onClick={() => setNotaUser(valorEstrela)}
                                            />
                                        );
                                    })}
                                </div>
                                
                                {notaUser > 0 && (
                                    <button
                                        onClick={() => setAvaliacaoAberta(false)}
                                        className="mt-2 w-full h-7 bg-[#14B8A6] text-white font-semibold text-xs rounded hover:bg-teal-600 transition"
                                    >
                                        Enviar
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {/* FIM DA CONDIÇÃO */}

            </div>
        </main>
    );
}