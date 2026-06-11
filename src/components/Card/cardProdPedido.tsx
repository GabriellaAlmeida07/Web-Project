"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaSpinner } from "react-icons/fa"; 
import { toast } from "sonner"; 

type CardProdPedidoProps = Props & {
    idClientePedido?: number;
};

export default function CardProdPedido({
    id,
    nome,
    img_url,
    descricao,
    preco,
    quantidade,
    tipo,
    exibirAvaliacao = true,
    idClientePedido,
}: CardProdPedidoProps) {
    // Estados da avaliação
    // avaliacaoAberta: Controla se a div com as estrelas está visível (true) ou se mostra o botão inicial "Avaliar" (false).
    const [avaliacaoAberta, setAvaliacaoAberta] = useState(false);
    // notaUser: Armazena a nota (1 a 5) que o usuário clicou. Começa em 0.
    const [notaUser, setNotaUser] = useState(0);
    const [loadingEnvio, setLoadingEnvio] = useState(false);
    // Guarda na memória se o cliente já enviou a nota
    const [avaliado, setAvaliado] = useState(false); 

    // Função que manda a nota pro banco
    async function enviarAvaliacao() {
        if (notaUser === 0) return;

        // Usa o ID que veio direto do pedido
        if (!idClientePedido) {
            toast.error("Erro de segurança: Cliente não identificado no pedido.");
            return; 
        }

        try {
            setLoadingEnvio(true);
            const response = await fetch("/api/avaliacoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_produto: id,
                    id_cliente: idClientePedido,
                    nota: notaUser,
                }),
            });

            if (response.ok) {
                toast.success("Avaliação salva com sucesso!");
                setAvaliado(true); // Marca o produto como avaliada
                setAvaliacaoAberta(false); // Fecha a caixinha de estrelas
            } else {
                toast.error("Ops! Erro ao enviar a avaliação.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Erro de conexão com o banco de dados.");
        } finally {
            setLoadingEnvio(false);
        }
    }

    return (
        <main className="w-full">
            <div className="w-full border-2 border-[#14B8A6] rounded-lg shadow-sm p-3 mb-4 flex flex-col md:flex-row items-center gap-4 bg-white transition-all">
                <div className="relative h-20 w-20 flex-shrink-0">
                    {img_url ? (
                        <Image
                            src={img_url}
                            alt={nome}
                            width={80}
                            height={80}
                            className="object-contain rounded"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-xs">
                            Sem imagem
                        </div>
                    )}
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
                        
                        {/* Se avaliado for verdadeiro mostra esse selo: */}
                        {avaliado ? (
                            <span className="text-teal-700 font-extrabold text-lg bg-teal-50 px-5 py-2 rounded-lg border-2 border-teal-200">
                                ⭐ Avaliado!
                            </span>
                        ) : !avaliacaoAberta ? (
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
                                        onClick={enviarAvaliacao} 
                                        disabled={loadingEnvio}
                                        className="mt-2 w-1/2 h-10 bg-[#f86d9bc1] flex items-center justify-center gap-2 text-white font-extrabold text-base rounded hover:bg-teal-600 transition disabled:opacity-70"
                                    >
                                        {loadingEnvio ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            "Enviar"
                                        )}
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