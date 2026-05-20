import { Link } from "@tanstack/react-router";
import { Button } from "../Button";

export function LoginForm() {
    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172b]/50 p-8 backdrop-blur-sm">
            <div className="mb-8 text-left">
                <h2 className="text-3xl font-bold text-white">Entrar</h2>
                <p className="mt-2 text-[#90a1b9]">
                    Acesse sua conta para gerenciar seus cupons.
                </p>
            </div>

            <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="voce@email.com"
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="pass" className="block text-sm font-medium text-white">
                            Senha
                        </label>
                        <a href="#" className="text-xs text-white hover:underline">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <input
                        type="password"
                        id="pass"
                        placeholder="Sua senha"
                        className="w-full rounded-xl border border-white/10 bg-[#020618] px-4 py-3 text-white placeholder-[#475569] outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/20"
                    />
                </div>

                <div className="pt-2">
                    <Button variant="primary" size="md" className="w-full justify-center">
                        Entrar
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#90a1b9]">
                Não tem uma conta?{" "}
                <Link to="/auth/register" className="font-medium text-white hover:underline">
                    Criar conta
                </Link>
            </div>
        </div>
    );
}
