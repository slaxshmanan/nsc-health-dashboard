import pandas as pd
import json
import os

RAW = "raw_data"

FILES = {
    "Uninsured Adults %": "virginia-2025-uninsured-adults-place-sort.csv",
    "Adult Obesity %": "virginia-2025-adult-obesity-place-sort.csv",
    "Children in Poverty %": "virginia-2025-children-in-poverty-place-sort.csv",
    "Diabetes Prevalence %": "virginia-2025-diabetes-prevalence-place-sort.csv",
    "Food Insecurity %": "virginia-2025-food-insecurity-place-sort.csv",
    "Life Expectancy": "virginia-2025-life-expectancy-place-sort.csv",
    "Physical Inactivity %": "virginia-2025-physical-inactivity-place-sort.csv",
    "Primary Care Physicians Ratio": "virginia-2025-primary-care-physicians-place-sort.csv",
    "Unemployment %": "virginia-2025-unemployment-place-sort.csv",
}

CATEGORY_MAP = {
    "Healthcare Access": [
        "Uninsured Adults %",
        "Primary Care Physicians Ratio",
    ],
    "Chronic Disease Burden": [
        "Diabetes Prevalence %",
        "Adult Obesity %",
        "Physical Inactivity %",
    ],
    "Social Determinants of Health": [
        "Food Insecurity %",
        "Unemployment %",
        "Children in Poverty %",
        "Life Expectancy",
    ],
}

def normalize_place(name):
    name = str(name).strip()
    name = name.replace(" County", "")
    name = name.replace(" city", "")
    name = name.replace(" City", "")
    return name

def find_columns(df):
    place_col = None
    value_col = None

    for col in df.columns:
        c = col.lower()
        if "county" in c or "place" in c or "name" in c:
            place_col = col
            break

    for col in df.columns:
        c = col.lower()
        if (
            "value" in c
            or "percent" in c
            or "rate" in c
            or "estimate" in c
            or "measure" in c
        ):
            if col != place_col:
                value_col = col
                break

    if value_col is None:
        numeric_cols = df.select_dtypes(include="number").columns.tolist()
        if numeric_cols:
            value_col = numeric_cols[-1]

    return place_col, value_col

all_places = {}

for metric_label, filename in FILES.items():
    path = os.path.join(RAW, filename)
    df = pd.read_csv(path)

    place_col, value_col = find_columns(df)

    if place_col is None or value_col is None:
        print(f"Could not detect columns for {filename}")
        print(df.columns.tolist())
        continue

    for _, row in df.iterrows():
        place = normalize_place(row[place_col])
        value = row[value_col]

        if place not in all_places:
            all_places[place] = {
                "city": place,
                "county": place,
                "metrics": {},
            }

        all_places[place]["metrics"][metric_label] = str(value)

uszips = pd.read_csv(os.path.join(RAW, "uszips.csv"))
va_zips = uszips[uszips["state_id"] == "VA"]

coords = (
    va_zips.groupby("county_name", as_index=False)
    .agg({"lat": "mean", "lng": "mean"})
)

coord_lookup = {
    normalize_place(row["county_name"]): {
        "lat": float(row["lat"]),
        "lng": float(row["lng"]),
    }
    for _, row in coords.iterrows()
}

records = []

for place, info in all_places.items():
    coord = coord_lookup.get(place)

    if coord is None:
        continue

    categories = {}
    flat_metrics = []

    for category, metric_names in CATEGORY_MAP.items():
        categories[category] = []

        for metric_name in metric_names:
            value = info["metrics"].get(metric_name, "Not available")

            metric = {
                "label": metric_name,
                "value": value,
            }

            categories[category].append(metric)
            flat_metrics.append(metric)

    records.append({
        "city": place,
        "county": place,
        "latitude": coord["lat"],
        "longitude": coord["lng"],
        "categories": categories,
        "metrics": flat_metrics,
    })

os.makedirs("app/data", exist_ok=True)

with open("app/data/virginiaHealthData.json", "w") as f:
    json.dump(records, f, indent=2)

print(f"Built {len(records)} Virginia county/city records from CHR data.")