"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        senha_hash: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            // Chama a API a partir da rota definida
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            // toast.success("Login realizado com sucesso, redirecionando...");

            // Redireciona baseado no tipo de usuário logado
            if (data.tipo === "cliente") {
                router.push("/HomeCliente");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);

            toast.error("E-mail ou senha inválidos");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#FDF6F6] text-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-teal-600 rounded-xl shadow-lg p-8 flex flex-col gap-6">
                {/* Cabeçalho */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Acesso Restrito
                    </h1>

                    <p className="text-base text-gray-500 mt-2">
                        Entre para acessar a loja.
                    </p>
                </div>

                {/* Formulário */}
                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="ml-1 text-base font-medium text-gray-700"
                        >
                            E-mail
                        </label>

                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="maria@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
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
                            required
                            type="password"
                            id="senha"
                            name="senha_hash"
                            value={form.senha_hash}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold mt-2 hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-70"
                    >
                        {loading ? "Acessando..." : "Acessar"}
                    </button>
                </form>

                {/* Cadastro */}
                <div className="text-center mt-4 text-base text-gray-600">
                    Não tem uma conta?{" "}
                    <Link
                        href="/Cadastro"
                        className="text-teal-600 font-semibold hover:underline"
                    >
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </main>
    );
}
