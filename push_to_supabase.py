import csv
import json
import re
import requests

SUPABASE_URL = "https://vzhggnglemymfcltrlgq.supabase.co"
SUPABASE_KEY = "sb_publishable_G3hEu2Lw25gbaNRgwJfMdA_-MJG6imi"
CSV_PATH = r"c:\Users\MelvinSalvius\Downloads\Gen AI Ideathon(Sheet1).csv"

# UPSERT: overwrites any existing row with the same gen_id
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",
}

def normalize(k):
    # Strip non-ASCII garbage characters from CSV column headers
    return re.sub(r"\s+", " ", re.sub(r"[^\x20-\x7E]", "", k)).strip()

def clean(val):
    v = val.strip() if val else ""
    return "-" if (not v or v == "0") else v

with open(CSV_PATH, encoding="cp1252") as f:
    raw = csv.reader(f)
    # Read header row and normalize column names
    col_names = [normalize(h) for h in next(raw)]
    print("Columns detected:", col_names)
    print()

    for raw_row in raw:
        if not any(raw_row):
            continue  # skip blank rows

        row = dict(zip(col_names, raw_row))

        gen_id = row.get("Team Code", "").strip()
        if not gen_id:
            continue

        # Members — only from the 6 named member columns
        members = []
        captain = row.get("Team Member 1 - Captain", "").strip()
        if captain:
            members.append({"name": captain, "captain": True})
        for key in ["Team Member 2", "Team Member 3", "Team Member 4",
                    "Team Member 5", "Team Member 6 (Intern)"]:
            name = row.get(key, "").strip()
            if name:
                members.append({"name": name, "captain": False})

        team = {
            "gen_id":           gen_id,
            "team_name":        row.get("Team Name1", "").strip(),
            "members":          members,
            "approved_usecase": clean(row.get("Selected Use Case Name", "")),
            "usecase_desc":     clean(row.get("Selected Use case Description", "")),
            "mentor":           clean(row.get("Team Mentor", "")),
            "status":           "Registration",
        }

        res = requests.post(
            f"{SUPABASE_URL}/rest/v1/teams",
            headers=HEADERS,
            data=json.dumps(team),
        )

        if res.status_code in (200, 201):
            print(f"OK  {team['gen_id']} - {team['team_name']}")
            print(f"    use case : {team['approved_usecase'][:60]}")
        else:
            print(f"ERR {team['gen_id']} - {team['team_name']}: {res.status_code} {res.text}")
