"use client";

import dynamic from "next/dynamic";

const VirginiaMapClient = dynamic(() => import("./VirginiaMapClient"), {
  ssr: false,
});

export default function VirginiaMapWrapper() {
  return <VirginiaMapClient />;
}