export class CupomFiscal {
  constructor(
    public storeName: string,
    public totalValue: number,
    public tributes: number,
    public purchaseDate: Date
  ) {}

  get valorTotalFormatado(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.totalValue);
  }

  /**
   * Formata o valor dos impostos para a moeda local (BRL).
   */
  get valorImpostosFormatados(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.tributes);
  }
}