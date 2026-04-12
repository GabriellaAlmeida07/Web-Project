"use client";

import CardPedido from "@/components/Card/cardPedido";
import { pedidosFake } from "@/entities/entities";

export default function Pedidos() {
    return (
        <main className="p-10 bg-[#FDF6F6] min-h-screen w-full text-black">
            <div>
                Usando o cardPedido na pasta componentes já criado, a idéia é
                parecida com a página produtos que usa o cardProduto.
                
                Faça o botão de avaliar no cardProdPedido que aparece ao clicar no botão
                ver produtos. Arrume os cards (tamanhos...)
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 justify-center">
                {pedidosFake.map((p) => (
                    <CardPedido key={p.id} pedido={p} />
                ))}
            </div>
        </main>
    );
}
