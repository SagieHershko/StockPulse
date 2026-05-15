const KEY = process.env.FINNHUB_KEY;

export default async function handler(req, res) {
  // Always return JSON — never let Next.js serve an HTML error page
  res.setHeader('Content-Type', 'application/json');

  if (!KEY) {
    return res.status(500).json({ error: 'FINNHUB_KEY is not set in .env.local' });
  }

  const { symbol, date } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol is required' });

  try {
    if (!date) return res.status(400).json({ error: 'date is required' });
    const target = new Date(date);
    const from   = Math.floor(target.getTime() / 1000 - 4 * 86400);
    const to     = Math.floor(target.getTime() / 1000 + 4 * 86400);
    const r = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol.toUpperCase()}&resolution=D&from=${from}&to=${to}&token=${KEY}`);
    const data = await r.json();
    if (data.s !== 'ok' || !data.t?.length) return res.status(404).json({ error: 'No trading data found for that date. Try a nearby weekday.' });
    const ts = target.getTime() / 1000;
    let best = 0;
    data.t.forEach((t, i) => { if (Math.abs(t - ts) < Math.abs(data.t[best] - ts)) best = i; });
    return res.json({ date: new Date(data.t[best] * 1000).toISOString().slice(0, 10), price: data.c[best] });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Internal server error' });
  }
}
