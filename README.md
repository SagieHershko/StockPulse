# StockPulse — Live Stock Dashboard

A modern, minimal stock market dashboard built with **Next.js** + **Tailwind CSS**.

## Features
- 🔍 Live stock search (any ticker)
- 📈 Interactive TradingView chart (click to open full platform)
- 📰 Real-time company news feed
- 🏢 Company profile & key stats
- 🧮 Investment calculator — "if I had invested $X on date Y, what is it worth today?"

## Tech Stack
- **Next.js 14** — React framework with server-side API routes (solves CORS completely)
- **Tailwind CSS** — utility-first styling
- **Finnhub API** — live quotes, company profiles, news, historical prices
- **TradingView Advanced Chart Widget** — interactive embedded chart

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Finnhub API key
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` and set your key:
```
FINNHUB_KEY=d8343j9r01ql4ong82i0d8343j9r01ql4ong82ig
```
Get a free key at https://finnhub.io

### 3. Run the development server
```bash
npm run dev
```
Open http://localhost:3000

### 4. Build for production
```bash
npm run build
npm start
```

## Project Structure
```
stockpulse/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Main dashboard UI
│   └── api/
│       ├── quote.js     # GET /api/quote?symbol=AAPL
│       ├── profile.js   # GET /api/profile?symbol=AAPL
│       ├── news.js      # GET /api/news?symbol=AAPL
│       └── candles.js   # GET /api/candles?symbol=AAPL&date=2023-01-15
├── components/
│   └── TradingViewChart.js   # TradingView widget (client-only)
├── styles/
│   └── globals.css
├── tailwind.config.js
├── next.config.js
└── .env.local           # Your Finnhub key (never commit this)
```

## Investment Calculator Formula

```
P_initial  = historical closing price on the chosen date
P_current  = current live price
V_invested = amount the user entered

shares     = V_invested  / P_initial
V_current  = shares      × P_current
gain_$     = V_current   − V_invested
gain_%     = (gain_$ / V_invested) × 100
```

Historical prices are fetched server-side from Finnhub's candle API with a ±4 day window to handle weekends and market holidays.

## Deploy to Vercel (free)
```bash
npm install -g vercel
vercel
```
Set `FINNHUB_KEY` as an environment variable in the Vercel dashboard.
