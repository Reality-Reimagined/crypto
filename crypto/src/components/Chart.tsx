import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time } from 'lightweight-charts';

interface ChartProps {
  data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  indicators?: {
    name: string;
    data: { time: number; value: number }[];
    color: string;
  }[];
}

export function Chart({ data, indicators }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<IChartApi | null>(null);
  const [candlestickSeries, setCandlestickSeries] = useState<ISeriesApi<"Candlestick"> | null>(null);
  const [indicatorSeries, setIndicatorSeries] = useState<ISeriesApi<"Line">[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#C3BCDB44',
          style: 0,
        },
        horzLine: {
          width: 1,
          color: '#C3BCDB44',
          style: 0,
        },
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    setChartInstance(chart);
    setCandlestickSeries(series);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (candlestickSeries && data) {
      candlestickSeries.setData(data);
    }
  }, [candlestickSeries, data]);

  useEffect(() => {
    if (!chartInstance || !indicators) return;

    // Clear existing indicator series
    indicatorSeries.forEach(series => chartInstance.removeSeries(series));
    
    // Add new indicator series
    const newSeries = indicators.map(indicator => {
      const series = chartInstance.addLineSeries({
        color: indicator.color,
        lineWidth: 2,
      });
      series.setData(indicator.data);
      return series;
    });

    setIndicatorSeries(newSeries);

    return () => {
      newSeries.forEach(series => chartInstance?.removeSeries(series));
    };
  }, [chartInstance, indicators]);

  return <div ref={chartContainerRef} />;
}