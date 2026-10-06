"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { MoveHorizontal } from "lucide-react";

const row1Items = [
  ".NET 8",
  "C# 12",
  "ASP.NET Core Web API",
  "Entity Framework Core",
  "Blazor WebAssembly",
  "LINQ",
  "Dapper",
  "SignalR",
];

const row2Items = [
  "Azure Functions",
  "Azure SQL",
  "App Services",
  "Azure Key Vault",
  "Azure Blob Storage",
  "Azure Service Bus",
  "Cosmos DB",
  "AKS",
];

const row3Items = [
  "Docker",
  "Kubernetes",
  "Redis",
  "RabbitMQ",
  "SQL Server",
  "MongoDB",
  "GitHub Actions",
  "Terraform",
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const { isScrolling } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".marquee-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Scroll-driven marquee: rows move at different speeds and directions
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (row3Ref.current) {
        gsap.to(row3Ref.current, {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderRow = (
    items: string[],
    ref: React.RefObject<HTMLDivElement | null>,
    gradient: string,
    borderColor: string,
    textColor: string
  ) => (
    <div className="overflow-hidden py-2">
      <div
        ref={ref}
        className="flex gap-4 w-max"
      >
        {/* Duplicate items for seamless loop illusion */}
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className={`shrink-0 px-6 py-3 rounded-2xl ${gradient} border ${borderColor} ${textColor} text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              isScrolling ? "scale-[1.02] shadow-lg" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="marquee-header text-center max-w-3xl mx-auto mb-14 px-4">
        <span className="text-xs font-mono tracking-widest text-rose-400 uppercase bg-rose-950/50 px-3 py-1 rounded-full border border-rose-500/20 inline-block mb-3">
          <MoveHorizontal className="w-3.5 h-3.5 inline mr-1.5" />
          Technology Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Comprehensive Toolset
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Proficient across the entire Microsoft ecosystem, Azure cloud infrastructure, and modern DevOps pipelines. Built to scale and perform at the enterprise level.
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-4">
        {renderRow(
          row1Items,
          row1Ref,
          "bg-purple-950/60",
          "border-purple-500/30",
          "text-purple-200"
        )}
        {renderRow(
          row2Items,
          row2Ref,
          "bg-indigo-950/60",
          "border-indigo-500/30",
          "text-indigo-200"
        )}
        {renderRow(
          row3Items,
          row3Ref,
          "bg-cyan-950/60",
          "border-cyan-500/30",
          "text-cyan-200"
        )}
      </div>

      {/* Edge fade gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
