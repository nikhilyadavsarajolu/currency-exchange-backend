
const express = require('express');
const bodyParser = require('body-parser');
const { initDb, saveQuote, getLatestQuotes, getLatestTimestamp, clearOldQuotes } = require('./db');
const { scrapeARSList } = require('./scrapers/ars');
const { scrapeBRLList } = require('./scrapers/brl');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MAX_STALE_SECONDS = 60;

initDb();

async function updateAllIfStale(currency) {
  const last = getLatestTimestamp(currency);
  const now = Date.now();

  if (last && (now - last) / 1000 < MAX_STALE_SECONDS) {
    return;
  }

  
  let results = [];
  try {
    if (currency === 'ARS') {
      results = await scrapeARSList();
    } else if (currency === 'BRL') {
      results = await scrapeBRLList();
    }


    for (const q of results) {
      saveQuote(q);
    }

    clearOldQuotes();
  } catch (err) {
    console.error('updateAllIfStale error', err);
  }
}


app.get('/quotes', async (req, res) => {
  const currency = (req.query.currency || 'ARS').toUpperCase();
  if (!['ARS', 'BRL'].includes(currency))
    return res.status(400).json({ error: 'currency must be ARS or BRL' });

  await updateAllIfStale(currency);
  const rows = getLatestQuotes(currency);
  res.json(rows);
});


app.get('/average', async (req, res) => {
  const currency = (req.query.currency || 'ARS').toUpperCase();
  if (!['ARS', 'BRL'].includes(currency))
    return res.status(400).json({ error: 'currency must be ARS or BRL' });

  await updateAllIfStale(currency);
  const rows = getLatestQuotes(currency);
  if (rows.length === 0) return res.status(500).json({ error: 'no quotes available' });

  const avgBuy = rows.reduce((s, r) => s + r.buy_price, 0) / rows.length;
  const avgSell = rows.reduce((s, r) => s + r.sell_price, 0) / rows.length;

  res.json({
    average_buy_price: Number(avgBuy.toFixed(4)),
    average_sell_price: Number(avgSell.toFixed(4))
  });
});


app.get('/slippage', async (req, res) => {
  const currency = (req.query.currency || 'ARS').toUpperCase();
  if (!['ARS', 'BRL'].includes(currency))
    return res.status(400).json({ error: 'currency must be ARS or BRL' });

  await updateAllIfStale(currency);
  const rows = getLatestQuotes(currency);
  if (rows.length === 0) return res.status(500).json({ error: 'no quotes available' });

  const avgBuy = rows.reduce((s, r) => s + r.buy_price, 0) / rows.length;
  const avgSell = rows.reduce((s, r) => s + r.sell_price, 0) / rows.length;

  const slippage = rows.map(r => ({
    buy_price_slippage: Number(((r.buy_price - avgBuy) / avgBuy).toFixed(4)),
    sell_price_slippage: Number(((r.sell_price - avgSell) / avgSell).toFixed(4)),
    source: r.source
  }));

  res.json(slippage);
});

app.get('/', (req, res) => {
  res.send('✅ Currency Exchange Backend is running successfully!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
