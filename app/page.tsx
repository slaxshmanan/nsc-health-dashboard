import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#071d55] via-[#073b8f] to-[#087b83] text-white">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_left,_white,_transparent_28%)]" />
          <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-25 bg-[radial-gradient(circle_at_bottom_right,_#67e8f9,_transparent_45%)]" />

          {/* Premium abstract dashboard background */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* soft contour lines */}
  <div
    className="absolute right-20 top-20 w-[700px] h-[500px] opacity-15"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, transparent 20%, rgba(255,255,255,0.18) 21%, transparent 22%),
        radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.14) 31%, transparent 32%),
        radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.10) 41%, transparent 42%),
        radial-gradient(circle at center, transparent 50%, rgba(255,255,255,0.08) 51%, transparent 52%)
      `,
    }}
  />

  {/* glowing accent bottom right */}
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 blur-3xl rounded-full" />

  {/* subtle top-left glow */}
  <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-blue-300/10 blur-3xl rounded-full" />

  {/* thin grid */}
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
</div>

          <div className="relative max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold shadow">
                Virginia Community Health Intelligence
              </p>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
                Turning public health data into actionable community insight.
              </h1>

              <p className="text-xl text-blue-50 leading-relaxed mb-10 max-w-3xl">
                Explore county and city-level health indicators across Virginia,
                including healthcare access, chronic disease burden, and social
                determinants of health to support NSC outreach and resource planning.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/search"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-4 rounded-xl font-bold shadow-lg transition"
                >
                  🔍 Search City or County
                </Link>

                <Link
                  href="/map"
                  className="border border-white/60 bg-white/10 hover:bg-white/20 text-white px-7 py-4 rounded-xl font-bold transition"
                >
                  🗺️ View Virginia Map
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="rounded-2xl bg-white text-blue-950 p-8 shadow-2xl max-w-sm border border-white/30">
                <div className="text-4xl mb-4">👥</div>

                <h2 className="text-2xl font-bold mb-4">
                  Stronger communities. Better health outcomes.
                </h2>

                <p className="text-slate-700 leading-relaxed text-lg">
                  Data-driven insights to help NSC prioritize resources where
                  they are needed most.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-6">
          <Link
            href="/search"
            className="group bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex items-center gap-6 hover:-translate-y-1 transition"
          >
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl shrink-0">
              🏥
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Healthcare Access
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Identify communities with higher uninsured rates and primary care
                access barriers.
              </p>
            </div>

            <span className="text-3xl text-blue-600 group-hover:translate-x-1 transition">
              →
            </span>
          </Link>

          <Link
            href="/search"
            className="group bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex items-center gap-6 hover:-translate-y-1 transition"
          >
            <div className="h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center text-4xl shrink-0">
              📊
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Chronic Disease Burden
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Compare diabetes, obesity, and physical inactivity patterns across
                Virginia localities.
              </p>
            </div>

            <span className="text-3xl text-teal-600 group-hover:translate-x-1 transition">
              →
            </span>
          </Link>

          <Link
            href="/search"
            className="group bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex items-center gap-6 hover:-translate-y-1 transition"
          >
            <div className="h-20 w-20 rounded-full bg-violet-100 flex items-center justify-center text-4xl shrink-0">
              🌎
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">
                Social Determinants
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Understand food insecurity, poverty, unemployment, and life
                expectancy trends.
              </p>
            </div>

            <span className="text-3xl text-violet-600 group-hover:translate-x-1 transition">
              →
            </span>
          </Link>
        </section>

        <section className="max-w-7xl mx-auto px-8 pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 p-10">
              <div className="flex gap-6">
                <div className="text-6xl leading-none">💙</div>

                <div>
                  <p className="text-sm font-semibold text-teal-300 mb-3">
                    About NOVA ScriptsCentral
                  </p>

                  <h2 className="text-3xl font-bold mb-5">
                    Building healthier communities across Northern Virginia.
                  </h2>

                  <p className="text-blue-100 leading-relaxed text-lg">
                    NOVA ScriptsCentral is a nonprofit dedicated to breaking down
                    barriers to healthcare by providing affordable access to
                    essential medications for uninsured and low-income individuals.
                    Through medication access, education, and community partnerships,
                    NSC works to improve health outcomes and quality of life for
                    those in need.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 border-t lg:border-t-0 lg:border-l border-white/20 pt-8 lg:pt-0 lg:pl-8">
                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                    💊
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Medication Access
                    </h3>
                    <p className="text-blue-100">
                      Affordable medicines for uninsured individuals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                    📖
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Education</h3>
                    <p className="text-blue-100">
                      Health education and wellness resources.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Community Partnerships
                    </h3>
                    <p className="text-blue-100">
                      Collaborating to strengthen community health.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Better Outcomes</h3>
                    <p className="text-blue-100">
                      Improving lives and building healthier futures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}