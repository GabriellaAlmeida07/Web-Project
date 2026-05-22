"use client";

import { Props } from "@/entities/entities";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaPen, FaRegStar, FaStar, FaTrash } from "react-icons/fa";

export default function CardProduto({
    id,
    nome,
    img,
    desc,
    qtd_disp,
    preco_venda,
    avaliacao,
    quantidade,
    onChangeQtd,
    tipo
}: Props) {
    const [digitando, setDigitando] = useState<string | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    function diminuir() {
        if (quantidade > 0) {
            onChangeQtd(quantidade - 1);
        }
    }

    function aumentar() {
        if (quantidade < qtd_disp) {
            onChangeQtd(quantidade + 1);
        }
    }

    return (
        <main>
            <div
                className={
                    "w-36 md:w-44 h-96 border-2 border-teal-600 rounded-lg shadow-lg mt-5 ml-5 flex flex-col gap-5 overflow-hidden"
                }
            >
                {/* Imagem */}
                <div className="relative h-24 w-full">
                    <Image
                        src={img!}
                        alt="Produto"
                        className="w-full h-24 cursor-pointer"
                        priority
                        style={{ cursor: "pointer" }}
                    />
                </div>

                {/* Informações */}
                <div className="flex flex-col flex-1 items-center space-y-2 px-2 pt-1 text-black text-base text-center">
                    <div className="font-bold text-base w-36 h-8 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {" "}
                        {nome}{" "}
                    </div>

                    <div className="text-base w-36 h-10 overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                        {" "}
                        {desc}{" "}
                    </div>

                    <div>
                        Preço:{" "}
                        <span className="font-bold">
                            R$ {preco_venda.toFixed(2)}{" "}
                        </span>
                    </div>

                    <div>
                        Qtd: <span className="font-bold">{qtd_disp} </span>{" "}
                    </div>

                    {/* Avaliação */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) =>
                            avaliacao && avaliacao > i ? (
                                <FaStar key={i} />
                            ) : (
                                <FaRegStar key={i} />
                            )
                        )}
                    </div>

                    {/* Parte inferior dependente de ser cliente ou vendedor */}
                    <div className="mt-auto w-full py-2 flex justify-center">
                        {/* Cliente */}
                        {tipo === "cliente" && (
                            <div className="flex items-center w-32 gap-2 bg-teal-600 rounded-lg shadow px-2 py-1">
                                
                                <button
                                    onClick={diminuir}
                                    className="w-7 h-7 bg-teal-700 text-white rounded"
                                >
                                    −
                                </button>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={digitando ?? quantidade}
                                    onChange={(e) => {
                                        setDigitando(e.target.value);

                                        const valor = Number(e.target.value);

                                        if (debounceRef.current) {
                                            clearTimeout(debounceRef.current);
                                        }

                                        debounceRef.current = setTimeout(() => {
                                            if (
                                                valor >= 0 &&
                                                valor <= qtd_disp &&
                                                onChangeQtd
                                            ) {
                                                onChangeQtd(valor);
                                            }

                                            setDigitando(null);
                                        }, 500);
                                    }}
                                    className="w-10 text-center bg-transparent text-white font-semibold outline-none"
                                />

                                <button
                                    onClick={aumentar}
                                    className="w-7 h-7 bg-teal-700 text-white rounded"
                                >
                                    +
                                </button>
                            </div>
                        )}

                        {/* Vendedor */}
                        {tipo === "vendedor" && (
                            <div className="flex gap-3">
                                
                                <Link href={`/EdicaoProduto?id=${id}`}>
                                    <button className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded hover:bg-teal-700">
                                        <FaPen />
                                    </button>
                                </Link>

                                <button
                                    className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded hover:bg-red-500"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}