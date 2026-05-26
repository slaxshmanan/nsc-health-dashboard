export type HealthMetric = {
  source: string;
  label: string;
  value: string | number;
  unit?: string;
  year?: string | number;
};

export type HealthRecord = {
  zip: string;
  city: string;
  county: string;
  region: string;
  congressionalDistrict: string;
  latitude: number;
  longitude: number;
  metrics: HealthMetric[];
};

export const virginiaHealthData: HealthRecord[] = [
  {
    zip: "22042",
    city: "Falls Church",
    county: "Fairfax County",
    region: "Northern Virginia",
    congressionalDistrict: "VA-11",
    latitude: 38.8646,
    longitude: -77.1922,
    metrics: [
      { source: "Congressional Health Dashboard", label: "Adult Diabetes", value: 8.4, unit: "%", year: 2024 },
      { source: "Congressional Health Dashboard", label: "High Blood Pressure", value: 25.7, unit: "%", year: 2024 },
      { source: "Congressional Health Dashboard", label: "Uninsured", value: 7.8, unit: "%", year: 2024 },
      { source: "Health Equity Tracker", label: "Poverty", value: 6.2, unit: "%", year: 2024 },
      { source: "Health Equity Tracker", label: "Food Insecurity", value: 7.4, unit: "%", year: 2024 }
    ]
  },
  {
    zip: "23220",
    city: "Richmond",
    county: "Richmond City",
    region: "Central Virginia",
    congressionalDistrict: "VA-04",
    latitude: 37.5465,
    longitude: -77.4645,
    metrics: [
      { source: "Congressional Health Dashboard", label: "Adult Diabetes", value: 11.5, unit: "%", year: 2024 },
      { source: "Congressional Health Dashboard", label: "High Blood Pressure", value: 33.2, unit: "%", year: 2024 },
      { source: "Congressional Health Dashboard", label: "Uninsured", value: 10.8, unit: "%", year: 2024 },
      { source: "Health Equity Tracker", label: "Poverty", value: 18.5, unit: "%", year: 2024 },
      { source: "Health Equity Tracker", label: "Food Insecurity", value: 14.2, unit: "%", year: 2024 }
    ]
  }
];