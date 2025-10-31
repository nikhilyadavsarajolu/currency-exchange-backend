
# 💱 Currency Exchange Backend

A Node.js + Express backend that provides **live exchange rate data** (ARS, BRL) from multiple sources using web scraping.  
It stores quotes in a lightweight SQLite database and exposes APIs for **quotes**, **average price**, and **price slippage**.  
Deployed on **Render** for public access.

---


## 🚀 Live Demo

**🔗 Render URL:** [https://currency-exchange-backend-ia50.onrender.com](https://currency-exchange-backend-ia50.onrender.com)

---
##  🧠 Features


- ✅ Fetches real-time exchange rates (ARS, BRL)
- ✅ Computes average buy/sell prices across multiple sources
- ✅ Calculates price slippage per source
- ✅ Auto-refreshes data if older than 60 seconds
- ✅ Lightweight in-memory database (SQLite)

---
## ⚙️ API Endpoints


| Method | Endpoint | Description | Example |
|--------|-----------|-------------|----------|
| **GET** | `/` | Health check | [https://currency-exchange-backend-ia50.onrender.com/](https://currency-exchange-backend-ia50.onrender.com/) |
| **GET** | `/quotes?currency=ARS` | Get all latest exchange quotes | [Try it](https://currency-exchange-backend-ia50.onrender.com/quotes?currency=ARS) |
| **GET** | `/average?currency=ARS` | Get average buy/sell prices | [Try it](https://currency-exchange-backend-ia50.onrender.com/average?currency=ARS) |
| **GET** | `/slippage?currency=ARS` | Get price deviation from average | [Try it](https://currency-exchange-backend-ia50.onrender.com/slippage?currency=ARS) |

---
## 📦 Tech Stack


- **Backend:** Node.js, Express  
- **Web Scraping:** Axios, Cheerio  
- **Database:** SQLite (via `better-sqlite3`)  
- **Deployment:** Render  

---
## 🛠️ Installation (Local Setup)

```bash
# Clone repository
git clone https://github.com/nikhilyadavsarajolu/currency-exchange-backend.git
cd currency-exchange-backend

# Install dependencies
npm install

# Start server
npm start

```

Your backend will be running at http://localhost:3000/.

---
## 🧩 Example Response (GET /quotes?currency=ARS)

```json
[
  {
    "buy_price": 140.3,
    "sell_price": 144.0,
    "source": "https://www.ambito.com/contenidos/dolar.html",
    "currency": "ARS",
    "timestamp": 1761924615348
  }
]
```
---
## 📜 License

This project is licensed under the MIT License.

---
##  👨‍💻 Author

**Nikhil Yadav**  
📎 [LinkedIn](https://www.linkedin.com/in/nikhil-yadav-9a3a90270)  
💻 Backend Developer | Full Stack Enthusiast