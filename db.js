let db = {
  ARS: [],
  BRL: []
};


function saveQuote(quote) {
  const { currency } = quote;
  if (!db[currency]) db[currency] = [];
  db[currency].push({ ...quote, timestamp: Date.now() });
}

function getLatestQuotes(currency) {
  if (!db[currency]) return [];
  return db[currency].slice(-5);
}

function getLatestTimestamp(currency) {
  if (!db[currency] || db[currency].length === 0) return null;
  return db[currency][db[currency].length - 1].timestamp;
}


function clearOldQuotes() {
  for (const c in db) {
    if (db[c].length > 20) db[c] = db[c].slice(-20);
  }
}

function initDb() {
  console.log('In-memory DB initialized');
}

module.exports = {
  initDb,
  saveQuote,
  getLatestQuotes,
  getLatestTimestamp,
  clearOldQuotes
};
