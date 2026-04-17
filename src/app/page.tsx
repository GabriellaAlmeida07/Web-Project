"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { prods_fake } from "@/entities/entities";
import { useState } from "react";
import { FaBars, FaBoxOpen, FaClipboardList, FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import CardProduto from "@/components/Card/cardProduto";

export default function HomeVendedor() {
    // Usamos um estado para os produtos. Assim, quando clicar na lixeira,
    // ele some da tela instantaneamente (simulando que foi apagado).
    const [listaProdutos, setListaProdutos] = useState(prods_fake);

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Header Vendedor */}
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
                            Painel do Vendedor
                        </span>
                    </div>

                    {/* Menu telas maiores */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/CadastroProduto">
                            <button className="flex items-center gap-2 bg-teal-500 text-white px-2 py-2 rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-md">
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
                            <button className="flex items-center gap-2 bg-teal-500 text-white border border-gray-300 px-2 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                                <FaBoxOpen />
                                <span>Pedidos Recebidos</span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile: hamburguer + logout */}
                    <div className="flex md:hidden items-center gap-2">
                        <button className="p-2 rounded-lg border border-gray-400 bg-white hover:bg-gray-100 transition-colors">
                            <FaBars className="text-lg" />
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

                {/* Conteúdo (Catálogo Vendedor) */}
                <div className="p-3 overflow-y-auto">
                    <div className="flex flex-wrap pb-3">
                        {listaProdutos.map((p, i) => (
                            <CardProduto
                                key={i}
                                id={p.id}
                                nome={p.nome}
                                img={p.img}
                                desc={p.desc}
                                qtd_disp={p.qtd_disp}
                                preco_venda={p.preco_venda}
                                avaliacao={p.avaliacao}
                                quantidade={0} // Como é Vendedor, a quantidade no carrinho não importa
                                onChangeQtd={() => {}}
                                tipo="vendedor"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
