import Head from 'next/head';
import { useState, useEffect } from 'react';

const CATEGORIES = [
  { value: 'general',  label: 'General'  },
  { value: 'forex',    label: 'Forex'    },
  { value: 'crypto',   label: 'Crypto'   },
  { value: 'merger',   label: 'M&A'      },
];

const ago = (ts) => {
  const s = Math.floor(Date.now() / 1000 - ts);
  if (s < 3600)  return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
};

export default function NewsPage() {
  const [cat,     setCat]     = useState('general');
  const [news,    setNews]    = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/market-news?category=${cat}`)
      .then(r => r.json())
      .then(d => setNews(Array.isArray(d) ? d : []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <>
      <Head><title>Market News — StockPulse</title></Head>
      <div className="min-h-screen pb-10" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-6">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-syne font-extrabold text-2xl" style={{ color: 'var(--c-ink)' }}>
                Market News
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--c-muted)' }}>Latest financial headlines</p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--c-surface)' }}>
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCat(c.value)}
                  className="px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all"
                  style={{
                    background: cat === c.value ? 'var(--c-accent)' : 'transparent',
                    color: cat === c.value ? '#000' : 'var(--c-muted)',
                  }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-t-accent animate-spin" style={{ borderColor: 'var(--c-border)', borderTopColor: 'var(--c-accent)' }} />
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {news.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border overflow-hidden hover:-translate-y-0.5 transition-all duration-150"
                  style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
                  {item.image && (
                    <img src={item.image} alt="" className="w-full h-36 object-cover" onError={e => e.target.style.display='none'} />
                  )}
                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-accent2)' }}>{item.source}</span>
                      <span className="text-[10px]" style={{ color: 'var(--c-muted)' }}>{ago(item.datetime)}</span>
                    </div>
                    <p className="text-sm font-semibold leading-snug line-clamp-3 flex-1" style={{ color: 'var(--c-ink)' }}>
                      {item.headline}
                    </p>
                    {item.summary && (
                      <p className="text-xs mt-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                        {item.summary}
                      </p>
                    )}
                    <div className="mt-3 text-[11px] font-semibold group-hover:underline" style={{ color: 'var(--c-accent)' }}>
                      Read more →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          {!loading && news.length === 0 && (
            <div className="text-center py-20" style={{ color: 'var(--c-muted)' }}>No news found.</div>
          )}
        </div>
      </div>
    </>
  );
}
