"use client";

import { useState } from "react";
import { Msg, msgs_fake } from "@/entities/entities";
import { IoArrowBackOutline } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import CardMsg from "@/components/Card/cardMsgAdmin";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function MsgsAdmin() {
    const [listaMsgs, setListaMsgs] = useState(msgs_fake);
    const [isOpenChat, setIsOpenChat] = useState(false);
    const [chatAtual, setChatAtual] = useState<Msg[]>([]);
    const [msgInput, setMsgInput] = useState("");

    // Abrir chat
    function abrirChat(msg: Msg) {
        const conversa = listaMsgs.filter(
            (m) => m.id_cliente === msg.id_cliente
        );

        setChatAtual(conversa);
        setIsOpenChat(true);
    }

    // Enviar resposta
    function enviarMsg() {
        // Fazer
    }

    return (
        <main className="min-h-screen text-black bg-[#FDF6F6]">
            {/* Header Admin */}
            <header className="bg-[#e5e5e5] px-6 md:px-10 py-3 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-4">
                    <Image
                        src={logo}
                        alt="A lojinha Preferida"
                        className="w-24 md:w-32 h-auto"
                        priority
                    />
                    <span className="font-bold text-gray-700">
                        Mensagens Recebidas
                    </span>
                </div>
            </header>

            {/* Lista */}
            <div className="p-3 flex flex-wrap items-center justify-center">
                {listaMsgs.map((msg) => (
                    <CardMsg key={msg.id} msg={msg} onResponder={abrirChat} />
                ))}
            </div>

            {/* Chat lateral */}
            {isOpenChat && (
                <div className="fixed top-0 right-0 h-screen w-[95vw] max-w-[500px] bg-white shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="p-2">
                        <button
                            onClick={() => setIsOpenChat(false)}
                            className="bg-[#F08FAF] text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <IoArrowBackOutline />
                            Voltar
                        </button>
                    </div>

                    <div className="text-pretty text-lg font-medium mt-4 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                        {" "}
                        Chat com o cliente{" "}
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {chatAtual.map((m) => (
                            <div
                                key={m.id}
                                className={`p-2 rounded max-w-[70%] ${
                                    m.autor === "cliente"
                                        ? "bg-gray-200"
                                        : "bg-teal-400 text-white ml-auto"
                                }`}
                            >
                                {m.conteudo}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t flex gap-2">
                        <textarea
                            value={msgInput}
                            placeholder="Digite sua resposta..."
                            onChange={(e) => setMsgInput(e.target.value)}
                            className="flex-1 border rounded p-2 resize-none"
                        />
                        <button
                            onClick={enviarMsg}
                            className="bg-teal-500 text-white px-4 rounded"
                        >
                            <GrSend />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
