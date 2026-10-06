"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, Globe, Zap, Award, Clock } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Years of Experience", value: 4, suffix: "+", color: "text-purple-400", bg: "from-purple-600/20 to-purple-900/40" },
  { icon: Users, label: "Projects Delivered", value: 20, suffix: "+", color: "text-indigo-400", bg: "from-indigo-600/20 to-indigo-900/40" },
  { icon: Globe, label: "Client Satisfaction", value: 99, suffix: "%", color: "text-cyan-400", bg: "from-cyan-600/20 to-cyan-900/40" },
  { icon: Zap, label: "Modules Developed", value: 50, suffix: "+", color: "text-amber-400", bg: "from-amber-600/20 to-amber-900/40" },
  { icon: Award, label: "MCA Grade", value: 97, suffix: "%", color: "text-emerald-400", bg: "from-emerald-600/20 to-emerald-900/40" },
  { icon: Clock, label: "Avg Bug Fix Time", value: 2.5, suffix: "h", color: "text-rose-400", bg: "from-rose-600/20 to-rose-900/40", decimals: 1 },
];

export default function CounterStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the section header
      gsap.fromTo(
        ".counter-header",
        { opacity: 0, y: 60 },
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

      // Animate each stat card stagger entrance
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Counter number animation
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target.value,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            if (target.decimals) {
              el.textContent = obj.val.toFixed(target.decimals);
            } else {
              el.textContent = Math.round(obj.val).toString();
            }
          },
        });
      });

      // Glowing background pulse on scroll
      gsap.fromTo(
        ".counter-glow",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1.3,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="counter-stats"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="counter-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-[100px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="counter-header text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-500/20 inline-block mb-3">
          Impact & Metrics
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Proven Track Record
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Delivering measurable results through robust backend engineering, optimized system performance, and scalable cloud infrastructure.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div
              key={idx}
              className={`stat-card glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 text-center relative overflow-hidden group`}
              style={{ perspective: "800px" }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center ${stat.color} mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span
                    ref={(el) => { counterRefs.current[idx] = el; }}
                    className={`text-4xl sm:text-5xl font-black font-mono ${stat.color}`}
                  >
                    0
                  </span>
                  <span className={`text-lg sm:text-xl font-bold ${stat.color} opacity-70`}>
                    {stat.suffix}
                  </span>
                </div>

                <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
