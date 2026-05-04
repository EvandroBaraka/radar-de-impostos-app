import "./App.css";
import { fetchNFCe } from "./services/fetch-nfce";
import { useState } from "react";
import { QrScanner } from "./components/QrScanner";
import { CupomFiscal } from "./models/CupomFiscal";


function App() {
    const [cupom, setCupom] = useState<CupomFiscal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showScanner, setShowScanner] = useState<boolean>(false);

    const fetchData = async (param: string) => {
        try {
            setError(null);
            const data = await fetchNFCe(param);
            console.log("Dados da NFC-e:", data);
            
            // Criando instância com dados atuais (impostos) e placeholders
            const novoCupom = new CupomFiscal(
                data.storeName || "Loja Desconcida",
                data.totalValue || 0,
                data.tributes || 0,
                data.purchaseDate ? new Date(data.purchaseDate) : new Date()
            );
            
            setCupom(novoCupom);
        } catch (err) {
            console.error(err);
            setError(
                "Erro ao buscar NFC-e. Veja o console para mais detalhes.",
            );
        }
    };

    const handleScan = (qrCodeData: string) => {
        // Extrair o parâmetro p da URL do QR code
        try {
            const url = new URL(qrCodeData);
            const p = url.searchParams.get("p");
            if (p) {
                fetchData(p);
                setShowScanner(false);
            } else {
                setError("QR Code não contém parâmetro NFC-e válido");
            }
        } catch (err) {
            setError(
                "QR Code não é uma URL válida - " + (err as Error).message,
            );
        }
    };

    const handleScanError = (error: string) => {
        setError(`Erro no scanner: ${error}`);
    };

    return (
        <>
            <h1>Meu Imposto App</h1>
            <h2>Tributos pagos nesta compra:</h2>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <p>{cupom ?
                    cupom.storeName + " - " + 
                    cupom.purchaseDate.toLocaleDateString() + 
                    " - Valor Total: R$ " + cupom.valorTotalFormatado + 
                    " - Impostos: R$ " + cupom.valorImpostosFormatados : "Aguardando leitura..."}</p>
            )}

            <div style={{ margin: "20px 0" }}>
                <button
                    onClick={() => setShowScanner(!showScanner)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: showScanner ? "#dc3545" : "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                >
                    {showScanner ? "Fechar Scanner" : "Escanear QR Code"}
                </button>
            </div>

            {showScanner && (
                <QrScanner onScan={handleScan} onError={handleScanError} />
            )}

        </>
    );
}

export default App;
