import { useState, useEffect, useCallback } from 'react';
import { Stock, SectorSummary, PortfolioSummary } from '../types/portfolio';
import { mockStocks, getRandomPriceChange, simulateApiDelay } from '../utils/mockData';
import { 
  calculateStockMetrics, 
  calculatePortfolioPercentages, 
  groupStocksBySector, 
  calculatePortfolioSummary 
} from '../utils/calculations';

export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sectorSummaries, setSectorSummaries] = useState<SectorSummary[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStockPrices = useCallback(async () => {
    try {
      setIsUpdating(true);
      await simulateApiDelay(300);

      setStocks(prevStocks => {
        const updatedStocks = prevStocks.map(stock => {
          const newCmp = getRandomPriceChange(stock.cmp);
          const updatedStock = calculateStockMetrics({
            ...stock,
            cmp: newCmp,
            lastUpdated: new Date(),
          });
          return updatedStock;
        });

        const stocksWithPercentages = calculatePortfolioPercentages(updatedStocks);
        const sectors = groupStocksBySector(stocksWithPercentages);
        const summary = calculatePortfolioSummary(stocksWithPercentages);

        setSectorSummaries(sectors);
        setPortfolioSummary(summary);
        setLastUpdated(new Date());
        
        return stocksWithPercentages;
      });

      setError(null);
    } catch (err) {
      setError('Failed to update stock prices. Please try again.');
      console.error('Error updating stock prices:', err);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const initializePortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await simulateApiDelay(800);

      const processedStocks = mockStocks.map(stock => calculateStockMetrics(stock));
      const stocksWithPercentages = calculatePortfolioPercentages(processedStocks);
      const sectors = groupStocksBySector(stocksWithPercentages);
      const summary = calculatePortfolioSummary(stocksWithPercentages);

      setStocks(stocksWithPercentages);
      setSectorSummaries(sectors);
      setPortfolioSummary(summary);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load portfolio data. Please refresh the page.');
      console.error('Error initializing portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializePortfolio();
  }, [initializePortfolio]);

  useEffect(() => {
    if (stocks.length === 0) return;

    const interval = setInterval(updateStockPrices, 15000);
    return () => clearInterval(interval);
  }, [stocks.length, updateStockPrices]);

  const refreshData = useCallback(() => {
    updateStockPrices();
  }, [updateStockPrices]);

  return {
    stocks,
    sectorSummaries,
    portfolioSummary,
    isLoading,
    error,
    lastUpdated,
    isUpdating,
    refreshData,
  };
};