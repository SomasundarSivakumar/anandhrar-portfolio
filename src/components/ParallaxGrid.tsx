"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import WaveCanvas from "./canvas/WaveCanvas";

const cards = [
  {
    image: "/images/tech3d/csharp.png",
    speed: -40,
    title: "C# & .NET 8 Core",
    desc: "Building high-performance RESTful APIs, async backend systems, and enterprise solutions with C#.",
    color: "from-purple-500 to-indigo-500",
    badge: "Core Language",
  },
  {
    image: "/images/tech3d/architecture.png",
    speed: 60,
    title: "Clean Architecture",
    desc: "Designing decoupled microservices, domain-driven architecture (DDD), and SOLID design patterns.",
    color: "from-blue-500 to-cyan-500",
    badge: "Architecture",
  },
  {
    image: "/images/tech3d/azure.png",
    speed: -25,
    title: "Azure Cloud & SCADA",
    desc: "Deploying resilient cloud apps using Azure App Services, Event Hubs, and industrial SCADA bridges.",
    color: "from-emerald-500 to-teal-500",
    badge: "Cloud & SCADA",
  },
  {
    image: "/images/tech3d/sql.png",
    speed: 50,
    title: "SQL Server & EF Core",
    desc: "Optimizing database indexing, stored procedures, LINQ queries, and high-throughput data access.",
    color: "from-amber-500 to-orange-500",
    badge: "Database",
  },
  {
    image: "/images/tech3d/devops.png",
    speed: -35,
    title: "CI/CD & DevOps",
    desc: "Automating build pipelines, unit testing with NUnit, and containerization using Docker & Azure DevOps.",
    color: "from-rose-500 to-pink-500",
    badge: "DevOps",
  },
  {
    image: "/images/tech3d/wpf.png",
    speed: 35,
    title: "WPF & MVVM GUI",
    desc: "Crafting sleek desktop application interfaces using WPF, XAML, MVVM design pattern, and custom controls.",
    color: "from-violet-500 to-purple-600",
    badge: "Desktop GUI",
  },
];

export default function ParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const parallaxCards = containerRef.current?.querySelectorAll(".parallax-card");

          parallaxCards?.forEach((card) => {
            const speed = parseFloat(card.getAttribute("data-speed") || "0");
            const moveY = isDesktop ? speed : speed * 0.4;

            gsap.fromTo(
              card,
              { yPercent: -moveY },
              {
                yPercent: moveY,
                ease: "none",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="parallax-grid"
      ref={containerRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <WaveCanvas />
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/50 px-3 py-1 rounded-full border border-purple-500/20 inline-block mb-3">
          Core Skills &bull; Tech Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Technical Expertise & Stack
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          4 years of specialized experience in Microsoft technology stack, building scalable web APIs, robust desktop tools, and enterprise cloud solutions.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {cards.map((item, index) => (
          <div
            key={index}
            data-speed={item.speed}
            className="parallax-card glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 relative group transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div>
              {/* Card Top: 3D Icon Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 shadow-xl group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 flex items-center justify-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity blur-md`} />
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 shadow-inner">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Bottom Decorative Bar */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="group-hover:text-zinc-300 transition-colors">Production Ready</span>
              <span className="text-purple-400 group-hover:translate-x-1.5 transition-transform duration-300 font-bold text-sm">
                &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
