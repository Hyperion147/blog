"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import Link from "next/link";
import HomepageDock from "@/components/HomepageDock";
import LayoutGrid from "@/components/LayoutGrid";

gsap.registerPlugin(Observer);

type TimelinePost = {
    title: string;
    publishedAt: string;
    tags: string[];
    excerpt: string;
    href: string;
    context: string;
};

const blogPosts: TimelinePost[] = [
    {
        title: "Smartphone era v/s AI era",
        publishedAt: "2025-07-01",
        tags: ["AI", "Technology", "Trends"],
        excerpt:
            "A light but sharp comparison between the smartphone boom and the AI shift now unfolding around us.",
        href: "/blogs/smartphone-vs-ai-era",
        context:
            "The feed starts with a technology note: how fast adoption turns novelty into habit.",
    },
    {
        title: "3x Final year hackathons",
        publishedAt: "2026-06-01",
        tags: ["GenAI CG", "Brainwave 2.0", "SSH-01"],
        excerpt:
            "A quieter memory piece about demo-day nerves, all-night builds, and the friendships that outlived the events.",
        href: "/blogs/final-year-hackathons",
        context:
            "Then the writing shifts inward toward college, teamwork, and the people hidden behind the projects.",
    }
];

const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
});

const verticalGuideLines = [
    {
        at: "clamp(1rem, 4vw, 2rem)",
        color: "rgb(var(--theme-accent-rgb))",
    },
    {
        at: "clamp(1rem, 4vw, 4rem)",
        color: "rgb(var(--theme-text-rgb))",
    },
    {
        at: "clamp(24rem, 40vw, 44.9rem)",
        color: "rgb(var(--theme-text-rgb))",
    },
    {
        at: "clamp(56rem, 72vw, 78.9rem)",
        color: "rgb(var(--theme-text-rgb))",
    },
    {
        at: "clamp(84rem, 104vw, 116rem)",
        color: "rgb(var(--theme-text-rgb))",
    },
];

