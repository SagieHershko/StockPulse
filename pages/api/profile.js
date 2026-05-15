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
    const r = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${KEY}`);
    const data = await r.json();
    return res.json(data || {});
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Internal server error' });
  }
}
