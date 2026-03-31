"use client";

export default function Login() {
    // Parte lógica do código (javascript + useState + useEffect)
    // Provavelmente não será necessária a parte lógica por enquanto

    // Parte "html e css"
    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black">
            {/* O que vc faria em um arquivo .css, faça no classname */}
            <h1 className="font-bold p-2">Exemplo para ajudar na tela de login</h1>

            {/* Flex flex-col alinha os itens um embaixo do outro (vertical) */}
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-32 h-32 border-2 flex items-center justify-center border-teal-400 bg-white">
                    Example div
                </div>

                <p className="p-10 text-sm text-center">
                    This is a small paragraph
                </p>

                {/* Input responsivo */}
                <div className="gap-2 p-4">
                    <label
                        htmlFor="campoTexto"
                        className="ml-1 text-base font-medium text-gray-700"
                    >
                        Input responsivo
                    </label>
                    <input
                        type="text"
                        placeholder="Digite algo..."
                        className="w-full max-w-md px-4 py-2 border border-teal-400 rounded-lg"
                    />
                </div>

                <button className="ml-4 w-1/4 max-w-md bg-gray-400 text-white py-2 rounded-lg font-semibold mt-2 hover:bg-teal-600">
                    Button
                </button>
            </div>

            {/* flex flex-row itens lado a lado (horizontal) */}
            <div className="flex flex-row justify-center items-center gap-1 md:gap-6 mt-10">
                {/* Cada tag (p ou div) fica ao lado da outra */}
                <p className="text-base">
                    Exemplo de itens dispostos na horizontal:{" "}
                </p>

                <div className="w-24 h-24 bg-teal-200 flex items-center justify-center rounded-lg">
                    1
                </div>

                <div className="w-24 h-24 bg-teal-300 flex items-center justify-center rounded-lg">
                    2
                </div>

                <div className="w-24 h-24 bg-teal-400 flex items-center justify-center rounded-lg text-white">
                    3
                </div>
            </div>
        </main>
    );
}
