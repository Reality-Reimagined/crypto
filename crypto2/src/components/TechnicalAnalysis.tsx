import React from 'react';
import { cn } from '../lib/utils';
import { LineChart, TrendingUp, Activity } from 'lucide-react';

interface IndicatorProps {
  name: string;
  enabled: boolean;
  onToggle: () => void;
}

const Indicator = ({ name, enabled, onToggle }: IndicatorProps) => (
  <button
    onClick={onToggle}
    className={cn(
      "flex items-center p-2 rounded-lg w-full",
      enabled ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
    )}
  >
    <Activity className="w-4 h-4 mr-2" />
    <span>{name}</span>
  </button>
);

interface TechnicalAnalysisProps {
  onIndicatorToggle: (indicator: string) => void;
  enabledIndicators: Set<string>;
}

export function TechnicalAnalysis({ onIndicatorToggle, enabledIndicators }: TechnicalAnalysisProps) {
  const indicators = [
    { name: 'RSI', description: 'Relative Strength Index' },
    { name: 'MACD', description: 'Moving Average Convergence Divergence' },
    { name: 'BB', description: 'Bollinger Bands' },
    { name: 'EMA', description: 'Exponential Moving Average' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {indicators.map(indicator => (
          <Indicator
            key={indicator.name}
            name={indicator.name}
            enabled={enabledIndicators.has(indicator.name)}
            onToggle={() => onIndicatorToggle(indicator.name)}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Active Indicators</h4>
        <div className="space-y-2">
          {Array.from(enabledIndicators).map(indicator => (
            <div key={indicator} className="bg-blue-50 text-blue-600 p-2 rounded-lg">
              {indicator}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}