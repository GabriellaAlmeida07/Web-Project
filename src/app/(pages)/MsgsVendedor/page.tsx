"use client";

import { useState } from "react";
import { Msg, msgs_fake } from "@/entities/entities";
import { IoArrowBackOutline, IoStorefrontOutline } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import CardMsg from "@/components/Card/cardMsg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function MsgsVendedor() {
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
        console.log("Mensagem enviada!");
    }

    return (
        <main className="min-h-screen text-black bg-[#FDF6F6]">
            {/* Header Admin */}
            <header className="bg-[#e5e5e5] px-4 gap-3 py-3 flex justify-between items-center shadow-lg">
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

                <Link href="/">
                    <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-2 py-2 rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-md">
                        <IoStorefrontOutline size={25} />
                        <span>Painel do Vendedor</span>
                    </button>
                </Link>
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
                  
                    <div className="p-2">
                        <button
                            onClick={() => setIsOpenChat(false)}
                            className="bg-[#F08FAF] text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <IoArrowBackOutline />
                            Voltar
                        </button>
                    </div>

                    <div className="text-pretty text-lg font-medium my-4 mx-2 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
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
                    <div className="px-3 py-6 border-t flex items-center gap-2">
                        <textarea
                            placeholder="Digite sua resposta..."
                            className="flex-1 h-20 border rounded px-3 py-2 outline-none resize-none"
                        />

                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
                            <GrSend size={22} />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
