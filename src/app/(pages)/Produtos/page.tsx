// indica que o componente será executado no navegador, permitindo usar hooks e interatividade (useState, useEffect...)
"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import carrinho from "@/assets/carrinho.png"
import { IoIosChatboxes } from "react-icons/io";
import CardProduto from "@/components/Card/card";
import { prods_fake } from "@/entities/entities";

export default function Produtos() {
    // Parte lógica do código (javascript + useState + useEffect)

    // Parte "html e css"
    return (
        <main className="min-h-screen bg-[#FDF6F6]">
            {/* Grid de cabeçalho e conteúdo */}
            <div className="h-screen grid grid-rows-[auto_1fr]">
                {/* Header */}
                <header className="bg-[#e5e5e5] px-6 md:px-10 py-3 flex justify-between items-center shadow-lg">
                    {/* Responsividade: por exemplo em telas maiores que média (md), padding em x de 10.
                        Para telas menores que md paddind em x de 6.
                    */}
                    <Image
                        src={logo}
                        alt="A lojinha Preferida"
                        className="w-24 md:w-32 h-auto cursor-pointer"
                        priority
                        style={{ cursor: "pointer" }}
                    />
                    {/* Responsividade na imagem: em telas maiores que média (md), largura de 32.
                        Para telas menores que md largura de 24.
                    */}

                    <IoIosChatboxes
                        className="text-gray-500 hover:text-gray-600"
                        size={27}
                    />
                </header>

                {/* Conteúdo (produtos) */}
                <div className="p-3 overflow-y-auto">
                    <div className="flex flex-wrap pb-3">
                        {prods_fake.map((p, i) => (
                            <CardProduto
                                key={i}
                                nome={p.nome}
                                img={p.img}
                                desc={p.desc}
                                qtd_disp={p.qtd_disp}
                                preco_venda={p.preco_venda}
                                avaliacao={p.avaliacao}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Carrinho */}
            <div className="fixed bottom-6 right-0 z-50">
                <Image
                    src={carrinho}
                    alt="Carrinho"
                    className="mr-4 w-24 h-20 md:w-28 md:h-24"
                    priority
                    style={{ cursor: "pointer" }}
                />
            </div>
        </main>
    );
}
