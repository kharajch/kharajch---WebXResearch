# Objective

    I want to design a web application that can summarize a full webpage content so that I can easily understand the research topic in less time. 

    The Web App Will Be Named "kharajch---WebXResearch"

# Tech Stact

    1. Google Stitch (IMPORTANT - Must Use Google Stitch for Designing)
    2. HTML
    3. CSS
    4. JavaScript
    5. Next.js (IMPORTANT - Must Use Next.js for Frontend)
    6. React
    7. Vanila CSS (IMPORTANT - No Tailwind CSS, Using Vanila CSS Is Strictly Required For Styling)
    8. LangChain (IMPORTANT - Must Use LangChain for Backend)
    9. Python (IMPORTANT - Must Use Python for Backend)
    10. FastAPI (IMPORTANT - Must Use FastAPI for Backend)
    11. Framer Motion
    12. GSAP
    13. Three.js
    14. React Three Fiber
    15. React Icons
    13. React Scroll
    14. React Tilt
    15. React Parallax
    16. React Spring
    16. React Flip Toolkit

# Architecture

    1. The web application will have a frontend and a backend.
    2. The frontend will have a searchbar and a chatbox to ask questions about the research topic.
    3. The backend will have an endpoint to handle the requests from the frontend and send the responses to the frontend.
    4. The frontend will submit a post request to the backend endpoint with the URL of the webpage.
    5. The backend will fetch the content of the webpage and send it to the LLM to summarize.
    6. The LLM will return the summary of the webpage content.
    7. The backend will send the summary to the frontend.
    8. The frontend will display the summary to the user.
    9. The user can ask questions about the research topic.
    10. The backend will send the questions to the LLM and return the answers to the frontend.
    11. The frontend will display the answers to the user.
    12. The chat history will be saved in the local storage of the browser.

# Design

    1. The Website Will Be A Modern Website With Smooth Animations And Transitions.
    2. Theme Color Will Be Black And White With 3D Designs and Animations.
    3. Hero Section  Will Be Modern And Eye Catching. It Will Also Include The Company Logo @logo.jpg
    4.Title Of The Website Will Be "kharajch---WebXResearch"
    5.Favicon Will Be Photo @favicon.ico

# Workflow

 ## Initialization & Setup

    1. Initialize A Git Repository. (use `git init`)
    2. Create a .gitignore file and add all the dependencies and node_modules, .env, venv folder to it.
    3. Create A New Next.js Project. (use `npx create-next-app@latest`)
    4. Install All The Dependencies. (use `npm install`)
    5. Create A Virtual Environment Named "venv" For Python
    6. Install The Dependencies -
        a. FastAPI
        b. LangChain
        c. Langchain-core
        d. Langchain-community
        e. Langchain-google-genai
        f. Python-dotenv
        g. Requests
        h. BeautifulSoup4
    6. Create A .env File In The Root Directory And Add The Following Variables -
        a. GEMINI_API_KEY=Your_API_KEY

   ### git

        1. Stage All The Files. (use `git add .`)
        2. Commit The Code With The Message "Initial Commit". (use `git commit -m "Initial Commit"`)

 ## Backend Development

    1. Create A Langchain Based Application Using FastAPI And LangChain -
        a. import Fast API from fastapi
        b. import Langchain_genai from langchain_google_genai
        c. import load_dotenv from dotenv
        d. import ChatOpenRouter from langchain_openrouter
        e. import SystemMessage, HumanMessage, AIMessage from langchain_core.messages
        f. from langchain_core.prompts import PromptTemplate
        g. Create a FastAPI endpoint named "/research" where the frontend page will submit a post request with the URL of the webpage and it will return the summary of the webpage content.
        h. Use Spider document loader to fetch the content of the webpage.
        i. Use RecursiveCharacterTextSplitter to split the content of the webpage into chunks.
        j. send it to llm with a prompt to summarize the content. (IMPORTANT - Use Google Gemini 3.0 Pro & Use PromptTemplate() To Create The Prompt)
        k. Use with_structured_output(json_schema) to get the response in JSON format and then extract the conten out of it.
        l. Send The Response To The Frontend.

   ### git

        1. Stage All The Files.
        2. Commit The Code With The Message "Backend Development Completed". (use `git commit -m "Backend Development Completed"`)

 ## Frontend Development

    1. Create The Frontend Design Using Google Stitch.
    2. Create A Modern Logo Using Google Stitch. (save it as @logo.jpg)
    3. Create A Modern Favicon And Design Using Google Stitch. (save it as @favicon.ico)
    4. Create A Modern Website Using Next.js And React.
    5. Use Vanila CSS For Styling.
    6. Use Framer Motion And GSAP For Animations.
    6. Use Three.js And React Three Fiber For 3D Designs.
    7. Use React Icons For Icons.
    8. Use React Scroll For Scrolling.
    9. Use React Tilt For Tilt Effects.
    10. Use React Parallax For Parallax Effects.
    11. Use React Spring For Spring Animations.
    12. Use React Flip Toolkit For Flip Animations.
    13. Create A Modern Hero Section With The Logo And Title.
    14. Create A Modern Searchbar And Chatbox.
    15. Create A Modern Summary Section.
    16. Create A Modern Chat History Section.
    17. Create A Modern Footer.

   ### git

        1. Stage All The Files. (use `git add .`)
        2. Commit The Code With The Message "Frontend Development Completed". (use `git commit -m "Frontend Development Completed"`)



 ## Important Notes

    1. Don't use any other library in the frontend development if not necessary.
    2. Just before the final commit, create GEMINI.md, AGENTS.md, CLAUDE.md files with proper context about the project written in them.
    3. Create A Folder Named "planning" And Copy @design.md And @spec.md Inside It.