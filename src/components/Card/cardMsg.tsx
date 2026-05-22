"use client";

import { MsgProps } from "@/entities/entities";

export default function CardMsg({ msg, onResponder }: MsgProps) {
    return (
        <div className="w-72 md:w-[400px] border-2 border-teal border-teal-600 rounded-lg p-3 flex flex-col gap-2 m-2">
            
            {/* Data */}
            <div className="flex justify-end text-sm">
                {msg.data_registro}
            </div>

            {/* Infos */}
            <div>
                <p><span className="font-semibold">Cliente:</span> {msg.nome_cliente}</p>
                <p><span className="font-semibold">Assunto:</span> {msg.assunto}</p>
            </div>

            {/* Conteúdo */}
            <div className="text-sm bg-gray-100 p-2 rounded">
                {msg.conteudo}
            </div>

            {/* Botão responder */}
            <button
                onClick={() => onResponder(msg)}
                className="bg-[#F08FAF] text-white py-2 rounded mt-2"
            >
                Responder
            </button>
        </div>
    );
}