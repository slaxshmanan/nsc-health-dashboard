import Header from "../../components/Header";
import Image from "next/image";

export default function VisualizationsPage() {
  return (
    <>
      <Header />

      <main className="p-10 max-w-7xl mx-auto">
        <section className="card p-8 mb-10">
          <p className="text-sm text-blue-700 font-semibold mb-2">
            NSC Service Area Analysis
          </p>

          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            NSC Communities Visualizations
          </h1>

          <p className="text-slate-600 text-lg max-w-4xl">
            These visualizations compare community health risk indicators across
            NSC service communities, highlighting healthcare access, chronic
            disease burden, social risk, and total community health risk.
          </p>
        </section>

        <section className="grid gap-8">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Comparative Community Health Risk Profiles
            </h2>
            <Image
              src="/visualization-radar.png"
              alt="Radar chart comparing NSC service counties"
              width={1100}
              height={700}
              className="rounded-2xl w-full h-auto border"
            />
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Virginia Community Health Risk Distribution
            </h2>
            <Image
              src="/visualization-map.png"
              alt="Virginia community health risk distribution map"
              width={1100}
              height={700}
              className="rounded-2xl w-full h-auto border"
            />
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Comparative Health Risk Assessment
            </h2>
            <Image
              src="/visualization-bar.png"
              alt="Bar chart comparing healthcare access, chronic disease, social risk, and total risk"
              width={1100}
              height={700}
              className="rounded-2xl w-full h-auto border"
            />
          </div>
        </section>
      </main>
    </>
  );
}