"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { ProdutoProps } from "@/entities/entities";
import { useEffect, useRef, useState } from "react";
import {
    FaBars,
    FaBoxOpen,
    FaClipboardList,
    FaPlus,
    FaSpinner,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import CardProduto from "@/components/Card/cardProduto";
import { RxHamburgerMenu } from "react-icons/rx";

export default function HomeVendedor() {
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const caixaRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Ao recarregar pega os produtos do banco
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

    // Fecha a exibição do menu (para telas pequnas quando hamburguer aparece)
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

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Header Vendedor */}
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
                            Painel do Vendedor
                        </span>
                    </div>

                    {/* Menu telas maiores */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/CadastroProduto">
                            <button className="flex items-center gap-2 bg-teal-600 text-white px-2 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-md">
                                <FaPlus />
                                <span>Adicionar Produto</span>
                            </button>
                        </Link>

                        <Link href="/MsgsVendedor">
                            <button className="flex items-center gap-2 bg-[#F08FAF] text-white border border-gray-300 px-2 py-2 rounded-lg font-semibold hover:bg-[#dc7bad] transition-colors">
                                <FaClipboardList />
                                <span>Ver Mensagens</span>
                            </button>
                        </Link>

                        <Link href="/PedidosVendedor">
                            <button className="flex items-center gap-2 bg-teal-600 text-white border border-gray-300 px-2 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                                <FaBoxOpen />
                                <span>Pedidos Recebidos</span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile: hamburguer + logout */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(true)}
                        >
                            <RxHamburgerMenu size={30} />
                        </button>

                        <Link href="/Login">
                            <button className="bg-[#e5e5e5] border border-gray-400 text-black px-3 py-2 rounded flex items-center cursor-pointer gap-1">
                                <CiLogout className="text-lg" />
                                <span className="text-base font-semibold">
                                    Sair
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Logout Telas Grandes */}
                    <div className="hidden md:block">
                        <Link href="/Login">
                            <button className="bg-[#e5e5e5] border border-gray-400 text-black px-3 py-2 rounded flex items-center cursor-pointer gap-1 hover:bg-gray-100 transition-colors">
                                <CiLogout className="text-lg" />
                                <span className="text-base font-semibold">
                                    Sair
                                </span>
                            </button>
                        </Link>
                    </div>
                </header>

                {loading && (
                    <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                    </div>
                )}

                {/* Conteúdo (Catálogo Vendedor) */}
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
                                quantidade={0} // Como é Vendedor, a quantidade no carrinho não importa
                                onChangeQtd={() => {}}
                                tipo="vendedor"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isOpen && (
                <>
                    {/* Menu lateral */}
                    <div
                        ref={caixaRef}
                        className="
                                fixed top-0 right-0 z-[800]
                                h-screen w-[78vw] max-w-[340px]
                                bg-white shadow-2xl
                                flex flex-col
                                rounded-l-3xl
                                overflow-hidden
                            "
                    >
                        {/* Navegação */}
                        <div className="flex flex-col justify-between flex-1 py-8">
                            <div className="flex flex-col gap-5">
                                {/* Adicionar Produto */}
                                <Link href="/CadastroProduto">
                                    <button
                                        className="
                                            w-full px-6 py-4
                                            flex items-center gap-4
                                            hover:bg-teal-50
                                            transition-colors
                                        "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="bg-teal-100 p-3 rounded-2xl">
                                            <FaPlus
                                                size={20}
                                                className="text-teal-700"
                                            />
                                        </div>

                                        <div className="flex flex-col items-start">
                                            <span className="font-bold text-gray-800">
                                                Adicionar Produto
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                Cadastre novos itens
                                            </span>
                                        </div>
                                    </button>
                                </Link>

                                {/* Mensagens */}
                                <Link href="/MsgsVendedor">
                                    <button
                                        className="
                                            w-full px-6 py-4
                                            flex items-center gap-4
                                            hover:bg-pink-50
                                            transition-colors
                                        "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="bg-pink-100 p-3 rounded-2xl">
                                            <FaClipboardList
                                                size={20}
                                                className="text-pink-500"
                                            />
                                        </div>

                                        <div className="flex flex-col items-start">
                                            <span className="font-bold text-gray-800">
                                                Mensagens
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                Converse com clientes
                                            </span>
                                        </div>
                                    </button>
                                </Link>

                                {/* Pedidos */}
                                <Link href="/PedidosVendedor">
                                    <button
                                            className="
                                                w-full px-6 py-4
                                                flex items-center gap-4
                                                hover:bg-teal-50
                                                transition-colors
                                            "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="bg-teal-100 p-3 rounded-2xl">
                                            <FaBoxOpen
                                                size={20}
                                                className="text-teal-700"
                                            />
                                        </div>

                                        <div className="flex flex-col items-start">
                                            <span className="font-bold text-gray-800">
                                                Pedidos Recebidos
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                Acompanhe as vendas
                                            </span>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            {/* Footer */}
                            <div className="px-6">
                                <Link href="/Login">
                                    <button
                                        className="
                                w-full py-3 rounded-2xl
                                border border-gray-300
                                flex items-center justify-center gap-2
                                font-semibold
                                hover:bg-gray-100
                                transition-colors
                            "
                                    >
                                        <CiLogout size={20} />
                                        Sair da Conta
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
