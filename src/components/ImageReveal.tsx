"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scan, Eye } from "lucide-react";

const revealBlocks = [
  {
    title: "Domain Layer",
    direction: "left" as const,
    gradient: "from-purple-700 via-indigo-700 to-purple-800",
    description: "The core of the application containing enterprise logic, entities, value objects, and domain interfaces. Zero dependencies.",
  },
  {
    title: "Application Layer",
    direction: "right" as const,
    gradient: "from-indigo-700 via-cyan-700 to-indigo-800",
    description: "Use cases, commands, queries, and business rules orchestrated using MediatR and CQRS patterns.",
  },
  {
    title: "Infrastructure Layer",
    direction: "center" as const,
    gradient: "from-cyan-700 via-emerald-700 to-teal-800",
    description: "External concerns like Entity Framework Core DbContexts, Redis Caching, and third-party API integrations.",
  },
];

export default function ImageReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".reveal-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      blockRefs.current.forEach((block, i) => {
        if (!block) return;

        const overlay = block.querySelector(".clip-overlay") as HTMLElement;
        const content = block.querySelector(".reveal-content") as HTMLElement;
        const direction = revealBlocks[i].direction;

        if (overlay) {
          // Set initial clip-path covering the whole block
          let fromClip: string;
          let toClip: string;

          if (direction === "left") {
            fromClip = "inset(0 100% 0 0)";
            toClip = "inset(0 0% 0 0)";
          } else if (direction === "right") {
            fromClip = "inset(0 0 0 100%)";
            toClip = "inset(0 0 0 0%)";
          } else {
            fromClip = "inset(50% 50% 50% 50%)";
            toClip = "inset(0% 0% 0% 0%)";
          }

          gsap.fromTo(
            overlay,
            { clipPath: fromClip },
            {
              clipPath: toClip,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 70%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
        }

        // Content fade-in after reveal
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Scale the whole block slightly on scroll
        gsap.fromTo(
          block,
          { scale: 0.92, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="image-reveal"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Header */}
      <div className="reveal-header text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-amber-400 uppercase bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
          <Scan className="w-3.5 h-3.5 inline mr-1.5" />
          Architectural Patterns
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Clean Architecture
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Structuring .NET applications into isolated, modular layers to ensure long-term maintainability, testability, and independence of frameworks.
        </p>
      </div>

      {/* Reveal Blocks */}
      <div className="flex flex-col gap-12">
        {revealBlocks.map((block, idx) => (
          <div
            key={idx}
            ref={(el) => { blockRefs.current[idx] = el; }}
            className="relative rounded-3xl overflow-hidden h-64 sm:h-80 border border-white/10"
          >
            {/* Base Layer (dark with pattern) */}
            <div className="absolute inset-0 bg-zinc-900 bg-grid-pattern flex items-center justify-center">
              <div className="text-center px-4">
                <Eye className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <span className="text-zinc-500 text-sm font-mono">Scroll to reveal &darr;</span>
              </div>
            </div>

            {/* Clip-Path Overlay (the revealed content) */}
            <div
              className={`clip-overlay absolute inset-0 bg-gradient-to-br ${block.gradient} flex items-center justify-center`}
            >
              <div className="reveal-content text-center px-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto mb-4">
                  {block.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