const horizontalGuideLines = [
    {
        className: "md:hidden",
        at: "20%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-accent-rgb))",
    },
    {
        className: "hidden md:block",
        at: "30%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-accent-rgb))",
    },
    {
        className: "md:hidden",
        at: "22.6%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "hidden md:block",
        at: "32.6%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "md:hidden",
        at: "43.4%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "hidden md:block",
        at: "53.4%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "md:hidden",
        at: "60%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "hidden md:block",
        at: "70%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "md:hidden",
        at: "80%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "hidden md:block",
        at: "90%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "md:hidden",
        at: "87%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
    {
        className: "hidden md:block",
        at: "97%",
        from: "clamp(1rem, 3vw, 2rem)",
        to: "4rem",
        color: "rgb(var(--theme-text-rgb) / 0.8)",
    },
];

function formatTimelineDate(dateString: string) {
    const date = new Date(`${dateString}T00:00:00`);

    return {
        monthYear: monthFormatter.format(date),
        year: String(date.getFullYear()),
    };
}

type BlogCardProps = TimelinePost & {
    isLast: boolean;
};

function BlogCard({
    title,
    publishedAt,
    tags,
    excerpt,
    href,
    context,
}: BlogCardProps) {
    const { monthYear } = formatTimelineDate(publishedAt);

    return (
        <article
            data-timeline-card="true"
            className="relative flex w-full max-w-none shrink-0 flex-col px-0 md:h-full md:w-[88vw] md:max-w-136 md:justify-center md:px-4"
        >
            <div className="mb-4 md:mb-6">
                <Link
                    href={href}
                    className="block border border-[rgb(var(--theme-border-rgb)/0.82)] p-6 hover:border-[rgb(var(--theme-accent-rgb)/0.55)]"
                >
                    <h2 className="font-display mb-3 text-2xl font-semibold leading-tight text-retrotext md:text-[2rem]">
                        {title}
                    </h2>
                    <div className="mb-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono-ui border border-retroborder bg-[rgb(var(--theme-bg-rgb)/0.92)] px-2 py-px text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--theme-text-rgb)/0.72)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="max-w-md text-sm leading-7 text-[rgb(var(--theme-text-rgb)/0.75)] md:text-[15px]">
                        {excerpt}
                    </p>
                </Link>
            </div>

            <div className="relative px-1 pb-6 md:px-6 md:pb-3">
                <div className="font-mono-ui mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[rgb(var(--theme-text-rgb)/0.8)]">
                    {monthYear}
                </div>
                <p className="mt-3 max-w-xs text-xs leading-6 text-[rgb(var(--theme-text-rgb)/0.56)] md:text-[13px]">
                    {context}
                </p>
            </div>
        </article>
    );
}

export default function Home() {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 768px)");
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!viewport || !track || !desktopQuery.matches) {
            if (track) {
                gsap.set(track, { clearProps: "transform" });
            }
            return;
        }

        const cards = Array.from(
            track.querySelectorAll<HTMLElement>("[data-timeline-card='true']"),
        );

        let currentX = 0;
        let minX = 0;
        let snapPoints: number[] = [];

        const animateTo = (nextX: number, shouldSnap = false) => {
            const target =
                shouldSnap && snapPoints.length
                    ? gsap.utils.snap(snapPoints)(nextX)
                    : nextX;

            currentX = gsap.utils.clamp(minX, 0, target);

            gsap.to(track, {
                x: currentX,
                duration: shouldSnap ? 0.7 : 0.45,
                ease: shouldSnap ? "power3.out" : "power2.out",
                overwrite: true,
            });
        };

        const refreshBounds = () => {
            minX = Math.min(0, viewport.clientWidth - track.scrollWidth);
            currentX = gsap.utils.clamp(minX, 0, currentX);
            snapPoints = cards.map((card) => {
                const centeredOffset =
                    card.offsetLeft -
                    (viewport.clientWidth - card.offsetWidth) / 2;

                return -centeredOffset;
            });

            gsap.set(track, { x: currentX });
        };

        const observer = Observer.create({
            target: viewport,
            type: "wheel,touch,pointer",
            preventDefault: true,
            wheelSpeed: 1,
            tolerance: 10,
            dragMinimum: 8,
            lockAxis: true,
            ignore: "a, button",
            onChange: (self) => {
                animateTo(currentX - self.deltaX - self.deltaY * 1.15);
            },
            onDrag: (self) => {
                animateTo(currentX - self.deltaX * 1.4);
            },
            onStop: () => {
                animateTo(currentX, true);
            },
            onRelease: () => {
                animateTo(currentX, true);
            },
        });

        refreshBounds();
        window.addEventListener("resize", refreshBounds);

        return () => {
            observer.kill();
            window.removeEventListener("resize", refreshBounds);
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-retrobg text-retrotext md:h-screen md:overflow-hidden mb-20 md:mb-0">
            <HomepageDock />

            <main
                ref={viewportRef}
                className="relative min-h-screen overflow-y-auto overflow-x-hidden md:h-full md:overflow-hidden"
                style={{ touchAction: "auto" }}
            >
                <div
                    ref={trackRef}
                    className="relative flex min-h-screen flex-col items-stretch px-4 pt-6 md:h-full md:flex-row md:pl-8 md:pr-0 md:py-0"
                >
                    <LayoutGrid
                        verticalLines={verticalGuideLines}
                        horizontalLines={horizontalGuideLines}
                    />

                    <section className="relative flex min-h-0 w-full max-w-2xl shrink-0 flex-col justify-start px-2 pt-28 pb-8 md:h-full md:min-h-[70vh] md:w-[92vw] md:justify-center md:px-8 md:py-20">
                        <div className="max-w-xl">
                            <h1
                                data-home-intro="true"
                                className="font-display max-w-lg text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-7xl"
                            >
                                blog archive for suryansu
                            </h1>
                        </div>

                        <div
                            data-home-intro="true"
                            className="mt-8 max-w-md px-1"
                        >
                            <div className="font-mono-ui mb-3 text-xs uppercase tracking-[0.26em] text-[rgb(var(--theme-text-rgb)/0.45)]">
                                Reading rhythm
                            </div>
                        </div>
                    </section>

                    {blogPosts.map((post, index) => (
                        <BlogCard
                            key={post.href}
                            {...post}
                            isLast={index === blogPosts.length - 1}
                        />
                    ))}
                </div>

                <div className="pointer-events-none fixed bottom-10 left-4 px-1 md:absolute md:bottom-10 md:left-16">
                    <div className="font-mono-ui mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[rgb(var(--theme-text-rgb))]">
                        <span className="md:hidden">Scroll down</span>
                        <span className="hidden md:inline">Use wheel or drag</span>|
                        <span>
                            {blogPosts.length} post
                            {blogPosts.length === 1 ? "" : "s"}
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}
