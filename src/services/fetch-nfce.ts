export const fetchNFCe = async (query: string) => {
    const params = new URLSearchParams({ p: query });
    const response = await fetch(`/api/nfce?${params.toString()}`);

    if (!response.ok) {
        const body = await response.text();
        throw new Error(
            `Erro ao buscar NFC-e: ${response.status} ${response.statusText} - ${body}`,
        );
    }

    const data = await response.json();
    return data ?? "";
};
