"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaPen, FaRegStar, FaSpinner, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function CardProduto({
    id,
    nome,
    img_url,
    descricao,
    qtd_estoque,
    preco,
    avaliacao,
    quantidade,
    onChangeQtd,
    tipo,
}: Props) {
    const router = useRouter();
    const [digitando, setDigitando] = useState<string | null>(null);
    const [loadingExclusao, setLoadingExclusao] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    
    // Guarda a média de estrelas deste produto específico
    const [mediaAvaliacao, setMediaAvaliacao] = useState<number>(0);
    const [totalAvaliacoes, setTotalAvaliacoes] = useState<number>(0);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Assim que o card aparece na tela, ele vai no banco perguntar a média
    useEffect(() => {
        async function buscarMedia() {
            if (!id) return;
            try {
                const res = await fetch(`/api/avaliacoes/${id}`);
                const data = await res.json();
                if (data.media !== undefined) {
                    setMediaAvaliacao(data.media);
                    setTotalAvaliacoes(data.total);
                }
            } catch (error) {
                console.error("Erro ao carregar média do produto:", error);
            }
        }
        buscarMedia();
    }, [id]);

    function diminuir() {
        if (quantidade > 0) {
            onChangeQtd(quantidade - 1);
        }
    }

    function aumentar() {
        if (quantidade < qtd_estoque) {
            onChangeQtd(quantidade + 1);
        }
    }

    async function editarProduto() {
        router.push(`/EdicaoProduto?id=${id}`);
    }

    async function deletarProduto() {
        try {
            setLoadingExclusao(true);
            const response = await fetch(`/api/produtos/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                toast.info("Produto excluído!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Erro ao conectar com o servidor");
        } finally {
            setLoadingExclusao(false);
        }
    }

    return (
        <main>
            <div
                className={
                    "w-36 md:w-44 h-96 border-2 border-teal-600 rounded-lg shadow-lg mt-5 ml-5 flex flex-col gap-5 overflow-hidden"
                }
            >
                {/* Imagem */}
                <div className="relative h-24 w-full">
                    {img_url ? (
                        <Image
                            src={img_url}
                            alt="Produto"
                            width={400}
                            height={400}
                            className="w-full h-24 object-cover cursor-pointer"
                        />
                    ) : (
                        <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 cursor-pointer">
                            Sem foto
                        </div>
                    )}
                </div>

                {/* Informações */}
                <div className="flex flex-col flex-1 items-center space-y-2 px-2 pt-1 text-black text-base text-center">
                    <div className="font-bold text-base w-36 h-8 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {" "}
                        {nome}{" "}
                    </div>

                    <div className="text-base w-36 h-10 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {" "}
                        {descricao}{" "}
                    </div>

                    <div>
                        Preço:{" "}
                        <span className="font-bold">
                            R$ {preco.toFixed(2)}{" "}
                        </span>
                    </div>

                    <div>
                        Qtd: <span className="font-bold">{qtd_estoque} </span>{" "}
                    </div>

                    {/* Avaliação com as estrelinhas amarelas */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) =>
                            mediaAvaliacao > i ? (
                                <FaStar key={i} color="#FFD700" size={18} />
                            ) : (
                                <FaRegStar key={i} color="#e4e5e9" size={18} />
                            )
                        )}
                        <span className="text-sm font-semibold text-gray-500 ml-1">
                            ({totalAvaliacoes})
                        </span>
                    </div>

                    {/* Parte inferior dependente de ser cliente ou vendedor */}
                    <div className="mt-auto w-full py-2 flex justify-center">
                        {/* Cliente */}
                        {tipo === "cliente" && (
                            <div className="flex items-center w-32 gap-2 bg-teal-600 rounded-lg shadow px-2 py-1">
                                <button
                                    onClick={diminuir}
                                    className="w-7 h-7 cursor-pointer bg-teal-700 text-white rounded"
                                >
                                    −
                                </button>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={digitando ?? quantidade}
                                    onChange={(e) => {
                                        setDigitando(e.target.value);

                                        const valor = Number(e.target.value);

                                        if (debounceRef.current) {
                                            clearTimeout(debounceRef.current);
                                        }

                                        debounceRef.current = setTimeout(() => {
                                            if (
                                                valor >= 0 &&
                                                valor <= qtd_estoque &&
                                                onChangeQtd
                                            ) {
                                                onChangeQtd(valor);
                                            }

                                            setDigitando(null);
                                        }, 500);
                                    }}
                                    className="w-10 text-center bg-transparent text-white font-semibold outline-none"
                                />

                                <button
                                    onClick={aumentar}
                                    className="w-7 h-7 cursor-pointer bg-teal-700 text-white rounded"
                                >
                                    +
                                </button>
                            </div>
                        )}

                        {/* Vendedor */}
                        {tipo === "vendedor" && (
                            <div className="flex gap-3">
                                {/* Chamando a função ao clicar */}
                                <button
                                    onClick={editarProduto}
                                    className="w-10 h-10 cursor-pointer flex items-center justify-center bg-teal-600 text-white rounded hover:bg-teal-700"
                                >
                                    <FaPen />
                                </button>

                                <button
                                    onClick={() => setShowConfirmacao(true)}
                                    className="w-10 h-10 cursor-pointer flex items-center justify-center bg-red-400 text-white rounded hover:bg-red-500"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmação de exclusão */}
            {showConfirmacao && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
                    <div className="bg-white px-6 py-5 rounded-lg shadow-lg text-center max-w-sm w-full">
                        <p className="text-lg font-semibold text-gray-800">
                            Deseja mesmo excluir este produto?
                        </p>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setShowConfirmacao(false)}
                                className="w-1/2 bg-gray-300 py-2 rounded hover:bg-gray-400"
                            >
                                Não
                            </button>

                            <button
                                onClick={deletarProduto}
                                disabled={loadingExclusao}
                                className="w-1/2 bg-red-500 text-white py-2 flex flex-row items-center gap-2 justify-center rounded hover:bg-red-600"
                            >
                                {loadingExclusao ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Excluindo...
                                    </>
                                ) : (
                                    "Sim"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}