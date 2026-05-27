"use client";

import dynamic from "next/dynamic";

const VirginiaMapClient = dynamic(() => import("./VirginiaMapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center bg-white">
      Loading map...
    </div>
  ),
});

export default function VirginiaMap() {
  return <VirginiaMapClient />;
}