const KEY = process.env.FINNHUB_KEY;
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set' });
  const { category = 'general' } = req.query;
  try {
    const r = await fetch(`https://finnhub.io/api/v1/news?category=${category}&minId=0&token=${KEY}`);
    const data = await r.json();
    return res.json(Array.isArray(data) ? data.slice(0, 40) : []);
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
