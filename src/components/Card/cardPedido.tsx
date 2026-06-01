"use client";

import { PedidoProps, ProdutoProps } from "@/entities/entities";
import { useEffect, useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { formatarData } from "@/utils/formatacao";

type Props = {
    pedido: PedidoProps;
    tipo: "cliente" | "vendedor";
};

export default function CardPedido({ pedido, tipo }: Props) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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

    // Cole esta função dentro do seu componente CardPedido
    async function editarPedido() {
        // 1. Abre uma caixinha no navegador perguntando o novo endereço
        const novoEndereco = prompt(
            "Digite o novo endereço de entrega para este pedido:",
        );

        // Se o usuário clicar em cancelar ou deixar vazio, cancela a função
        if (!novoEndereco) return;

        try {
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    endereco_entrega: novoEndereco, // O seu PedidoController vai receber isso em 'dados'
                }),
            });

            if (response.ok) {
                alert("Pedido atualizado com sucesso!");
                window.location.reload(); // Atualiza a tela para mostrar o novo endereço no card
            } else {
                alert("Erro ao editar o pedido.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    async function marcarComoEntregue() {
        try {
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ entregue: true }), // Passa o dado pro seu controller receber
            });

            if (response.ok) {
                alert("Pedido marcado como entregue!");
                window.location.reload();
            } else {
                alert("Erro ao atualizar o pedido");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deletarPedido() {
        if (confirm("Deseja mesmo excluir este pedido?")) {
            try {
                const response = await fetch(`/api/pedidos/${pedido.id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Pedido excluído!");
                    window.location.reload();
                } else {
                    alert("Erro ao excluir o pedido");
                }
            } catch (error) {
                console.error(error);
            }
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
                                0,
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
                                    onClick={deletarPedido}
                                    className="w-full h-10 bg-red-400 hover:bg-red-500 transition rounded font-semibold text-white"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={editarPedido}
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
                                className="w-full mt-3 h-10 bg-teal-600 hover:bg-teal-700 transition rounded font-semibold text-white"
                            >
                                Marcar como entregue
                            </button>
                        ) : (
                            <span className="block mt-3 w-full border border-gray-300 p-2 text-center font-semibold text-black rounded">
                                Já entregue
                            </span>
                        ))}
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
        </main>
    );
}
