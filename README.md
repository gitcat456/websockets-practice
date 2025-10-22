# ChatPulse – WebSocket Chat Demo

A minimal real‑time chat application using WebSockets, built with Node.js, Express and `ws`.  
Live demo: [https://chatpulse‑652z.onrender.com](https://chatpulse‑652z.onrender.com)

## Features

- Real‑time message broadcasting across connected clients.  
- Live update of number of connected users.  
- Simple and clean UI for quick testing / demo purposes.  
- Lightweight setup: just `server.js` (backend) + static `public/index.html` frontend.  
- Built for learning: great for seeing how WebSocket connections work.

## Tech Stack

- Node.js  
- [Express](https://expressjs.com/) (for serving static files and HTTP server)  
- [ws](https://github.com/websockets/ws) WebSocket library  
- Plain HTML + JavaScript on the client side

## 📁 Project Structure

/ (project root)
│ server.js ← backend entry point
│ package.json
│
└─ public/
└─ index.html ← frontend UI
