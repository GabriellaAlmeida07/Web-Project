"use client";

import { useEffect, useState } from "react";
import { Msg } from "@/entities/entities";
import { IoArrowBackOutline, IoStorefrontOutline } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import CardMsg from "@/components/Card/cardMsg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { formatarData } from "@/utils/formatacao";
import { FaSpinner } from "react-icons/fa";

export default function MsgsVendedor() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [chatAtual, setChatAtual] = useState<Msg[]>([]);
    const [clienteAtual, setClienteAtual] = useState<number | null>(null);
    const [isOpenChat, setIsOpenChat] = useState(false);
    const [loadingChatId, setLoadingChatId] = useState<number | null>(null);
    const [sendingMsg, setSendingMsg] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [msgAtual, setMsgAtual] = useState<string>("");

    useEffect(() => {
        async function carregarClientes() {
            if (clientes.length > 0) return;

            try {
                setLoading(true);
                const response = await fetch("/api/mensagens/vendedor");

                const data: any[] = await response.json();

                setClientes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        carregarClientes();
    }, []);

    // Abrir chat
    async function abrirChat(idCliente: number) {
        try {
            setLoadingChatId(idCliente);
            const response = await fetch(
                `/api/mensagens/vendedor/${idCliente}`
            );

            const mensagens: Msg[] = await response.json();

            setClienteAtual(idCliente);
            setMsgAtual("");
            setChatAtual(mensagens);
            setIsOpenChat(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingChatId(null);
        }
    }

    // Enviar resposta
    async function enviarMsg() {
        // Remove espaços no início e fim da msg
        if (!msgAtual.trim()) return;

        try {
            setSendingMsg(true);

            const res = await fetch("/api/mensagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conteudo: msgAtual,
                    tipo_remetente: "vendedor",
                    id_cliente: clienteAtual,
                }),
            });

            const novaMsg: Msg = await res.json();

            setMsgAtual("");
            setChatAtual((msgs) => [...msgs, novaMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setSendingMsg(false);
        }
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

            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <FaSpinner className="animate-spin text-gray-600 text-4xl" />
                </div>
            ) : clientes.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                    <p className="text-gray-500 text-lg">
                        Nenhuma mensagem recebida ainda.
                    </p>
                </div>
            ) : (
                <div className="p-3 flex flex-wrap items-center justify-center">
                    {clientes.map((cliente) => (
                        <CardMsg
                            key={cliente.id}
                            cliente={cliente}
                            loading={loadingChatId === cliente.id}
                            onResponder={() => abrirChat(cliente.id)}
                        />
                    ))}
                </div>
            )}

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

                    <div className="text-pretty text-lg font-medium my-4 mx-0 p-2 flex items-center justify-center rounded border-2 box-decoration-slice border-gray-400">
                        {" "}
                        Chat com o cliente{" "}
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {loadingChatId ? (
                            <div className="h-full flex items-center justify-center">
                                <FaSpinner className="animate-spin text-4xl text-gray-500" />
                            </div>
                        ) : chatAtual.length === 0 ? (
                            <p className="text-gray-500 text-center">
                                Nenhuma mensagem ainda...
                            </p>
                        ) : (
                            chatAtual.map((m) => (
                                <div
                                    key={m.id}
                                    className={`p-2 rounded max-w-[70%] ${
                                        m.tipo_remetente === "cliente"
                                            ? "bg-gray-200"
                                            : "bg-teal-600 text-white ml-auto"
                                    }`}
                                >
                                    <p>{m.conteudo}</p>

                                    <div
                                        className={`text-xs mt-2 text-right ${
                                            m.tipo_remetente === "cliente"
                                                ? "text-gray-500"
                                                : "text-teal-100"
                                        }`}
                                    >
                                        {formatarData(m.data_envio)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input */}
                    <div className="px-3 py-6 border-t flex items-center gap-2">
                        <textarea
                            placeholder="Digite sua mensagem..."
                            value={msgAtual}
                            onChange={(e) => setMsgAtual(e.target.value)}
                            className="flex-1 h-20 border rounded px-3 py-2 outline-none resize-none"
                        />

                        <button
                            onClick={enviarMsg}
                            disabled={sendingMsg}
                            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            <GrSend size={22} />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
