"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar, FaTrash, FaPen } from "react-icons/fa";

// Adicionei uma prop 'onDelete' para avisar a página quando a lixeira for clicada
interface AdminProps extends Props {
    onDelete?: (id: string) => void;
}

export default function CardProdutoAdmin({
    id,
    nome,
    img,
    desc,
    qtd_disp,
    preco_venda,
    avaliacao,
    onDelete,
}: AdminProps) {
    return (
        <main>
            <div className="w-36 md:w-44 h-96 border-2 border-[#14B8A6] rounded-lg shadow-lg mt-5 ml-5 flex flex-col gap-5 overflow-hidden relative">
                
                {/* Imagem */}
                <div className="relative h-24 w-full">
                    <Image
                        src={img!}
                        alt="Produto"
                        className="w-full h-24 object-cover"
                        priority
                    />
                </div>

                {/* Informações */}
                <div className="flex flex-col flex-1 items-center space-y-2 px-2 pt-1 text-black text-sm text-center">
                    <div className="font-bold text-base w-36 h-8 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {nome}
                    </div>
                    <div className="text-sm w-36 h-10 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {desc}
                    </div>
                    <div>
                        Preço: <span className="font-bold">R$ {preco_venda.toFixed(2)}</span>
                    </div>
                    <div>
                        Estoque: <span className="font-bold">{qtd_disp}</span>
                    </div>

                    {/* Botões Administrativos (Editar e Excluir) */}
                    <div className="mt-auto mb-4 flex gap-3 w-full justify-center px-2">
                        
                        {/* Botão Editar (Leva para a página de edição passando o ID na URL) */}
                        <Link href={`/EdicaoProduto?id=${id}`}>
                            <button className="w-10 h-10 flex items-center justify-center bg-teal-500 text-white rounded shadow hover:bg-teal-600 transition-colors">
                                <FaPen />
                            </button>
                        </Link>

                        {/* Botão Excluir */}
                        <button 
                            onClick={() => onDelete && onDelete(id!)}
                            className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded shadow hover:bg-red-500 transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}