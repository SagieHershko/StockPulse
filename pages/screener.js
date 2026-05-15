import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DEFAULT_TICKERS = ['AAPL','TSLA','NVDA','MSFT','AMZN','META','GOOGL','NFLX'];

const META = {
  AAPL:  { name:'Apple Inc.',             sector:'Technology',        industry:'Consumer Electronics',  country:'USA', mcap:3020, pe:29.5 },
  MSFT:  { name:'Microsoft Corp.',        sector:'Technology',        industry:'Software',              country:'USA', mcap:3150, pe:34.2 },
  NVDA:  { name:'NVIDIA Corp.',           sector:'Technology',        industry:'Semiconductors',        country:'USA', mcap:3210, pe:38.7 },
  TSLA:  { name:'Tesla Inc.',             sector:'Consumer Cyclical', industry:'Electric Vehicles',     country:'USA', mcap:790,  pe:58.1 },
  AMZN:  { name:'Amazon.com Inc.',        sector:'Consumer Cyclical', industry:'E-Commerce',            country:'USA', mcap:2100, pe:41.3 },
  META:  { name:'Meta Platforms',         sector:'Communication',     industry:'Social Media',          country:'USA', mcap:1380, pe:24.1 },
  GOOGL: { name:'Alphabet Inc.',          sector:'Communication',     industry:'Internet Services',     country:'USA', mcap:2190, pe:20.3 },
  NFLX:  { name:'Netflix Inc.',           sector:'Communication',     industry:'Streaming',             country:'USA', mcap:298,  pe:43.5 },
  AMD:   { name:'Advanced Micro Devices', sector:'Technology',        industry:'Semiconductors',        country:'USA', mcap:245,  pe:35.2 },
  PLTR:  { name:'Palantir Technologies',  sector:'Technology',        industry:'Software',              country:'USA', mcap:185,  pe:88.4 },
  COIN:  { name:'Coinbase Global',        sector:'Financial',         industry:'Crypto Exchange',       country:'USA', mcap:62,   pe:null },
  UBER:  { name:'Uber Technologies',      sector:'Technology',        industry:'Ride-Sharing',          country:'USA', mcap:155,  pe:null },
  ARM:   { name:'Arm Holdings',           sector:'Technology',        industry:'Semiconductors',        country:'GBR', mcap:130,  pe:null },
  SMCI:  { name:'Super Micro Computer',   sector:'Technology',        industry:'Server Hardware',       country:'USA', mcap:28,   pe:12.1 },
  V:     { name:'Visa Inc.',              sector:'Financial',         industry:'Credit Services',       country:'USA', mcap:558,  pe:28.4 },
  MA:    { name:'Mastercard Inc.',        sector:'Financial',         industry:'Credit Services',       country:'USA', mcap:465,  pe:35.1 },
  JPM:   { name:'JPMorgan Chase',         sector:'Financial',         industry:'Banking',               country:'USA', mcap:720,  pe:12.8 },
  BAC:   { name:'Bank of America',        sector:'Financial',         industry:'Banking',               country:'USA', mcap:312,  pe:13.2 },
  JNJ:   { name:'Johnson & Johnson',      sector:'Healthcare',        industry:'Pharmaceuticals',       country:'USA', mcap:380,  pe:15.4 },
  UNH:   { name:'UnitedHealth Group',     sector:'Healthcare',        industry:'Health Insurance',      country:'USA', mcap:485,  pe:18.7 },
  XOM:   { name:'Exxon Mobil Corp.',      sector:'Energy',            industry:'Oil & Gas',             country:'USA', mcap:490,  pe:13.9 },
  SOFI:  { name:'SoFi Technologies',      sector:'Financial',         industry:'Fintech',               country:'USA', mcap:8.5,  pe:null },
  MSTR:  { name:'MicroStrategy Inc.',     sector:'Technology',        industry:'Business Intelligence', country:'USA', mcap:85,   pe:null },
  HOOD:  { name:'Robinhood Markets',      sector:'Financial',         industry:'Fintech',               country:'USA', mcap:18,   pe:null },
  RIVN:  { name:'Rivian Automotive',      sector:'Consumer Cyclical', industry:'Electric Vehicles',     country:'USA', mcap:14,   pe:null },
  SPY:   { name:'SPDR S&P 500 ETF',       sector:'ETF',               industry:'Broad Market',          country:'USA', mcap:null, pe:null },
  QQQ:   { name:'Invesco NASDAQ 100',     sector:'ETF',               industry:'Tech Index',            country:'USA', mcap:null, pe:null },
  IWM:   { name:'iShares Russell 2000',   sector:'ETF',               industry:'Small Cap',             country:'USA', mcap:null, pe:null },
  VTI:   { name:'Vanguard Total Market',  sector:'ETF',               industry:'Broad Market',          country:'USA', mcap:null, pe:null },
  VOO:   { name:'Vanguard S&P 500',       sector:'ETF',               industry:'Broad Market',          country:'USA', mcap:null, pe:null },
  GLD:   { name:'SPDR Gold Shares',       sector:'ETF',               industry:'Commodities',           country:'USA', mcap:null, pe:null },
  TLT:   { name:'iShares 20yr Treasury',  sector:'ETF',               industry:'Fixed Income',          country:'USA', mcap:null, pe:null },
  XLK:   { name:'SPDR Technology ETF',    sector:'ETF',               industry:'Technology',            country:'USA', mcap:null, pe:null },
  XLF:   { name:'SPDR Financial ETF',     sector:'ETF',               industry:'Financials',            country:'USA', mcap:null, pe:null },
  XLE:   { name:'SPDR Energy ETF',        sector:'ETF',               industry:'Energy',                country:'USA', mcap:null, pe:null },
  ARKK:  { name:'ARK Innovation ETF',     sector:'ETF',               industry:'Innovation',            country:'USA', mcap:null, pe:null },
  SOXL:  { name:'Direxion Semi 3X Bull',  sector:'ETF',               industry:'Leveraged',             country:'USA', mcap:null, pe:null },
  TQQQ:  { name:'ProShares Ultra QQQ 3X', sector:'ETF',               industry:'Leveraged',             country:'USA', mcap:null, pe:null },
  JEPI:  { name:'JPMorgan Income ETF',    sector:'ETF',               industry:'Income',                country:'USA', mcap:null, pe:null },
  SCHD:  { name:'Schwab US Dividend ETF', sector:'ETF',               industry:'Dividend',              country:'USA', mcap:null, pe:null },
  DIA:   { name:'SPDR Dow Jones ETF',     sector:'Index',             industry:'Dow Jones',             country:'USA', mcap:null, pe:null },
  EFA:   { name:'iShares MSCI EAFE',      sector:'Index',             industry:'International',         country:'USA', mcap:null, pe:null },
  EEM:   { name:'iShares Emerging Mkt',   sector:'Index',             industry:'Emerging Markets',      country:'USA', mcap:null, pe:null },
  AGG:   { name:'iShares Core US Bond',   sector:'Index',             industry:'Fixed Income',          country:'USA', mcap:null, pe:null },
  HYG:   { name:'iShares High Yield',     sector:'Index',             industry:'High Yield',            country:'USA', mcap:null, pe:null },
};

