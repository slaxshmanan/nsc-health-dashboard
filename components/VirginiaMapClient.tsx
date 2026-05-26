"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import data from "../app/data/virginiaHealthData.json";
import "leaflet/dist/leaflet.css";

export default function VirginiaMapClient() {
  return (
    <MapContainer
      center={[37.7, -78.5]}
      zoom={7}
      style={{
        height: "650px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(data as any[]).map((item, index) => (
        <CircleMarker
          key={index}
          center={[item.latitude, item.longitude]}
          radius={6}
          pathOptions={{
            color: "#1e3a8a",
            fillColor: "#2563eb",
            fillOpacity: 0.8,
            weight: 1,
          }}
        >
          <Popup>
            <strong>{item.city}</strong>
            <br />
            County: {item.county}
            <br />
            Metrics Available: {item.metrics.length}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}