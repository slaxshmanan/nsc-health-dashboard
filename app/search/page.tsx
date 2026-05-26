"use client";

import { useState } from "react";
import Header from "../../components/Header";
import data from "../data/virginiaHealthData.json";

type RecordType = {
  city: string;
  county: string;
  categories: {
    [key: string]: {
      label: string;
      value: string;
    }[];
  };
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(" county", "")
    .replace(" city", "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<RecordType | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);

    const query = normalize(search);

    if (!query) {
      setResult(null);
      return;
    }

    const found = (data as RecordType[]).find((item) => {
      const city = normalize(item.city);
      const county = normalize(item.county);

      return (
        city === query ||
        county === query ||
        city.includes(query) ||
        county.includes(query)
      );
    });

    setResult(found || null);
  };

  return (
    <>
      <Header />

      <main className="p-10 max-w-7xl mx-auto">
        <section className="card p-8 mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Search Virginia City or County
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Enter any Virginia locality to view healthcare access, chronic disease,
            and social determinant metrics.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Fairfax, Loudoun, Richmond, Norfolk..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHasSearched(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="border border-gray-300 p-4 rounded-xl w-full md:w-[500px] text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Search
            </button>
          </div>
        </section>

        {result && (
          <section className="space-y-8">
            <div className="card p-8">
              <p className="text-sm text-blue-700 font-semibold mb-2">
                Virginia Locality Profile
              </p>

              <h2 className="text-4xl font-bold text-blue-900 mb-2">
                {result.city}
              </h2>

              <p className="text-gray-600 text-lg">
                County/City: {result.county}
              </p>
            </div>

            {Object.entries(result.categories).map(([category, metrics]) => (
              <div key={category} className="card p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  {category}
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                      <p className="text-sm font-medium text-gray-500">
                        {metric.label}
                      </p>

                      <p className="text-3xl font-bold text-blue-900 mt-3">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {hasSearched && !result && (
          <div className="card p-8">
            <p className="text-red-600 text-lg font-semibold">
              No Virginia locality found.
            </p>
          </div>
        )}
      </main>
    </>
  );
}