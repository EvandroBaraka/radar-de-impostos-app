import { Outlet, createFileRoute } from "@tanstack/react-router";
import bgImage from "../../assets/impostos-bg.jpg";
import { Logo } from "../../components/Logo";

export const Route = createFileRoute("/auth")({
    component: AuthLayout,
});

function AuthLayout() {
    return (
        <div className="relative min-h-screen flex flex-col items-center bg-[#020618] text-white">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-8 pointer-events-none"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
            {/* Content */}
            <div className="relative z-10 w-full h-screen flex flex-col justify-center items-center gap-8">
                <Logo />
                <Outlet />
            </div>
        </div>
    );
}
