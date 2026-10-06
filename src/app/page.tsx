import React from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ParallaxGrid from "@/components/ParallaxGrid";
import HorizontalScroll from "@/components/HorizontalScroll";
import CounterStats from "@/components/CounterStats";
import FlipCards from "@/components/FlipCards";
import ScrollTimeline from "@/components/ScrollTimeline";
import MarqueeSection from "@/components/MarqueeSection";
import ImageReveal from "@/components/ImageReveal";
import CardStack from "@/components/CardStack";
import TextReveal from "@/components/TextReveal";
import AnimationControlPanel from "@/components/AnimationControlPanel";
import Footer from "@/components/Footer";
import ProfileIntro from "@/components/ProfileIntro";
import TechStack3D from "@/components/TechStack3D";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Preloader />
      {/* Fixed Navbar with global Lenis scroll progress bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Section 01: Hero with intro timeline, floating parallax badges */}
        <HeroSection />

        {/* Section 01.5: Profile Intro — About Me */}
        <ProfileIntro />

        {/* Section 01.6: Interactive 3D Technology Sphere */}
        <TechStack3D />

        {/* Section 02: Multi-Speed Parallax Grid */}
        <ParallaxGrid />

        {/* Section 03: Pinned Horizontal Scroll (Desktop Pin vs Mobile Stack) */}
        <HorizontalScroll />

        {/* Section 04: Animated Counter Stats with 3D card entrance */}
        <CounterStats />

        {/* Section 05: Scroll-Driven 3D Card Flips */}
        <FlipCards />

        {/* Section 06: Progressive Step Timeline */}
        <ScrollTimeline />

        {/* Section 07: Velocity-Driven Scroll Marquee */}
        {/* <MarqueeSection /> */}

        {/* Section 08: Clip-Path Wipe Reveals */}
        <ImageReveal />

        {/* Section 09: 3D Stacking Card Sequence */}
        <CardStack />

        {/* Section 10: Scroll Scrubbing Text Reveal */}
        <TextReveal />

        {/* Section 11: Interactive Diagnostic Control Panel */}
        {/* <AnimationControlPanel /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
