/**
 * Realiza o login do usuário na API
 */
export async function loginUser(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar login");
    }

    return data; // Retorna { token: "..." }
}
