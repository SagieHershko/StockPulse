import { useEffect, useRef } from 'react';

/**
 * Embeds the TradingView Advanced Chart widget.
 * Clicking the chart opens the full TradingView platform in a new tab.
 */
export default function TradingViewChart({ symbol, interval = 'D' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !symbol) return;

    // Clear any previous widget
    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#111118',
      gridColor: 'rgba(255,255,255,0.04)',
      allow_symbol_change: false,
      calendar: false,
      hide_top_toolbar: false,
      hide_legend: false,
      support_host: 'https://www.tradingview.com',
    });

    wrapper.appendChild(widgetDiv);
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [symbol, interval]);

  return (
    <div className="relative group" style={{ height: 420 }}>
      <div ref={containerRef} className="w-full h-full" />

      {/* Click overlay → opens full TradingView */}
      <a
        href={`https://www.tradingview.com/chart/?symbol=${symbol}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          absolute bottom-10 right-4 z-10
          flex items-center gap-2 px-3 py-1.5
          bg-surface2/90 backdrop-blur-sm
          border border-white/10 rounded-lg
          text-accent text-xs font-bold
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        "
      >
        <span>↗</span> Open in TradingView
      </a>
    </div>
  );
}
