"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./VirginiaMapClient"), {
  ssr: false,
});

export default function VirginiaMap() {
  return <Map />;
}