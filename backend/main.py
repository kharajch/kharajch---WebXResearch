"""
kharajch---WebXResearch Backend
FastAPI + LangChain powered web research summarizer using NVIDIA NIM
"""

import os
import json
from typing import List, Optional
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_core.prompts import PromptTemplate
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# ── Load environment variables ──────────────────────────────────────────────
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
NVIDIA_MODEL = os.getenv("NVIDIA_MODEL")

if not NVIDIA_API_KEY:
    print("⚠️  WARNING: NVIDIA_API_KEY is not set. Please update your .env file.")

# ── FastAPI App ─────────────────────────────────────────────────────────────
app = FastAPI(
    title="kharajch---WebXResearch API",
    description="AI-powered web research summarizer",
    version="1.0.0",
)

# CORS — allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── LLM Setup ──────────────────────────────────────────────────────────────
def get_llm():
    """Creates and returns the NVIDIA LLM instance."""
    return ChatNVIDIA(
        model=NVIDIA_MODEL,
        temperature=0.3,
    )

# ── Pydantic Models ────────────────────────────────────────────────────────
class ResearchRequest(BaseModel):
    url: str = Field(..., description="The URL of the webpage to summarize")

class ChatRequest(BaseModel):
    question: str = Field(..., description="The follow-up question to ask")
    context: str = Field(..., description="The webpage summary context")
    history: List[dict] = Field(default=[], description="Chat history")

class SummaryResponse(BaseModel):
    title: str = Field(description="The title of the webpage")
    summary: str = Field(description="A comprehensive summary of the webpage content")
    key_points: List[str] = Field(description="Key takeaway points from the content")
    topics: List[str] = Field(description="Main topics covered in the content")

class ChatResponse(BaseModel):
    answer: str = Field(description="The answer to the user's question")

# ── JSON Schema for structured output ──────────────────────────────────────
summary_json_schema = {
    "title": "WebpageSummary",
    "description": "A structured summary of a webpage",
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "description": "The title of the webpage",
        },
        "summary": {
            "type": "string",
            "description": "A comprehensive summary of the webpage content in 3-5 paragraphs",
        },
        "key_points": {
            "type": "array",
            "items": {"type": "string"},
            "description": "5-10 key takeaway points from the content",
        },
        "topics": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Main topics covered in the content",
        },
    },
    "required": ["title", "summary", "key_points", "topics"],
}

# ── Summarization Prompt ───────────────────────────────────────────────────
SUMMARIZE_PROMPT = PromptTemplate(
    input_variables=["content"],
    template="""You are an expert research summarizer. Analyze the following webpage content and provide a comprehensive, well-structured summary.

Your summary should:
1. Capture the main thesis and key arguments
2. Highlight important data points, statistics, or findings
3. Identify the key topics discussed
4. Extract 5-10 key takeaway points
5. Be written in clear, academic language

WEBPAGE CONTENT:
{content}

Provide your response as a structured JSON with the following fields:
- title: The title or main heading of the content
- summary: A comprehensive summary in 3-5 paragraphs
- key_points: An array of 5-10 key takeaway points
- topics: An array of main topics covered
""",
)

# ── Chat Prompt ────────────────────────────────────────────────────────────
CHAT_PROMPT = PromptTemplate(
    input_variables=["context", "history", "question"],
    template="""You are a knowledgeable research assistant. You have analyzed a webpage and here is the summary context:

RESEARCH CONTEXT:
{context}

PREVIOUS CONVERSATION:
{history}

USER QUESTION:
{question}

Provide a clear, detailed, and helpful answer based on the research context. If the question cannot be answered from the given context, say so and provide the best guidance you can.
""",
)


# ── Endpoints ──────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "message": "kharajch---WebXResearch API is running"}


@app.post("/research", response_model=SummaryResponse)
async def research(request: ResearchRequest):
    """
    Fetches a webpage, splits its content, and returns an AI-generated summary.
    """
    try:
        # 1. Validate URL
        url = request.url.strip()
        if not url.startswith(("http://", "https://")):
            raise HTTPException(status_code=400, detail="Invalid URL. Must start with http:// or https://")

        # 2. Fetch webpage content using WebBaseLoader
        try:
            loader = WebBaseLoader(url)
            documents = loader.load()
        except Exception as e:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to fetch webpage content. The URL may be invalid or the server is unreachable. Error: {str(e)}",
            )

        if not documents or not documents[0].page_content.strip():
            raise HTTPException(
                status_code=422,
                detail="The webpage returned no readable content.",
            )

        # 3. Split content into chunks using RecursiveCharacterTextSplitter
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=10000,
            chunk_overlap=500,
            length_function=len,
        )
        splits = text_splitter.split_documents(documents)

        # Combine chunks (use first few chunks to stay within token limits)
        combined_content = "\n\n".join([split.page_content for split in splits[:5]])

        # Limit content length to avoid token overflow
        if len(combined_content) > 50000:
            combined_content = combined_content[:50000]

        # 4. Send to LLM with PromptTemplate
        llm = get_llm()

        # Use with_structured_output for JSON schema
        structured_llm = llm.with_structured_output(summary_json_schema)

        prompt_text = SUMMARIZE_PROMPT.format(content=combined_content)

        # 5. Get structured response
        try:
            result = structured_llm.invoke(prompt_text)
        except Exception as e:
            raise HTTPException(
                status_code=503,
                detail=f"The AI model failed to generate a summary. Error: {str(e)}",
            )

        # 6. Extract and return the response
        if isinstance(result, dict):
            return SummaryResponse(
                title=result.get("title", "Untitled"),
                summary=result.get("summary", "No summary available."),
                key_points=result.get("key_points", []),
                topics=result.get("topics", []),
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="Unexpected response format from AI model.",
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}",
        )


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handles follow-up questions about the research context.
    """
    try:
        # Build history string
        history_str = ""
        for msg in request.history[-10:]:  # Keep last 10 messages for context
            role = msg.get("role", "user")
            content = msg.get("content", "")
            history_str += f"{role.upper()}: {content}\n"

        # Format the prompt
        prompt_text = CHAT_PROMPT.format(
            context=request.context,
            history=history_str if history_str else "No previous conversation.",
            question=request.question,
        )

        # Send to LLM
        llm = get_llm()

        try:
            response = llm.invoke(prompt_text)
        except Exception as e:
            raise HTTPException(
                status_code=503,
                detail=f"The AI model failed to generate an answer. Error: {str(e)}",
            )

        # Handle cases where content is a list of content blocks
        # (e.g., [{'type': 'text', 'text': '...'}]) instead of a plain string
        answer_content = response.content
        if isinstance(answer_content, list):
            answer_content = "".join(
                block.get("text", "") if isinstance(block, dict) else str(block)
                for block in answer_content
            )

        return ChatResponse(answer=answer_content)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
