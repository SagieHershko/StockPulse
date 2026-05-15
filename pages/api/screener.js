const KEY = process.env.FINNHUB_KEY;
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set' });
  const { symbols } = req.query;
  if (!symbols) return res.status(400).json({ error: 'symbols required' });
  const list = symbols.split(',').slice(0, 30).map(s => s.trim().toUpperCase());
  try {
    const results = await Promise.allSettled(
      list.map(s => fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${KEY}`).then(r => r.json()).then(d => ({ symbol: s, ...d })))
    );
    return res.json(results.map((r, i) => r.status === 'fulfilled' ? r.value : { symbol: list[i], error: true }));
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
