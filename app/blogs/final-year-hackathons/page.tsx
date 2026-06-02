"use client";

import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Barlow } from "next/font/google";
import Content from "./content.mdx";
import ArticleLayout from "@/components/ArticleLayout";
import FixedButton from "@/components/FixedButton";
import TagWithTooltip from "@/components/TagWithTooltip";

const barlow = Barlow({ subsets: ["latin"], weight: ["700"] });

const asciiPanels = [
  {
    className: "left-4 top-8 md:left-12 md:top-10",
    art: [
      "+-----+   +---+     |    :",
      "| 01 |   | c |     |    :",
      "+-----+   +---+     |    :",
      "",
      "+-----------+   +------+ :",
      "| sprint    |   | team | :",
      "+-----------+   +------+ :",
    ].join("\n"),
  },
  {
    className: "left-1/2 top-[28rem] -translate-x-1/2 md:top-[30rem]",
    art: [
      "[ private ]",
      "voice memo:",
      "  cold coffee / open tabs",
      "screens:",
      "  terminal glow / figma blur",
      "status: shipping",
    ].join("\n"),
  },
  {
    className: "bottom-10 left-8 md:bottom-12 md:left-16",
    art: [
      "+----+   +----+   +----+",
      "| 01 |   | 02 |   | 03 |",
      "+----+   +----+   +----+",
      "",
      "| idea | | build | | demo |",
    ].join("\n"),
  },
];

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

  const title = "Final Year Hackathons & Friendship";
  const date = "June 2026";
  const tags = ["Hackathons", "College Life", "Friendships"];

  const tagDescriptions = {
    Hackathons: "Fast-paced events where ideas become projects.",
    "College Life": "Memories, growth, and campus moments.",
    Friendships: "The people who made the journey memorable.",
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(247,155,114,0.16),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(67,109,140,0.14),transparent_26%),radial-gradient(circle_at_50%_85%,rgba(247,155,114,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(238,238,238,0.9))]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(42,71,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(42,71,89,0.05)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {asciiPanels.map((panel) => (
          <pre
            key={panel.className}
            aria-hidden="true"
            className={`absolute whitespace-pre font-mono text-[10px] leading-5 tracking-[0.28em] text-[#7aa58f]/75 md:text-xs ${panel.className}`}
          >
            {panel.art}
          </pre>
        ))}
      </div>

      <FixedButton
        gradientClassName="bg-[conic-gradient(from_90deg_at_50%_50%,#F79B72_0%,#2A4759_50%,#F79B72_100%)]"
        motionVariant="drift"
      />

      <div
        ref={containerRef}
        className="relative z-10 max-w-2xl mx-auto px-6 py-6 md:py-12"
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
