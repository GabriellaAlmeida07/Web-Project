// indica que o componente será executado no navegador, permitindo usar hooks e interatividade (useState, useEffect...)
"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import carrinho from "@/assets/carrinho.png";
import { IoIosChatboxes } from "react-icons/io";
import { Msg, PedidoProps, ProdutoProps } from "@/entities/entities";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { formatarData, formatarTotal } from "@/utils/formatacao";
import { BsEmojiNeutral } from "react-icons/bs";
import { GrSend } from "react-icons/gr";
import CardProduto from "@/components/Card/cardProduto";
import Link from "next/link";
import { FaBoxOpen, FaSpinner } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HomeCliente() {
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const caixaRef = useRef<HTMLDivElement>(null);
    const caixaRefChat = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const [prosseguir, setProsseguir] = useState(false);
    const [msgAtual, setMsgAtual] = useState<string>("");
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [loadingMsg, setLoadingMsg] = useState<boolean>(false);
    const [sendingMsg, setSendingMsg] = useState<boolean>(false);
    const [digitando, setDigitando] = useState<Record<string, string | null>>(
        {}
    );
    const router = useRouter();
    const initialPedido = {
        data_registro: Date.now().toString(),
        endereco_entrega: "",
        valor_total: 0,
        entregue: false,
        itens: [],
    };
    const [pedido, setPedido] = useState<PedidoProps>(initialPedido);

    // Ao recarregar a página pega os produtos do banco
    useEffect(() => {
        async function carregarProdutos() {
            try {
                setLoading(true);
                const res = await fetch("/api/produtos", { method: "GET" });

                const data = await res.json();

                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarProdutos();
    }, []);

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
            console.log("Quantidade insuficiente");
            return;
        }

        const pedidoAtual: PedidoProps = structuredClone(
            // Garante que estamos modificando a cópia
            pedido
        );

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

        setPedido({ ...pedidoAtual });
    }

    function getQtd(id: number) {
        return pedido.itens.find((p) => p.id_produto === id)?.qtd || 0;
    }

    // Quando clicar fora do pedido, ele irá fechar
    useEffect(() => {
        if (!isOpen) return;
        function handleCliqueFora(event: MouseEvent) {
            if (
                caixaRef.current &&
                !caixaRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleCliqueFora);
        return () => {
            document.removeEventListener("mousedown", handleCliqueFora);
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoadingSubmit(true);

            // Chama a API a partir da rota definida
            const res = await fetch("/api/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedido),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Seu pedido foi enviado!");
            console.log(data);
            setTimeout(() => {
                // Espera 2s antes de recarregar
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar pedido");
        } finally {
            setLoadingSubmit(false);
        }
    };

    async function handleExcluir() {
        setPedido(initialPedido);
        toast.info("Seu pedido foi excluído");
    }

    async function handleLogout() {
        try {
            await fetch("/api/logout", {
                method: "POST",
            });

            router.push("/Login");
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    }

    // Mensagens
    useEffect(() => {
        // Quando clicar fora do chat ele irá fechar
        if (!isOpenChat) return;

        function handleCliqueFora(event: MouseEvent) {
            if (
                caixaRefChat.current &&
                !caixaRefChat.current.contains(event.target as Node)
            ) {
                setIsOpenChat(false);
            }
        }

        document.addEventListener("mousedown", handleCliqueFora);
        return () => {
            document.removeEventListener("mousedown", handleCliqueFora);
        };
    }, [isOpenChat]);

    useEffect(() => {
        if (!isOpenChat || msgs.length > 0) return;

        async function carregarMsgs() {
            try {
                setLoadingMsg(true);
                const response = await fetch("/api/mensagens/cliente");

                const mensagens: Msg[] = await response.json();

                setMsgs(mensagens);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingMsg(false);
            }
        }

        carregarMsgs();
    }, [isOpenChat]);

    async function enviarMsg() {
        // Remove espaços no início e fim da msg
        if (!msgAtual.trim()) return;

        try {
            setSendingMsg(true);

            const res = await fetch("/api/mensagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conteudo: msgAtual,
                    tipo_remetente: "cliente",
                }),
            });

            const novaMsg: Msg = await res.json();

            setMsgAtual("");
            setMsgs((msgs) => [...msgs, novaMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setSendingMsg(false);
        }
    }

    // Parte "html e css"
    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            {/* Grid de cabeçalho e conteúdo */}
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Header */}
                <header className="bg-[#e5e5e5] px-4 sm:px-6 md:px-4 py-3 gap-2 flex justify-between items-center shadow-lg border-b-4 border-teal-600">
                    {/* Logo e título */}
                    <div className="flex items-center gap-4">
                        <Image
                            src={logo}
                            alt="A lojinha Preferida"
                            className="w-24 md:w-32 h-auto"
                            priority
                        />
                        <span className="font-bold text-lg text-gray-700 hidden lg:block">
                            Painel do Cliente
                        </span>
                    </div>

                    <div className="flex gap-5">
                        <Link href="/PedidosCliente">
                            <button className="flex items-center cursor-pointer gap-2 bg-teal-600 text-white border border-gray-300 px-2 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                                <FaBoxOpen />
                                <span>Pedidos</span>
                            </button>
                        </Link>

                        <IoIosChatboxes
                            className="text-gray-500 mt-2 cursor-pointer hover:text-gray-600"
                            size={30}
                            onClick={() => {
                                setIsOpenChat(true);
                            }}
                        />

                        <button
                            onClick={handleLogout}
                            className="bg-[#e5e5e5] border border-gray-400 text-black px-3 py-2 rounded flex items-center cursor-pointer gap-1"
                        >
                            <CiLogout className="text-lg" />
                            <span className="text-base font-semibold">
                                Sair
                            </span>
                        </button>
                    </div>
                </header>

                {loading && (
                    <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                    </div>
                )}

                {/* Conteúdo (produtos) */}
                <div className="p-3 overflow-y-auto">
                    <div className="flex flex-wrap pb-3">
                        {produtos.map((p, i) => (
                            <CardProduto
                                key={i}
                                id={p.id}
                                nome={p.nome}
                                img_url={p.img_url}
                                descricao={p.descricao}
                                qtd_estoque={p.qtd_estoque}
                                preco={p.preco}
                                avaliacao={p.avaliacao}
                                quantidade={getQtd(p.id)}
                                onChangeQtd={(novaQtd) =>
                                    atualizarQuantidade(
                                        p.id,
                                        novaQtd,
                                        p.qtd_estoque,
                                        p.preco
                                    )
                                }
                                tipo="cliente"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Carrinho */}
            <div
                className="fixed bottom-6 right-0 z-50"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={carrinho}
                    alt="Carrinho"
                    className="mr-4 w-24 h-20 md:w-28 md:h-24"
                    priority
                    style={{ cursor: "pointer" }}
                />
            </div>

            {/* Exibe pedido ao clicar no carrinho */}
            {isOpen && (
                <div
                    ref={caixaRef}
                    className="fixed top-0 right-0 h-[100dvh] max-h-[100dvh] w-[95vw] max-w-[500px] bg-white z-[900] shadow-2xl flex flex-col"
                >
                    {!prosseguir ? (
                        <>
                            {/* Voltar */}
                            <div className="p-2">
                                <button
                                    className="w-24 shrink-0 cursor-pointer h-10 mt-2 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <IoArrowBackOutline />
                                    Voltar
                                </button>
                            </div>

                            {/* Conteúdo carrinho */}
                            {pedido.itens.length === 0 ? (
                                <div className="flex flex-col items-center justify-center mt-28 p-1">
                                    <BsEmojiNeutral size={30} />

                                    <div className="mt-5">
                                        Você ainda não selecionou nenhum
                                        produto.
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="text-pretty text-lg font-medium my-4 mx-0 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                                        {" "}
                                        Seu pedido{" "}
                                    </div>

                                    {/* Header do grid */}
                                    <div className="grid grid-cols-[96px_1fr_96px_96px] border-b-2 pb-2 mt-10 font-semibold border-dashed border-teal-600 text-center">
                                        <div>Qtd</div>
                                        <div>Produto</div>
                                        <div>Preço</div>
                                        <div>Subtotal</div>
                                    </div>

                                    {/* Lista dos produtos selecionados */}
                                    <div className="flex-1 overflow-y-auto pb-50">
                                        {pedido.itens.map((prod) => {
                                            const produto = produtos.find(
                                                (p) => p.id === prod.id_produto
                                            );

                                            if (!produto) return null;

                                            return (
                                                <div
                                                    key={prod.id_produto}
                                                    className="border-b-2 border-dashed border-teal-600 mt-2 py-5 px-2"
                                                >
                                                    <div className="grid grid-cols-[96px_1fr_96px_96px] items-center">
                                                        {/* Quantidade */}
                                                        <div className="flex justify-center gap-1">
                                                            <button
                                                                onClick={() =>
                                                                    atualizarQuantidade(
                                                                        prod.id_produto,
                                                                        prod.qtd -
                                                                            1,
                                                                        produto.qtd_estoque,
                                                                        produto.preco
                                                                    )
                                                                }
                                                                className="w-7 h-7 flex items-center cursor-pointer disabled:opacity-50 justify-center border-2 border-[#F08FAF] text-black rounded select-none"
                                                            >
                                                                −
                                                            </button>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    digitando[
                                                                        prod
                                                                            .id_produto
                                                                    ] ??
                                                                    prod.qtd
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const valor =
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );

                                                                    setDigitando(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [prod.id_produto]:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );

                                                                    if (
                                                                        debounceRef.current
                                                                    )
                                                                        clearTimeout(
                                                                            debounceRef.current
                                                                        );

                                                                    debounceRef.current =
                                                                        setTimeout(
                                                                            () => {
                                                                                if (
                                                                                    valor >=
                                                                                    0
                                                                                ) {
                                                                                    atualizarQuantidade(
                                                                                        prod.id_produto,
                                                                                        valor,
                                                                                        produto.qtd_estoque,
                                                                                        produto.preco
                                                                                    );
                                                                                }

                                                                                setDigitando(
                                                                                    (
                                                                                        prev
                                                                                    ) => ({
                                                                                        ...prev,
                                                                                        [prod.id_produto]:
                                                                                            null,
                                                                                    })
                                                                                );
                                                                            },
                                                                            500
                                                                        );
                                                                }}
                                                                className="w-12 text-center"
                                                            />

                                                            <button
                                                                onClick={() =>
                                                                    atualizarQuantidade(
                                                                        prod.id_produto,
                                                                        prod.qtd +
                                                                            1,
                                                                        produto.qtd_estoque,
                                                                        produto.preco
                                                                    )
                                                                }
                                                                className="w-7 h-7 flex items-center cursor-pointer disabled:opacity-50 justify-center border-2 border-[#F08FAF] text-black rounded select-none"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <div className="text-center px-1">
                                                            {produto.nome}
                                                        </div>

                                                        <div className="text-center">
                                                            {produto.preco.toFixed(
                                                                2
                                                            )}
                                                        </div>

                                                        <div className="text-center">
                                                            {(
                                                                produto.preco *
                                                                prod.qtd
                                                            ).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Footer fixo */}
                                    <div className="fixed bottom-0 w-[95vw] max-w-[500px] bg-white p-4 shadow-2xl">
                                        <p className="font-bold">
                                            Total: R${" "}
                                            {pedido.valor_total.toFixed(2)}
                                        </p>

                                        <div className="flex gap-3 mt-2 font-semibold justify-center">
                                            <button
                                                disabled={loadingSubmit}
                                                onClick={handleExcluir}
                                                className="w-32 h-10 cursor-pointer bg-red-400 text-white rounded"
                                            >
                                                Excluir
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setProsseguir(true)
                                                }
                                                className="w-32 h-10 cursor-pointer bg-teal-600 hover:bg-teal-700 flex items-center justify-center gap-2 text-white rounded"
                                            >
                                                Prosseguir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Finalização */}
                            <div className="flex flex-col h-full">
                                {/* Voltar */}
                                <div className="p-2">
                                    <button
                                        className="w-24 cursor-pointer shrink-0 h-10 mt-2 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                                        onClick={() => {
                                            setProsseguir(false);
                                        }}
                                    >
                                        <IoArrowBackOutline />
                                        Voltar
                                    </button>
                                </div>

                                <div className="text-pretty text-lg font-medium my-4 mx-0 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                                    {" "}
                                    Finalizar pedido{" "}
                                </div>

                                {/* Endereço */}
                                <div className="flex flex-col gap-2 m-5">
                                    <label className="font-semibold">
                                        Endereço para entrega
                                    </label>

                                    <textarea
                                        value={pedido.endereco_entrega}
                                        onChange={(e) =>
                                            setPedido({
                                                ...pedido,
                                                endereco_entrega:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Digite o endereço completo..."
                                        className="border rounded-lg p-3 resize-none outline-none"
                                        rows={4}
                                    />
                                </div>

                                {/* Resumo */}
                                <div className="fixed bottom-0 w-[95vw] max-w-[500px] bg-white p-4 shadow-2xl">
                                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                                        <p className="font-semibold text-base">
                                            Quantidade de itens:{" "}
                                            {pedido.itens.reduce(
                                                (total, item) =>
                                                    total + item.qtd,
                                                0
                                            )}
                                        </p>

                                        <p className="font-semibold text-base mt-2">
                                            Valor total: R${" "}
                                            {pedido.valor_total.toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={loadingSubmit}
                                        className="w-full h-11 bg-teal-600 cursor-pointer hover:bg-teal-700 text-white rounded font-semibold flex items-center justify-center gap-2"
                                    >
                                        {loadingSubmit ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            "Confirmar"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Exibe chat com o vendedor */}
            {isOpenChat && (
                <div
                    ref={caixaRefChat}
                    className="fixed top-0 right-0 h-[100dvh] max-h-[100dvh] w-[95vw] max-w-[500px] bg-white z-[900] shadow-2xl flex flex-col"
                >
                    <div className="p-2">
                        <button
                            className="w-24 h-10 cursor-pointer flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                            onClick={() => {
                                setIsOpenChat(false);
                            }}
                        >
                            <IoArrowBackOutline />
                            Voltar
                        </button>
                    </div>

                    <div className="text-pretty text-lg font-medium my-4 mx-0 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                        {" "}
                        Chat com o vendedor{" "}
                    </div>

                    {/* Área de mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {loadingMsg ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                            </div>
                        ) : msgs.length === 0 ? (
                            <p className="text-gray-500 text-center">
                                Nenhuma mensagem ainda...
                            </p>
                        ) : (
                            msgs.map((m) => (
                                <div
                                    key={m.id}
                                    className={`p-2 rounded max-w-[70%] ${
                                        m.tipo_remetente === "cliente"
                                            ? "bg-teal-600 text-white ml-auto"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <p>{m.conteudo}</p>

                                    <div
                                        className={`text-xs mt-2 text-right ${
                                            m.tipo_remetente === "cliente"
                                                ? "text-teal-100"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {formatarData(m.data_envio)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-3 py-6 border-t flex items-center gap-2">
                        <textarea
                            placeholder="Digite sua mensagem..."
                            value={msgAtual}
                            onChange={(e) => setMsgAtual(e.target.value)}
                            className="flex-1 h-20 border rounded px-3 py-2 outline-none resize-none"
                        />

                        <button
                            onClick={enviarMsg}
                            disabled={sendingMsg}
                            className="bg-teal-600 cursor-pointer hover:bg-teal-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            <GrSend size={22} />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
