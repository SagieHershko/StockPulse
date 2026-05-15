const KEY = process.env.FINNHUB_KEY;

const fetchJSON = (url) => fetch(url).then(r => r.json()).catch(() => ({}));

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set' });
  const { symbols } = req.query;
  if (!symbols) return res.status(400).json({ error: 'symbols required' });

  const list = symbols.split(',').slice(0, 25).map(s => s.trim().toUpperCase());

  try {
    // Fetch quotes + profiles in parallel for all symbols
    const [quoteRes, profileRes] = await Promise.all([
      Promise.allSettled(list.map(s =>
        fetchJSON(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${KEY}`)
          .then(d => ({ symbol: s, ...d }))
      )),
      Promise.allSettled(list.map(s =>
        fetchJSON(`https://finnhub.io/api/v1/stock/profile2?symbol=${s}&token=${KEY}`)
      )),
    ]);

    const results = list.map((sym, i) => {
      const q = quoteRes[i].status  === 'fulfilled' ? quoteRes[i].value  : { symbol: sym };
      const p = profileRes[i].status === 'fulfilled' ? profileRes[i].value : {};
      return {
        symbol:   sym,
        price:    q.c,
        change:   q.d,
        changePct:q.dp,
        volume:   q.v,
        // Profile fields
        name:     p.name   || null,
        sector:   p.finnhubIndustry || null,
        industry: p.finnhubIndustry || null,
        country:  p.country || null,
        mcap:     p.marketCapitalization || null, // in millions
        website:  p.weburl  || null,
        exchange: p.exchange || null,
      };
    });

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
