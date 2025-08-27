'use client';

import React from 'react';
import { usePortfolio } from './hooks/usePortfolio';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingState } from './components/LoadingSpinner';
import { PortfolioHeader } from './components/PortfolioHeader';
import { ResponsiveView } from './components/ResponsiveView';
import { AlertTriangle } from 'lucide-react';

export default function Home() {
  const {
    stocks,
    sectorSummaries,
    portfolioSummary,
    isLoading,
    error,
    lastUpdated,
    isUpdating,
    refreshData,
  } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingState message="Loading your portfolio dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertTriangle className="w-16 h-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Portfolio
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioSummary) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingState message="Preparing portfolio data..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <PortfolioHeader
          summary={portfolioSummary}
          isUpdating={isUpdating}
          lastUpdated={lastUpdated}
          onRefresh={refreshData}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ResponsiveView 
            stocks={stocks} 
            sectorSummaries={sectorSummaries}
          />
          
          {/* Auto-update indicator */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Portfolio updates automatically every 15 seconds
              {isUpdating && (
                <span className="ml-2 inline-flex items-center">
                  <span className="animate-pulse text-primary-600">●</span>
                  <span className="ml-1">Updating...</span>
                </span>
              )}
            </p>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}