"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type TagWithTooltipProps = {
  tag: string;
  description: string;
};

let activeTooltip: HTMLSpanElement | null = null;

export default function TagWithTooltip({
  tag,
  description,
}: TagWithTooltipProps) {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const hideTooltip = (immediate = false) => {
    if (!tooltipRef.current) return;

    gsap.killTweensOf(tooltipRef.current);

    if (immediate) {
      gsap.set(tooltipRef.current, {
        autoAlpha: 0,
        y: 8,
        pointerEvents: "none",
      });
      if (activeTooltip === tooltipRef.current) {
        activeTooltip = null;
      }
      return;
    }

    gsap.to(tooltipRef.current, {
      autoAlpha: 0,
      y: 8,
      pointerEvents: "none",
      duration: 0.12,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        if (activeTooltip === tooltipRef.current) {
          activeTooltip = null;
        }
      },
    });
  };

  const showTooltip = () => {
    if (!tooltipRef.current) return;

    if (activeTooltip && activeTooltip !== tooltipRef.current) {
      gsap.killTweensOf(activeTooltip);
      gsap.set(activeTooltip, {
        autoAlpha: 0,
        y: 8,
        pointerEvents: "none",
      });
    }

    activeTooltip = tooltipRef.current;
    gsap.killTweensOf(tooltipRef.current);
    gsap.fromTo(
      tooltipRef.current,
      { autoAlpha: 0, y: 8, pointerEvents: "none" },
      {
        autoAlpha: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  };

  useEffect(() => {
    return () => {
      hideTooltip(true);
    };
  }, []);

  return (
    <span
      className="relative bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs font-mono border border-retroborder transition-colors duration-200 hover:bg-retroaccent/20 hover:text-retroblue cursor-pointer"
      onMouseEnter={showTooltip}
      onMouseLeave={() => hideTooltip()}
      onFocus={showTooltip}
      onBlur={() => hideTooltip()}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {tag}
      <span
        ref={tooltipRef}
        className="absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded border border-retroborder bg-retrobg px-2 py-1 text-xs text-retrotext shadow-lg pointer-events-none select-none md:flex"
        style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
      >
        {description}
      </span>
    </span>
  );
}
