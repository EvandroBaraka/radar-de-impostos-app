export const fetchNFCe = async (url: string) => {
    console.log("Buscando NFC-e pela url:", url);
    const response = await fetch(`/api/nfce?url=${url}`);

    console.log("Resposta da API:", response);
    if (!response.ok) {
        const body = await response.text();
        throw new Error(
            `Erro ao buscar NFC-e: ${response.status} ${response.statusText} - ${body}`,
        );
    }

    const data = await response.json();
    return data ?? "";
};
