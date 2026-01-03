"use client";

import React from "react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Book } from "lucide-react";
import { Barlow } from "next/font/google";
import ArtPlumCanvas from "@/components/ArtPlum";
import Content from "./content.mdx";
import ArticleLayout from "@/components/ArticleLayout";

const barlow = Barlow({ subsets: ["latin"], weight: ["700"] });

export default function BlogPage() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
    }
  }, []);

  // Blog content (personalized)
  const title = "Smartphone v/s AI -era-";
  const date = "July 2025";
  const tags = ["AI", "Technology", "Trends"];

  const tagDescriptions = {
    AI: "Artificial Intelligence",
    Technology: "Tools, devices, and innovations.",
    Trends: "What's popular!",
  };

  // TagWithTooltip component
  function TagWithTooltip({
    tag,
    description,
  }: {
    tag: string;
    description: string;
  }) {
    const [show, setShow] = useState(false);
    const tooltipRef = useRef(null);
    useEffect(() => {
      if (show && tooltipRef.current) {
        gsap.fromTo(
          tooltipRef.current,
          { opacity: 0, y: 8, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.18,
            ease: "power2.out",
          }
        );
      } else if (!show && tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          y: 8,
          pointerEvents: "none",
          duration: 0.12,
          ease: "power2.in",
        });
      }
    }, [show]);
    return (
      <span
        className="relative bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs font-mono border border-retroborder transition-colors duration-200 hover:bg-retroaccent/20 hover:text-retroblue cursor-pointer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        style={{ outline: "none" }}
      >
        {tag}
        <span
          ref={tooltipRef}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 px-2 py-1 rounded bg-retrobg text-retrotext text-xs shadow-lg border border-retroborder whitespace-nowrap pointer-events-none select-none hidden md:flex"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          {description}
        </span>
      </span>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <ArtPlumCanvas />
      {/* Blogs button top left */}
      <div ref={buttonRef} className="fixed top-6 right-6 md:right-auto md:left-6 z-50">
        <Link href="/">
          <button
            className="relative inline-flex h-8 w-8 md:w-24 overflow-hidden rounded-full p-[1px] focus:outline-none"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-0 py-1 text-xs font-medium text-retrotext backdrop-blur-3xl gap-2">
              <Book size={18} /> <p className="md:flex hidden">Go Back</p>
            </span>
          </button>
        </Link>
      </div>

      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-6 py-6 md:py-12"
      >
        <h1
          className={`text-3xl font-extrabold mb-2 text-retroaccent ${barlow.className}`}
        >
          {title}
        </h1>
        <div className="flex gap-2 mb-4">
          {tags.map((tag, i) => (
            <TagWithTooltip
              key={i}
              tag={tag}
              description={tagDescriptions[tag] || tag}
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