const CATEGORIES = {
  trending: { label:'Trending',  symbols:['AAPL','MSFT','NVDA','TSLA','AMZN','META','GOOGL','NFLX','AMD','PLTR','COIN','UBER','ARM','SMCI','V','MA','JPM','BAC','JNJ','XOM','SOFI','MSTR','HOOD','RIVN','UNH'] },
  etf:      { label:'ETFs',      symbols:['SPY','QQQ','IWM','VTI','VOO','GLD','TLT','XLK','XLF','XLE','ARKK','SOXL','TQQQ','JEPI','SCHD'] },
  indices:  { label:'Indices',   symbols:['DIA','SPY','QQQ','IWM','EFA','EEM','AGG','HYG','GLD','TLT'] },
};

const fmtMCap = v => { if (!v) return '—'; if (v>=1000) return `$${(v/1000).toFixed(2)}T`; if (v>=1) return `$${v.toFixed(1)}B`; return `$${(v*1000).toFixed(0)}M`; };
const fmtNum  = (n,d=2) => n==null?'—':Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtVol  = v => { if (!v||v===0) return '—'; if (v>=1e9) return (v/1e9).toFixed(1)+'B'; if (v>=1e6) return (v/1e6).toFixed(1)+'M'; if (v>=1e3) return (v/1e3).toFixed(0)+'K'; return String(v); };

