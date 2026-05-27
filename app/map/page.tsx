import Header from "../../components/Header";
import VirginiaMap from "../../components/VirginiaMap";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900">
            Virginia Community Health Map
          </h1>
          <p className="mt-2 text-gray-600">
            Explore locality-level health metrics across Virginia communities.
          </p>
        </div>

        <div className="h-[600px] w-full overflow-hidden rounded-2xl bg-white shadow-lg">
          <VirginiaMap />
        </div>
      </section>
    </main>
  );
}