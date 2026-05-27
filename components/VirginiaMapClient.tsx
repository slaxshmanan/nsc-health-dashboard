"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { supabase } from "../app/lib/supabaseClient";
import "leaflet/dist/leaflet.css";

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
  latitude: number | string | null;
  longitude: number | string | null;
  categories: CategoryMap | null;
  metrics: Metric[];
};

export default function VirginiaMapClient() {
  const [data, setData] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHealthData() {
    const { data: healthData, error } = await supabase
      .from("county_metrics")
      .select("*")
      .order("county", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      setLoading(false);
      return;
    }

    setData((healthData || []) as HealthRecord[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchHealthData();
  }, []);

  const validData = data.filter((item) => {
    const lat = Number(item.latitude);
    const lng = Number(item.longitude);

    return Number.isFinite(lat) && Number.isFinite(lng);
  });

  if (loading) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-2xl border bg-white">
        <p className="text-gray-600">Loading Virginia health data...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[37.7, -78.5]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "600px", width: "100%" }}
className="rounded-2xl border shadow-sm"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validData.map((item) => (
        <CircleMarker
          key={item.id}
          center={[Number(item.latitude), Number(item.longitude)]}
          radius={8}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#3b82f6",
            fillOpacity: 0.75,
          }}
        >
          <Popup>
            <div className="max-w-xs">
              <h3 className="mb-1 text-base font-bold">
                {item.county || item.city}
              </h3>

              {item.categories &&
                Object.entries(item.categories).map(([category, metrics]) => (
                  <div key={category} className="mt-2">
                    <p className="font-semibold">{category}</p>
                    <ul className="ml-4 list-disc">
                      {metrics.map((metric, index) => (
                        <li key={index}>
                          {metric.label}: {metric.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}