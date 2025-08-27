import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { Stock } from '../types/portfolio';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/calculations';

interface PortfolioTableProps {
  stocks: Stock[];
}

type SortKey = keyof Stock;
type SortDirection = 'asc' | 'desc';

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ stocks }) => {
  const [sortKey, setSortKey] = useState<SortKey>('gainLossPercentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      return 0;
    });
  }, [stocks, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary-600" />
      : <ChevronDown className="w-4 h-4 text-primary-600" />;
  };

  const TableHeader = ({ 
    children, 
    column, 
    className = '' 
  }: { 
    children: React.ReactNode; 
    column: SortKey; 
    className?: string; 
  }) => (
    <th 
      className={`table-header cursor-pointer hover:bg-gray-100 select-none ${className}`}
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center justify-between">
        {children}
        <SortIcon column={column} />
      </div>
    </th>
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader column="particulars" className="text-left">
                Stock Name
              </TableHeader>
              <TableHeader column="purchasePrice" className="text-right">
                Purchase Price
              </TableHeader>
              <TableHeader column="quantity" className="text-right">
                Quantity
              </TableHeader>
              <TableHeader column="investment" className="text-right">
                Investment
              </TableHeader>
              <TableHeader column="portfolioPercentage" className="text-right">
                Portfolio %
              </TableHeader>
              <TableHeader column="exchange" className="text-center">
                Exchange
              </TableHeader>
              <TableHeader column="cmp" className="text-right">
                CMP
              </TableHeader>
              <TableHeader column="presentValue" className="text-right">
                Present Value
              </TableHeader>
              <TableHeader column="gainLoss" className="text-right">
                Gain/Loss
              </TableHeader>
              <TableHeader column="peRatio" className="text-right">
                P/E Ratio
              </TableHeader>
              <TableHeader column="latestEarnings" className="text-left hidden lg:table-cell">
                Latest Earnings
              </TableHeader>
              <TableHeader column="sector" className="text-left hidden xl:table-cell">
                Sector
              </TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStocks.map((stock) => {
              const isGain = stock.gainLoss >= 0;
              return (
                <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">
                    <div>
                      <div className="font-semibold">{stock.particulars}</div>
                      <div className="text-sm text-gray-500">{stock.symbol}</div>
                    </div>
                  </td>
                  <td className="table-cell text-right text-gray-700">
                    {formatCurrency(stock.purchasePrice)}
                  </td>
                  <td className="table-cell text-right text-gray-700">
                    {formatNumber(stock.quantity)}
                  </td>
                  <td className="table-cell text-right font-medium text-gray-900">
                    {formatCurrency(stock.investment)}
                  </td>
                  <td className="table-cell text-right text-gray-700">
                    {stock.portfolioPercentage.toFixed(1)}%
                  </td>
                  <td className="table-cell text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {stock.exchange}
                    </span>
                  </td>
                  <td className="table-cell text-right font-medium text-gray-900">
                    {formatCurrency(stock.cmp)}
                  </td>
                  <td className="table-cell text-right font-medium text-gray-900">
                    {formatCurrency(stock.presentValue)}
                  </td>
                  <td className="table-cell text-right">
                    <div className={`inline-flex flex-col items-end px-2 py-1 rounded text-sm font-medium ${
                      isGain ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
                    }`}>
                      <span>{formatCurrency(stock.gainLoss)}</span>
                      <span className="text-xs">
                        {formatPercentage(stock.gainLossPercentage)}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell text-right text-gray-700">
                    {stock.peRatio.toFixed(1)}
                  </td>
                  <td className="table-cell text-gray-600 hidden lg:table-cell">
                    {stock.latestEarnings}
                  </td>
                  <td className="table-cell hidden xl:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {stock.sector}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};