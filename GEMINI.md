# GEMINI.md — kharajch---WebXResearch

## Project Overview
**kharajch---WebXResearch** is an AI-powered web research summarizer that uses NVIDIA NIM (meta/llama-3.1-70b-instruct) to analyze and summarize webpage content. Users can paste any URL to get instant, comprehensive summaries with key insights, and then ask follow-up questions via a chat interface.

## Architecture
- **Frontend**: Next.js (App Router) + React 19 with Vanilla CSS
- **Backend**: Python FastAPI + LangChain with NVIDIA NIM (meta/llama-3.1-70b-instruct)
- **Design**: Black & white glassmorphic theme with 3D elements

- `backend/main.py` — Main FastAPI application
- `POST /research` — Accepts a URL, fetches content via WebBaseLoader, splits with RecursiveCharacterTextSplitter, summarizes with NVIDIA NIM using structured JSON output
- `POST /chat` — Accepts a question + context + history, returns AI-generated answer
- LLM: `meta/llama-3.1-70b-instruct` via `langchain-nvidia-ai-endpoints`

## Frontend (Next.js)
- `app/page.js` — Main page orchestrating all components
- `app/components/` — Modular components: Hero, SearchBar, Summary, ChatBox, ChatHistory, Footer, ErrorMessage, Scene3D
- 3D background using React Three Fiber
- Animations via Framer Motion and GSAP
- Chat history persisted in localStorage

## Environment Variables
- `NVIDIA_API_KEY` — Your NVIDIA API key (set in `.env`)

## Running
```bash
# Backend
cd backend && venv\Scripts\activate && uvicorn main:app --reload

# Frontend
npm run dev
```
