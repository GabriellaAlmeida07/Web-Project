"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { FaBoxOpen } from "react-icons/fa";
import CardPedido from "@/components/Card/cardPedido";
import { pedidosFake } from "@/entities/entities";

export default function MeusPedidos() {

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* CABEÇALHO */}
                <header className="bg-[#e5e5e5] px-6 md:px-10 py-3 flex justify-between items-center shadow-lg">
                    <Link href="/Produtos">
                        <Image
                            src={logo}
                            alt="A lojinha Preferida"
                            className="w-24 md:w-32 h-auto cursor-pointer"
                            priority
                        />
                    </Link>
                </header>

                {/* CONTEÚDO */}
                <div className="p-4 md:p-10 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-8 border-b-2 border-teal-500 pb-3">
                        <FaBoxOpen className="text-teal-600 text-3xl" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Meus Pedidos
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Acompanhe o histórico de suas compras e avalie
                                os produtos.
                            </p>
                        </div>
                    </div>

                    {/* ÁREA DOS CARDS*/}
                    <div className="flex flex-wrap gap-6 justify-center md:justify-start pb-10">
                        {/* Verifica se existem pedidos cadastrados no array. 
                            Se houver, cria um card para cada um.
                            Se não houver, exibe uma mensagem.
                        */}
                        {pedidosFake.length > 0 ? (
                            pedidosFake.map((pedido) => (
                                <CardPedido key={pedido.id} pedido={pedido} />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center w-full mt-10">
                                Você ainda não tem pedidos realizados.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
