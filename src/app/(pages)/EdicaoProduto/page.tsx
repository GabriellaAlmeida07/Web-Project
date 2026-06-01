"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ProdutoProps } from "@/entities/entities";
import Link from "next/link";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation"; // Adicionado useRouter para navegar após ações
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function EdicaoProduto() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Ativado para poder redirecionar o usuário
    const idProduto = searchParams.get("id");
    const [loading, setLoading] = useState<boolean>(false);

    const [produto, setProduto] = useState<ProdutoProps>({
        id: 0,
        nome: "",
        img_url: undefined,
        descricao: "",
        qtd_estoque: 0,
        preco: 0,
    });

    useEffect(() => {
        async function carregarProduto() {
            if (idProduto) {
                setLoading(true);

                const res = await fetch(`/api/produtos/${idProduto}`);
                const produto_res = await res.json();

                if (produto_res) {
                    setProduto({
                        ...produto_res,
                        img_url:
                            produto_res.img_url as unknown as StaticImageData,
                    });
                }

                setLoading(false);
            }
        }
        carregarProduto();
    }, [idProduto]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
                    file,
                ) as unknown as StaticImageData,
            });
        }
    };

    // FUNÇÃO ATUALIZAR IMPLEMENTADA COM MÉTODO PUT 👇
    const handleAtualizar = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/produtos/${idProduto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    qtd_estoque: produto.qtd_estoque,
                    img_url: produto.img_url, // Se vocês forem salvar strings/URLs de imagens
                }),
            });

            if (response.ok) {
                toast.success("Alterações salvas com sucesso!");
                router.push("/"); // Redireciona de volta para a home do vendedor após salvar
            } else {
                toast.error("Erro ao salvar as alterações do produto.");
            }
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
            toast.error("Erro ao conectar com o servidor.");
        }
    };

    // FUNÇÃO EXCLUIR IMPLEMENTADA COM MÉTODO DELETE 👇
    const handleExcluir = async () => {
        if (window.confirm("ATENÇÃO: Deseja realmente excluir este produto?")) {
            try {
                const response = await fetch(`/api/produtos/${idProduto}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.info("Produto excluído com sucesso!");
                    router.push("/"); // Redireciona para a home já que o produto não existe mais
                } else {
                    toast.error("Erro ao excluir o produto.");
                }
            } catch (error) {
                console.error("Erro na requisição DELETE:", error);
                toast.error("Erro ao conectar com o servidor.");
            }
        }
    };

    const inputStyle =
        "border-2 text-gray-600 border-gray-200 p-2 rounded-md outline-none focus:border-teal-500 focus:text-black transition-all bg-gray-50";

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-black flex items-center justify-center p-5 font-sans">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg relative border-t-8 border-teal-600">
                <Link
                    href="/"
                    className="absolute top-6 left-6 bg-[#F08FAF] text-white border p-2 rounded-lg flex items-center gap-1 font-semibold transition-colors"
                >
                    <IoArrowBackOutline size={20} /> Voltar
                </Link>

                <div className="text-center mb-8 mt-10">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Editar Produto
                    </h1>
                    <p className="text-gray-500 text-base">
                        Modifique as informações do item selecionado
                    </p>
                </div>

                {!loading ? (
                    <form onSubmit={handleAtualizar} className="space-y-5">
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">
                                ID (Não editável)
                            </label>
                            <input
                                type="text"
                                name="id"
                                value={produto.id}
                                disabled
                                className={`${inputStyle} opacity-60 cursor-not-allowed`}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">
                                Nome do Item
                            </label>
                            <input
                                required
                                type="text"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">
                                Descrição
                            </label>
                            {/* AJUSTADO AQUI: alterado name="desc" para name="descricao" 👇 */}
                            <textarea
                                required
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleChange}
                                className={`${inputStyle} h-24 resize-none`}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium text-gray-700 ml-1">
                                    Estoque
                                </label>
                                <input
                                    required
                                    min={0}
                                    type="number"
                                    name="qtd_estoque"
                                    value={produto.qtd_estoque}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium text-gray-700 ml-1">
                                    Preço (R$)
                                </label>
                                <input
                                    required
                                    min={0}
                                    step="0.01"
                                    type="number"
                                    name="preco"
                                    value={produto.preco}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium text-gray-700 ml-1">
                                Imagem do Produto
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
                ) : (
                    <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                    </div>
                )}
            </div>
        </main>
    );
}
