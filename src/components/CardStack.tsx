"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";

const stackCards = [
  {
    step: "01",
    title: "Requirement Engineering",
    desc: "Understanding complex business domains and translating them into technical requirements using Event Storming.",
    badge: "Phase 1 &bull; Discovery",
    gradient: "from-purple-900/90 via-zinc-900 to-zinc-950",
    border: "border-purple-500/40",
    iconColor: "text-purple-400",
  },
  {
    step: "02",
    title: "API Design & Architecture",
    desc: "Creating secure, versioned, and documented REST and gRPC endpoints following OpenAPI standards.",
    badge: "Phase 2 &bull; Design",
    gradient: "from-indigo-900/90 via-zinc-900 to-zinc-950",
    border: "border-indigo-500/40",
    iconColor: "text-indigo-400",
  },
  {
    step: "03",
    title: "Core Implementation",
    desc: "Writing clean, testable C# code adhering to SOLID principles and comprehensive unit testing.",
    badge: "Phase 3 &bull; Development",
    gradient: "from-cyan-900/90 via-zinc-900 to-zinc-950",
    border: "border-cyan-500/40",
    iconColor: "text-cyan-400",
  },
  {
    step: "04",
    title: "Cloud Deployment",
    desc: "Automating zero-downtime deployments to Azure using robust CI/CD pipelines and Infrastructure as Code.",
    badge: "Phase 4 &bull; Delivery",
    gradient: "from-violet-900/90 via-zinc-900 to-zinc-950",
    border: "border-violet-500/40",
    iconColor: "text-violet-400",
  },
];

export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".stack-card");

      if (cards && cards.length > 0) {
        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            gsap.to(card, {
              scale: 0.9 + index * 0.02,
              opacity: 0.4,
              filter: "blur(4px)",
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              },
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="card-stack"
      ref={containerRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative"
    >
      <div className="text-center mb-16">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20 inline-block mb-3">
          Project Methodology
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Delivery Pipeline
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          A disciplined approach to software development, ensuring high-quality, maintainable code from initial conception through to production delivery.
        </p>
      </div>

      <div className="flex flex-col gap-12 relative">
        {stackCards.map((card, idx) => (
          <div
            key={idx}
            className={`stack-card sticky top-28 rounded-3xl p-8 sm:p-10 bg-gradient-to-br ${card.gradient} border ${card.border} shadow-2xl backdrop-blur-xl transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black font-mono text-white/40">
                  {card.step}
                </span>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-zinc-900/80 text-zinc-300 border border-white/10">
                  {card.badge}
                </span>
              </div>
              <CheckCircle2 className={`w-6 h-6 ${card.iconColor}`} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {card.title}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              {card.desc}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-4 border-t border-white/10">
              <span>Agile Delivery</span>
              <span>&bull;</span>
              <span>Continuous Integration</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
