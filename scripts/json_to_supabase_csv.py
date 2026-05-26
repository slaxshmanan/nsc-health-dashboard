import json
import pandas as pd

with open("app/data/virginiaHealthData.json", "r") as f:
    data = json.load(f)

rows = []

for item in data:
    rows.append({
        "city": item.get("city"),
        "county": item.get("county"),
        "latitude": item.get("latitude"),
        "longitude": item.get("longitude"),
        "categories": json.dumps(item.get("categories", {})),
        "metrics": json.dumps(item.get("metrics", [])),
    })

df = pd.DataFrame(rows)
df.to_csv("app/data/virginiaHealthData_supabase.csv", index=False)

print("Created app/data/virginiaHealthData_supabase.csv")