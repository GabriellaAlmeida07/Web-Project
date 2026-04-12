"use client";

import Link from "next/link";

export default function Cadastro() {
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando dados de cadastro...");
    };

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black flex items-center justify-center p-4 py-10">
            
            <div className="w-full max-w-md bg-white border border-teal-400 rounded-xl shadow-lg p-8 flex flex-col gap-6">
                
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Criar Nova Conta</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Junte-se à nossa plataforma.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    
                    {/* Todos os campos ficam um embaixo do outro (flex-col) */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="ml-1 text-sm font-medium text-gray-700">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="João da Silva"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="cpf" className="ml-1 text-sm font-medium text-gray-700">
                            CPF
                        </label>
                        <input
                            type="text"
                            id="cpf"
                            placeholder="000.000.000-00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="nascimento" className="ml-1 text-sm font-medium text-gray-700">
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            id="nascimento"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors text-gray-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="telefone" className="ml-1 text-sm font-medium text-gray-700">
                            Celular / WhatsApp
                        </label>
                        <input
                            type="tel"
                            id="telefone"
                            placeholder="(00) 90000-0000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="ml-1 text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="joao@exemplo.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha" className="ml-1 text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmaSenha" className="ml-1 text-sm font-medium text-gray-700">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            id="confirmaSenha"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                        <input 
                            type="checkbox" 
                            id="termos" 
                            className="mt-1 w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label htmlFor="termos" className="text-sm text-gray-600 leading-tight">
                            Eu concordo com os <a href="#" className="text-teal-600 hover:underline">Termos de Serviço</a> e a <a href="#" className="text-teal-600 hover:underline">Política de Privacidade</a>.
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#14B8A6] text-white py-3 rounded-lg font-semibold mt-4 hover:bg-teal-600 transition-colors shadow-sm"
                    >
                        Criar Conta
                    </button>
                </form>

                <div className="text-center mt-2 text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    {/* Permite redirecionar para outra página */}
                    <Link href="/Login" className="text-teal-600 font-semibold hover:underline">
                        Faça login
                    </Link>
                </div>

            </div>
        </main>
    );
}