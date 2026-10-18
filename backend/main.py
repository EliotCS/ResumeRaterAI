import os
import io
import json

from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from docx import Document
from google import genai
from google.genai import types

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def extractTextFromFile (file_bytes:bytes, filename:str):
    text = ""
    
    if(filename.endswith(".pdf")):
        pdf_file = io.BytesIO(file_bytes) 
        reader = PdfReader(pdf_file)       
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        
    elif(filename.endswith(".docx")):
        docx_file = io.BytesIO(file_bytes)  
        doc = Document(docx_file)         
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
            
    else:
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a PDF, DOCX, or TXT file."
        )
    
    return text


@app.post("/api/analyze")
async def analyze_resume(file: UploadFile= File(...), JobTitle: str = Form(...)):
    file_bytes = await file.read()
    extractedText = extractTextFromFile(file_bytes, file.filename)
    
    system_prompt = (
        "You are an elite Tech Recruiter and ATS (Applicant Tracking System) Specialist. "
        "Your task is to conduct an in-depth, rigorous resume critique tailored specifically "
        "for the target job role. Always respond strictly in valid JSON format."
    )
    
    user_prompt = f"""
    Analyze the following resume for a candidate applying for the target role: '{JobTitle}'.

    Return a valid JSON object matching this exact structure:
    {{
    "match_percentage": 85,
    "match_summary": "A high-level summary of why the candidate is or isn't a strong fit.",
    "missing_keywords_and_tools": [ "List of critical ATS keywords, software, or tech stack items missing for this role"],
    "quantifiable_impact_suggestions": ["Specific advice on where and how to add numbers/metrics (e.g., 'Quantify API response time improvements in Project X')"],
    "recommended_skills_to_add": ["Tools, frameworks, or modern tech skills worth adding or emphasizing for this position"],
    "line_by_line_feedback": [{{
        "section": "Section name (e.g., Experience / Projects / Education)",
        "current_text": "Original text or bullet point from resume",
        "critique": "What is weak, missing, or unnecessary",
        "action": "ADD / REMOVE / REWRITE",
        "improved_version": "A professional, high-impact rewrite optimized with action verbs and metrics"
        }}
        ]
    }}

    Candidate Resume Text:{extractedText}
    """
    try:
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json"
            )
        )
        analysis_data = json.loads(response.text)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")
    
    return{"File:":file.filename, "JobTitle:":JobTitle, "analysis_data":analysis_data}

