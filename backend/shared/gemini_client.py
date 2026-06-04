import os
import asyncio
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def ask_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text

async def ask_gemini_async(prompt: str) -> str:
    return await asyncio.to_thread(ask_gemini, prompt)
