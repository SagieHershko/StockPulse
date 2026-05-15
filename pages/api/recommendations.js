const KEY = process.env.FINNHUB_KEY;
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set' });
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol required' });
  try {
    const r = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol.toUpperCase()}&token=${KEY}`);
    const data = await r.json();
    return res.json(Array.isArray(data) ? data.slice(0, 6) : []);
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
