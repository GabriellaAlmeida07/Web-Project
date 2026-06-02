"use client";

import { PedidoProps, ProdutoProps } from "@/entities/entities";
import { useEffect, useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { formatarData } from "@/utils/formatacao";
import { toast } from "sonner";

type Props = {
    pedido: PedidoProps;
    tipo: "cliente" | "vendedor";
};

export default function CardPedido({ pedido, tipo }: Props) {
    const [loading, setLoading] = useState(false);
    const [loadingEntregue, setLoadingEntregue] = useState(false);
    const [loadingEdicao, setLoadingEdicao] = useState(false);
    const [loadingExclusao, setLoadingExclusao] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editando, setEditando] = useState(false);
    const [novoEndereco, setNovoEndereco] = useState("");
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [produtosPedido, setProdutosPedido] = useState<
        Record<string, ProdutoProps>
    >({});

    useEffect(() => {
        if (!isOpen) return;

        async function carregarProdutosPedido() {
            const produtosObj: Record<string, ProdutoProps> = {};
            setLoading(true);

            for (const item of pedido.itens) {
                const res = await fetch(`/api/produtos/${item.id_produto}`);
                const produto = await res.json();

                produtosObj[item.id_produto] = produto;
            }

            setProdutosPedido(produtosObj);
            console.log(produtosObj);
            setLoading(false);
        }

        carregarProdutosPedido();
    }, [isOpen, pedido.itens]);

    function abrirEdicao() {
        setNovoEndereco(pedido.endereco_entrega);
        setEditando(true);
    }

    async function salvarEdicao() {
        if (!novoEndereco) return;

        try {
            setLoadingEdicao(true);
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    endereco_entrega: novoEndereco,
                }),
            });

            if (response.ok) {
                toast.success("Pedido atualizado com sucesso!");
                setTimeout(() => {
                    window.location.reload(); // Atualiza a tela para mostrar o novo endereço no card
                }, 2000);
            } else {
                toast.error("Erro ao editar o pedido.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Erro ao conectar com o servidor.");
        } finally {
            setLoadingEdicao(false);
        }
    }

    async function marcarComoEntregue() {
        try {
            setLoadingEntregue(true);
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ entregue: true }),
            });

            if (response.ok) {
                toast.success("Pedido marcado como entregue!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Erro ao atualizar o pedido");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEntregue(false);
        }
    }

    async function deletarPedidoConfirmado() {
        try {
            setLoadingExclusao(true);
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.info("Pedido excluído");
                setShowConfirmacao(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Erro ao excluir o pedido");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingExclusao(false);
        }
    }

    return (
        <main className="w-full sm:w-[450px] shrink-0">
            {/* Card principal do pedido */}
            <div className="relative w-full h-[460px] sm:h-[410px] border-2 border-teal-600 rounded-lg p-5 flex flex-col bg-white shadow-sm hover:shadow-md transition text-black">
                {/* Cabeçalho do card: título e status */}
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3 gap-4">
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-lg text-gray-800 line-clamp-1">
                            Detalhes da compra
                        </span>

                        <span className="text-base text-gray-500 mt-0.5">
                            Realizada em:{" "}
                            {formatarData(pedido.data_registro) ?? "Sem data"}
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
                    {tipo === "vendedor" ? (
                        <div className="space-y-2">
                            <div>
                                <span className="font-bold text-teal-600">
                                    Cliente:
                                </span>{" "}
                                {pedido.Usuario?.nome}
                            </div>

                            <div>
                                <span className="font-bold text-teal-600">
                                    Telefone:
                                </span>{" "}
                                {pedido.Usuario?.celular}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <span className="font-bold text-teal-600 mb-1">
                                Quantidade total de itens:
                            </span>{" "}
                            {pedido.itens.reduce(
                                (total, item) => total + item.qtd,
                                0
                            )}{" "}
                        </div>
                    )}

                    <div>
                        <span className="font-bold text-teal-600">
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
                    {tipo === "cliente" &&
                        (pedido.entregue ? (
                            <span className="block mt-3 w-full border border-gray-300 p-2 text-center font-semibold text-black rounded">
                                Já entregue
                            </span>
                        ) : (
                            <div className="flex mt-3 gap-2">
                                <button
                                    onClick={() => setShowConfirmacao(true)}
                                    className="w-full h-10 bg-red-400 hover:bg-red-500 transition rounded font-semibold text-white"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={abrirEdicao}
                                    className="w-full h-10 bg-teal-600 hover:bg-teal-700 transition rounded font-semibold text-white"
                                >
                                    Editar
                                </button>
                            </div>
                        ))}

                    {tipo === "vendedor" &&
                        (!pedido.entregue ? (
                            <button
                                onClick={marcarComoEntregue}
                                disabled={loadingEntregue}
                                className="w-full mt-3 h-10 bg-teal-600 flex flex-row items-center justify-center gap-2 hover:bg-teal-700 transition rounded font-semibold text-white"
                            >
                                {loadingEntregue ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Marcando...
                                    </>
                                ) : (
                                    "Marcar como entregue"
                                )}
                            </button>
                        ) : (
                            <span className="block mt-3 w-full border border-gray-300 p-2 text-center font-semibold text-black rounded">
                                Já entregue
                            </span>
                        ))}
                </div>
            </div>

            {/* Edição do pedido */}
            {editando && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
                    <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl">
                        <h2 className="text-lg font-bold mb-3">
                            Edite seu pedido
                        </h2>

                        <input
                            className="w-full border p-2 rounded mb-4"
                            value={novoEndereco}
                            onChange={(e) => setNovoEndereco(e.target.value)}
                            placeholder="Digite o novo endereço"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditando(false)}
                                className="w-1/2 bg-gray-300 p-2 rounded"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={salvarEdicao}
                                disabled={loadingEdicao}
                                className="w-1/2 bg-teal-600 flex flex-row items-center justify-center gap-2 text-white p-2 rounded"
                            >
                                {loadingEdicao ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    "Salvar"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                        {loading && (
                            <div className="flex items-center justify-center m-5">
                                <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto p-4 bg-[#FDF6F6]">
                            {pedido.itens &&
                                pedido.itens.map((prod) => {
                                    const p = produtosPedido[prod.id_produto];

                                    if (!p) return null;
                                    return (
                                        <CardProdPedido
                                            key={p.id}
                                            {...p}
                                            quantidade={prod.qtd}
                                            tipo={tipo}
                                            preco={prod.preco_unitario}
                                            onChangeQtd={() => {}}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmação de exclusão */}
            {showConfirmacao && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
                    <div className="bg-white px-6 py-5 rounded-lg shadow-lg text-center max-w-sm w-full">
                        <p className="text-lg font-semibold text-gray-800">
                            Deseja mesmo excluir este pedido?
                        </p>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setShowConfirmacao(false)}
                                className="w-1/2 bg-gray-300 py-2 rounded hover:bg-gray-400"
                            >
                                Não
                            </button>

                            <button
                                onClick={deletarPedidoConfirmado}
                                disabled={loadingExclusao}
                                className="w-1/2 bg-red-500 flex flex-row items-center justify-center gap-2 text-white py-2 rounded hover:bg-red-600"
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
