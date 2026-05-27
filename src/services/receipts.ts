import { CupomFiscal } from "../models/CupomFiscal";

export const saveReceipt = async (cupom: CupomFiscal, token: string) => {
    console.log("Salvando cupom:", cupom);
    
    const response = await fetch("http://localhost:3000/api/receipts/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            storeName: cupom.storeName,
            cnpj: cupom.cnpj,
            category: cupom.category,
            totalValue: cupom.totalValue,
            tributes: cupom.tributes,
            purchaseDate: cupom.purchaseDate.toISOString().split('T')[0], // Envia apenas YYYY-MM-DD
            nfeKey: cupom.nfeKey,
        }),
    });

    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao salvar cupom");
        } catch (e: any) {
            if (e.message && !e.message.includes("Unexpected token")) {
                throw e;
            }
            throw new Error(`Erro ao salvar cupom: ${response.status} ${response.statusText}`);
        }
    }

    const data = await response.json();
    return data;
};
