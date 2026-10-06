"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Milestone } from "lucide-react";

const timelineSteps = [
  {
    year: "2016 – 2019",
    title: "NMS SVN College of Education",
    desc: "Completed BSc in Computer Science with 1st class honours, building a strong foundation in programming, data structures, and algorithms.",
    code: "BSc Computer Science | 1st Class",
    color: "bg-purple-500",
    glow: "shadow-purple-500/30",
  },
  {
    year: "2019 – 2022",
    title: "Madurai Kamaraj University",
    desc: "Pursued Master of Computer Applications (MCA) in Information Technology with an exceptional Grade A++, specializing in software engineering and advanced databases.",
    code: "MCA – Information Technology | Grade A++",
    color: "bg-indigo-500",
    glow: "shadow-indigo-500/30",
  },
  {
    year: "Apr 2022",
    title: "Joined IDS Next Business Solutions",
    desc: "Began my career as a Software Engineer in Bengaluru, working on enterprise software products using C#, .NET Framework, and SQL Server.",
    code: "Software Engineer | C# | .NET | SQL",
    color: "bg-cyan-500",
    glow: "shadow-cyan-500/30",
  },
  {
    year: "2022 – 2025",
    title: "Core .NET Development",
    desc: "Built and maintained scalable Windows and web applications, contributing to multiple product modules using WPF, ASP.NET, LINQ, and Entity Framework.",
    code: "WPF | ASP.NET | Entity Framework | LINQ",
    color: "bg-emerald-500",
    glow: "shadow-emerald-500/30",
  },
  {
    year: "Feb 2026",
    title: "Joined Titan Engineering & Automation",
    desc: "Promoted to a new challenge at a TATA Enterprise — working on NOVC-SCADA & Software systems in Hosur, Tamil Nadu. On-site industrial automation engineering.",
    code: "NOVC-SCADA | Titan Engineering (TATA)",
    color: "bg-amber-500",
    glow: "shadow-amber-500/30",
  },
  {
    year: "2026 – Present",
    title: "Industrial Software Development",
    desc: "Currently developing and enhancing SCADA software solutions for industrial automation, applying enterprise .NET skills to real-time monitoring systems.",
    code: "SCADA | Real-time Systems | .NET",
    color: "bg-rose-500",
    glow: "shadow-rose-500/30",
  },
];

export default function ScrollTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".timeline-header",
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

      // Animate the vertical line growing
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Animate each step
      const steps = sectionRef.current?.querySelectorAll(".timeline-step");
      steps?.forEach((step, i) => {
        const isLeft = i % 2 === 0;

        // Dot pulse
        gsap.fromTo(
          step.querySelector(".timeline-dot"),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Card slide in from alternating sides
        gsap.fromTo(
          step.querySelector(".timeline-card"),
          { opacity: 0, x: isLeft ? -100 : 100, rotateZ: isLeft ? -3 : 3 },
          {
            opacity: 1,
            x: 0,
            rotateZ: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scroll-timeline"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="timeline-header text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-3">
          <Milestone className="w-3.5 h-3.5 inline mr-1.5" />
          Education &amp; Experience
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          My Career Journey
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          From BSc Computer Science to MCA (Grade A++) at Madurai Kamaraj University, followed by 4+ years of professional .NET software engineering at top companies.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical growing line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px">
          <div
            className="timeline-line w-full h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500 origin-top"
          />
        </div>

        {/* Timeline Steps */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {timelineSteps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="timeline-step relative"
              >
                {/* Center Dot */}
                <div
                  className={`timeline-dot absolute left-4 sm:left-1/2 top-8 w-5 h-5 rounded-full ${step.color} border-4 border-zinc-950 z-10 -translate-x-1/2 shadow-lg ${step.glow}`}
                />

                {/* Card */}
                <div
                  className={`timeline-card ml-12 sm:ml-0 ${
                    isLeft ? "sm:mr-[52%] sm:pr-8" : "sm:ml-[52%] sm:pl-8"
                  }`}
                >
                  <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10 relative group">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${step.color} text-white`}>
                        {step.year}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {step.desc}
                    </p>

                    <div className="bg-zinc-900/80 rounded-xl px-4 py-3 border border-white/5">
                      <code className="text-xs font-mono text-purple-300 break-all">{step.code}</code>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
