"use client";

import React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/ui/chevron-left-icon";
import gsap from "gsap";

type FixedButtonProps = {
  href?: string;
  label?: string;
  gradientClassName: string;
  motionVariant?: "float" | "drift";
};

export default function FixedButton({
  href = "/",
  label = "Go Back",
  gradientClassName,
  motionVariant = "float",
}: FixedButtonProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(wrapperRef.current, { autoAlpha: 0, y: 18 });

      const timeline = gsap.timeline();
      timeline.to(wrapperRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      });

      timeline.to(
        wrapperRef.current,
        motionVariant === "drift"
          ? {
              x: -3,
              y: -5,
              rotate: -1,
              duration: 2.8,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }
          : {
              y: -6,
              duration: 2.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
      gsap.set(wrapperRef.current, { clearProps: "transform" });
    };
  }, [motionVariant]);

  return (
    <div
      ref={wrapperRef}
      className="hidden md:block fixed top-12 right-5 md:left-10 z-50"
    >
      <Link href={href}>
        <button
          className="relative inline-flex h-10 w-10 md:w-28 overflow-hidden rounded-full p-px focus:outline-none transition-transform duration-300 hover:-translate-y-0.5"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <span
            className={`absolute inset-[-1000%] animate-[spin_2.8s_linear_infinite] ${gradientClassName}`}
          />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-0 py-1 text-xs font-medium text-retrotext backdrop-blur-3xl gap-2">
            <ChevronLeftIcon size={16} />
            <span className="hidden md:flex">{label}</span>
          </span>
        </button>
      </Link>
    </div>
  );
}
