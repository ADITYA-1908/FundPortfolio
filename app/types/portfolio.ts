export interface Stock {
  id: string;
  particulars: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: 'NSE' | 'BSE';
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  peRatio: number;
  latestEarnings: string;
  sector: string;
  lastUpdated: Date;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  stocks: Stock[];
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  totalStocks: number;
  lastUpdated: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}