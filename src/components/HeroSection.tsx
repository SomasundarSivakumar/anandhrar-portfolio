"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { ArrowDown, Zap, ShieldCheck, Compass, Sparkles, Smartphone } from "lucide-react";
import ParticleCanvas from "./canvas/ParticleCanvas";

export default function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef1 = useRef<HTMLDivElement>(null);
  const badgeRef2 = useRef<HTMLDivElement>(null);
  const badgeRef3 = useRef<HTMLDivElement>(null);
  const bgOrbRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro timeline animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          nameRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          [badgeRef1.current, badgeRef2.current, badgeRef3.current],
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15 },
          "-=0.6"
        );

      // Hero ScrollTrigger parallax effect on scroll
      gsap.to(bgOrbRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        scale: 1.4,
        opacity: 0.1,
      });

      // Parallax motion for badges
      gsap.to(badgeRef1.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -100,
        rotate: -5,
      });

      gsap.to(badgeRef2.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        y: -160,
        rotate: 6,
      });

      gsap.to(badgeRef3.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -80,
        rotate: -3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      <ParticleCanvas />
      {/* Background Glowing Ambient Orbs */}
      <div
        ref={bgOrbRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/20 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Top Tagline */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs sm:text-sm font-medium text-purple-300 backdrop-blur-md mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>.NET Developer &bull; C# &bull; WPF &bull; SQL &bull; Hosur, TN</span>
        </div> */}

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 flex flex-col sm:block items-center justify-center"
        >
          Hi, I&apos;m{" "}
          <span className="inline-block align-bottom">
            <span
              ref={nameRef}
              className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent inline-block pb-2 pr-4 sm:pr-8"
              style={{
                clipPath: "inset(0 100% 0 0)",
                fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "1.3em",
                fontWeight: 700,
                transform: "translateY(10px) rotate(-2deg)"
              }}
            >
              Anantharaj
            </span>
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Software Engineer with <strong className="text-zinc-200">4+ years of experience</strong> developing scalable and high-performance applications using .NET technologies. Skilled in C#, WPF, and SQL — passionate about problem-solving and delivering robust solutions that drive business growth.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo("#parallax-grid")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-purple-600/25 border border-white/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>Explore My Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <a
            href="mailto:anantharajb@email.com"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-semibold border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Get In Touch</span>
          </a>
        </div>

        {/* Floating Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div
            ref={badgeRef1}
            className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-white mb-1">4+ Years Experience</h2>
            <p className="text-xs text-zinc-400 leading-normal">
              Proven track record of developing scalable, high-performance .NET applications for enterprise environments.
            </p>
          </div>

          <div
            ref={badgeRef2}
            className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-white mb-1">Desktop &amp; Web Mastery</h2>
            <p className="text-xs text-zinc-400 leading-normal">
              Deep expertise in C#, WPF, and SQL to deliver robust, optimized, and business-driven software solutions.
            </p>
          </div>

          <div
            ref={badgeRef3}
            className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-white mb-1">Agile &amp; SDLC</h2>
            <p className="text-xs text-zinc-400 leading-normal">
              Strong understanding of the complete software development life cycle and Agile engineering methodologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
