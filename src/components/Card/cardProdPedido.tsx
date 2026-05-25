"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function CardProdPedido({
    nome,
    img_url,
    descricao,
    preco,
    quantidade,
    tipo,
    exibirAvaliacao = true,
}: Props) {
    // Estados da avaliação
    // avaliacaoAberta: Controla se a div com as estrelas está visível (true) ou se mostra o botão inicial "Avaliar" (false).
    const [avaliacaoAberta, setAvaliacaoAberta] = useState(false);
    // notaUser: Armazena a nota (1 a 5) que o usuário clicou. Começa em 0.
    const [notaUser, setNotaUser] = useState(0);

    return (
        <main className="w-full">
            <div className="w-full border-2 border-[#14B8A6] rounded-lg shadow-sm p-3 mb-4 flex flex-col md:flex-row items-center gap-4 bg-white transition-all">
                <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                        src={img_url!}
                        alt={nome}
                        className="w-full h-full object-contain rounded"
                        priority
                    />
                </div>

                {/* Área de informações */}
                <div className="mt-2 text-lg">
                    <span className="font-bold">Preço:</span> R${" "}
                    {preco.toFixed(2)}
                    <span className="ml-3 font-bold">Qtd:</span> {quantidade}
                </div>

                {/* Área de avaliação */}
                {exibirAvaliacao && tipo == "cliente" && (
                    <div className="w-full md:w-auto flex flex-col items-center justify-center">
                        {!avaliacaoAberta ? (
                            <button
                                onClick={() => setAvaliacaoAberta(true)}
                                className="w-1/2 md:w-32 h-10 border-2 bg-[#f86d9bc1] text-white text-lg font-extrabold rounded hover:bg-[#14B8A6] hover:text-white transition-colors"
                            >
                                Avaliar
                            </button>
                        ) : (
                            <div className="flex flex-col items-center bg-gray-50 p-2 rounded-lg border border-gray-200 w-full md:w-auto shadow-inner animate-in fade-in zoom-in duration-200">
                                <span className="text-base font-extrabold text-gray-500 mb-1">
                                    Sua nota:
                                </span>

                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => {
                                        const valorEstrela = i + 1;
                                        return (
                                            <FaStar
                                                key={valorEstrela}
                                                className="cursor-pointer transition-colors"
                                                color={
                                                    valorEstrela <= notaUser
                                                        ? "#FFD700"
                                                        : "#e4e5e9"
                                                }
                                                size={22}
                                                onClick={() =>
                                                    setNotaUser(valorEstrela)
                                                }
                                            />
                                        );
                                    })}
                                </div>

                                {notaUser > 0 && (
                                    <button
                                        onClick={() =>
                                            setAvaliacaoAberta(false)
                                        }
                                        className="mt-2 w-1/2 h-10 bg-[#f86d9bc1] text-white font-extrabold text-base rounded hover:bg-teal-600 transition"
                                    >
                                        Enviar
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
