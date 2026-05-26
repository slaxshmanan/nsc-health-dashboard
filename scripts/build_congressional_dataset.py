import pandas as pd
import re
import os

RAW_FILE = "raw_data/district_dashboard.csv"
OUTPUT_FILE = "app/data/congressional_supabase.csv"

df = pd.read_csv(RAW_FILE)

def clean_column_name(name):
    name = str(name).strip().lower()
    name = name.replace("%", "percent")
    name = re.sub(r"[^a-z0-9]+", "_", name)
    name = name.strip("_")
    return name

# Keep only useful columns
df = df[["geo_name", "metric_name", "est"]].copy()

# Remove blank rows
df = df.dropna(subset=["geo_name", "metric_name", "est"])

# Create clean metric column names from whatever metrics are actually in the CSV
df["metric_column"] = df["metric_name"].apply(clean_column_name)

# Pivot: one row per congressional district, one column per metric
clean = df.pivot_table(
    index="geo_name",
    columns="metric_column",
    values="est",
    aggfunc="first"
).reset_index()

clean = clean.rename(columns={"geo_name": "district"})

# Remove columns that are completely empty
clean = clean.dropna(axis=1, how="all")

# Save
os.makedirs("app/data", exist_ok=True)
clean.to_csv(OUTPUT_FILE, index=False)

print(f"Created {OUTPUT_FILE} with {len(clean)} congressional records.")
print("Columns created:")
for col in clean.columns:
    print("-", col)

print(clean.head())