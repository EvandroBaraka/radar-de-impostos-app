import "./App.css";
import { fetchNFCe } from "./services/fetch-nfce";
import { useState } from "react";
import QrScanner from "./components/QrScanner";
import { CupomFiscal } from "./models/CupomFiscal";
import Loader from "./components/Loader";
import { parseDateBR } from "./utils/date-utils";

function App() {
    const [cupom, setCupom] = useState<CupomFiscal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showScanner, setShowScanner] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async (url: string) => {
        try {
            setError(null);
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token não encontrado");
                return;
            }
            const data = await fetchNFCe(url, token);
            console.log("Dados da NFC-e:", data);

            // Criando instância com dados atuais (impostos) e placeholders
            const novoCupom = new CupomFiscal(
                data.storeName || "Loja Desconcida",
                data.cnpj || null,
                data.totalValue || 0,
                data.tributes || 0,
                data.purchaseDate ? parseDateBR(data.purchaseDate) : new Date(),
                data.acessKey || undefined,
            );
            console.log("Data.purchaseDate:", data.purchaseDate);
            console.log("Novo cupom criado:", novoCupom);

            setCupom(novoCupom);
        } catch (err) {
            console.error(err);
            setError(
                "Erro ao buscar NFC-e. Veja o console para mais detalhes.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleScan = (qrCodeData: string) => {
        // Extrair o parâmetro p da URL do QR code
        try {
            if (qrCodeData.startsWith("http")) {
                fetchData(qrCodeData);
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
            {isLoading && <Loader />}

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <p>
                    {cupom
                        ? cupom.storeName +
                          " - " +
                          cupom.purchaseDate.toLocaleDateString() +
                          " - Valor Total: R$ " +
                          cupom.valorTotalFormatado +
                          " - Impostos aproximados: R$ " +
                          cupom.valorImpostosFormatados +
                          " - Chave de Acesso: " +
                          cupom.nfeKey
                        : "Aguardando leitura..."}
                </p>
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
