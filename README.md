Here is the final, production-ready `README.md` file tailored specifically to your complete project structure. It features descriptions of every frontend component and backend script from your repository, accurate setup commands, structural architecture breakdowns, and full API payloads matching your code logic.

Overwrite the contents of your root **`README.md`** file with this exact markdown block:

```markdown
# 🏟️ Smart Stadium AI

An AI-powered Smart Stadium Management Dashboard built using the MERN stack: React (Vite), Express.js, Socket.IO, Tailwind CSS, Leaflet Maps, and Google's Gemini AI. The application provides real-time stadium telemetry monitoring, intelligent AI assistance, crowd analytics, automated parking recommendations, emergency support, voice interaction, and tournament operations management.

---

# 🚀 Features

## 📊 Dashboard Modules
- **Live Visitor Telemetry (`Dashboard.jsx`)**: Tracks active attendance figures and historical visitor numbers seamlessly.
- **Crowd Density Charts (`CrowdChart.jsx`)**: Uses Recharts to visualize real-time high-density timeline tracking.
- **Real-Time Parking Occupancy (`ParkingCard.jsx`)**: Visualizes individual lot capacities with red/yellow/green state indicators.
- **Food Court Queue Monitoring (`FoodQueueCard.jsx`)**: Monitors line latency times across various vendor stalls.
- **Live Notification Engine (`NotificationPanel.jsx`)**: Evaluates active state metrics to generate dynamic advisory warnings for lots, queues, or high temperatures.
- **Weather Telemetry (`WeatherCard.jsx`)**: Displays localization metrics fetched dynamically from physical sensor endpoints.

## 🤖 AI Capabilities (Powered by Google Gemini 2.5 Flash)
- **Smart Stadium AI Assistant (`AIChat.jsx`)**: A conversational panel injected with real-time stadium context and selected map coordinates.
- **AI Parking Recommendation (`ParkingRecommendation.jsx`)**: Recommends the optimal entry lot based strictly on current lot density percentages.
- **AI Crowd Prediction (`CrowdPrediction.jsx`)**: Generates 1-hour look-ahead trends, risk categories, and structural staff allocation plans.
- **Smart Navigation Assistant (`NavigationAssistant.jsx`)**: Resolves seating bay gates, physical stadium landmarks, and routing text prompts.
- **Emergency Assistant (`EmergencyAssistant.jsx`)**: Provides instant blueprint action plans for Medical, Fire, Security, and Missing Child incidents.
- **AI Operations Dashboard (`OperationsDashboard.jsx`)**: Compiles formal operational reviews and flags supervisor task priorities.
- **AI Match Insights (`MatchInsights.jsx`)**: Analyzes how local weather and seating density variables correlate with athlete stamina.
- **Tournament Control Center (`TournamentControlCenter.jsx`)**: Leverages optimized `useMemo` hooks to provide instant operational optimization scores.

## 🎤 Voice & Map Integrations
- **Voice Assistant (`VoiceAssistant.jsx`)**: Leverages browser speech-to-text engines using `react-speech-recognition` to stream voice queries into Gemini.
- **Interactive Stadium Map (`StadiumMap.jsx`)**: Renders high-fidelity spatial telemetry via Leaflet and OpenStreetMap, passing coordinate selections up to your global application state.

---

# 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 & Vite
- **Styling Architecture**: Tailwind CSS (v4)
- **Data Visualization**: Recharts (v3)
- **Geospatial Layer**: React Leaflet & Leaflet (OpenStreetMap)
- **Real-Time Gateway**: Socket.IO Client
- **Speech Engines**: React Speech Recognition (Web Speech API)
- **Network Layer**: Axios

### Backend
- **Runtime Environment**: Node.js & Express.js
- **Streaming WebSockets**: Socket.IO
- **External Framework**: Axios (Open-Meteo API data aggregation)
- **Environment Management**: Dotenv & CORS

### AI Engine
- **Generative Framework**: Google GenAI SDK (`@google/genai`) running `gemini-2.5-flash`

---

# 📂 Project Structure


```

Smart-Stadium-AI
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── AIChat.jsx
│   │   │   ├── CrowdChart.jsx
│   │   │   ├── CrowdPrediction.jsx
│   │   │   ├── EmergencyAssistant.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── FoodQueueCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MatchInsights.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NavigationAssistant.jsx
│   │   │   ├── NotificationPanel.jsx
│   │   │   ├── OperationsDashboard.jsx
│   │   │   ├── ParkingCard.jsx
│   │   │   ├── ParkingRecommendation.jsx
│   │   │   ├── StadiumMap.jsx
│   │   │   ├── TournamentControlCenter.jsx
│   │   │   ├── VoiceAssistant.jsx
│   │   │   └── WeatherCard.jsx
│   │   │
│   │   ├── pages
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── server
│   ├── data
│   │   └── stadiumData.js
│   ├── routes
│   │   ├── ai.js
│   │   └── stadium.js
│   ├── services
│   │   └── stadiumService.js
│   ├── socket
│   │   └── socket.js
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore

