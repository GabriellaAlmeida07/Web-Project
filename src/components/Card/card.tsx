"use client";

import { ProdutoProps, Props } from "@/entities/entities";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function CardProduto({
    nome,
    img,
    desc,
    qtd_disp,
    preco_venda,
    avaliacao,
    quantidade,
    onChangeQtd,
}: Props) {
    // Parte lógica do código (javascript + useState + useEffect)
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

    // Parte "html e css"
    return (
        <main>
            <div
                className={
                    "w-36 md:w-44 h-96 border-2 border-teal-400 rounded-lg shadow-lg mt-5 ml-5 flex flex-col gap-5 overflow-hidden"
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
                <div className="flex flex-col flex-1 items-center space-y-2 px-2 pt-1 text-black text-sm text-center">
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
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) =>
                            avaliacao && avaliacao > i ? (
                                <p key={i}>
                                    <FaStar />
                                </p>
                            ) : (
                                <p key={i}>
                                    <FaRegStar />
                                </p>
                            )
                        )}
                    </div>

                    {/* Controle de quantidade */}
                    <div className="mt-auto mb-2 flex justify-center">
                        <div className="flex items-center w-32 gap-3 bg-teal-500 rounded-lg shadow-lg px-2 py-1">
                            {/* Menos */}
                            <button
                                onClick={diminuir}
                                className="w-7 h-7 flex items-center justify-center bg-teal-600 text-white rounded select-none"
                            >
                                −
                            </button>

                            {/* Quantidade */}
                            <div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    min="0"
                                    max={qtd_disp}
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
                                                valor <= qtd_disp
                                            ) {
                                                onChangeQtd(valor);
                                            }

                                            setDigitando(null);
                                        }, 500);
                                    }}
                                    className="w-10 text-center bg-transparent text-white text-base font-semibold border-none outline-none"
                                />
                            </div>

                            {/* Mais */}
                            <button
                                onClick={aumentar}
                                className="w-7 h-7 flex items-center justify-center bg-teal-600 text-white rounded select-none"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
