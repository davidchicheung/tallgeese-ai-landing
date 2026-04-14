"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mx-auto" />
  ),
});

export default function HeroSceneLoader() {
  return (
    <section className="flex items-center justify-center pt-12 md:pt-20">
      <HeroScene />
    </section>
  );
}
