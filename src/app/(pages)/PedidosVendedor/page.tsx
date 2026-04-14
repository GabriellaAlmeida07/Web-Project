"use client";

import { pedidosFake } from "@/entities/entities";
import CardPedidoVendedor from "@/components/Card/cardPedidoVendedor";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function PedidosVendedor() {
    return (
        <main className="min-h-screen bg-[#FDF6F6] p-5 text-black">
            <header className="max-w-6xl mx-auto flex items-center gap-4 mb-8">
                <Link href="/ProdutosAdmin" className="text-gray-500 hover:text-teal-600 transition">
                    <IoArrowBackOutline size={28} />
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-800">Pedidos Recebidos</h1>
            </header>

            <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center md:justify-start">
                {pedidosFake.map((pedido) => (
                    <CardPedidoVendedor key={pedido.id} pedido={pedido} />
                ))}
            </div>
        </main>
    );
}