```

---

# ⚙️ Workspace Setup & Local Installation

### 1. Clone Repository
```bash
git clone [https://github.com/gnaneshwari1802/Smart-Stadium-AI.git](https://github.com/gnaneshwari1802/Smart-Stadium-AI.git)
cd Smart-Stadium-AI

```

### 2. Configure Backend Dependancy Trees

```bash
cd server
npm install

```

### 3. Configure Frontend Client Layers

```bash
cd ../client
npm install

```

---

# 🔑 Environment Variables

Create a new file named `.env` inside your **`server`** workspace directory:

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

```

> Note: Generate your secure API authorization keys directly via Google AI Studio.

---

# ▶️ Local Run Scripts

### Boot Node.js/Express Server Context

```bash
cd server
npm run dev

```

*Backend application running and listening on:* `http://localhost:5000`

### Boot React Client Interface

Open a completely separate secondary shell console window:

```bash
cd client
npm run dev

```

*Vite local development dashboard running at:* `http://localhost:5173`

---

# 🚀 Git & Repository Alignment Reference

When matching or pushing updates up to a personal remote fork, handle repository references cleanly using these commands to resolve overlapping setup structures:

```bash
# 1. Stage and register components
git init
git add .
git commit -m "feat: complete core smart stadium integration"
git branch -M main

# 2. Re-anchor upstream remote routing tables
git remote set-url origin [https://github.com/gnaneshwari1802/Smart-Stadium-AI.git](https://github.com/gnaneshwari1802/Smart-Stadium-AI.git)

# 3. Secure sync with main track
git push -u origin main

```

---

# 📡 Backend Endpoints

### Get Live Telemetry State

* **Route**: `GET /api/stadium`
* **Output Format**:

```json
{
  "visitors": 42831,
  "parking": { "A": 72, "B": 48, "C": 31 },
  "food": [
    { "name": "Pizza Hub", "wait": 5 },
    { "name": "Burger Point", "wait": 12 }
  ],
  "weather": { "temperature": 27, "condition": "Partly Cloudy" }
}

```

### Prompt Compilation with Live Context

* **Route**: `POST /api/ai`
* **Payload Structure**:

```json
{
  "prompt": "Which parking area is least crowded?",
  "stadiumData": { "visitors": 42831, "parking": { "A": 72, "B": 48, "C": 31 } }
}

```

* **Output Structure**:

```json
{
  "reply": "Parking Lot C currently sits at only 31% capacity and is your optimal choice."
}

```

---

# 🏗️ System Architecture

```
                 ┌────────────────────────────────┐
                 │       React + Vite UI Layer    │
                 └───────────────┬────────────────┘
                                 │ REST HTTP Callbacks /
                                 │ Web Socket Push Pipelines
                                 ▼
                 ┌────────────────────────────────┐
                 │      Node.js Express Server    │
                 └───────────────┬────────────────┘
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐    ┌──────────────────┐
│ Google Gemini    │   │  Mock Sensor     │    │ Open-Meteo       │
│ Generative AI    │   │  Data Generator  │    │ Live Weather API │
└──────────────────┘   └──────────────────┘    └──────────────────┘

```

---

# 🌐 Production Deployments

* **Frontend Client Hosting (Vercel)**: *[[Insert Live Vercel Link]]( https://smart-stadium-ai-seven.vercel.app/)*
* **Backend Infrastructure Hosting (Render)**: *[[Insert Live Render Link](https://smart-stadium-ai.onrender.com/)]*

---

# 📷 Component Screenshots

*Insert visual previews or tracking walk-through elements below:*

* Main Telemetry Metrics & High-Density Recharts Timelines
* Interactive Leaflet Coordinates Selection Mapping
* Context-Aware Gemini AI Response Output Modals

---

# 🏆 Hackathon Architectural Highlights

* **Context-Engine Bundling**: Every API call dynamically wraps state metrics (Lot fill ratios, crowd trends, map markers) inside structured system instructions.
* **Fail-Safe Fallbacks**: Open-Meteo integrations include catch-handlers to provide default telemetry if external connections fail.
* **Bi-Directional Pushes**: Implements Socket.IO pipelines to broadcast global stadium states synchronously every 5 seconds.

---

# 👩‍💻 Developer

**Gnaneshwari Mahimaluru**

* **GitHub Profile**: [@gnaneshwari1802](https://github.com/gnaneshwari1802)

---

# 📄 License

This repository is distributed for evaluation, hackathon panels, and educational use cases.

---

💡 *If this implementation helped you build real-time AI context architectures, consider dropped a ⭐ on the repository!*

```

```
