import json
import asyncio
from shared.gemini_client import ask_gemini_async
from .prompts import SECURITY, RELIABILITY, MAINTAINABILITY, PERFORMANCE, BEST_PRACTICES

CATEGORIES = [
    ("security",        SECURITY),
    ("reliability",     RELIABILITY),
    ("maintainability", MAINTAINABILITY),
    ("performance",     PERFORMANCE),
    ("best_practices",  BEST_PRACTICES),
]

SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


async def analyze_category(category: str, prompt_template: str, code: str) -> list:
    prompt = prompt_template.format(code=code)
    try:
        raw = await ask_gemini_async(prompt)
        cleaned = raw.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("```")[1]
            if cleaned.startswith("json"):
                cleaned = cleaned[4:]
            cleaned = cleaned.strip()
        data = json.loads(cleaned)
        issues = data.get("issues", [])
        for issue in issues:
            issue["category"] = category
        return issues
    except Exception:
        return []


async def detect_bad_patterns(code: str) -> list:
    tasks = [
        analyze_category(category, prompt, code)
        for category, prompt in CATEGORIES
    ]
    results = await asyncio.gather(*tasks)

    all_issues = []
    for issues in results:
        all_issues.extend(issues)

    # Sortuj: critical → high → medium → low
    all_issues.sort(key=lambda x: SEVERITY_ORDER.get(x.get("severity", "low"), 3))

    return all_issues
