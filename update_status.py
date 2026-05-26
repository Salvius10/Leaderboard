import requests

SUPABASE_URL = "https://vzhggnglemymfcltrlgq.supabase.co"
SUPABASE_KEY = "sb_publishable_G3hEu2Lw25gbaNRgwJfMdA_-MJG6imi"

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

KEEP_AT_REGISTRATION = {
    "Cognitive VI",
    "DeepMind Developers",
    "Infinity",
    "Innovation Squad",
    "LLManiacs",
    "NovaCore",
    "Prompt Pirates",
    "The GANG",
}

# Step 1: fetch all teams
res = requests.get(
    f"{SUPABASE_URL}/rest/v1/teams",
    headers=HEADERS,
    params={"select": "gen_id,team_name,status"},
)
res.raise_for_status()
teams = res.json()

print(f"Found {len(teams)} teams in Supabase\n")

updated, skipped = 0, 0
for team in teams:
    name   = team["team_name"].strip()
    gen_id = team["gen_id"]

    if name in KEEP_AT_REGISTRATION:
        print(f"SKIP  {gen_id} - {name}  (stays at Registration)")
        skipped += 1
        continue

    patch = requests.patch(
        f"{SUPABASE_URL}/rest/v1/teams",
        headers=HEADERS,
        params={"gen_id": f"eq.{gen_id}"},
        json={"status": "Use Case Submission"},
    )
    if patch.status_code in (200, 204):
        print(f"OK    {gen_id} - {name}  -> Use Case Submission")
        updated += 1
    else:
        print(f"ERR   {gen_id} - {name}: {patch.status_code} {patch.text}")

print(f"\nDone — {updated} updated, {skipped} kept at Registration.")
