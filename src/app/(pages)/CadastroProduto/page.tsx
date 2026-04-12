"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ProdutoProps } from "@/entities/entities";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function CadastroProduto() {
    // Produto que será "preenchido" no cadastro
    // como se fosse uma struct
    const [produto, setProduto] = useState<ProdutoProps>({
        id: "",
        nome: "",
        img: undefined,
        desc: "",
        qtd_disp: 0,
        preco_venda: 0,
    });

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

    // Envia o forms
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Produto cadastrado:", produto);
        alert("Produto cadastrado! Veja no console.");

        // Reset
        setProduto({
            id: "",
            nome: "",
            img: undefined,
            desc: "",
            qtd_disp: 0,
            preco_venda: 0,
        });
    };

    return (
        <main className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-5">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg relative">
                
                <Link href="/ProdutosAdmin" className="absolute top-6 left-6 text-gray-500 hover:text-teal-600 flex items-center gap-1 font-medium">
                    <IoArrowBackOutline /> Voltar
                </Link>

                <h1 className="text-2xl font-bold mb-6 mt-8">Cadastrar Produto</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">
                            ID do Produto:
                        </label>
                        <input
                            type="text"
                            name="id"
                            value={produto.id}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder="Ex: 001"
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
                            placeholder="Nome do produto"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">
                            Descrição:
                        </label>
                        <textarea
                            name="desc"
                            value={produto.desc}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder="Descrição do produto"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">
                            Quantidade Disponível:
                        </label>
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
                        <label className="text-sm font-medium">
                            Preço de Venda:
                        </label>
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

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">
                            Imagem do Produto:
                        </label>
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

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded font-bold hover:bg-teal-700 transition"
                    >
                        Cadastrar Produto
                    </button>
                </form>
            </div>
        </main>
    );
}