import React from 'react';
import { Stock } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MobileCardProps {
  stock: Stock;
}

export const MobileCard: React.FC<MobileCardProps> = ({ stock }) => {
  const isGain = stock.gainLoss >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {stock.particulars}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{stock.symbol}</p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {stock.exchange}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {stock.sector}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Purchase Price</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(stock.purchasePrice)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Price</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(stock.cmp)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="text-sm font-medium text-gray-900">
            {stock.quantity.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">P/E Ratio</p>
          <p className="text-sm font-medium text-gray-900">
            {stock.peRatio.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Investment</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(stock.investment)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Present Value</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(stock.presentValue)}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-between p-3 rounded-lg ${
        isGain ? 'bg-success-50' : 'bg-error-50'
      }`}>
        <div className="flex items-center gap-2">
          {isGain ? (
            <TrendingUp className="w-4 h-4 text-success-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-error-600" />
          )}
          <span className="text-sm font-medium text-gray-700">Gain/Loss</span>
        </div>
        <div className={`text-right ${isGain ? 'text-success-700' : 'text-error-700'}`}>
          <p className="text-sm font-semibold">
            {formatCurrency(stock.gainLoss)}
          </p>
          <p className="text-xs">
            {formatPercentage(stock.gainLossPercentage)}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">Latest Earnings</p>
        <p className="text-xs text-gray-700 mt-1">{stock.latestEarnings}</p>
      </div>
    </div>
  );
};