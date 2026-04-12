"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ProdutoProps, prods_fake } from "@/entities/entities";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        let value: any = e.target.value;

        if (name === "qtd_disp" || name === "preco_venda") {
            value = Number(value);
        }

        setProduto({
            ...produto,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (!file) return;

        setProduto({
            ...produto,
            img: URL.createObjectURL(file) as unknown as StaticImageData,
        });
    };

    const handleAtualizar = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Produto atualizado:", produto);
        alert("Alterações salvas! Veja no console.");
    };

    const handleExcluir = () => {
        const confirmacao = window.confirm("ATENÇÃO: Deseja realmente excluir este produto?");
        if (confirmacao) {
            console.log("Excluindo produto ID:", produto.id);
            alert("Produto excluído com sucesso!");
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-5">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg relative">
                
                <Link href="/ProdutosAdmin" className="absolute top-6 left-6 text-gray-500 hover:text-teal-600 flex items-center gap-1 font-medium">
                    <IoArrowBackOutline /> Voltar
                </Link>

                <h1 className="text-2xl font-bold mb-6 mt-8">Editar Produto</h1>
                
                <form onSubmit={handleAtualizar} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">ID do Produto (Não editável):</label>
                        <input
                            type="text"
                            name="id"
                            value={produto.id}
                            disabled
                            className="border p-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={produto.nome}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Descrição:</label>
                        <textarea
                            name="desc"
                            value={produto.desc}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Estoque:</label>
                            <input
                                type="number"
                                name="qtd_disp"
                                value={produto.qtd_disp}
                                onChange={handleChange}
                                className="border p-2 rounded"
                                min={0}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Preço (R$):</label>
                            <input
                                type="number"
                                name="preco_venda"
                                value={produto.preco_venda}
                                onChange={handleChange}
                                className="border p-2 rounded"
                                min={0}
                                step={0.01}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Imagem do Produto:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="border-2 border-pink-300 p-1 rounded"
                            onChange={handleFileChange}
                        />
                        {produto.img && (
                            <Image
                                src={produto.img}
                                alt="Preview"
                                width={128}
                                height={128}
                                className="mt-2 w-32 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t mt-4">
                        <button
                            type="button"
                            onClick={handleExcluir}
                            className="w-1/3 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600 transition"
                        >
                            Excluir
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 bg-teal-600 text-white py-2 rounded font-bold hover:bg-teal-700 transition"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}