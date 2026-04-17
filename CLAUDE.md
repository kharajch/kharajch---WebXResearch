# CLAUDE.md — kharajch---WebXResearch

## What This Project Does
kharajch---WebXResearch is an AI-powered web research tool. Users paste a URL, and the app fetches the webpage content, sends it through Google Gemini 3.1 Pro via LangChain, and returns a structured summary with title, key points, and topics. Users can then ask follow-up questions through a chat interface.

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Vanilla CSS Modules |
| 3D/Animation | Three.js, React Three Fiber, Framer Motion, GSAP |
| Backend | Python 3.14, FastAPI, LangChain |
| AI Model | Google Gemini 3.1 Pro via langchain-google-genai |
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

## How to Modify
- **Components**: All in `app/components/` with co-located CSS modules
- **Styles/Theme**: CSS custom properties in `app/globals.css`
- **Backend Logic**: `backend/main.py` — prompts, endpoints, LLM config
- **API URL**: Set `NEXT_PUBLIC_API_URL` env var or defaults to `http://localhost:8000`
