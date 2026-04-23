# CLAUDE.md — kharajch---WebXResearch

## What This Project Does
kharajch---WebXResearch is an AI-powered web research tool. Users paste a URL, and the app fetches the webpage content, sends it through NVIDIA NIM (meta/llama-3.1-70b-instruct) via LangChain, and returns a structured summary with title, key points, and topics. Users can then ask follow-up questions through a chat interface.

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Vanilla CSS Modules |
| 3D/Animation | Three.js, React Three Fiber, Framer Motion, GSAP |
| Backend | Python 3.12+, FastAPI, LangChain |
| AI Model | NVIDIA NIM (meta/llama-3.1-70b-instruct) |
| Data Persistence | Browser localStorage |

## API Endpoints
- `POST /research` — Takes `{ url: string }`, returns `{ title, summary, key_points, topics }`
- `POST /chat` — Takes `{ question, context, history }`, returns `{ answer }`
- `GET /` — Health check

## Design Philosophy
- Black and white monochrome theme
- Glassmorphic UI elements with backdrop-blur
- 3D particle background using R3F
- Comprehensive error handling with user-friendly messages
- Mobile-responsive design
- Smooth animations throughout

## How to Run
- **Frontend**: `npm run dev` (Port 3000)
- **Backend**: `cd backend && venv\Scripts\activate && uvicorn main:app --reload` (Port 8000)

## How to Modify
- **Components**: All in `app/components/` with co-located CSS modules
- **Styles/Theme**: CSS custom properties in `app/globals.css`
- **Backend Logic**: `backend/main.py` — prompts, endpoints, LLM config
- **API URL**: Set `NEXT_PUBLIC_API_URL` env var or defaults to `http://localhost:8000`

