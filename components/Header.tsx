import Link from "next/link";

const NOTEBOOKLM_URL =
  process.env.NEXT_PUBLIC_NOTEBOOKLM_URL || "https://notebooklm.google.com/";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/nsc-logo.png"
            alt="NSC Logo"
            className="h-14 w-14 object-contain"
          />

          <div>
            <h1 className="text-xl font-bold leading-tight text-[#0b1b4d]">
              NSC Community Health Intelligence
              <br />
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Virginia Locality Health Insights
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-12 text-sm text-slate-700">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/search" className="hover:text-blue-600">
            County
            <br />
            Metrics
          </Link>

          <Link href="/congressional" className="hover:text-blue-600">
            Congressional
            <br />
            Dashboard
          </Link>

          <Link href="/map" className="hover:text-blue-600">
            Map
          </Link>

          <Link href="/visualizations" className="hover:text-blue-600">
            NSC Communities
            <br />
            Visualizations
          </Link>

          <a
            href={NOTEBOOKLM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            Ask NSC
            <br />
            AI
          </a>
        </nav>
      </div>
    </header>
  );
}