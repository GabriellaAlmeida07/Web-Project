"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { ProdutoProps } from "@/entities/entities";
import { FaSpinner } from "react-icons/fa";
import { filtraDigitos, formatMoeda } from "@/utils/formatacao";
import { toast } from "sonner";

export default function CadastroProduto() {
    const initialProduto = {
        id: "",
        nome: "",
        img_url: undefined,
        descricao: "",
        qtd_estoque: 0,
        preco: 0,
    };

    const [loading, setLoading] = useState(false);
    // Produto props é apenas para definir o tipo
    const [produto, setProduto] = useState<ProdutoProps>(initialProduto);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProduto({
            ...produto,
            [name]:
                name === "qtd_estoque" || name === "preco"
                    ? Number(value)
                    : value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProduto({
                ...produto,
                img_url: URL.createObjectURL(
                    file
                ) as unknown as StaticImageData,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Chama a API a partir da rota definida
            const res = await fetch("/api/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    qtd_estoque: produto.qtd_estoque,
                    img_url_url: null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Produto cadastrado com sucesso!");
            console.log(data);
            setProduto(initialProduto);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao cadastrar produto");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle =
        "border-2 border-gray-200 p-2 rounded-md outline-none focus:border-teal-500 transition-all bg-gray-50";

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-black flex items-center justify-center p-5 font-sans text-sm">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg relative border-t-8 border-teal-600">
                <Link
                    href="/"
                    className="absolute top-6 text-base left-6 bg-[#F08FAF] text-white border p-2 rounded-lg flex items-center gap-1 font-semibold transition-colors"
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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 text-base text-gray-700"
                >
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
                            name="descricao"
                            value={produto.descricao}
                            onChange={handleChange}
                            className={`${inputStyle} h-24 resize-none`}
                            placeholder="Conte mais sobre o produto..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-medium  ml-1">Estoque</label>
                            <input
                                required
                                min={0}
                                placeholder="0"
                                type="text"
                                inputMode="numeric"
                                name="qtd_estoque"
                                value={
                                    produto.qtd_estoque === 0
                                        ? ""
                                        : produto.qtd_estoque
                                }
                                onChange={(e) => {
                                    const val = e.target.value;

                                    if (val === "") {
                                        setProduto({
                                            ...produto,
                                            qtd_estoque: 0,
                                        });
                                        return;
                                    }

                                    const num = Number(val);

                                    if (!isNaN(num)) {
                                        setProduto({
                                            ...produto,
                                            qtd_estoque: num,
                                        });
                                    }
                                }}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-medium  ml-1">
                                Preço (R$)
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="R$ 0,00"
                                value={
                                    produto.preco
                                        ? formatMoeda(produto.preco)
                                        : ""
                                }
                                onChange={(e) => {
                                    const digitsOnly = filtraDigitos(
                                        e.target.value
                                    );

                                    const limitedDigits = digitsOnly.slice(
                                        0,
                                        18
                                    );

                                    const numericValue = limitedDigits
                                        ? parseInt(limitedDigits, 10) / 100
                                        : 0;

                                    setProduto({
                                        ...produto,
                                        preco: numericValue,
                                    });
                                }}
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
                            {produto.img_url && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-teal-200">
                                    <Image
                                        src={produto.img_url}
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
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-95 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            "Salvar Produto"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
