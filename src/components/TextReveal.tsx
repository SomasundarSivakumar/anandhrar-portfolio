"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Type, Sparkles } from "lucide-react";

const paragraphText =
  "Always eager to learn and stay updated with the latest technology trends. I build scalable, high-performance .NET solutions that drive real business growth — combining deep technical expertise with a passion for clean code, Agile collaboration, and optimizing systems for maximum efficiency.";

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".scrub-word");

      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 4, color: "#52525b" },
          {
            opacity: 1,
            y: 0,
            color: "#ffffff",
            stagger: 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = paragraphText.split(" ");

  return (
    <section
      id="text-reveal"
      ref={containerRef}
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-xs font-mono text-purple-300 mb-8">
        <Type className="w-3.5 h-3.5 text-purple-400" /> Engineering Philosophy
      </div>

      <p
        ref={textRef}
        className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-600 leading-snug tracking-tight mb-8"
      >
        {words.map((word, i) => (
          <span key={i} className="scrub-word inline-block mr-[0.28em] transition-colors">
            {word}
          </span>
        ))}
      </p>

      <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span>Scalable backend systems tailored for enterprise business requirements</span>
      </div>
    </section>
  );
}
