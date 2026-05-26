import Header from "../../components/Header";
import VirginiaMap from "../../components/VirginiaMap";

export default function MapPage() {
  return (
    <>
      <Header />

      <main className="p-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900">
            Virginia Community Health Map
          </h1>
          <p className="text-gray-600 mt-2">
            Explore locality-level health metrics across Virginia communities.
          </p>
        </div>

        <div className="card p-4">
          <VirginiaMap />
        </div>
      </main>
    </>
  );
}