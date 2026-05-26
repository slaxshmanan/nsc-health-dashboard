"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type Metric = {
  label: string;
  value: string;
};

type CategoryMap = {
  [key: string]: Metric[];
};

type HealthRecord = {
  id: number;
  city: string;
  county: string;
  latitude: number;
  longitude: number;
  categories: CategoryMap;
  metrics: Metric[];
};

export default function SearchPage() {
  const [data, setData] = useState<HealthRecord[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data: healthData, error } = await supabase
        .from("county_metrics")
        .select("*")
        .order("county", { ascending: true });

      if (error) {
        console.error("Supabase search page error:", error);
        return;
      }

      setData((healthData || []) as HealthRecord[]);
    }

    fetchData();

    const channel = supabase
      .channel("search-page-county-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "county_metrics",
        },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredData = data.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.city?.toLowerCase().includes(query) ||
      item.county?.toLowerCase().includes(query) ||
      item.metrics?.some(
        (metric) =>
          metric.label.toLowerCase().includes(query) ||
          String(metric.value).toLowerCase().includes(query)
      )
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">
          Search Virginia Health Data
        </h1>

        <p className="mb-6 text-gray-600">
          Search by county, city, metric name, or value.
        </p>

        <input
          type="text"
          placeholder="Search Arlington, diabetes, obesity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-xl border bg-white px-4 py-3 shadow-sm outline-none"
        />

        <div className="grid gap-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {item.county || item.city}
              </h2>

              <p className="mb-4 text-sm text-gray-500">
                Latitude: {item.latitude} | Longitude: {item.longitude}
              </p>

              {item.categories &&
                Object.entries(item.categories).map(([category, metrics]) => (
                  <div key={category} className="mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {category}
                    </h3>

                    <ul className="mt-2 grid gap-1 text-sm text-gray-700">
                      {metrics.map((metric, index) => (
                        <li key={index}>
                          <span className="font-medium">{metric.label}:</span>{" "}
                          {metric.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}