import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

const TradingViewChart = dynamic(() => import('../components/TradingViewChart'), {
  ssr: false,
  loading: () => <div className="h-[460px] rounded-2xl animate-pulse" style={{ background:'var(--c-surface)' }} />,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt  = (n, d=2) => n==null ? '—' : Number(n).toLocaleString('en-US', {minimumFractionDigits:d, maximumFractionDigits:d});
const fPct = (n) => n==null ? '—' : (n>0?'+':'')+fmt(n)+'%';
const ago  = (ts) => { const s=Math.floor(Date.now()/1000-ts); if(s<3600) return `${Math.floor(s/60)}m ago`; if(s<86400) return `${Math.floor(s/3600)}h ago`; return `${Math.floor(s/86400)}d ago`; };

const DEFAULT_TICKERS  = ['AAPL','TSLA','NVDA','MSFT','AMZN','META','GOOGL','NFLX'];
const FILTER_TYPES     = [{value:'all',label:'All'},{value:'stocks',label:'Stocks'},{value:'etf',label:'ETFs'},{value:'indices',label:'Indices'}];

// ─── Market Timer ─────────────────────────────────────────────────────────────
function getMarketInfo() {
  const now=new Date(), et=new Date(now.toLocaleString('en-US',{timeZone:'America/New_York'}));
  const day=et.getDay(),h=et.getHours(),m=et.getMinutes(),s=et.getSeconds(),tot=h*3600+m*60+s;
  const PRE=4*3600,OPEN=9*3600+30*60,CLOSE=16*3600,POST=20*3600,DAY=86400;
  const pad=n=>String(n).padStart(2,'0');
  const hms=v=>{if(v<=0)return'00:00:00';const hh=Math.floor(v/3600),mm=Math.floor((v%3600)/60),ss=v%60;return hh>0?`${pad(hh)}:${pad(mm)}:${pad(ss)}`:`${pad(mm)}:${pad(ss)}`;};
  const isWE=day===0||day===6;
  if(isWE){const d=(day===6?2:1)*DAY+(PRE-tot+DAY)%DAY;return{status:'CLOSED',label:'Closed — Weekend',next:'Pre-market Mon',countdown:hms(d),dot:'var(--c-muted)'};}
  if(tot<PRE)  return{status:'CLOSED',label:'Closed',      next:'Pre-market opens',countdown:hms(PRE-tot),  dot:'var(--c-muted)'};
  if(tot<OPEN) return{status:'PRE',   label:'Pre-Market',  next:'Market opens',    countdown:hms(OPEN-tot), dot:'#f59e0b'};
  if(tot<CLOSE)return{status:'OPEN',  label:'Market Open', next:'Market closes',   countdown:hms(CLOSE-tot),dot:'var(--c-accent)'};
  if(tot<POST) return{status:'AFTER', label:'After-Hours', next:'Extended ends',   countdown:hms(POST-tot), dot:'#f59e0b'};
  const toNext=(day===5?3:1)*DAY+PRE+(DAY-tot);
  return{status:'CLOSED',label:'Closed',next:day===5?'Pre-market Mon':'Pre-market tomorrow',countdown:hms(toNext),dot:'var(--c-muted)'};
}
function MarketTimer() {
  const [info,setInfo]=useState(null);
  useEffect(()=>{const t=()=>setInfo(getMarketInfo());t();const id=setInterval(t,1000);return()=>clearInterval(id);},[]);
  if(!info)return null;
  return(
    <div className="flex items-center gap-2 rounded-xl px-3 py-2 shrink-0 border" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {info.status==='OPEN'&&<span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{background:info.dot}}/>}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{background:info.dot}}/>
        </span>
        <span className="text-xs font-syne font-bold" style={{color:'var(--c-ink)'}}>{info.label}</span>
      </div>
      <div className="w-px h-4" style={{background:'var(--c-border)'}}/>
      <div className="text-right">
        <div className="text-[10px] leading-none mb-0.5" style={{color:'var(--c-muted)'}}>{info.next}</div>
        <div className="text-xs font-syne font-bold tabular-nums" style={{color:info.dot}}>{info.countdown}</div>
      </div>
    </div>
  );
}

