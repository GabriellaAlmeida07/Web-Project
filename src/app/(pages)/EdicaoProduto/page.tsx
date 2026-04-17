"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ProdutoProps, prods_fake } from "@/entities/entities";
import Link from "next/link";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

export default function EdicaoProduto() {
    const searchParams = useSearchParams();
    const idProduto = searchParams.get("id"); 

    const [produto, setProduto] = useState<ProdutoProps>({
        id: "",
        nome: "",
        img: undefined,
        desc: "",
        qtd_disp: 0,
        preco_venda: 0,
    });

    useEffect(() => {
        if (idProduto) {
            const produtoEncontrado = prods_fake.find((p) => p.id === idProduto);
            if (produtoEncontrado) {
                setProduto({
                    ...produtoEncontrado,
                    img: produtoEncontrado.img as unknown as StaticImageData,
                });
            }
        }
    }, [idProduto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduto({
            ...produto,
            [name]: name === "qtd_disp" || name === "preco_venda" ? Number(value) : value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProduto({
                ...produto,
                img: URL.createObjectURL(file) as unknown as StaticImageData,
            });
        }
    };

    const handleAtualizar = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Alterações salvas com sucesso! Verifique o console.");
        console.log("Produto atualizado:", produto);
    };

    const handleExcluir = () => {
        // Confirmação de segurança para o Delete
        if (window.confirm("ATENÇÃO: Deseja realmente excluir este produto?")) {
            alert("Produto excluído com sucesso!");
            console.log("Excluindo produto ID:", produto.id);
        }
    };

    const inputStyle = "border-2 text-gray-600 border-gray-200 p-2 rounded-md outline-none focus:border-teal-500 focus:text-black transition-all bg-gray-50";

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-black flex items-center justify-center p-5 font-sans">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg relative border-t-8 border-teal-600">
                
                {/* Navegação simples via Link */}
                <Link href="/" className="absolute top-6 left-6 text-gray-500 hover:text-teal-600 flex items-center gap-1 font-semibold transition-colors">
                    <IoArrowBackOutline size={20} /> Voltar
                </Link>

                <div className="text-center mb-8 mt-10">
                    <h1 className="text-3xl font-extrabold text-gray-800">Editar Produto</h1>
                    <p className="text-gray-500 text-base">Modifique as informações do item selecionado</p>
                </div>

                <form onSubmit={handleAtualizar} className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium text-gray-700 ml-1">ID (Não editável)</label>
                        <input type="text" name="id" value={produto.id} disabled className={`${inputStyle} opacity-60 cursor-not-allowed`} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium text-gray-700 ml-1">Nome do Item</label>
                        <input required type="text" name="nome" value={produto.nome} onChange={handleChange} className={inputStyle} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium text-gray-700 ml-1">Descrição</label>
                        <textarea required name="desc" value={produto.desc} onChange={handleChange} className={`${inputStyle} h-24 resize-none`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">Estoque</label>
                            <input required min={0} type="number" name="qtd_disp" value={produto.qtd_disp} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">Preço (R$)</label>
                            <input required min={0} step="0.01" type="number" name="preco_venda" value={produto.preco_venda} onChange={handleChange} className={inputStyle} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium text-gray-700 ml-1">Imagem do Produto</label>
                        <div className="flex items-center gap-4">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer" />
                            {produto.img && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-teal-200">
                                    <Image src={produto.img} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleExcluir}
                            className="w-1/3 bg-white text-red-500 border-2 border-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                            <IoTrashOutline size={20} /> Excluir
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 bg-teal-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-95"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}