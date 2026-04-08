"use client";

import { useState, useEffect } from "react";

export default function Home() {
    // Essas constantes só podem ter valores atribuídos à elas usando set
    // Exemplo: certo -> setCount(1)
    //          errado -> count = 1
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Carregando...");

    useEffect(() => {
        console.log("Página carregada!");

        setTimeout(() => {
            // Usando setMessage
            setMessage("Página carregada com sucesso!");
        }, 2000);
    }, []); // [] = executa quando carrega/recarrega a página

    useEffect(() => {
        console.log(`Contador atualizado: ${count}`);
    }, [count]); // executa sempre que count muda

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-2xl p-10 max-w-xl w-full text-center">
                <h1 className="text-2xl font-bold mb-4 text-black">
                    Exemplo de página com useState e useEffect
                </h1>

                {/* Mensagem carregada com useEffect */}
                <p
                    className={`mb-6 ${
                        message === "Carregando..."
                            ? "text-red-400"
                            : "text-teal-500"
                    }`}
                >
                    {" "}
                    {message}{" "}
                </p>

                {/* Contador */}
                <div className="mb-6">
                    <p className="text-lg text-gray-600 mb-2">
                        Contador: {count}
                    </p>
                    <button
                        onClick={() => setCount(count + 1)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Incrementar
                    </button>
                </div>

                {/* Input */}
                <div>
                    <input
                        type="text"
                        placeholder="Digite algo..."
                        onChange={(e) => setMessage(e.target.value)}
                        className="border border-teal-400 text-black p-2 rounded-lg w-full"
                    />
                </div>
            </div>
        </main>
    );
}
