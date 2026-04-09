"use client";

import Link from "next/link";

export default function Login() {
    // Parte lógica do código
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Tentativa de login via e-mail e senha...");
    };

    const handleGoogleLogin = () => {
        console.log("Redirecionando para login do Google...");
    };

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black flex items-center justify-center p-4">
            
            <div className="w-full max-w-md bg-white border border-teal-400 rounded-xl shadow-lg p-8 flex flex-col gap-6">
                
                {/* Cabeçalho */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Acesso Restrito</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Entre para gerenciar a loja.
                    </p>
                </div>

                {/* Formulário Tradicional */}
                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="ml-1 text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="admin@alojinhapreferida.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="ml-1 text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#14B8A6] text-white py-3 rounded-lg font-semibold mt-2 hover:bg-teal-600 transition-colors shadow-sm"
                    >
                        Entrar no Sistema
                    </button>
                </form>

                {/* Divisor "ou" */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-400">ou</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Botão do Google */}
                <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                    {/* Ícone SVG do Google */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Entrar com o Google
                </button>

                {/* Rodapé com Link de Cadastro */}
                <div className="text-center mt-4 text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link href="/Cadastro" className="text-teal-600 font-semibold hover:underline">
                        Cadastre-se
                    </Link>
                </div>

            </div>
        </main>
    );
}