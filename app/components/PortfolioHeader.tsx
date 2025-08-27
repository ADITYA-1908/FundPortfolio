import React from 'react';
import { TrendingUp, RefreshCw, Clock } from 'lucide-react';
import { PortfolioSummary } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface PortfolioHeaderProps {
  summary: PortfolioSummary;
  isUpdating: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  summary,
  isUpdating,
  lastUpdated,
  onRefresh,
}) => {
  const isGain = summary.totalGainLoss >= 0;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title and Summary */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500">Total Investment</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(summary.totalInvestment)}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500">Present Value</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(summary.totalPresentValue)}
                </p>
              </div>
              
              <div className={`rounded-lg p-4 ${isGain ? 'bg-success-50' : 'bg-error-50'}`}>
                <p className="text-sm font-medium text-gray-500">Total Gain/Loss</p>
                <p className={`text-xl font-bold ${isGain ? 'text-success-600' : 'text-error-600'}`}>
                  {formatCurrency(summary.totalGainLoss)}
                </p>
                <p className={`text-sm ${isGain ? 'text-success-600' : 'text-error-600'}`}>
                  {formatPercentage(summary.totalGainLossPercentage)}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500">Total Stocks</p>
                <p className="text-xl font-bold text-gray-900">{summary.totalStocks}</p>
              </div>
            </div>
          </div>

          {/* Actions and Status */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={onRefresh}
              disabled={isUpdating}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            
            {isUpdating && (
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                Updating prices...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};