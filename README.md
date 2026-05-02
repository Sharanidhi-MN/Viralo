# 🎬 Viral Video Chopper

Turn long YouTube videos into short, viral-ready clips with AI.

## 🚀 How to Run

### 1. Prerequisites
- Node.js installed
- OpenAI API Key

### 2. Setup Backend
1. Go to the `server` directory:
   ```bash
   cd server
   ```
2. Create a `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *The server will run on http://localhost:5001*

### 3. Setup Frontend
1. Open a new terminal and go to the `client` directory:
   ```bash
   cd client
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 in your browser.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Axios, Lucide Icons
- **Backend:** Node.js, Express, OpenAI API, youtube-transcript
- **Design:** Modern dark mode with Glassmorphism