// ─── Ticker Toolbar ───────────────────────────────────────────────────────────
function TickerBar({ tickers, active, onSelect, onAdd, onRemove }) {
  const [adding,setAdding]=useState(false);
  const [val,setVal]=useState('');
  const ref=useRef(null);
  useEffect(()=>{if(adding)ref.current?.focus();},[adding]);
  const submit=()=>{
    const t=val.trim().toUpperCase().replace(/[^A-Z.^]/g,'');
    if(t&&t.length<=8&&!tickers.includes(t))onAdd(t);
    setVal('');setAdding(false);
  };
  return(
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{flexWrap:'nowrap'}}>
      {tickers.map(t=>(
        <div key={t} onClick={()=>onSelect(t)}
          className="group relative flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-syne font-bold cursor-pointer select-none transition-all"
          style={{background:active===t?'rgba(0,229,160,0.1)':'var(--c-surface2)',borderColor:active===t?'rgba(0,229,160,0.4)':'var(--c-border)',color:active===t?'var(--c-accent)':'var(--c-muted)'}}>
          {t}
          <button onClick={e=>{e.stopPropagation();onRemove(t);}} className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{color:'var(--c-muted)'}}>×</button>
        </div>
      ))}
      {adding?(
        <div className="flex items-center gap-1">
          <input ref={ref} value={val} onChange={e=>setVal(e.target.value.toUpperCase().slice(0,8))}
            onKeyDown={e=>{if(e.key==='Enter')submit();if(e.key==='Escape'){setAdding(false);setVal('');}}}
            placeholder="TICKER" className="w-24 rounded-xl px-3 py-1.5 text-[11px] font-syne font-bold outline-none uppercase tracking-wider border"
            style={{background:'var(--c-surface2)',borderColor:'var(--c-accent)',color:'var(--c-ink)'}}/>
          <button onClick={submit} className="text-black text-[11px] font-syne font-bold px-2.5 py-1.5 rounded-xl" style={{background:'var(--c-accent)'}}>Add</button>
          <button onClick={()=>{setAdding(false);setVal('');}} className="text-[11px] px-2 py-1.5" style={{color:'var(--c-muted)'}}>✕</button>
        </div>
      ):(
        <button onClick={()=>setAdding(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed text-[11px] font-syne font-bold transition-all" style={{borderColor:'rgba(255,255,255,0.15)',color:'var(--c-muted)'}}>
          <span className="text-sm leading-none">+</span> Add Ticker
        </button>
      )}
    </div>
  );
}

