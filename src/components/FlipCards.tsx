"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, RotateCw } from "lucide-react";

const cubeCards = [
  {
    front: { title: "Backend", subtitle: "ASP.NET Core & C#", gradient: "from-purple-600 to-indigo-700" },
    back: { title: "Scalable APIs", subtitle: "REST & gRPC Services", gradient: "from-indigo-600 to-cyan-600" },
  },
  {
    front: { title: "Database", subtitle: "SQL Server & EF Core", gradient: "from-blue-600 to-cyan-600" },
    back: { title: "Optimized Data", subtitle: "Complex Queries & Caching", gradient: "from-cyan-600 to-emerald-600" },
  },
  {
    front: { title: "Cloud", subtitle: "Azure Ecosystem", gradient: "from-emerald-600 to-teal-600" },
    back: { title: "Cloud Native", subtitle: "Docker & Microservices", gradient: "from-teal-600 to-purple-600" },
  },
];

export default function FlipCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        ".flip-header",
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

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          const flipContainers = sectionRef.current?.querySelectorAll(".flip-container");

          flipContainers?.forEach((container, i) => {
            const inner = container.querySelector(".flip-inner") as HTMLElement;
            if (!inner) return;

            // On desktop: full 180° flip scrub. On mobile: 90° partial tilt for visibility
            const targetRotation = isDesktop ? 180 : 90;

            gsap.fromTo(
              inner,
              { rotateY: 0 },
              {
                rotateY: targetRotation,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top 70%",
                  end: "top 20%",
                  scrub: 1,
                },
              }
            );

            // Stagger entrance
            gsap.fromTo(
              container,
              { opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.85 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flip-cards"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      <div className="flip-header text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-violet-400 uppercase bg-violet-950/50 px-3 py-1 rounded-full border border-violet-500/20 inline-block mb-3">
          <RotateCw className="w-3.5 h-3.5 inline mr-1.5" />
          Full Stack Development
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          End-to-End Solutions
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Bringing a comprehensive skill set to the table, from designing complex backend architectures to deploying highly available cloud services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cubeCards.map((card, idx) => (
          <div
            key={idx}
            className="flip-container h-72 sm:h-80"
            style={{ perspective: "1200px" }}
          >
            <div
              className="flip-inner relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.front.gradient} p-8 flex flex-col items-center justify-center text-center border border-white/20 shadow-2xl`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Box className="w-10 h-10 text-white/80 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{card.front.title}</h3>
                <p className="text-sm text-white/70">{card.front.subtitle}</p>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Face: Front</span>
                  <span>rotateY: 0°</span>
                </div>
              </div>

              {/* Back Face */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.back.gradient} p-8 flex flex-col items-center justify-center text-center border border-white/20 shadow-2xl`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <RotateCw className="w-10 h-10 text-white/80 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{card.back.title}</h3>
                <p className="text-sm text-white/70">{card.back.subtitle}</p>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Face: Back</span>
                  <span>rotateY: 180°</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
