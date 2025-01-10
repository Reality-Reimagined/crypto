// components/dex/PriceChart.tsx
import { useEffect, useRef } from 'react';
import { widget } from '@tradingview/charting_library';

export function PriceChart({ pair }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!pair) return;

    const tvWidget = new widget({
      container: containerRef.current,
      symbol: pair.address,
      interval: '15',
      library_path: '/charting_library/',
      theme: 'Dark'
    });

    return () => tvWidget.remove();
  }, [pair]);

  return <div ref={containerRef} className="h-[400px]" />;
}
