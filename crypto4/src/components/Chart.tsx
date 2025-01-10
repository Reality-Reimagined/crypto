import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time, CrosshairMode } from 'lightweight-charts';

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
    overlay?: boolean;
  }[];
}

export function Chart({ data, indicators }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const indicatorSeriesRef = useRef<ISeriesApi<"Line">[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

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
        mode: CrosshairMode.Normal,
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
      rightPriceScale: {
        borderColor: '#f0f0f0',
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
        indicatorSeriesRef.current = [];
      }
    };
  }, []);

  // Update candlestick data
  useEffect(() => {
    if (candlestickSeriesRef.current && data) {
      candlestickSeriesRef.current.setData(data);
    }
  }, [data]);

  // Update indicators
  useEffect(() => {
    if (!chartRef.current || !indicators) return;

    // Clear existing indicator series
    indicatorSeriesRef.current.forEach(series => {
      if (chartRef.current) {
        chartRef.current.removeSeries(series);
      }
    });
    indicatorSeriesRef.current = [];
    
    // Create separate price scales for non-overlay indicators
    const newSeries = indicators.map(indicator => {
      if (!chartRef.current) return null;

      const series = chartRef.current.addLineSeries({
        color: indicator.color,
        lineWidth: 2,
        priceFormat: {
          type: 'price',
          precision: 2,
          minMove: 0.01,
        },
        ...(indicator.overlay ? {} : {
          priceScale: {
            position: 'right',
            mode: 1,
            autoScale: true,
            scaleMargins: {
              top: 0.1,
              bottom: 0.1,
            },
          },
        }),
      });

      series.setData(indicator.data);
      return series;
    });

    indicatorSeriesRef.current = newSeries.filter((series): series is ISeriesApi<"Line"> => series !== null);

    return () => {
      if (chartRef.current) {
        indicatorSeriesRef.current.forEach(series => {
          chartRef.current?.removeSeries(series);
        });
        indicatorSeriesRef.current = [];
      }
    };
  }, [indicators]);

  return <div ref={chartContainerRef} />;
}