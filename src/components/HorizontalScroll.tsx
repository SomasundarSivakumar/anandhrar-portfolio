"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Shield, Flame, Smartphone, Monitor } from "lucide-react";
import StarfieldCanvas from "./canvas/StarfieldCanvas";

const panels = [
  {
    num: "01",
    title: "Microservices Architecture",
    subtitle: "Decoupled & Scalable",
    description: "Architecting backend systems into independent, deployable services communicating via RabbitMQ or Azure Service Bus.",
    badge: "Domain Driven Design",
    color: "from-purple-900/60 to-indigo-950/80 border-purple-500/30",
  },
  {
    num: "02",
    title: "Performance Optimization",
    subtitle: "High-Throughput APIs",
    description: "Utilizing asynchronous programming and Redis distributed caching in ASP.NET Core to handle massive traffic loads efficiently.",
    badge: "ASP.NET Core API",
    color: "from-indigo-900/60 to-cyan-950/80 border-indigo-500/30",
  },
  {
    num: "03",
    title: "Cloud Integration",
    subtitle: "Azure Ecosystem",
    description: "Leveraging Azure Functions, App Services, and Blob Storage to build highly available, scalable cloud-native solutions.",
    badge: "Azure Cloud",
    color: "from-cyan-900/60 to-teal-950/80 border-cyan-500/30",
  },
  {
    num: "04",
    title: "Data Engineering",
    subtitle: "Relational & NoSQL",
    description: "Designing complex data models using Entity Framework Core, SQL Server, and integrating MongoDB for unstructured data.",
    badge: "Entity Framework",
    color: "from-violet-900/60 to-purple-950/80 border-violet-500/30",
  },
];

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
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

          if (isDesktop && containerRef.current && targetRef.current) {
            const panelsList = containerRef.current.querySelectorAll(".horizontal-panel");
            const totalPanels = panelsList.length;

            gsap.to(panelsList, {
              xPercent: -100 * (totalPanels - 1),
              ease: "none",
              scrollTrigger: {
                trigger: targetRef.current,
                pin: true,
                scrub: 1,
                // End length proportional to number of panels
                end: () => `+=${containerRef.current?.offsetWidth || 2000}`,
                invalidateOnRefresh: true,
              },
            });
          }
        }
      );
    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal-section"
      ref={targetRef}
      className="relative bg-zinc-950 border-y border-white/10 flex flex-col min-h-screen lg:h-screen"
    >
      <StarfieldCanvas />
      {/* Mobile Header Banner */}
      <div className="lg:hidden py-12 px-4 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-3">
          <Smartphone className="w-3.5 h-3.5" /> Mobile Responsive Stack Active
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Technical Deep Dive</h2>
        <p className="text-xs text-zinc-400">
          On desktop viewports, this section pins and scrolls horizontally. On mobile screens, it gracefully adjusts into a touch-optimized vertical stack.
        </p>
      </div>

      {/* Desktop Header Banner Overlay */}
      <div className="hidden lg:block w-full px-12 pt-12 pb-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2 backdrop-blur-md">
          <Monitor className="w-3.5 h-3.5 text-purple-400" /> Architecture Highlights (Scroll Down to Slide)
        </div>
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white">Engineering Excellence</h2>
      </div>

      {/* Main Panels Track */}
      <div className="overflow-hidden flex-1 flex items-center min-h-[70vh]">
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row w-full lg:w-max px-4 lg:px-12 py-12 lg:py-8 gap-6 lg:gap-12"
        >
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className="horizontal-panel w-full lg:w-[80vw] xl:w-[65vw] lg:h-[70vh] rounded-3xl p-8 sm:p-12 glass-card border flex flex-col justify-between relative group shrink-0 transition-transform duration-300"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl sm:text-6xl font-black font-mono text-white/20 group-hover:text-purple-400/40 transition-colors">
                  {panel.num}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/90 text-purple-300 border border-purple-500/30">
                  {panel.badge}
                </span>
              </div>

              {/* Center Content */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2 block">
                  {panel.subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                  {panel.title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  {panel.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Shield className="w-4 h-4 text-purple-400" /> Enterprise Solutions
                </span>
                <span className="hidden lg:flex items-center gap-1 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Scroll for next panel <MoveRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
