"use client";

import { UsuarioProps } from "@/entities/entities";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function Cadastro() {
    const initialUser = {
        id: 0,
        nome: "",
        email: "",
        cpf: "",
        celular: "",
        senha_hash: "",
        tipo: "cliente",
    };

    const [user, setUser] = useState<UsuarioProps>(initialUser);
    const [loading, setLoading] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState(String);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.nome || !user.email || !user.senha_hash) {
            toast.warning("Preencha nome, e-mail e senha");
            return;
        }

        if (user.senha_hash !== confirmarSenha) {
            toast.warning("As senhas não coincidem");
            return;
        }

        try {
            setLoading(true);

            // Chama a API a partir da rota definida
            const res = await fetch("/api/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Cadastrado realizado com sucesso!");
            console.log(data);

            setUser(initialUser);

            setTimeout(() => {
                // Espera 2s antes de redirecionar para Login
                router.push("/Login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar cadastro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black flex items-center justify-center p-4 py-10">
            <div className="w-full max-w-md bg-white border border-teal-600 rounded-xl shadow-lg p-8 flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Criar Nova Conta
                    </h1>
                    <p className="text-base text-gray-500 mt-2">
                        Cadastre-se para acessar a loja.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Todos os campos ficam um embaixo do outro (flex-col) */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="nome"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={user.nome}
                            onChange={handleChange}
                            placeholder="João da Silva"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="cpf"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            CPF
                        </label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={user.cpf}
                            onChange={handleChange}
                            placeholder="000.000.000-00"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="telefone"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            Celular / WhatsApp
                        </label>
                        <input
                            type="tel"
                            id="celular"
                            name="celular"
                            value={user.celular}
                            onChange={handleChange}
                            placeholder="(00) 90000-0000"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="joao@exemplo.com"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="senha"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            name="senha_hash"
                            value={user.senha_hash}
                            onChange={handleChange}
                            id="senha"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="confirmaSenha"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            id="confirmaSenha"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 cursor-pointer text-white py-3 text-lg flex items-center justify-center gap-2 rounded-lg font-semibold mt-4 hover:bg-teal-600 transition-colors shadow-sm"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Criando a conta...
                            </>
                        ) : (
                            "Criar Conta"
                        )}
                    </button>
                </form>

                <div className="text-center mt-2 text-base text-gray-600">
                    Já tem uma conta?{" "}
                    {/* Permite redirecionar para outra página */}
                    <Link
                        href="/Login"
                        className="text-teal-600 cursor-pointer font-semibold hover:underline"
                    >
                        Faça login
                    </Link>
                </div>
            </div>
        </main>
    );
}
