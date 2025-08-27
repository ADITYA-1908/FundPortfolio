import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SectorSummary as SectorSummaryType } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface SectorSummaryProps {
  sectorSummaries: SectorSummaryType[];
}

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
];

export const SectorSummary: React.FC<SectorSummaryProps> = ({ sectorSummaries }) => {
  const pieData = sectorSummaries.map((sector, index) => ({
    name: sector.sector,
    value: sector.totalInvestment,
    presentValue: sector.totalPresentValue,
    gainLoss: sector.gainLoss,
    gainLossPercentage: sector.gainLossPercentage,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isGain = data.gainLoss >= 0;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            Investment: <span className="font-medium">{formatCurrency(data.value)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Present Value: <span className="font-medium">{formatCurrency(data.presentValue)}</span>
          </p>
          <p className={`text-sm font-medium ${isGain ? 'text-success-600' : 'text-error-600'}`}>
            {formatCurrency(data.gainLoss)} ({formatPercentage(data.gainLossPercentage)})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sector-wise Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Summary Cards */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {sectorSummaries.map((sector, index) => {
            const isGain = sector.gainLoss >= 0;
            const sectorColor = COLORS[index % COLORS.length];
            
            return (
              <div key={sector.sector} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: sectorColor }}
                    ></div>
                    <h3 className="font-semibold text-gray-900">{sector.sector}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {sector.stocks.length} stock{sector.stocks.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Investment</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sector.totalInvestment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Present Value</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sector.totalPresentValue)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Gain/Loss</span>
                    <div className={`text-sm font-medium ${isGain ? 'text-success-600' : 'text-error-600'}`}>
                      {formatCurrency(sector.gainLoss)} ({formatPercentage(sector.gainLossPercentage)})
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};