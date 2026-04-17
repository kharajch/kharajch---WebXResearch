# kharajch---WebXResearch — Implementation Plan

A full-stack AI-powered web research summarizer: Next.js frontend + FastAPI/LangChain backend + Google Gemini 3.1 Pro.

## Proposed Changes

### Phase 1: Initialization & Setup

#### 1.1 Git & Project Structure
- `git init` in project root
- Create `.gitignore` (node_modules, .env, venv, .next, __pycache__, etc.)
- Create `planning/` folder, copy `design.md` and `spec.md` into it

#### 1.2 Next.js Frontend Scaffold
- `npx create-next-app@latest ./` (with App Router, no Tailwind, no src dir, JavaScript)
- Install all frontend dependencies:
  ```
  npm install framer-motion gsap three @react-three/fiber @react-three/drei
  react-icons react-scroll react-tilt react-parallax @react-spring/web
  react-flip-toolkit
  ```

#### 1.3 Python Backend Setup
- Create `backend/` directory
- Create virtual environment `venv` inside `backend/`
- Install Python deps:
  ```
  pip install fastapi uvicorn langchain langchain-core langchain-community
  langchain-google-genai python-dotenv requests beautifulsoup4
  ```

#### 1.4 Environment
- Create `.env` in root with `GEMINI_API_KEY=Your_API_KEY`

#### 1.5 Git Commit — "Initial Commit"

---

### Phase 2: Backend Development

#### [NEW] `backend/main.py`
- FastAPI app with CORS middleware (allow Next.js origin)
- **`POST /research`** endpoint:
  1. Receives `{ url: string }` from frontend
  2. Uses `WebBaseLoader` to fetch webpage content
  3. Uses `RecursiveCharacterTextSplitter` to chunk content
  4. Builds a `PromptTemplate` for summarization
  5. Sends to `ChatGoogleGenerativeAI(model="gemini-3.1-pro")`
  6. Uses `with_structured_output(json_schema)` for structured JSON response
  7. Returns summary with key points, title, and metadata
- **`POST /chat`** endpoint:
  1. Receives `{ question: string, context: string, history: array }`
  2. Sends question + webpage context + chat history to Gemini
  3. Returns answer
- Full error handling: network errors, LLM failures, invalid URLs

#### [NEW] `backend/requirements.txt`
- All Python dependencies pinned

#### Git Commit — "Backend Development Completed"

---

### Phase 3: Frontend Design (Google Stitch)

#### 3.1 Stitch Design System
- Create project in Stitch
- Design system: Black & white theme, modern typography, rounded shapes
- Generate screens:
  - Hero / Landing page with logo & searchbar
  - Research results / Summary view
  - Chat interface
- Generate logo and favicon assets

#### 3.2 Export Assets
- Download/save logo as `public/logo.jpg`
- Download/save favicon as `public/favicon.ico`

---

### Phase 4: Frontend Development

#### Project Structure
```
app/
├── layout.js          — Root layout with metadata, fonts, favicon
├── page.js            — Main landing page (Hero + Search + Results + Chat)
├── globals.css        — Global styles, CSS variables, resets
├── components/
│   ├── Hero.js        — 3D animated hero with logo, title, particles
│   ├── Hero.module.css
│   ├── SearchBar.js   — URL input with submit button
│   ├── SearchBar.module.css
│   ├── Summary.js     — Displays AI summary with animations
│   ├── Summary.module.css
│   ├── ChatBox.js     — Chat interface for follow-up questions
│   ├── ChatBox.module.css
│   ├── ChatHistory.js — Shows saved chat history from localStorage
│   ├── ChatHistory.module.css
│   ├── Footer.js      — Modern footer
│   ├── Footer.module.css
│   ├── Scene3D.js     — Three.js/R3F 3D background scene
│   └── ErrorMessage.js — Reusable error display component
public/
├── logo.jpg           — Generated via Stitch
└── favicon.ico        — Generated via Stitch
```

#### Key Implementation Details

**Hero Section** (`Hero.js`)
- Full-viewport hero with 3D particle background (React Three Fiber)
- Logo display with GSAP entrance animation
- Title "kharajch---WebXResearch" with typing/reveal effect
- Smooth scroll indicator

**SearchBar** (`SearchBar.js`)
- Glassmorphic input field for URL
- Animated submit button with loading state
- Framer Motion entrance animation
- Input validation for URLs

**Summary** (`Summary.js`)
- Animated card layout showing: title, key points, full summary
- Framer Motion stagger animations for content reveal
- React Tilt effect on summary cards
- Copy-to-clipboard functionality

**ChatBox** (`ChatBox.js`)
- Message bubbles (user/AI) with Framer Motion animations
- Auto-scroll to latest message
- Loading indicator while waiting for AI response
- localStorage persistence

**3D Scene** (`Scene3D.js`)
- Floating geometric particles (black/white theme)
- Subtle rotation and parallax on mouse move
- Performance-optimized with `drei` helpers

**Footer** (`Footer.js`)
- Minimal, modern footer with branding

#### Styling Approach
- **Vanilla CSS only** via CSS Modules
- CSS custom properties for theming (black/white palette)
- Responsive design with media queries
- Smooth transitions on all interactive elements

#### Error Handling (per spec.md)
- Network errors → user-friendly toast/message
- Backend unreachable → retry prompt
- LLM failures → "Could not summarize" message
- localStorage errors → graceful fallback
- All errors surfaced via `ErrorMessage` component

#### Git Commit — "Frontend Development Completed"

---

### Phase 5: Final Deliverables

#### [NEW] `GEMINI.md`, `AGENTS.md`, `CLAUDE.md`
- Project context files describing the app, its architecture, and how to work with it

#### [NEW] `planning/design.md` & `planning/spec.md`
- Copies of the original planning documents

#### Final Git Commit

---

## Verification Plan

### Automated Tests
- Start backend with `uvicorn backend.main:app --reload` and verify `/research` and `/chat` endpoints respond
- Start frontend with `npm run dev` and verify pages render
- Browser test: navigate to localhost, verify hero section, searchbar, and UI elements load

### Manual Verification
- Visual inspection of UI — verify black/white theme, animations, 3D elements
- Test URL submission flow end-to-end (requires valid `GEMINI_API_KEY`)
- Test error states (invalid URL, backend down, etc.)
