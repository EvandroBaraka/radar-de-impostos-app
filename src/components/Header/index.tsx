import { Link } from "@tanstack/react-router";
import { Button } from "../Button";
import { Logo } from "../Logo";

export const Header = () => {
    return (
        <header className="mx-auto flex justify-between items-center max-w-6xl w-full p-6">
            <Link to="/">
                <Logo />
            </Link>

            <div className="flex items-center gap-2">
                <Link to="/auth/login">
                    <Button variant="secondary" size="sm">
                        Entrar
                    </Button>
                </Link>
                <Link to="/auth/register">
                    <Button variant="primary" size="sm">
                        Cadastrar
                    </Button>
                </Link>
            </div>
        </header>
    );
}