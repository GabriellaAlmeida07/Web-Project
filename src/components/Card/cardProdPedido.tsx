"use client";

import { ProdutoProps, Props } from "@/entities/entities";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function CardProdPedido({
    nome,
    img,
    desc,
    qtd_disp,
    preco_venda,
    avaliacao,
    quantidade,
    onChangeQtd,
}: Props) {
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
                </div>
            </div>
        </main>
    );
}
