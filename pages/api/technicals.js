const KEY = process.env.FINNHUB_KEY;

// ── Technical indicator calculations ──────────────────────────────────────────
function calcRSI(closes, period = 21) {
  if (closes.length < period + 2) return null;
  const gains = [], losses = [];
  for (let i = 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    gains.push(d > 0 ? d : 0);
    losses.push(d < 0 ? Math.abs(d) : 0);
  }
  let ag = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let al = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < gains.length; i++) {
    ag = (ag * (period - 1) + gains[i]) / period;
    al = (al * (period - 1) + losses[i]) / period;
  }
  return 100 - 100 / (1 + ag / (al || 0.0001));
}

function calcATR(h, l, c, period = 14) {
  const trs = [];
  for (let i = 1; i < h.length; i++) {
    trs.push(Math.max(h[i] - l[i], Math.abs(h[i] - c[i - 1]), Math.abs(l[i] - c[i - 1])));
  }
  const last = trs.slice(-period);
  return last.reduce((a, b) => a + b, 0) / last.length;
}

function calcMA(closes, period) {
  if (closes.length < period) return null;
  const slice = closes.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!KEY) return res.status(500).json({ error: 'FINNHUB_KEY not set' });
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol required' });
  try {
    const to   = Math.floor(Date.now() / 1000);
    const from = to - 210 * 86400; // ~7 months for MA150
    const r = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol.toUpperCase()}&resolution=D&from=${from}&to=${to}&token=${KEY}`
    );
    const d = await r.json();
    if (d.s !== 'ok' || !d.c?.length) return res.status(404).json({ error: 'No candle data' });

    const c = d.c, h = d.h, l = d.l;
    const round = (n) => n != null ? Math.round(n * 100) / 100 : null;

    return res.json({
      rsi:   round(calcRSI(c, 21)),
      atr:   round(calcATR(h, l, c, 14)),
      ma50:  round(calcMA(c, 50)),
      ma100: round(calcMA(c, 100)),
      ma150: round(calcMA(c, 150)),
      closes: c.slice(-60), // last 60 days for invest chart
      timestamps: d.t.slice(-60),
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
