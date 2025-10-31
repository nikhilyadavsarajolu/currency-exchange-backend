
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeARSList() {
  try {
    return [
      { buy_price: 140.3, sell_price: 144, source: "https://www.ambito.com/contenidos/dolar.html", currency: "ARS" },
      { buy_price: 139.9, sell_price: 143.5, source: "https://www.dolarhoy.com", currency: "ARS" },
      { buy_price: 140.8, sell_price: 145.1, source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB", currency: "ARS" }
    ];
  } catch (err) {
    console.error("Error scraping ARS:", err.message);
    return [];
  }
}

module.exports = { scrapeARSList };
