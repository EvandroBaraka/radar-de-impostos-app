import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../Button";
import { useState } from "react";
import { registerUser } from "../../services/auth";

export function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await registerUser(email, password, name);
            // Sucesso! Poderia mostrar uma mensagem ou redirecionar direto
            alert("Cadastro realizado com sucesso!");
            navigate({ to: "/auth/login" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Ocorreu um erro ao cadastrar.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172b]/50 p-8 backdrop-blur-sm">
            <div className="mb-8 text-left">
                <h2 className="text-3xl font-bold text-white">Criar conta</h2>
                <p className="mt-2 text-[#90a1b9]">
                    É grátis e leva menos de um minuto.
                </p>
            </div>

            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@email.com"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div>
                    <label htmlFor="pass" className="block text-sm font-medium text-white mb-2">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo de 6 caracteres"
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div className="pt-2">
                    <Button 
                        variant="primary" 
                        size="md" 
                        classes="w-full justify-center"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>

                </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#90a1b9]">
                Já tem conta?{" "}
                <Link to="/auth/login" className="font-medium text-white hover:underline">
                    Entrar
                </Link>
            </div>
        </div>
    );
}
