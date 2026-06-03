"use client";

import { PedidoProps, ProdutoProps } from "@/entities/entities";
import { useEffect, useState } from "react";
import CardProdPedido from "./cardProdPedido";
import { IoArrowBackOutline, IoClose, IoLocationSharp } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { formatarData, formatarTotal } from "@/utils/formatacao";
import { toast } from "sonner";
import { IoMdAdd } from "react-icons/io";

type Props = {
    pedido: PedidoProps;
    tipo: "cliente" | "vendedor";
};

export default function CardPedido({ pedido, tipo }: Props) {
    const [loading, setLoading] = useState(false);
    const [loadingEntregue, setLoadingEntregue] = useState(false);
    const [loadingEscolha, setLoadingEscolha] = useState(false);
    const [loadingExclusao, setLoadingExclusao] = useState(false);
    const [loadingEdicao, setLoadingEdicao] = useState(false);
    const [escolherProduto, setEscolherProduto] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editando, setEditando] = useState(false);
    const [pedidoEditando, setPedidoEditando] = useState<PedidoProps | null>(
        null
    );
    const [editandoEndereco, setEditandoEndereco] = useState(false);
    const [novoEndereco, setNovoEndereco] = useState<string | null>(null);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [allProdutos, setAllProdutos] = useState<ProdutoProps[]>([]);
    const [produtosPedido, setProdutosPedido] = useState<
        Record<string, ProdutoProps>
    >({});

    useEffect(() => {
        if (!isOpen && !editando) return;

        const jaCarregado = pedido.itens.every(
            (item) => produtosPedido[item.id_produto]
        );

        if (jaCarregado) return;

        async function carregarProdutosPedido() {
            const produtosObj: Record<string, ProdutoProps> = {};
            setLoading(true);

            for (const item of pedido.itens) {
                const res = await fetch(`/api/produtos/${item.id_produto}`);
                const produto = await res.json();

                produtosObj[item.id_produto] = produto;
            }

            setProdutosPedido(produtosObj);
            setLoading(false);
        }

        carregarProdutosPedido();
    }, [isOpen, editando, pedido.itens]);

    // Carregar todos os produtos quando deseja-se incluir novo produto no pedido em edição
    useEffect(() => {
        async function carregarProdutos() {
            if (allProdutos.length > 0) return;

            try {
                setLoadingEscolha(true);
                const res = await fetch("/api/produtos", { method: "GET" });

                const data = await res.json();

                setAllProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoadingEscolha(false);
            }
        }

        carregarProdutos();
    }, [escolherProduto]);

    async function abrirEdicao() {
        setPedidoEditando(structuredClone(pedido));
        setEditando(true);
    }

    function atualizarQuantidade(
        idProd: number,
        novaQtd: number,
        qtd_estoque: number,
        preco: number
    ) {
        // Previne erros de conversão
        novaQtd = Number(novaQtd);
        preco = Number(preco);

        if (novaQtd > qtd_estoque) {
            toast.warning("Estoque insuficiente");
            return;
        }

        if (!pedidoEditando) return;

        const pedidoAtual: PedidoProps = structuredClone(pedidoEditando);

        // Encontra o produto associado correto
        const index = pedidoAtual.itens.findIndex(
            (p) => p.id_produto === idProd
        );

        // Se ainda não existir produtos no pedido, o novo produto estará no idx 0
        const qtdAnterior = Number(
            index !== -1 ? pedidoAtual.itens[index].qtd : 0
        );
        const delta = novaQtd - qtdAnterior;

        if (novaQtd <= 0) {
            // Remoção do produto associado no vetor de itens do localStorage
            if (index !== -1) pedidoAtual.itens.splice(index, 1);
        } else {
            // Atualização de produto já existente
            if (index !== -1) {
                pedidoAtual.itens[index].qtd = novaQtd;
            } else {
                // Criação do novo produto
                pedidoAtual.itens.push({
                    id_produto: idProd,
                    qtd: novaQtd,
                    preco_unitario: preco,
                });
            }
        }

        // Atualização do total
        pedidoAtual.valor_total = formatarTotal(
            pedidoAtual.valor_total + delta * preco
        );

        setPedidoEditando({ ...pedidoAtual });
    }

    function adicionarProdEscolhido(p: ProdutoProps) {
        if (!pedidoEditando) return;

        const jaExiste = pedidoEditando.itens.some(
            (item) => item.id_produto === p.id
        );

        if (jaExiste) {
            toast.warning("Esse produto já está no seu pedido");
            return;
        }

        const novoPedido = structuredClone(pedidoEditando);

        novoPedido.itens.push({
            id_produto: p.id!,
            qtd: 1,
            preco_unitario: p.preco,
        });

        novoPedido.valor_total += p.preco;

        setProdutosPedido((prev) => ({
            ...prev,
            [p.id!]: p,
        }));

        setPedidoEditando(novoPedido);
        setEscolherProduto(false);

        toast.success("Produto adicionado ao pedido");
    }

    async function salvarEdicao() {
        if (!pedidoEditando && !novoEndereco) return;

        try {
            setLoadingEdicao(true);
            const response = await fetch(`/api/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pedidoOrig: pedido,
                    novoPedido: pedidoEditando,
                    endereco_entrega: novoEndereco
                        ? novoEndereco
                        : pedido.endereco_entrega,
                    entregue: false,
                }),
            });

            if (response.ok) {
                toast.success("Pedido atualizado com sucesso!");
                setTimeout(() => {
                    window.location.reload();
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

    function abrirEdicaoEndereco() {
        setNovoEndereco(pedido.endereco_entrega);
        setEditandoEndereco(true);
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

    async function deletarPedido() {
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
                <div className="fixed flex flex-col top-1/2 left-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-white h-11/12 md:h-4/5 w-[92%] max-w-[800px] z-[900] shadow-2xl">
                    {" "}
                    {/* Fechar exibição de edição */}
                    <div className="w-full flex flex-row gap-2 justify-between bg-white p-2 shrink-0">
                        <button
                            onClick={() => {
                                setEditando(false);
                            }}
                            className="w-24 h-10 text-base disabled:opacity-50 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                        >
                            <IoArrowBackOutline size={20} />
                            Voltar
                        </button>
                        <button
                            onClick={() => setEscolherProduto(true)}
                            className="w-36 h-10 flex items-center justify-center gap-1 font-semibold bg-slate-400 text-sm text-white rounded"
                        >
                            <IoMdAdd size={15} />
                            Adicionar produto
                        </button>
                        <button
                            onClick={abrirEdicaoEndereco}
                            className="w-36 h-10 flex items-center justify-center gap-0 md:gap-1 font-semibold bg-teal-600 text-sm text-white rounded"
                        >
                            <IoLocationSharp size={15} />
                            Editar Endereço
                        </button>
                    </div>
                    <div className="text-pretty text-base my-2 mx-0 font-medium p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400 shrink-0">
                        Editar Pedido
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center mt-10 shrink-0">
                            <FaSpinner className="animate-spin text-4xl" />
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                salvarEdicao();
                            }}
                            className="flex flex-col flex-1 overflow-hidden"
                        >
                            {/* Cabeçalho */}
                            <div className="grid grid-cols-[96px_1fr_minmax(96px,auto)_minmax(96px,auto)] md:grid-cols-[144px_1fr_minmax(128px,auto)_minmax(128px,auto)] font-medium mt-3 border-b-2 pb-2 border-dashed border-teal-500 items-center shrink-0">
                                <div className="text-center">Qtd</div>
                                <div className="text-center">Produto</div>
                                <div className="text-center">Preço</div>
                                <div className="text-center">Subtotal</div>
                            </div>

                            {/* Lista de produtos */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                                {pedidoEditando?.itens.map((prod, index) => {
                                    const produto =
                                        produtosPedido[prod.id_produto];

                                    if (!produto) return null;

                                    return (
                                        <div
                                            key={`${prod.id_produto}-${index}`}
                                            className="flex flex-col mt-2 border-b-2 pb-2 border-dashed border-teal-500"
                                        >
                                            <div className="flex justify-end mb-2 mr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        atualizarQuantidade(
                                                            prod.id_produto,
                                                            0,
                                                            produto.qtd_estoque,
                                                            produto.preco
                                                        );

                                                        toast.warning(
                                                            "Produto removido do seu pedido"
                                                        );
                                                    }}
                                                    className="text-red-600 font-medium text-sm"
                                                >
                                                    Devolver produto ao estoque
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-[96px_1fr_96px_96px] md:grid-cols-[144px_1fr_128px_128px] items-center">
                                                {/* Quantidade */}
                                                <div className="flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            atualizarQuantidade(
                                                                prod.id_produto,
                                                                prod.qtd - 1,
                                                                produto.qtd_estoque,
                                                                produto.preco
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center border-2 border-[#F08FAF] rounded"
                                                    >
                                                        −
                                                    </button>

                                                    <input
                                                        type="text"
                                                        min={0}
                                                        value={prod.qtd}
                                                        onChange={(e) =>
                                                            atualizarQuantidade(
                                                                prod.id_produto,
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                                produto.qtd_estoque,
                                                                produto.preco
                                                            )
                                                        }
                                                        className="w-12 text-center"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            atualizarQuantidade(
                                                                prod.id_produto,
                                                                prod.qtd + 1,
                                                                produto.qtd_estoque,
                                                                produto.preco
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center border-2 border-[#F08FAF] rounded"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Produto */}
                                                <div className="text-center px-1">
                                                    {produto.nome}
                                                </div>

                                                {/* Preço */}
                                                <div className="text-center">
                                                    R${" "}
                                                    {produto.preco.toFixed(2)}
                                                </div>

                                                {/* Subtotal */}
                                                <div className="text-center">
                                                    R${" "}
                                                    {(
                                                        produto.preco * prod.qtd
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer fixado no final da área branca */}
                            <div className="bg-white shadow-2xl p-4 shrink-0 mt-auto">
                                <p className="font-bold">
                                    Total: R${" "}
                                    {pedidoEditando?.valor_total.toFixed(2)}
                                </p>

                                <div className="flex gap-3 mt-2 font-semibold justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPedidoEditando(null);
                                            setEditando(false);
                                        }}
                                        className="w-1/2 h-10 bg-red-400 text-white rounded"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-1/2 h-11 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold flex items-center justify-center gap-2"
                                    >
                                        {loadingEdicao ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Editando...
                                            </>
                                        ) : (
                                            "Editar"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Escolha de produtos */}
            {escolherProduto && (
                <div className="fixed flex flex-col top-1/2 left-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-white h-4/5 w-[92%] max-w-[800px] p-3 z-[1000] shadow-2xl">
                    <button
                        onClick={() => setEscolherProduto(false)}
                        className="w-24 h-10 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                    >
                        <IoArrowBackOutline size={20} />
                        Voltar
                    </button>

                    <div className="flex justify-center text-base font-medium mt-6">
                        Clique no produto que deseja adicionar
                    </div>

                    {loadingEscolha ? (
                        <div className="flex items-center justify-center mt-10 shrink-0">
                            <FaSpinner className="animate-spin text-4xl" />
                        </div>
                    ) : (
                        <ul className="mt-4 overflow-y-auto">
                            {allProdutos.map((p) => (
                                <li
                                    key={p.id}
                                    onClick={() => adicionarProdEscolhido(p)}
                                    className="p-3 border-b cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="font-medium">{p.nome}</div>

                                    <div className="text-sm text-gray-500">
                                        R$ {p.preco.toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Edição do endereço de entrega do pedido */}
            {editandoEndereco && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                    <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl">
                        <h2 className="text-lg font-bold mb-3">
                            Edite o endereço
                        </h2>
                        <p className="my-3">
                            {" "}
                            Será necessário clicar em <strong>Editar</strong>,
                            na tela anterior, para salvar a alteração{" "}
                        </p>
                        <input
                            className="w-full border p-2 rounded mb-4"
                            value={novoEndereco ?? ""}
                            onChange={(e) => setNovoEndereco(e.target.value)}
                            placeholder="Digite o novo endereço"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditandoEndereco(false),
                                        setNovoEndereco("");
                                }}
                                className="w-1/2 bg-gray-300 p-2 rounded"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={() => setEditandoEndereco(false)}
                                className="w-1/2 bg-teal-600 flex flex-row items-center justify-center gap-2 text-white p-2 rounded"
                            >
                                Confirmar
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
                                onClick={deletarPedido}
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
