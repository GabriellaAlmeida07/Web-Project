"use client";

import { MsgProps } from "@/entities/entities";
import { FaSpinner } from "react-icons/fa";

export default function CardMsg({ loading, cliente, onResponder }: MsgProps) {
    return (
        <div className="w-72 md:w-[400px] border-2 border-teal border-teal-600 rounded-lg p-3 flex flex-col gap-4 m-2">
            {/* Info do Cliente */}
            <div className=" flex flex-col gap-2">
                <p>
                    <span className="font-semibold">Cliente:</span>{" "}
                    {cliente.nome}{" "}
                </p>
                <p>
                    <span className="font-semibold">Email do Cliente:</span>{" "}
                    {cliente.email}{" "}
                </p>
            </div>

            {/* Botão responder */}
            <button
                onClick={onResponder}
                className="bg-[#F08FAF] flex flex-row gap-2 items-center justify-center text-white py-2 rounded mt-2 mx-6 font-extrabold"
            >
                {loading ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Abrindo...
                    </>
                ) : (
                    "Responder"
                )}
            </button>
        </div>
    );
}
