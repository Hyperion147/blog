"use client";

import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Barlow } from "next/font/google";
import FirstHackathon from "./first-hackathon.mdx";
import SecondHackathon from "./second-hackathon.mdx";
import ThirdHackathon from "./third-hackathon.mdx";
import ArticleLayout from "@/components/ArticleLayout";
import FixedButton from "@/components/FixedButton";
import TagWithTooltip from "@/components/TagWithTooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

const barlow = Barlow({ subsets: ["latin"], weight: ["700"] });

const asciiPanels = [
    {
        className: "right-50 top-54",
        art: [
            "+----------------------+",
            "| H3  PIET / PANIPAT   |",
            "+----------------------+",
            "",
            "time : 10 boring hours",
            "crew : suryansu + anmol",
            "build: jewellery store",
            "stack: payments + ui",
        ].join("\n"),
    },
    {
        className:
            "left-50 top-[78rem]",
        art: [
            "+----------------------+",
            "| H2  BRAINWAVE 2.0    |",
            "+----------------------+",
            "",
            "place: dtu / delhi",
            "team : anmol isha",
            "      priyanka suryansu",
            "build: ai pendant",
            "kit  : rpi / next / rn",
            "mood : top 16 atleast",
        ].join("\n"),
    },
];

export default function BlogPage() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const wrapBreakSeparatedLines = (root: HTMLElement) => {
        const textBlocks = root.querySelectorAll("p, li, blockquote");

        textBlocks.forEach((block) => {
            if (block.querySelector("[data-hackathon-line='true']")) {
                return;
            }

            const childNodes = Array.from(block.childNodes);
            if (
                !childNodes.some(
                    (node) =>
                        node.nodeType === Node.ELEMENT_NODE &&
                        (node as HTMLElement).tagName === "BR",
                )
            ) {
                return;
            }

            const fragment = document.createDocumentFragment();
            let lineOuter = document.createElement("span");
            let lineInner = document.createElement("span");
            let hasVisibleContent = false;
            let lineCount = 0;

            const startLine = () => {
                lineOuter = document.createElement("span");
                lineOuter.dataset.hackathonLine = "true";
                lineOuter.className = "block overflow-hidden";

                lineInner = document.createElement("span");
                lineInner.dataset.hackathonLineInner = "true";
                lineInner.className = "block will-change-transform";
                hasVisibleContent = false;
            };

            const commitLine = () => {
                if (!hasVisibleContent) {
                    lineInner.innerHTML = "&nbsp;";
                    lineInner.setAttribute("aria-hidden", "true");
                }

                lineOuter.appendChild(lineInner);
                fragment.appendChild(lineOuter);
                lineCount += 1;
            };

            startLine();

            childNodes.forEach((node) => {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    (node as HTMLElement).tagName === "BR"
                ) {
                    commitLine();
                    startLine();
                    return;
                }

                if (
                    node.nodeType === Node.TEXT_NODE &&
                    !node.textContent?.trim().length
                ) {
                    lineInner.appendChild(node);
                    return;
                }

                hasVisibleContent = true;
                lineInner.appendChild(node);
            });

            if (hasVisibleContent || lineCount > 0) {
                commitLine();
            }

            if (lineCount > 1) {
                block.replaceChildren(fragment);
            }
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        wrapBreakSeparatedLines(container);

        const textElements = container.querySelectorAll(
            "h1, h2, [data-hackathon-line-inner='true'], hr",
        );
        const imageElements = container.querySelectorAll(
            "[data-hackathon-image='true']",
        );

        const ctx = gsap.context(() => {
            gsap.set(textElements, { opacity: 0, yPercent: 105 });
            gsap.set(imageElements, {
                opacity: 0,
                filter: "blur(20px)",
            });

            const timeline = gsap.timeline({
                defaults: { ease: "power2.out" },
            });

            timeline.fromTo(
                container,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.5 },
            );

            timeline.to(textElements, {
                opacity: 1,
                yPercent: 0,
                duration: 0.55,
                stagger: 0.07,
                clearProps: "opacity,transform",
            });

            timeline.to(
                imageElements,
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    clearProps: "opacity,filter",
                },
                "+= -0.6",
            );
        }, container);

        return () => ctx.revert();
    }, []);

    const title = "3x Final Year Hackathons";
    const date = "June 2026";
    const tags = ["Hackathons", "College Life", "Friendships"];

    const tagDescriptions = {
        Hackathons: "Fast-paced events where ideas become projects.",
        "College Life": "Memories, growth, and campus moments.",
        Friendships: "The people who made the journey memorable.",
    };

    const sections = [
        {
            id: "hackathon-3",
            title: "3rd Hackathon",
            ContentComponent: ThirdHackathon,
            imageLabel: "/hackathons/third.png",
        },
        {
            id: "hackathon-2",
            title: "2nd Hackathon",
            ContentComponent: SecondHackathon,
            imageLabel: "/hackathons/second.png",
        },

        {
            id: "hackathon-1",
            title: "1st Hackathon",
            ContentComponent: FirstHackathon,
            imageLabel: [
                "/hackathons/first-1.png",
                "/hackathons/first-2.png",
                "/hackathons/first-3.png",
                "/hackathons/first-4.png",
            ],
        },
    ];

    return (
        <div className="relative overflow-x-hidden min-h-screen">
            <div
                className={cn(
                    "pointer-events-none absolute inset-0",
                    "bg-[radial-gradient(circle_at_15%_20%,rgba(247,155,114,0.16),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(67,109,140,0.14),transparent_26%),radial-gradient(circle_at_50%_85%,rgba(247,155,114,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(238,238,238,0.9))]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(rgba(42,71,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(42,71,89,0.05)_1px,transparent_1px)] bg-size-[36px_36px]" />
            <div className="pointer-events-none hidden md:block absolute inset-0 overflow-hidden">
                {asciiPanels.map((panel) => (
                    <pre
                        key={panel.className}
                        aria-hidden="true"
                        className={`absolute whitespace-pre font-mono text-[10px] leading-5 tracking-[0.28em] text-retroaccent md:text-xs ${panel.className}`}
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
                            description={
                                tagDescriptions[
                                    tag as keyof typeof tagDescriptions
                                ] || tag
                            }
                        />
                    ))}
                </div>
                <div className="text-xs text-retroblue font-bold font-mono mb-4">
                    {date}
                </div>

                <ArticleLayout disableAnimation>
                    {sections.map(
                        ({ id, title, ContentComponent, imageLabel }) => (
                            <section key={id} className="mb-12">
                                <h2
                                    className={`text-2xl font-extrabold text-retroaccent ${barlow.className}`}
                                >
                                    {title}
                                </h2>

                                <ContentComponent />

                                {Array.isArray(imageLabel) ? (
                                    <div
                                        data-hackathon-image="true"
                                        className="relative my-6 overflow-hidden rounded-none"
                                    >
                                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[rgba(238,238,238,0.98)] via-[rgba(238,238,238,0.72)] to-transparent" />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[rgba(238,238,238,0.98)] via-[rgba(238,238,238,0.72)] to-transparent" />
                                        <div className="grid grid-cols-2 gap-4 rounded-none">
                                            {imageLabel.map((src, index) => (
                                                <div
                                                    key={src}
                                                    className="relative aspect-[4/5] overflow-hidden rounded-none bg-black/5"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`1st hackathon image ${index + 1}`}
                                                        fill
                                                        className="object-cover saturate-90"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        data-hackathon-image="true"
                                        className="my-6 flex items-center justify-center"
                                    >
                                        <Image
                                            src={imageLabel}
                                            alt="Hackathon Image"
                                            width={400}
                                            height={320}
                                            className="object-fill saturate-80"
                                        />
                                    </div>
                                )}

                                {id !== "hackathon-3" && (
                                    <hr className="mt-10 border-retroborder" />
                                )}
                            </section>
                        ),
                    )}
                </ArticleLayout>
            </div>
        </div>
    );
}
