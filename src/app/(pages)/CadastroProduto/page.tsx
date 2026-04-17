"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { ProdutoProps } from "@/entities/entities";

export default function CadastroProduto() {
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
        const { name, value } = e.target;
        setProduto({
            ...produto,
            [name]:
                name === "qtd_disp" || name === "preco_venda"
                    ? Number(value)
                    : value,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui simulamos o "Create" do CRUD
        alert(`Sucesso! O produto "${produto.nome}" foi salvo no console.`);
        console.log("Novo Produto:", produto);
    };

    const inputStyle =
        "border-2 border-gray-200 p-2 rounded-md outline-none focus:border-teal-500 transition-all bg-gray-50";

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-black flex items-center justify-center p-5 font-sans text-sm">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg relative border-t-8 border-teal-600">
                <Link
                    href="/"
                    className="absolute top-6 text-base left-6 text-gray-400 hover:text-teal-600 flex items-center gap-1 font-semibold transition-colors"
                >
                    <IoArrowBackOutline size={20} /> Voltar
                </Link>

                <div className="text-center mb-8 mt-10">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Novo Produto
                    </h1>
                    <p className="text-base text-gray-500">
                        Preencha os dados para o catálogo
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-base text-gray-700">
                    <div className="flex flex-col gap-1">
                        <label className="font-medium  ml-1">
                            ID Identificador
                        </label>
                        <input
                            required
                            type="text"
                            name="id"
                            value={produto.id}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="Ex: PROD-001"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium  ml-1">
                            Nome do Item
                        </label>
                        <input
                            required
                            type="text"
                            name="nome"
                            value={produto.nome}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="Ex: Tênis Esportivo"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium  ml-1">
                            Descrição Curta
                        </label>
                        <textarea
                            required
                            name="desc"
                            value={produto.desc}
                            onChange={handleChange}
                            className={`${inputStyle} h-24 resize-none`}
                            placeholder="Conte mais sobre o produto..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-medium  ml-1">
                                Estoque
                            </label>
                            <input
                                required
                                min={0}
                                type="number"
                                name="qtd_disp"
                                value={produto.qtd_disp}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-medium  ml-1">
                                Preço (R$)
                            </label>
                            <input
                                required
                                min={0}
                                step="0.01"
                                type="number"
                                name="preco_venda"
                                value={produto.preco_venda}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium  ml-1">
                            Foto do Produto
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                            />
                            {produto.img && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-teal-200">
                                    <Image
                                        src={produto.img}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-95 mt-4"
                    >
                        Salvar Produto
                    </button>
                </form>
            </div>
        </main>
    );
}
