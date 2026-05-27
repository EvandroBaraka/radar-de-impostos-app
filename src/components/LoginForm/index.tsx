import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../Button";
import { loginUser } from "../../services/auth";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e?: React.SubmitEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const token = await loginUser(email, password);

            // Salva o token localmente para autenticar as próximas requisições
            localStorage.setItem("token", token);

            // Redireciona o usuário para o dashboard após login bem sucedido
            navigate({ to: "/dashboard" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172b]/50 p-8 backdrop-blur-sm">
            <div className="mb-8 text-left">
                <h2 className="text-3xl font-bold text-white">Entrar</h2>
                <p className="mt-2 text-[#90a1b9]">
                    Acesse sua conta para visualizar seus cupons.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <form className="space-y-6 text-left" onSubmit={handleLogin}>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white mb-2"
                    >
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
                    <label
                        htmlFor="pass"
                        className="block text-sm font-medium text-white mb-2"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div className="pt-2">
                    <Button
                        variant="primary"
                        size="md"
                        classes="w-full justify-center"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#90a1b9]">
                Não tem uma conta?{" "}
                <Link
                    to="/auth/register"
                    className="font-medium text-white hover:underline"
                >
                    Criar conta
                </Link>
            </div>
        </div>
    );
}