// ─── Analyst Consensus (Finnhub recommendation trends) ────────────────────────
function AnalystConsensus({ recommendations }) {
  if (!recommendations?.length) return null;
  const latest  = recommendations[0];
  const { strongBuy=0, buy=0, hold=0, sell=0, strongSell=0, period } = latest;
  const total   = strongBuy+buy+hold+sell+strongSell;
  if (total === 0) return null;

  const bullish = strongBuy+buy;
  const bearish = sell+strongSell;
  const bullPct = Math.round((bullish/total)*100);
  const holdPct = Math.round((hold/total)*100);
  const bearPct = 100-bullPct-holdPct;

  let consensus='Hold', consColor='var(--c-muted)';
  if (bullPct>=75)     { consensus='Strong Buy'; consColor='var(--c-accent)'; }
  else if (bullPct>=55){ consensus='Buy';        consColor='var(--c-accent)'; }
  else if (bearPct>=40){ consensus='Sell';       consColor='var(--c-danger)'; }

  const bars=[
    {label:'Strong Buy',count:strongBuy,pct:Math.round((strongBuy/total)*100),color:'#00e5a0'},
    {label:'Buy',       count:buy,       pct:Math.round((buy/total)*100),       color:'#4ade80'},
    {label:'Hold',      count:hold,      pct:Math.round((hold/total)*100),      color:'#f59e0b'},
    {label:'Sell',      count:sell,      pct:Math.round((sell/total)*100),      color:'#fb923c'},
    {label:'Strong Sell',count:strongSell,pct:Math.round((strongSell/total)*100),color:'var(--c-danger)'},
  ];

  return(
    <div className="rounded-2xl border p-5" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div>
          <p className="text-[11px] font-syne font-bold uppercase tracking-widest" style={{color:'var(--c-muted)'}}>Analyst Consensus</p>
          <p className="text-xs mt-0.5" style={{color:'var(--c-muted)'}}>{total} analysts · {period?.slice(0,7)||'recent'}</p>
        </div>
        <div className="text-right">
          <p className="font-syne font-extrabold text-lg" style={{color:consColor}}>{consensus}</p>
          <p className="text-xs" style={{color:'var(--c-muted)'}}>{bullPct}% bullish</p>
        </div>
      </div>

      {/* Distribution bars */}
      <div className="space-y-2.5 mb-4">
        {bars.map(({label,count,pct,color})=>(
          <div key={label} className="flex items-center gap-3">
            <span className="text-[10px] w-20 shrink-0 text-right" style={{color:'var(--c-muted)'}}>{label}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{background:'var(--c-surface2)'}}>
              <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct}%`,background:color}}/>
            </div>
            <div className="flex items-center gap-1.5 w-16 shrink-0">
              <span className="text-[10px] font-bold" style={{color}}>{pct}%</span>
              <span className="text-[10px]" style={{color:'var(--c-muted)'}}>({count})</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bull / Hold / Bear summary pills */}
      <div className="grid grid-cols-3 gap-2">
        {[['Bullish',bullPct+'%','var(--c-accent)'],['Neutral',holdPct+'%','#f59e0b'],['Bearish',bearPct+'%','var(--c-danger)']].map(([l,v,c])=>(
          <div key={l} className="rounded-xl p-2.5 text-center" style={{background:'var(--c-surface2)'}}>
            <div className="text-[9px] uppercase tracking-widest mb-1" style={{color:'var(--c-muted)'}}>{l}</div>
            <div className="text-sm font-syne font-bold" style={{color:c}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Analyst Price Targets ────────────────────────────────────────────────────
function AnalystTargets({ target, currentPrice }) {
  if (!target?.targetMean) return null;
  const { targetMean,targetMedian,targetHigh,targetLow,analystNumber,lastUpdated } = target;
  const upside  = ((targetMean-currentPrice)/currentPrice)*100;
  const isUp    = upside>=0;
  const range   = targetHigh-targetLow||1;
  const pos     = Math.max(0,Math.min(100,((currentPrice-targetLow)/range)*100));
  const medPos  = Math.max(0,Math.min(100,((targetMedian-targetLow)/range)*100));
  return(
    <div className="rounded-2xl border p-5" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div>
          <p className="text-[11px] font-syne font-bold uppercase tracking-widest" style={{color:'var(--c-muted)'}}>Price Targets</p>
          <p className="text-xs mt-0.5" style={{color:'var(--c-muted)'}}>{analystNumber} analysts · {lastUpdated?.slice(0,10)||'—'}</p>
        </div>
        <div className="text-right">
          <p className="font-syne font-extrabold text-xl" style={{color:'var(--c-ink)'}}>${fmt(targetMean)}</p>
          <p className="text-xs font-semibold" style={{color:isUp?'var(--c-accent)':'var(--c-danger)'}}>{isUp?'↑':'↓'} {fmt(Math.abs(upside))}% {isUp?'upside':'downside'}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="relative h-2 rounded-full mb-2.5" style={{background:'var(--c-surface2)'}}>
          <div className="absolute h-full rounded-full opacity-20" style={{left:'0%',right:'0%',background:'var(--c-accent)'}}/>
          <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full" style={{left:`${medPos}%`,background:'var(--c-accent)'}}/>
          <div className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 shadow" style={{left:`${pos}%`,transform:'translate(-50%,-50%)',background:'var(--c-ink)',borderColor:'var(--c-ink)'}}/>
        </div>
        <div className="flex justify-between text-[10px]" style={{color:'var(--c-muted)'}}>
          <span>Low ${fmt(targetLow)}</span>
          <span>Median ${fmt(targetMedian)}</span>
          <span>High ${fmt(targetHigh)}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[['Consensus','$'+fmt(targetMean)],['Median','$'+fmt(targetMedian)],['Analysts',analystNumber]].map(([l,v])=>(
          <div key={l} className="rounded-xl p-2.5 text-center" style={{background:'var(--c-surface2)'}}>
            <div className="text-[9px] uppercase tracking-widest mb-1" style={{color:'var(--c-muted)'}}>{l}</div>
            <div className="text-xs font-syne font-bold" style={{color:'var(--c-ink)'}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── News Slider ──────────────────────────────────────────────────────────────
const PER=4;
function NewsSlider({news,ticker}){
  const[page,setPage]=useState(0);
  useEffect(()=>setPage(0),[ticker]);
  if(!news.length)return<p className="text-sm" style={{color:'var(--c-muted)'}}>No recent news for {ticker}.</p>;
  const total=Math.ceil(news.length/PER), slice=news.slice(page*PER,(page+1)*PER);
  return(
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slice.map((item,i)=>(
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            style={{background:'var(--c-surface2)',borderColor:'var(--c-border)'}}>
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{color:'var(--c-accent2)'}}>{item.source}</span>
              <span className="text-[10px]" style={{color:'var(--c-muted)'}}>{ago(item.datetime)}</span>
            </div>
            <p className="text-sm font-medium leading-snug line-clamp-3 flex-1" style={{color:'var(--c-ink)'}}>{item.headline}</p>
            <div className="mt-2 text-[10px] font-semibold" style={{color:'var(--c-accent)'}}>Read more →</div>
          </a>
        ))}
        {slice.length<PER&&Array.from({length:PER-slice.length}).map((_,i)=>(
          <div key={i} className="rounded-xl border hidden sm:block" style={{borderColor:'var(--c-border)',opacity:0.2}}/>
        ))}
      </div>
      {total>1&&(
        <div className="flex items-center justify-between mt-4">
          <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}
            className="px-3 py-1.5 rounded-xl border text-xs font-syne font-bold disabled:opacity-30 transition-colors"
            style={{background:'var(--c-surface2)',borderColor:'var(--c-border)',color:'var(--c-muted)'}}>← Prev</button>
          <div className="flex items-center gap-2">
            {Array.from({length:total}).map((_,i)=>(
              <button key={i} onClick={()=>setPage(i)} className="rounded-full transition-all"
                style={{width:i===page?20:6,height:6,background:i===page?'var(--c-accent)':'var(--c-border)'}}/>
            ))}
            <span className="text-[10px] ml-1" style={{color:'var(--c-muted)'}}>{page+1}/{total}</span>
          </div>
          <button onClick={()=>setPage(p=>Math.min(total-1,p+1))} disabled={page===total-1}
            className="px-3 py-1.5 rounded-xl border text-xs font-syne font-bold disabled:opacity-30 transition-colors"
            style={{background:'var(--c-surface2)',borderColor:'var(--c-border)',color:'var(--c-muted)'}}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────
function Stat({label,value,color}){
  return(
    <div className="rounded-xl p-3 border" style={{background:'var(--c-surface2)',borderColor:'var(--c-border)'}}>
      <div className="text-[10px] uppercase tracking-widest mb-1.5" style={{color:'var(--c-muted)'}}>{label}</div>
      <div className="font-syne font-bold text-sm leading-none" style={{color:color||'var(--c-ink)'}}>{value}</div>
    </div>
  );
}

// ─── IR Summary ───────────────────────────────────────────────────────────────
function IRSummary({earnings,profile,ticker}){
  const[open,setOpen]=useState(false);
  if(!earnings?.length)return null;
  const e=earnings[0],beat=e.actual!=null&&e.estimate!=null&&e.actual>=e.estimate,noData=e.actual==null||e.estimate==null;
  const qs=['','Q1','Q2','Q3','Q4'],lbl=`${qs[e.quarter]||'Q?'} ${e.year}`,co=profile?.name||ticker;
  const summary=noData?`Earnings data for ${co} is not yet available.`
    :beat?`In ${lbl}, ${co} reported EPS of $${fmt(e.actual)}, beating the $${fmt(e.estimate)} consensus by $${fmt(Math.abs(e.surprise??0))} (${fmt(Math.abs(e.surprisePercent??0))}%). Positive surprise signals stronger-than-expected profitability.`
    :`In ${lbl}, ${co} reported EPS of $${fmt(e.actual)}, missing the $${fmt(e.estimate)} consensus by $${fmt(Math.abs(e.surprise??0))} (${fmt(Math.abs(e.surprisePercent??0))}%). The miss may weigh on near-term sentiment.`;
  return(
    <div className="rounded-2xl border overflow-hidden" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between px-5 py-4 hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="text-left">
            <p className="text-[10px] font-syne font-bold uppercase tracking-widest" style={{color:'var(--c-muted)'}}>Latest IR · {ticker}</p>
            <p className="text-sm font-syne font-bold mt-0.5" style={{color:'var(--c-ink)'}}>{lbl} Earnings</p>
          </div>
          {!noData&&<span className="text-[10px] font-syne font-bold px-2 py-1 rounded-lg border"
            style={{background:beat?'rgba(0,229,160,0.1)':'rgba(255,79,106,0.1)',borderColor:beat?'rgba(0,229,160,0.25)':'rgba(255,79,106,0.25)',color:beat?'var(--c-accent)':'var(--c-danger)'}}>
            {beat?'✓ Beat':'✗ Miss'}</span>}
        </div>
        <span style={{color:'var(--c-muted)',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▾</span>
      </button>
      {open&&(
        <div className="px-5 pb-5 border-t" style={{borderColor:'var(--c-border)'}}>
          {!noData&&(
            <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
              <Stat label="EPS Actual"   value={`$${fmt(e.actual)}`}   color={beat?'var(--c-accent)':'var(--c-danger)'}/>
              <Stat label="EPS Estimate" value={`$${fmt(e.estimate)}`}/>
              <Stat label="Surprise $"   value={`${beat?'+':'-'}$${fmt(Math.abs(e.surprise??0))}`} color={beat?'var(--c-accent)':'var(--c-danger)'}/>
              <Stat label="Surprise %"   value={`${beat?'+':''}${fmt(e.surprisePercent??0)}%`}     color={beat?'var(--c-accent)':'var(--c-danger)'}/>
            </div>
          )}
          <div className="rounded-xl px-4 py-3 border text-sm leading-relaxed" style={{background:'var(--c-surface2)',borderColor:'var(--c-border)',color:'var(--c-muted)'}}>{summary}</div>
          {earnings.length>1&&(
            <div className="mt-4 overflow-x-auto">
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{color:'var(--c-muted)'}}>EPS History</p>
              <table className="w-full text-xs"><thead><tr>
                {['Period','Actual','Estimate','Surprise %'].map(h=>(
                  <th key={h} className={`pb-2 font-syne font-bold ${h==='Period'?'text-left':'text-right'}`} style={{color:'var(--c-muted)'}}>{h}</th>
                ))}
              </tr></thead><tbody>
                {earnings.slice(0,6).map((q,i)=>{
                  const b=q.actual!=null&&q.estimate!=null&&q.actual>=q.estimate;
                  return(
                    <tr key={i} className="border-t" style={{borderColor:'var(--c-border)'}}>
                      <td className="py-2" style={{color:'var(--c-muted)'}}>{`${qs[q.quarter]||'?'} ${q.year}`}</td>
                      <td className="py-2 text-right font-medium" style={{color:q.actual!=null?(b?'var(--c-accent)':'var(--c-danger)'):'var(--c-muted)'}}>{q.actual!=null?`$${fmt(q.actual)}`:'—'}</td>
                      <td className="py-2 text-right" style={{color:'var(--c-muted)'}}>{q.estimate!=null?`$${fmt(q.estimate)}`:'—'}</td>
                      <td className="py-2 text-right font-medium" style={{color:q.surprisePercent!=null?(b?'var(--c-accent)':'var(--c-danger)'):'var(--c-muted)'}}>{q.surprisePercent!=null?`${b?'+':''}${fmt(q.surprisePercent)}%`:'—'}</td>
                    </tr>
                  );
                })}
              </tbody></table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Investment Calculator ────────────────────────────────────────────────────
function InvestCalc({ticker,currentPrice}){
  const[amount,setAmount]=useState(''),  [date,setDate]=useState('');
  const[loading,setLoading]=useState(false),[result,setResult]=useState(null),[error,setError]=useState('');
  const calc=async()=>{
    if(!amount||!date||!ticker||!currentPrice)return;
    setLoading(true);setError('');setResult(null);
    try{
      const res=await fetch(`/api/candles?symbol=${ticker}&date=${date}`);
      const d=await res.json();
      if(!res.ok)throw new Error(d.error||'Price not found.');
      const V=parseFloat(amount),P0=d.price,P1=currentPrice;
      const shares=V/P0,Vnow=shares*P1,gain=Vnow-V,pct=(gain/V)*100;
      setResult({V,P0,P1,shares,Vnow,gain,pct,onDate:d.date});
    }catch(e){setError(e.message);}
    finally{setLoading(false);}
  };
  const inp={background:'var(--c-surface2)',borderColor:'var(--c-border)',color:'var(--c-ink)'};
  return(
    <div className="rounded-2xl border p-5" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
      <h2 className="font-syne font-bold text-[11px] uppercase tracking-widest mb-4" style={{color:'var(--c-muted)'}}>If I Had Invested…</h2>
      <div className="space-y-3 mb-3">
        {[['Amount (USD)','number','e.g. 1000',amount,setAmount],['Investment Date','date','',date,setDate]].map(([lbl,type,ph,val,set])=>(
          <div key={lbl}>
            <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{color:'var(--c-muted)'}}>{lbl}</label>
            <input type={type} placeholder={ph} value={val} max={type==='date'?new Date().toISOString().slice(0,10):undefined}
              onChange={e=>set(e.target.value)} className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none border" style={inp}/>
          </div>
        ))}
      </div>
      <button onClick={calc} disabled={!amount||!date||loading} className="w-full rounded-xl py-2.5 font-syne font-bold text-sm disabled:opacity-40"
        style={{background:'var(--c-accent)',color:'#000'}}>{loading?'Fetching price…':'Calculate Return'}</button>
      {error&&<p className="mt-2.5 text-xs rounded-lg px-3 py-2" style={{color:'var(--c-danger)',background:'rgba(255,79,106,0.1)'}}>{error}</p>}
      {result&&(
        <div className="mt-4 rounded-xl p-4 border" style={{background:'var(--c-surface2)',borderColor:'var(--c-border)'}}>
          {[['Price on '+result.onDate,'$'+fmt(result.P0)],['Price today','$'+fmt(result.P1)],['Shares',fmt(result.shares,5)],['Value today','$'+fmt(result.Vnow)]].map(([l,v])=>(
            <div key={l} className="flex justify-between text-xs border-b pb-1.5 last:border-0" style={{borderColor:'var(--c-border)'}}>
              <span style={{color:'var(--c-muted)'}}>{l}</span><span style={{color:'var(--c-ink)'}}>{v}</span>
            </div>
          ))}
          <div className="font-syne font-extrabold text-2xl mt-3" style={{color:result.gain>=0?'var(--c-accent)':'var(--c-danger)'}}>
            {result.gain>=0?'+':'−'}${fmt(Math.abs(result.gain))}
            <span className="text-sm ml-1.5 font-bold">({fPct(result.pct)})</span>
          </div>
          <p className="text-[10px] mt-1" style={{color:'var(--c-muted)'}}>{result.gain>=0?`$${fmt(result.V)} grew to $${fmt(result.Vnow)} 🎉`:`$${fmt(result.V)} is now worth $${fmt(result.Vnow)}`}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [query,    setQuery]    = useState('');
  const [filter,   setFilter]   = useState('all');
  const [ticker,   setTicker]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [quote,    setQuote]    = useState(null);
  const [profile,  setProfile]  = useState(null);
  const [news,     setNews]     = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [ptarget,  setPtarget]  = useState(null);
  const [recs,     setRecs]     = useState([]);
  const [tickers,  setTickers]  = useState(DEFAULT_TICKERS);

  useEffect(() => {
    try { const s=localStorage.getItem('sp-tickers'); if(s) setTickers(JSON.parse(s)); } catch {}
  }, []);

  // ── Core search function ───────────────────────────────────────────────────
  const doSearch = useCallback(async (sym) => {
    const s = sym ? sym.trim().toUpperCase() : query.trim().toUpperCase();
    if (!s) {
      if (filter !== 'all') { router.push(`/screener?type=${filter}`); return; }
      return;
    }
    setTicker(s); setLoading(true); setError(null);
    setQuote(null); setProfile(null); setNews([]); setEarnings([]); setPtarget(null); setRecs([]);

    try {
      const [qR,pR,nR,eR,tR,rR] = await Promise.allSettled([
        fetch(`/api/quote?symbol=${s}`).then(r=>r.json()),
        fetch(`/api/profile?symbol=${s}`).then(r=>r.json()),
        fetch(`/api/news?symbol=${s}`).then(r=>r.json()),
        fetch(`/api/earnings?symbol=${s}`).then(r=>r.json()),
        fetch(`/api/price-target?symbol=${s}`).then(r=>r.json()),
        fetch(`/api/recommendations?symbol=${s}`).then(r=>r.json()),
      ]);
      const q  = qR.status==='fulfilled'?qR.value:null;
      const p  = pR.status==='fulfilled'?pR.value:{};
      const n  = nR.status==='fulfilled'?nR.value:[];
      const e  = eR.status==='fulfilled'?eR.value:[];
      const t  = tR.status==='fulfilled'?tR.value:null;
      const rc = rR.status==='fulfilled'?rR.value:[];

      if (!q||q.error||q.c==null) throw new Error(q?.error||`No data found for "${s}". Check the ticker symbol.`);
      setQuote(q); setProfile(p||{});
      setNews(Array.isArray(n)?n:[]);
      setEarnings(Array.isArray(e)?e:[]);
      setPtarget(t?.targetMean?t:null);
      setRecs(Array.isArray(rc)?rc:[]);
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  }, [query, filter, router]);

  // ── Handle ?ticker= from screener navigation — wait for router.isReady ─────
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.ticker) {
      const t = String(router.query.ticker).toUpperCase();
      setQuery(t);
      doSearch(t);
      // Remove the query param from the URL without triggering a reload
      router.replace('/', undefined, { shallow: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.ticker]);

  const saveTickers = (list) => { setTickers(list); try { localStorage.setItem('sp-tickers', JSON.stringify(list)); } catch {} };
  const isUp = quote ? quote.dp >= 0 : true;
  const ac   = isUp ? 'var(--c-accent)' : 'var(--c-danger)';

  return(
    <>
      <Head><title>{ticker?`${ticker} — StockPulse`:'StockPulse'}</title></Head>
      <div className="min-h-screen pb-28 md:pb-24" style={{background:'var(--c-bg)'}}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-5">

          {/* ── Search row ── */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex gap-1 p-1 rounded-xl" style={{background:'var(--c-surface)'}}>
              {FILTER_TYPES.map(f=>(
                <button key={f.value} onClick={()=>setFilter(f.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all"
                  style={{background:filter===f.value?'var(--c-accent)':'transparent',color:filter===f.value?'#000':'var(--c-muted)'}}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-1 border transition-colors w-full"
              style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
              <span style={{color:'var(--c-muted)'}}>🔍</span>
              <input className="flex-1 bg-transparent outline-none py-2.5 font-syne font-bold uppercase tracking-widest text-sm placeholder:normal-case placeholder:font-normal placeholder:tracking-normal"
                style={{color:'var(--c-ink)'}} placeholder={filter==='all'?'Search ticker…':`Search ${filter} or press Go to browse`}
                value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSearch()}/>
              <button onClick={()=>doSearch()} disabled={loading}
                className="rounded-lg px-4 py-2 font-syne font-bold text-xs disabled:opacity-40"
                style={{background:'var(--c-accent)',color:'#000'}}>{loading?'…':'Go'}</button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <MarketTimer/>
            </div>
          </div>

          {/* ── Ticker toolbar ── */}
          <TickerBar tickers={tickers} active={ticker}
            onSelect={t=>{setQuery(t);doSearch(t);}}
            onAdd={t=>saveTickers([...tickers,t])}
            onRemove={t=>saveTickers(tickers.filter(x=>x!==t))}/>
          <div className="h-px mt-4 mb-5" style={{background:'var(--c-border)'}}/>

          {error&&<div className="rounded-xl px-4 py-3 mb-4 text-sm border" style={{background:'rgba(255,79,106,0.1)',borderColor:'rgba(255,79,106,0.25)',color:'var(--c-danger)'}}>⚠ {error}</div>}

          {/* ── Empty ── */}
          {!ticker&&!loading&&(
            <div className="flex flex-col items-center justify-center pt-20 text-center gap-3">
              <div className="text-6xl opacity-10">📈</div>
              <div className="font-syne font-bold text-2xl" style={{color:'var(--c-ink)'}}>Search any stock or ETF</div>
              <p className="text-sm max-w-sm leading-relaxed" style={{color:'var(--c-muted)'}}>Select a filter and press Go to browse, or type a ticker for full detail.</p>
            </div>
          )}

          {/* ── Loading ── */}
          {loading&&(
            <div className="flex flex-col items-center justify-center pt-20 gap-4">
              <div className="w-9 h-9 rounded-full border-2 border-t-accent animate-spin" style={{borderColor:'var(--c-border)',borderTopColor:'var(--c-accent)'}}/>
              <div className="text-sm" style={{color:'var(--c-muted)'}}>Loading {ticker}…</div>
            </div>
          )}

          {/* ── Dashboard ── */}
          {!loading&&quote&&(
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px] gap-5">

              {/* LEFT */}
              <div className="space-y-5 min-w-0">
                {/* Hero */}
                <div className="rounded-2xl border p-6 relative overflow-hidden" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
                  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(0,229,160,0.05) 0%,transparent 70%)'}}/>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-none" style={{color:'var(--c-ink)'}}>{ticker}</div>
                      <div className="text-sm mt-2" style={{color:'var(--c-muted)'}}>{profile?.name||'—'}{profile?.exchange?` · ${profile.exchange}`:''}{profile?.finnhubIndustry?` · ${profile.finnhubIndustry}`:''}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-none" style={{color:'var(--c-ink)'}}>${fmt(quote.c)}</div>
                      <div className="mt-2 text-base font-medium flex items-center justify-end gap-1.5" style={{color:ac}}>
                        {isUp?'▲':'▼'} {fPct(quote.dp)} <span className="text-sm">({isUp&&quote.d>0?'+':''}{fmt(quote.d)})</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                    <Stat label="Open"      value={`$${fmt(quote.o)}`}/>
                    <Stat label="High"      value={`$${fmt(quote.h)}`} color="var(--c-accent)"/>
                    <Stat label="Low"       value={`$${fmt(quote.l)}`} color="var(--c-danger)"/>
                    <Stat label="Prev Close" value={`$${fmt(quote.pc)}`}/>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-2xl border overflow-hidden" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5 pb-2">
                    <div>
                      <p className="font-syne font-bold text-[11px] uppercase tracking-widest" style={{color:'var(--c-muted)'}}>{ticker} — Chart</p>
                      <p className="text-[10px] mt-0.5" style={{color:'var(--c-muted)',opacity:.6}}>Interactive · zoom, draw, indicators</p>
                    </div>
                    <a href={`https://www.tradingview.com/chart/?symbol=${ticker}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[11px] font-syne font-bold transition-colors"
                      style={{background:'rgba(0,229,160,0.1)',border:'1px solid rgba(0,229,160,0.25)',color:'var(--c-accent)'}}>
                      ↗ Open in TradingView
                    </a>
                  </div>
                  <TradingViewChart symbol={ticker}/>
                </div>

                {/* News */}
                <div className="rounded-2xl border p-6" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="font-syne font-bold text-[11px] uppercase tracking-widest" style={{color:'var(--c-muted)'}}>{ticker} News</h2>
                      {news.length>0&&<span className="text-[10px] font-bold px-2 py-0.5 rounded border" style={{background:'rgba(124,111,255,0.12)',color:'var(--c-accent2)',borderColor:'rgba(124,111,255,0.2)'}}>{news.length}</span>}
                    </div>
                    <span className="text-[10px]" style={{color:'var(--c-muted)',opacity:.6}}>{ticker}-specific · past 14 days</span>
                  </div>
                  <NewsSlider news={news} ticker={ticker}/>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                {/* Company */}
                {profile?.name&&(
                  <div className="rounded-2xl border p-5" style={{background:'var(--c-surface)',borderColor:'var(--c-border)'}}>
                    <h2 className="font-syne font-bold text-[11px] uppercase tracking-widest mb-4" style={{color:'var(--c-muted)'}}>Company Profile</h2>
                    <div className="space-y-2 text-sm">
                      {[['Industry',profile.finnhubIndustry],['Country',profile.country],['Currency',profile.currency],['Market Cap',profile.marketCapitalization?`$${fmt(profile.marketCapitalization/1000,2)}B`:null],['IPO Date',profile.ipo]].filter(([,v])=>v).map(([l,v])=>(
                        <div key={l} className="flex justify-between gap-3 border-b pb-2 last:border-0 last:pb-0" style={{borderColor:'var(--c-border)'}}>
                          <span style={{color:'var(--c-muted)'}}>{l}</span>
                          <span className="font-medium text-right" style={{color:'var(--c-ink)'}}>{v}</span>
                        </div>
                      ))}
                      {profile.weburl&&(
                        <div className="flex justify-between gap-3 pt-0.5">
                          <span style={{color:'var(--c-muted)'}}>Website</span>
                          <a href={profile.weburl} target="_blank" rel="noopener noreferrer" className="text-xs text-right break-all hover:underline" style={{color:'var(--c-accent)'}}>
                            {profile.weburl.replace(/https?:\/\//,'').replace(/\/$/,'')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Analyst Consensus */}
                <AnalystConsensus recommendations={recs}/>

                {/* Analyst Price Targets */}
                <AnalystTargets target={ptarget} currentPrice={quote?.c}/>

                {/* Investment Calculator */}
                <InvestCalc ticker={ticker} currentPrice={quote?.c}/>

                {/* IR Summary */}
                <IRSummary earnings={earnings} profile={profile} ticker={ticker}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
