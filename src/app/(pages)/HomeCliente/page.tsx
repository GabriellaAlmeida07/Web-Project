// indica que o componente será executado no navegador, permitindo usar hooks e interatividade (useState, useEffect...)
"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import carrinho from "@/assets/carrinho.png";
import { IoIosChatboxes } from "react-icons/io";
import { Pedido, prods_fake } from "@/entities/entities";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { formatarTotal } from "@/utils/formatacao";
import { BsEmojiNeutral } from "react-icons/bs";
import { GrSend } from "react-icons/gr";
import CardProduto from "@/components/Card/cardProduto";
import Link from "next/link";
import { FaBars, FaBoxOpen } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function HomeCliente() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const caixaRef = useRef<HTMLDivElement>(null);
    const caixaRefChat = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const [digitando, setDigitando] = useState<Record<string, string | null>>(
        {}
    );
    const [pedido, setPedido] = useState<Pedido>({
        id: "pedido_01",
        id_cliente: "",
        prods_associados: [],
        valor_total: 0,
        data_registro: "",
        endereco_entrega: "",
        entregue: false,
    });

    function atualizarQuantidade(
        idProd: string,
        novaQtd: number,
        qtd_disp: number,
        preco: number
    ) {
        // Previne erros de conversão
        novaQtd = Number(novaQtd);
        preco = Number(preco);

        if (novaQtd > qtd_disp) {
            console.log("Quantidade insuficiente");
            return;
        }

        const pedidoAtual: Pedido = structuredClone(
            // Garante que estamos modificando a cópia
            pedido
        );

        // Encontra o produto associado correto
        const index = pedidoAtual.prods_associados.findIndex(
            (p) => p.prod_id === idProd
        );

        // Se ainda não existir produtos no pedido, o novo produto estará no idx 0
        const qtdAnterior = Number(
            index !== -1 ? pedidoAtual.prods_associados[index].qtd : 0
        );
        const delta = novaQtd - qtdAnterior;

        if (novaQtd <= 0) {
            // Remoção do produto associado no vetor de prods_associados do localStorage
            if (index !== -1) pedidoAtual.prods_associados.splice(index, 1);
        } else {
            // Atualização de produto já existente
            if (index !== -1) {
                pedidoAtual.prods_associados[index].qtd = novaQtd;
            } else {
                // Criação do novo produto
                pedidoAtual.prods_associados.push({
                    prod_id: idProd,
                    qtd: novaQtd,
                    preco_venda: preco,
                });
            }
        }

        // Atualização do total
        pedidoAtual.valor_total = formatarTotal(
            pedidoAtual.valor_total + delta * preco
        );

        setPedido({ ...pedidoAtual });
    }

    function getQtd(id: string) {
        return pedido.prods_associados.find((p) => p.prod_id === id)?.qtd || 0;
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

    // Quando clicar fora do chat ele irá fechar
    useEffect(() => {
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

    // Parte "html e css"
    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            {/* Grid de cabeçalho e conteúdo */}
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Header */}
                <header className="bg-[#e5e5e5] px-4 sm:px-6 md:px-4 py-3 gap-2 flex justify-between items-center shadow-lg border-b-4 border-teal-500">
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
                        <button className="flex items-center gap-2 bg-teal-500 text-white border border-gray-300 px-2 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                            <FaBoxOpen />
                            <span>Pedidos</span>
                        </button>
                    </Link>

                    <IoIosChatboxes
                        className="text-gray-500 mt-2 hover:text-gray-600"
                        size={30}
                        onClick={() => {
                            setIsOpenChat(true);
                        }}
                    />

                    <Link href="/Login">
                        <button className="bg-[#e5e5e5] border border-gray-400 text-black px-3 py-2 rounded flex items-center cursor-pointer gap-1">
                            <CiLogout className="text-lg" />
                            <span className="text-base font-semibold">
                                Sair
                            </span>
                        </button>
                    </Link>
                    </div>
                </header>

                {/* Conteúdo (produtos) */}
                <div className="p-3 overflow-y-auto">
                    <div className="flex flex-wrap pb-3">
                        {prods_fake.map((p, i) => (
                            <CardProduto
                                key={i}
                                id={p.id}
                                nome={p.nome}
                                img={p.img}
                                desc={p.desc}
                                qtd_disp={p.qtd_disp}
                                preco_venda={p.preco_venda}
                                avaliacao={p.avaliacao}
                                quantidade={getQtd(p.id)}
                                onChangeQtd={(novaQtd) =>
                                    atualizarQuantidade(
                                        p.id,
                                        novaQtd,
                                        p.qtd_disp,
                                        p.preco_venda
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
                    {/* Voltar */}
                    <div className="p-2">
                        <button
                            className="w-24 shrink-0 h-10 mt-2 ml-2 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <IoArrowBackOutline />
                            Voltar
                        </button>
                    </div>

                    {pedido.prods_associados.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-28 p-1">
                            <div>
                                <BsEmojiNeutral size={30} />
                            </div>
                            <div className="mt-5">
                                Você ainda não selecionou nenhum produto.
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="text-pretty text-lg font-medium mt-4 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                                {" "}
                                Seu pedido{" "}
                            </div>

                            {/* Header do grid */}
                            <div className="grid grid-cols-[96px_1fr_96px_96px] border-b-2 pb-2 mt-10 font-semibold border-dashed border-teal-500 text-center">
                                <div>Qtd</div>
                                <div>Produto</div>
                                <div>Preço</div>
                                <div>Subtotal</div>
                            </div>

                            {/* Lista dos produtos selecionados */}
                            <div className="flex-1 overflow-y-auto pb-50">
                                {pedido.prods_associados.map((prod) => {
                                    const produto = prods_fake.find(
                                        (p) => p.id === prod.prod_id
                                    );

                                    if (!produto) return null;

                                    return (
                                        <div
                                            key={prod.prod_id}
                                            className="border-b-2 border-dashed border-teal-600 mt-2 py-5 px-2"
                                        >
                                            <div className="grid grid-cols-[96px_1fr_96px_96px] items-center">
                                                {/* Quantidade */}
                                                <div className="flex justify-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            atualizarQuantidade(
                                                                prod.prod_id,
                                                                prod.qtd - 1,
                                                                produto.qtd_disp,
                                                                produto.preco_venda
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center disabled:opacity-50 justify-center border-2 border-[#F08FAF] text-black rounded select-none"
                                                    >
                                                        −
                                                    </button>

                                                    <input
                                                        type="text"
                                                        value={
                                                            digitando[
                                                                prod.prod_id
                                                            ] ?? prod.qtd
                                                        }
                                                        onChange={(e) => {
                                                            const valor =
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                );

                                                            setDigitando(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [prod.prod_id]:
                                                                        e.target
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
                                                                                prod.prod_id,
                                                                                valor,
                                                                                produto.qtd_disp,
                                                                                produto.preco_venda
                                                                            );
                                                                        }

                                                                        setDigitando(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [prod.prod_id]:
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
                                                                prod.prod_id,
                                                                prod.qtd + 1,
                                                                produto.qtd_disp,
                                                                produto.preco_venda
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center disabled:opacity-50 justify-center border-2 border-[#F08FAF] text-black rounded select-none"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-center px-1">
                                                    {produto.nome}
                                                </div>

                                                <div className="text-center">
                                                    {produto.preco_venda.toFixed(
                                                        2
                                                    )}
                                                </div>

                                                <div className="text-center">
                                                    {(
                                                        produto.preco_venda *
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
                                    Total: R$ {pedido.valor_total.toFixed(2)}
                                </p>

                                <div className="flex gap-3 mt-2 font-semibold justify-center">
                                    <button className="w-32 h-10 bg-red-400 text-white rounded">
                                        Excluir
                                    </button>

                                    <button className="w-32 h-10 bg-teal-500 text-white rounded">
                                        Finalizar
                                    </button>
                                </div>
                            </div>
                        </div>
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
                            className="w-24 h-10 flex items-center justify-center gap-2 font-semibold bg-[#F08FAF] text-white rounded"
                            onClick={() => {
                                setIsOpenChat(false);
                            }}
                        >
                            <IoArrowBackOutline />
                            Voltar
                        </button>
                    </div>

                    <div className="text-pretty text-lg font-medium mt-4 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                        {" "}
                        Chat com o vendedor{" "}
                    </div>

                    {/* Área de mensagens */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <p className="text-gray-500 text-center">
                            Nenhuma mensagem ainda...
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-3 py-6 border-t flex items-center gap-2">
                        <textarea
                            placeholder="Digite sua mensagem..."
                            className="flex-1 h-20 border rounded px-3 py-2 outline-none resize-none"
                        />

                        <button className="bg-teal-500 text-white px-4 py-2 rounded">
                            <GrSend size={22} />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
