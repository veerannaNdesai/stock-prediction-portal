# 📈 Stock Price Prediction Portal

A full-stack web application for forecasting stock prices using a multi-step **LSTM (Long Short-Term Memory)** deep learning model. Built with a **Django REST Framework** backend, **React.js** frontend, and live data ingestion from **Yahoo Finance**.

---

## 🚀 Live Demo

> _Coming soon / Add your deployed link here_

---

## 🖼️ Screenshots

> _Add screenshots of your dashboard and prediction charts here_

---

## ✨ Features

- 🔍 **Live Stock Data** — Fetches real-time historical data directly from Yahoo Finance via `yfinance`
- 🤖 **LSTM Forecasting** — Multi-step time-series prediction model trained on historical closing prices
- 📊 **Performance Metrics** — Model evaluated using MAE (Mean Absolute Error) and RMSE (Root Mean Squared Error)
- 🔗 **Decoupled Architecture** — RESTful API layer separates ML inference from the React frontend, enabling independent scaling of training and serving
- 🗄️ **SQLite Storage** — Lightweight database for persisting prediction history and user queries
- ⚡ **React.js Dashboard** — Clean, responsive UI to input stock tickers and visualize predictions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Django REST Framework |
| Frontend | React.js |
| ML Model | LSTM / RNN (Keras / TensorFlow) |
| Data Source | Yahoo Finance (`yfinance`) |
| Database | SQLite |
| API | RESTful (JSON) |

---

## 📁 Project Structure

```
stock-prediction-portal/
├── backend/
│   ├── api/                  # Django REST Framework views & serializers
│   ├── ml/                   # LSTM model training & inference scripts
│   │   ├── model.py          # LSTM architecture definition
│   │   ├── train.py          # Model training pipeline
│   │   └── predict.py        # Inference & forecasting logic
│   ├── data/                 # Data ingestion from Yahoo Finance
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components (Chart, Ticker Input, Results)
│   │   ├── api/              # Axios API calls to Django backend
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.9+
- Node.js 16+
- pip

### 1. Clone the Repository

```bash
git clone https://github.com/veerannaNdesai/stock-prediction-portal.git
cd stock-prediction-portal
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will be running at `http://localhost:3000` with the API at `http://localhost:8000`.

---

## 🧠 How the ML Model Works

1. **Data Ingestion** — Historical OHLCV data is fetched from Yahoo Finance using `yfinance`
2. **Preprocessing** — Closing prices are normalized using MinMaxScaler and split into train/test sets
3. **LSTM Architecture** — A multi-layer LSTM network is trained on sequential windowed price data to learn temporal dependencies
4. **Inference** — The trained model is loaded by Django and served via a REST endpoint; the React frontend sends a ticker symbol and receives predicted prices
5. **Evaluation** — Model performance is measured with MAE and RMSE on the held-out test set

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/predict/?ticker=AAPL` | Returns predicted stock prices for a given ticker |
| `GET` | `/api/history/?ticker=AAPL` | Returns historical price data |

---

## 📦 Key Dependencies

```txt
# Backend
django
djangorestframework
yfinance
keras
tensorflow
numpy
pandas
scikit-learn

# Frontend
react
axios
recharts (or chart.js)
```

---

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| MAE | _Add your result_ |
| RMSE | _Add your result_ |
| Test set size | 20% of historical data |

---

## 🔮 Future Improvements

- [ ] Add user authentication (JWT)
- [ ] Support multiple stock comparison
- [ ] Add candlestick chart visualization
- [ ] Deploy model inference as a microservice
- [ ] Add more model architectures (GRU, Transformer)

---

## 👨‍💻 Author

**Veeranna N Desai**  
Python Full Stack Developer | Bangalore, Karnataka  
📧 iveerannadesai@gmail.com  
🔗 [GitHub](https://github.com/veerannaNdesai) · [LinkedIn](https://linkedin.com/in/veeranna-desai)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