const COLS = ['#','Watch','Ticker','Company','Sector','Industry','Country','Mkt Cap','P/E','Price','Chg %','Volume'];

export default function ScreenerPage() {
  const router  = useRouter();
  const [cat,       setCat]       = useState('trending');
  const [rows,      setRows]      = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [sort,      setSort]      = useState({ col:'Mkt Cap', dir:-1 });
  const [search,    setSearch]    = useState('');
  const [watchlist, setWatchlist] = useState(DEFAULT_TICKERS);
  const [toast,     setToast]     = useState(null); // { msg, color }

  // Load watchlist from localStorage
  useEffect(() => {
    try { const s = localStorage.getItem('sp-tickers'); if (s) setWatchlist(JSON.parse(s)); } catch {}
  }, []);

  // Read category from URL
  useEffect(() => {
    if (router.query.type && CATEGORIES[router.query.type]) setCat(router.query.type);
  }, [router.query.type]);

  // Fetch live quotes
  useEffect(() => {
    const syms = CATEGORIES[cat]?.symbols || [];
    setLoading(true); setRows([]);
    fetch(`/api/screener?symbols=${syms.join(',')}`)
      .then(r => r.json())
      .then(data => setRows(data.map(q => ({ symbol:q.symbol, ...META[q.symbol], price:q.c, change:q.d, changePct:q.dp, volume:q.v }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [cat]);

  const toggleWatch = (symbol) => {
    const next = watchlist.includes(symbol)
      ? watchlist.filter(t => t !== symbol)
      : [...watchlist, symbol];
    setWatchlist(next);
    try { localStorage.setItem('sp-tickers', JSON.stringify(next)); } catch {}
    const added = !watchlist.includes(symbol);
    setToast({ msg: added ? `${symbol} added to watchbar` : `${symbol} removed`, color: added ? 'var(--c-accent)' : 'var(--c-danger)' });
    setTimeout(() => setToast(null), 2000);
  };

  const sorted = useMemo(() => {
    const MAP = { 'Price':'price','Chg %':'changePct','Mkt Cap':'mcap','P/E':'pe','Volume':'volume','Ticker':'symbol','Company':'name' };
    const key = MAP[sort.col];
    return [...rows]
      .filter(r => !search || r.symbol?.includes(search.toUpperCase()) || r.name?.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => {
        if (!key) return 0;
        const av=a[key],bv=b[key];
        if (av==null&&bv==null) return 0;
        if (av==null) return 1; if (bv==null) return -1;
        return (av<bv?-1:1)*sort.dir;
      });
  }, [rows, sort, search]);

  const doSort = col => setSort(s => s.col===col ? { col, dir:-s.dir } : { col, dir:-1 });

  return (
    <>
      <Head><title>Screener — StockPulse</title></Head>
      <div className="min-h-screen pb-24 md:pb-10" style={{ background:'var(--c-bg)' }}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h1 className="font-syne font-extrabold text-2xl" style={{ color:'var(--c-ink)' }}>Screener</h1>
              <p className="text-sm mt-1" style={{ color:'var(--c-muted)' }}>
                Click <span style={{ color:'var(--c-accent)' }}>+</span> to add to your watchbar · Click ticker to open detail
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Filter…"
                className="px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background:'var(--c-surface)', borderColor:'var(--c-border)', color:'var(--c-ink)' }} className='w-full sm:w-48' />
              <div className="flex gap-1 p-1 rounded-xl" style={{ background:'var(--c-surface)' }}>
                {Object.entries(CATEGORIES).map(([key,{label}]) => (
                  <button key={key} onClick={() => { setCat(key); router.push(`/screener?type=${key}`,undefined,{shallow:true}); }}
                    className="px-4 py-1.5 rounded-xl text-xs font-syne font-bold transition-all"
                    style={{ background:cat===key?'var(--c-accent)':'transparent', color:cat===key?'#000':'var(--c-muted)' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border overflow-x-auto" style={{ background:'var(--c-surface)', borderColor:'var(--c-border)' }}>
            <table className="w-full text-sm min-w-[960px]">
              <thead>
                <tr className="border-b" style={{ borderColor:'var(--c-border)' }}>
                  {COLS.map(col => (
                    <th key={col}
                      onClick={() => ['Ticker','Company','Price','Chg %','Mkt Cap','P/E','Volume'].includes(col) && doSort(col)}
                      className="px-4 py-3 text-left font-syne font-bold text-[11px] uppercase tracking-wider whitespace-nowrap select-none"
                      style={{ color:sort.col===col?'var(--c-accent)':'var(--c-muted)', cursor:['Ticker','Company','Price','Chg %','Mkt Cap','P/E','Volume'].includes(col)?'pointer':'default' }}>
                      {col}{sort.col===col && <span className="ml-1">{sort.dir>0?'↑':'↓'}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={COLS.length} className="px-4 py-12 text-center" style={{ color:'var(--c-muted)' }}>Loading…</td></tr>
                )}
                {!loading && sorted.map((row, i) => {
                  const up      = row.changePct >= 0;
                  const inWatch = watchlist.includes(row.symbol);
                  return (
                    <tr key={row.symbol} className="screener-row border-b transition-colors" style={{ borderColor:'var(--c-border)' }}>
                      <td className="px-4 py-3 text-xs" style={{ color:'var(--c-muted)' }}>{i+1}</td>

                      {/* Watchlist toggle */}
                      <td className="px-3 py-3">
                        <button
                          onClick={() => toggleWatch(row.symbol)}
                          title={inWatch ? `Remove ${row.symbol} from watchbar` : `Add ${row.symbol} to watchbar`}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                          style={{
                            background: inWatch ? 'rgba(0,229,160,0.15)' : 'var(--c-surface2)',
                            border: `1px solid ${inWatch ? 'rgba(0,229,160,0.4)' : 'var(--c-border)'}`,
                            color: inWatch ? 'var(--c-accent)' : 'var(--c-muted)',
                          }}>
                          {inWatch ? '✓' : '+'}
                        </button>
                      </td>

                      <td className="px-4 py-3 font-syne font-bold">
                        <Link href={`/?ticker=${row.symbol}`} className="hover:underline" style={{ color:'var(--c-accent)' }}>
                          {row.symbol}
                        </Link>
                      </td>
                      <td className="px-4 py-3 max-w-[180px] truncate" style={{ color:'var(--c-ink)' }}>{row.name||'—'}</td>
                      <td className="px-4 py-3 text-xs" style={{ color:'var(--c-inksoft)' }}>{row.sector||'—'}</td>
                      <td className="px-4 py-3 text-xs max-w-[160px] truncate" style={{ color:'var(--c-inksoft)' }}>{row.industry||'—'}</td>
                      <td className="px-4 py-3 text-xs" style={{ color:'var(--c-inksoft)' }}>{row.country||'—'}</td>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color:'var(--c-ink)' }}>{fmtMCap(row.mcap)}</td>
                      <td className="px-4 py-3 text-xs" style={{ color:'var(--c-inksoft)' }}>{row.pe?fmtNum(row.pe):'—'}</td>
                      <td className="px-4 py-3 font-syne font-bold" style={{ color:'var(--c-ink)' }}>{row.price?`$${fmtNum(row.price)}`:'—'}</td>
                      <td className="px-4 py-3 font-semibold text-xs"
                        style={{ color:row.changePct==null?'var(--c-muted)':up?'var(--c-accent)':'var(--c-danger)' }}>
                        {row.changePct!=null?`${up?'+':''}${fmtNum(row.changePct)}%`:'—'}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color:'var(--c-inksoft)' }}>{fmtVol(row.volume)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color:'var(--c-muted)' }}>{sorted.length} results</p>
        </div>

        {/* Toast notification */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl font-syne font-bold text-sm shadow-xl z-50 transition-all"
            style={{ background:toast.color, color:'#000', opacity:1 }}>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
