"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { supabase } from "../lib/supabaseClient";

type CongressionalRecord = {
  id?: number;
  district?: string;
  [key: string]: string | number | null | undefined;
};

function formatLabel(key: string) {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CongressionalPage() {
  const [data, setData] = useState<CongressionalRecord[]>([]);
  const [search, setSearch] = useState("");

  async function fetchData() {
    const { data: congressionalData, error } = await supabase
      .from("congressional_metrics")
      .select("*");

    if (error) {
      console.error("Congressional Supabase error:", error);
      return;
    }

    setData((congressionalData || []) as CongressionalRecord[]);
  }

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("congressional-live-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "congressional_metrics",
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredData = data.filter((item) =>
    (item.district || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const metricKeys =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (key) =>
            ![
              "id",
              "district",
              "updated_at",
            ].includes(key)
        )
      : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Congressional Health Dashboard
        </h1>

        <p className="mt-3 mb-8 text-slate-600">
          Congressional district-level health indicators.
        </p>

        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-xl border bg-white px-4 py-3 shadow-sm outline-none"
        />

        {filteredData.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
            No congressional data found.
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredData.map((item, idx) => (
              <div
                key={item.id || idx}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  {item.district || "Unknown District"}
                </h2>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {metricKeys.map((key) => (
                    <div
                      key={key}
                      className="rounded-xl border bg-slate-50 p-4"
                    >
                      <p className="text-sm text-slate-500">
                        {formatLabel(key)}
                      </p>

                      <p className="text-xl font-bold text-slate-900">
                        {item[key] ?? "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}