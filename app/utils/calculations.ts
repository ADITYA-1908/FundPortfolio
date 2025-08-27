import { Stock, SectorSummary, PortfolioSummary } from '../types/portfolio';

export const calculateStockMetrics = (stock: Omit<Stock, 'presentValue' | 'gainLoss' | 'gainLossPercentage'>): Stock => {
  const presentValue = stock.cmp * stock.quantity;
  const gainLoss = presentValue - stock.investment;
  const gainLossPercentage = (gainLoss / stock.investment) * 100;

  return {
    ...stock,
    presentValue: Math.round(presentValue * 100) / 100,
    gainLoss: Math.round(gainLoss * 100) / 100,
    gainLossPercentage: Math.round(gainLossPercentage * 100) / 100,
  };
};

export const calculatePortfolioPercentages = (stocks: Stock[]): Stock[] => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  
  return stocks.map(stock => ({
    ...stock,
    portfolioPercentage: Math.round((stock.investment / totalInvestment) * 10000) / 100,
  }));
};

export const groupStocksBySector = (stocks: Stock[]): SectorSummary[] => {
  const sectorMap = new Map<string, Stock[]>();
  
  stocks.forEach(stock => {
    if (!sectorMap.has(stock.sector)) {
      sectorMap.set(stock.sector, []);
    }
    sectorMap.get(stock.sector)!.push(stock);
  });

  return Array.from(sectorMap.entries()).map(([sector, sectorStocks]) => {
    const totalInvestment = sectorStocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const gainLoss = totalPresentValue - totalInvestment;
    const gainLossPercentage = (gainLoss / totalInvestment) * 100;

    return {
      sector,
      totalInvestment: Math.round(totalInvestment * 100) / 100,
      totalPresentValue: Math.round(totalPresentValue * 100) / 100,
      gainLoss: Math.round(gainLoss * 100) / 100,
      gainLossPercentage: Math.round(gainLossPercentage * 100) / 100,
      stocks: sectorStocks,
    };
  });
};

export const calculatePortfolioSummary = (stocks: Stock[]): PortfolioSummary => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercentage = (totalGainLoss / totalInvestment) * 100;

  return {
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    totalPresentValue: Math.round(totalPresentValue * 100) / 100,
    totalGainLoss: Math.round(totalGainLoss * 100) / 100,
    totalGainLossPercentage: Math.round(totalGainLossPercentage * 100) / 100,
    totalStocks: stocks.length,
    lastUpdated: new Date(),
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};