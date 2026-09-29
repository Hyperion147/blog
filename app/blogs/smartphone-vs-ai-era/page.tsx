"use client";

import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Barlow } from "next/font/google";
import ArtPlumCanvas from "@/components/ArtPlum";
import Content from "./content.mdx";
import ArticleLayout from "@/components/ArticleLayout";
import FixedButton from "@/components/FixedButton";
import TagWithTooltip from "@/components/TagWithTooltip";

const barlow = Barlow({ subsets: ["latin"], weight: ["700"] });

export default function BlogPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
  }, []);

  const title = "Smartphone v/s AI -era-";
  const date = "July 2025";
  const tags = ["AI", "Technology", "Trends"];

  const tagDescriptions = {
    AI: "Artificial Intelligence",
    Technology: "Tools, devices, and innovations.",
    Trends: "What's popular!",
  };

  return (
    <div className="overflow-x-hidden">
      <ArtPlumCanvas />
      <FixedButton
        gradientClassName="bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        motionVariant="float"
      />

      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-6 py-6 md:py-12"
      >
        <h1
          className={`text-3xl font-extrabold mb-2 text-retroaccent ${barlow.className}`}
        >
          {title}
        </h1>
        <div className="mb-4 flex gap-2">
          {tags.map((tag, i) => (
            <TagWithTooltip
              key={i}
              tag={tag}
              description={tagDescriptions[tag as keyof typeof tagDescriptions] || tag}
            />
          ))}
        </div>
        <div className="text-xs text-retroblue font-bold font-mono mb-4">
          {date}
        </div>

        <ArticleLayout>
          <Content />
        </ArticleLayout>
      </div>
    </div>
  );
}
