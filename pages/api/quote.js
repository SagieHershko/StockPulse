const KEY = process.env.FINNHUB_KEY;
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set in .env.local' });
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol is required' });
  try {
    const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${KEY}`);
    const data = await r.json();
    // Only reject if c is genuinely missing — c:0 can be valid (halted stocks) or a rate-limit ghost
    if (data.c == null || data.t == null || data.t === 0) {
      return res.status(404).json({ error: `No price data found for "${symbol}". Verify the ticker is correct and try again.` });
    }
    return res.json(data);
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
