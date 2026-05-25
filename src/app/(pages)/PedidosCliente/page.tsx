"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { FaBoxOpen, FaSpinner } from "react-icons/fa";
import CardPedido from "@/components/Card/cardPedido";
import { IoStorefrontOutline } from "react-icons/io5";
import { PedidoProps } from "@/entities/entities";
import { useEffect, useState } from "react";

export default function PedidosCliente() {
    const [pedidos, setPedidos] = useState<PedidoProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Ao recarregar a página pega os pedidos no banco
    useEffect(() => {
        async function carregarPedidos() {
            try {
                setLoading(true);
                const res = await fetch("/api/pedidos", { method: "GET" });

                const data = await res.json();

                setPedidos(data);
                console.log(data)
            } catch (error) {
                console.error("Erro ao carregar pedidos:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarPedidos();
    }, []);

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Cabeçalho */}
                <header className="bg-[#e5e5e5] px-4 gap-3 py-3 flex justify-between items-center shadow-lg">
                    <div>
                        <Image
                            src={logo}
                            alt="A lojinha Preferida"
                            className="w-24 md:w-32 h-auto"
                            priority
                        />
                    </div>

                    <Link href="/HomeCliente">
                        <button className="flex items-center gap-2 bg-teal-600 text-white px-2 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-md">
                            <IoStorefrontOutline size={25} />
                            <span>Painel do Cliente</span>
                        </button>
                    </Link>
                </header>

                {/* Conteúdo */}
                <div className="p-4 md:p-10 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-8 border-b-2 border-teal-600 pb-3">
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

                    {loading && (
                        <div className="flex items-center justify-center">
                            <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                        </div>
                    )}

                    {/* Área dos cards*/}
                    <div className="flex flex-wrap gap-6 justify-center pb-10">
                        {/* Verifica se existem pedidos cadastrados no array. 
                            Se houver, cria um card para cada um.
                            Se não houver, exibe uma mensagem.
                        */}
                        {pedidos.length > 0
                            ? pedidos.map((pedido) => (
                                  <CardPedido
                                      key={pedido.id}
                                      pedido={pedido}
                                      tipo={"cliente"}
                                  />
                              ))
                            : loading ?? (
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
