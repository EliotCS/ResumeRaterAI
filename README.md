# ResumeRaterAI
An AI-powered full-stack web application built with FastAPI, React, and the Gemini API that provides automated ATS resume scoring, keyword gap analysis, and line-by-line actionable feedback with high-impact rewrites.

# ResumeRaterAI — Full-Stack AI ATS Resume Critique Engine
A responsive, full-stack application that analyzes resumes against specific job titles, identifies missing ATS keywords, recommends targeted tech stacks, and delivers line-by-line bullet rewrites with an interactive dark neon dashboard.

## About
I built **ResumeRaterAI** to solve a real problem every candidate faces: getting past automated Applicant Tracking Systems (ATS) and recruiter filters. Rather than building a basic text summarizer, I engineered an end-to-end full-stack pipeline that parses real document files (`.pdf` and `.docx`), structures unstructured resume data, and prompts Google's Gemini API to generate deterministic, structured JSON feedback. The system evaluates resumes against target job roles, calculates match percentages, highlights missing tools, and provides line-by-line rewrites optimized with action verbs and quantifiable metrics.

## What I Learned
While building this project, I practiced:
- **RESTful API Design & Multipart Handling** — Built an asynchronous FastAPI backend endpoint (`/api/analyze`) handling binary file streams (`UploadFile`) and form data (`Form`) using `python-multipart`.
- **In-Memory Document Extraction** — Extracted raw text from `.pdf` and `.docx` uploads in memory using `pypdf` and `python-docx` with `io.BytesIO` streams, eliminating the need to save sensitive user files to disk.
- **LLM Prompt Engineering & JSON Schema Enforcement** — Integrated the `google-genai` SDK using `gemini-3.8-flash`, engineering strict system instructions and fallback regex parsers to guarantee valid structured JSON outputs for frontend rendering.
- **React State Architecture & Data Flow** — Lifted application state to handle multi-step form submissions, conditional rendering, loading spinners, and cross-component data passing to the `ResultsDashboard`.
- **Modern Dark Neon / Glassmorphism UI** — Designed a custom dark-mode interface with CSS variables, glowing translucent card accents, dynamic score color rings (green/amber/red), and action status badges (`ADD`, `REMOVE`, `REWRITE`).
- **Interactive UX Features** — Implemented client-side clipboard integration (`navigator.clipboard.writeText`) to let users copy AI-suggested bullet rewrites with instant visual confirmation.
- **Cross-Origin & Virtual Environment Setup** — Configured FastAPI `CORSMiddleware` to enable smooth browser-to-backend communication across Vite and Uvicorn environments.

## Features
- **Multi-Format Resume Parsing** — Upload standard PDF or Word (`.docx`) files for instant server-side text extraction.
- **Targeted ATS Match Scoring** — Receive a dynamic percentage match rating calculated specifically against your target job title.
- **Missing Keyword & Tool Gap Analysis** — Instantly identify missing industry keywords, software, and frameworks required to pass ATS filters.
- **Recommended Tech Stack** — Get role-tailored recommendations on modern tools, libraries, and frameworks worth adding to your skills section.
- **Quantifiable Impact Suggestions** — Receive tailored advice on where and how to incorporate hard numbers, metrics, and latency/performance stats.
- **Line-by-Line Resume Critique** — View individual bullet points broken down by resume section (`Experience`, `Projects`, `Education`) with clear recruiter critiques.
- **High-Impact AI Rewrites with One-Click Copy** — Review bullet rewrites pre-formatted with strong action verbs and click the integrated **📋 Copy Text** button to paste them straight into your resume.

## Technologies Used
- **Frontend:** React.js, Vite, JavaScript, HTML, CSS
- **Backend:** Python, FastAPI, Uvicorn, `python-multipart`
- **AI & SDKs:** Google Gemini API (`google-genai` SDK, `gemini-3.8-flash`)
- **Document Parsers:** `pypdf`, `python-docx`
- **Environment & Utilities:** `python-dotenv`, REST APIs, Browser Clipboard API

## Purpose
This project demonstrates my ability to design, build, and deploy a full-stack AI web application from scratch. Combining a fast Python backend with a modern React frontend allowed me to master real-world software engineering challenges—including file streaming, prompt engineering, API error handling, structured data parsing, and sleek UI/UX design.

## Preview
![ResumeRaterAI Dashboard Preview](https://github.com/user-attachments/assets/53fbb54e-5d6d-4db1-a6d1-32940e347b34)


# Run the backend server
### 1. Backend Setup
```bash
# Clone the repository
git clone [https://github.com/your-username/ResumeRaterAI.git](https://github.com/your-username/ResumeRaterAI.git)
cd ResumeRaterAI/backend

# Create and activate virtual environment
python -m venv .venv
source .venv/Scripts/activate  # On Windows Bash: source .venv/Scripts/activate

# Install dependencies
pip install fastapi uvicorn google-genai pypdf python-docx python-multipart python-dotenv

# Create a .env file and add your Gemini API key
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Run the backend server
uvicorn main:app --reload
