import React, { useState } from 'react';
import { Grid, Table, BarChart3 } from 'lucide-react';
import { Stock, SectorSummary } from '../types/portfolio';
import { PortfolioTable } from './PortfolioTable';
import { MobileCard } from './MobileCard';
import { SectorSummary as SectorSummaryComponent } from './SectorSummary';

interface ResponsiveViewProps {
  stocks: Stock[];
  sectorSummaries: SectorSummary[];
}

type ViewMode = 'table' | 'cards' | 'sectors';

export const ResponsiveView: React.FC<ResponsiveViewProps> = ({ 
  stocks, 
  sectorSummaries 
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const ViewToggle = () => (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      <button
        onClick={() => setViewMode('table')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'table'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Table className="w-4 h-4" />
        <span className="hidden sm:inline">Table</span>
      </button>
      <button
        onClick={() => setViewMode('cards')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'cards'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span className="hidden sm:inline">Cards</span>
      </button>
      <button
        onClick={() => setViewMode('sectors')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'sectors'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <BarChart3 className="w-4 h-4" />
        <span className="hidden sm:inline">Sectors</span>
      </button>
    </div>
  );

  return (
    <div>
      <ViewToggle />
      
      {viewMode === 'table' && (
        <div className="hidden md:block">
          <PortfolioTable stocks={stocks} />
        </div>
      )}
      
      {(viewMode === 'cards' || (viewMode === 'table' && window.innerWidth < 768)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.map((stock) => (
            <MobileCard key={stock.id} stock={stock} />
          ))}
        </div>
      )}
      
      {viewMode === 'sectors' && (
        <SectorSummaryComponent sectorSummaries={sectorSummaries} />
      )}
      
      {/* Show table on mobile when in table mode */}
      {viewMode === 'table' && (
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-4">
            {stocks.map((stock) => (
              <MobileCard key={stock.id} stock={stock} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};