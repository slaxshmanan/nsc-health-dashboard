import Link from "next/link";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#183b89] via-[#064d87] to-[#08a6ad]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 py-28 lg:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white">
              Virginia Community Health Intelligence
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
              Turning public health data into actionable community insight.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-50">
              Explore county and city-level health indicators across Virginia,
              including healthcare access, chronic disease burden, and social
              determinants of health to support NSC outreach and resource
              planning.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/search"
                className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg hover:bg-blue-700"
              >
                🔍 Search City or County
              </Link>

              <Link
                href="/map"
                className="rounded-xl border border-white/50 px-7 py-4 font-semibold text-white hover:bg-white/10"
              >
                🗺️ View Virginia Map
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-9 shadow-2xl">
              <div className="mb-5 text-3xl">👥</div>

              <h3 className="text-2xl font-bold leading-snug text-[#0b1b4d]">
                Stronger communities.
                <br />
                Better health outcomes.
              </h3>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Data-driven insights to help NSC prioritize resources where they
                are needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-3">
        <Link
          href="/search"
          className="group flex items-center gap-8 rounded-2xl bg-white p-9 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl">
            🏥
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0b1b4d]">
              Healthcare
              <br />
              Access
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Identify communities with higher uninsured rates and primary care
              access barriers.
            </p>
          </div>

          <span className="text-3xl text-blue-600">→</span>
        </Link>

        <Link
          href="/search"
          className="group flex items-center gap-8 rounded-2xl bg-white p-9 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            📊
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0b1b4d]">
              Chronic
              <br />
              Disease
              <br />
              Burden
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Compare diabetes, obesity, and physical inactivity patterns across
              Virginia localities.
            </p>
          </div>

          <span className="text-3xl text-teal-600">→</span>
        </Link>

        <Link
          href="/visualizations"
          className="group flex items-center gap-8 rounded-2xl bg-white p-9 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-3xl">
            🌎
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0b1b4d]">
              Social
              <br />
              Determinants
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Understand food insecurity, poverty, unemployment, and life
              expectancy trends.
            </p>
          </div>

          <span className="text-3xl text-purple-600">→</span>
        </Link>
      </section>

      {/* ABOUT NSC */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-10 rounded-2xl bg-[#172d76] p-12 text-white shadow-xl lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-5 text-5xl">💙</div>

            <p className="font-semibold text-teal-300">
              About NOVA ScriptsCentral
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Building healthier communities across Northern Virginia.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              NOVA ScriptsCentral is a nonprofit dedicated to breaking down
              barriers to healthcare by providing affordable access to essential
              medications for uninsured and low-income individuals. Through
              medication access, education, and community partnerships, NSC works
              to improve health outcomes and quality of life for those in need.
            </p>
          </div>

          <div className="grid gap-8 border-white/20 lg:border-l lg:pl-10 sm:grid-cols-2">
            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                💊
              </div>
              <h3 className="text-2xl font-bold">Medication Access</h3>
              <p className="mt-2 text-blue-100">
                Affordable medicines for uninsured individuals.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                📖
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
              <p className="mt-2 text-blue-100">
                Health education and wellness resources.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                🤝
              </div>
              <h3 className="text-2xl font-bold">Community Partnerships</h3>
              <p className="mt-2 text-blue-100">
                Collaborating to strengthen community health.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                🛡️
              </div>
              <h3 className="text-2xl font-bold">Better Outcomes</h3>
              <p className="mt-2 text-blue-100">
                Improving lives and building healthier futures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}