# AGENTS.md — kharajch---WebXResearch

## Project Context
This is a full-stack AI web research summarizer application. The project uses a Next.js frontend with a Python FastAPI backend powered by LangChain and NVIDIA NIM (meta/llama-3.1-70b-instruct).

## Project Structure
```
kharajch---WebXResearch/
├── app/                        # Next.js App Router
│   ├── components/             # React components
│   │   ├── Scene3D.js          # Three.js 3D background
│   │   ├── Hero.js             # Hero section with logo
│   │   ├── SearchBar.js        # URL search input
│   │   ├── Summary.js          # AI summary display
│   │   ├── ChatBox.js          # Chat interface
│   │   ├── ChatHistory.js      # Research history
│   │   ├── Footer.js           # Footer
│   │   ├── ErrorMessage.js     # Error display
│   │   └── *.module.css        # Component styles
│   ├── globals.css             # Design system & theme
│   ├── layout.js               # Root layout with SEO
│   └── page.js                 # Main page
├── backend/                    # Python FastAPI backend
│   ├── main.py                 # API endpoints
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Python virtual environment
├── public/                     # Static assets
│   ├── logo.png                # App logo
│   └── favicon.png             # Favicon
├── planning/                   # Planning documents
│   ├── design.md               # Design decisions
│   ├── spec.md                 # Functional spec
│   └── implementation_plan.md  # Implementation plan
└── .env                        # Environment variables
```

## Key Technical Decisions
1. **Vanilla CSS** — No Tailwind. All styling via CSS Modules with CSS custom properties
2. **WebBaseLoader** — Uses LangChain's WebBaseLoader (BeautifulSoup) instead of Spider for free webpage fetching
3. **Structured Output** — Uses `with_structured_output()` for reliable JSON responses from LLM
4. **localStorage** — Chat history and research sessions persisted client-side
5. **Error Handling** — Comprehensive error handling at every layer with user-friendly messages

## Development
```bash
# Frontend (port 3000)
npm run dev

# Backend (port 8000)
cd backend && venv\Scripts\activate && uvicorn main:app --reload
```

## Important Notes
- Set `NVIDIA_API_KEY` in `.env` before running
- Backend CORS is configured for `localhost:3000`
- The frontend expects the backend at `http://localhost:8000`
