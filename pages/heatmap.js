import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const GROUPINGS = ['sector','dividends','country'];
const SOURCES   = [
  { label: 'S&P 500',    value: 'SPX500'    },
  { label: 'NASDAQ 100', value: 'NASDAQ100' },
  { label: 'All US',     value: 'AllUSA'    },
  { label: 'Crypto',     value: 'Crypto'    },
];

function HeatmapWidget({ source, grouping }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'tradingview-widget-container';
    wrap.style.cssText = 'width:100%;height:100%';
    const inner = document.createElement('div');
    inner.className = 'tradingview-widget-container__widget';
    inner.style.cssText = 'width:100%;height:calc(100% - 32px)';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      exchanges: [], dataSource: source, grouping: grouping,
      blockSize: 'market_cap_basic', blockColor: 'change',
      locale: 'en', colorTheme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
      hasTopBar: false, isDataSetEnabled: false, isZoomEnabled: true,
      hasSymbolTooltip: true, isMonoSize: false, width: '100%', height: '100%',
    });
    wrap.appendChild(inner);
    wrap.appendChild(script);
    ref.current.appendChild(wrap);
  }, [source, grouping]);
  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
}

export default function HeatmapPage() {
  const [source,   setSource]   = useState('SPX500');
  const [grouping, setGrouping] = useState('sector');

  return (
    <>
      <Head><title>Heatmap — StockPulse</title></Head>
      <div className="min-h-screen pb-10" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-6">

          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="font-syne font-extrabold text-2xl" style={{ color: 'var(--c-ink)' }}>
                Market Heatmap
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--c-muted)' }}>
                Size = market cap · Color = % change today
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Data source tabs */}
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--c-surface)' }}>
                {SOURCES.map(s => (
                  <button key={s.value} onClick={() => setSource(s.value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-syne font-bold transition-all"
                    style={{
                      background: source === s.value ? 'var(--c-accent)' : 'transparent',
                      color: source === s.value ? '#000' : 'var(--c-muted)',
                    }}>
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Grouping tabs */}
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--c-surface)' }}>
                {GROUPINGS.map(g => (
                  <button key={g} onClick={() => setGrouping(g)}
                    className="px-3 py-1.5 rounded-lg text-xs font-syne font-bold capitalize transition-all"
                    style={{
                      background: grouping === g ? 'var(--c-surface2)' : 'transparent',
                      color: grouping === g ? 'var(--c-ink)' : 'var(--c-muted)',
                    }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="rounded-2xl overflow-hidden border" style={{ height: '75vh', borderColor: 'var(--c-border)' }}>
            <HeatmapWidget source={source} grouping={grouping} />
          </div>
        </div>
      </div>
    </>
  );
}
