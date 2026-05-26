import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
            <Image
              src="/nsc-logo.png"
              alt="NOVA ScriptsCentral Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-blue-950 leading-tight">
              NSC Community Health Intelligence Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Virginia Locality Health Insights
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="px-4 py-2 rounded-xl hover:bg-blue-50 text-slate-700">
            Home
          </Link>
          <Link href="/search" className="px-4 py-2 rounded-xl hover:bg-blue-50 text-slate-700">
            Search
          </Link>
          <Link href="/map" className="px-4 py-2 rounded-xl hover:bg-blue-50 text-slate-700">
            Map
          </Link>
          <Link href="/visualizations" className="px-4 py-2 rounded-xl hover:bg-blue-50 text-slate-700">
            NSC Communities Visualizations
          </Link>
        </div>
      </nav>
    </header>
  );
}