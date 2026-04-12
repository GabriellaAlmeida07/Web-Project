"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import CardProdutoAdmin from "@/components/Card/cardProdutoAdmin";
import { prods_fake } from "@/entities/entities";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function ProdutosAdmin() {
    // Usamos um estado para os produtos. Assim, quando você clicar na lixeira, 
    // ele some da tela instantaneamente (simulando que foi apagado).
    const [listaProdutos, setListaProdutos] = useState(prods_fake);

    // Função que remove o produto da tela
    const deletarProduto = (idParaDeletar: string) => {
        const confirmacao = window.confirm("Tem certeza que deseja apagar este produto?");
        if (confirmacao) {
            const novaLista = listaProdutos.filter((prod) => prod.id !== idParaDeletar);
            setListaProdutos(novaLista);
            // Aqui no futuro entrará a lógica de deletar no Backend/Banco de Dados
        }
    };

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            <div className="h-screen grid grid-rows-[auto_1fr]">
                
                {/* Header Admin */}
                <header className="bg-[#e5e5e5] px-6 md:px-10 py-3 flex justify-between items-center shadow-lg border-b-4 border-teal-500">
                    <div className="flex items-center gap-4">
                        <Image
                            src={logo}
                            alt="A lojinha Preferida"
                            className="w-24 md:w-32 h-auto"
                            priority
                        />
                        <span className="font-bold text-gray-700 hidden md:block">
                            Painel Administrativo
                        </span>
                    </div>

                    {/* Botão + Adicionar Produto */}
                    <Link href="/CadastroProduto">
                        <button className="flex items-center gap-2 bg-[#14B8A6] text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-md">
                            <FaPlus />
                            <span className="hidden md:inline">Adicionar Produto</span>
                        </button>
                    </Link>
                </header>

                {/* Conteúdo (Catálogo Admin) */}
                <div className="p-3 overflow-y-auto">
                    <div className="flex flex-wrap pb-3">
                        {listaProdutos.map((p, i) => (
                            <CardProdutoAdmin
                                key={i}
                                id={p.id}
                                nome={p.nome}
                                img={p.img}
                                desc={p.desc}
                                qtd_disp={p.qtd_disp}
                                preco_venda={p.preco_venda}
                                avaliacao={p.avaliacao}
                                quantidade={0} // Como é admin, a quantidade no carrinho não importa
                                onChangeQtd={() => {}}
                                onDelete={deletarProduto}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}