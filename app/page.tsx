"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import Countdown from "@/components/sections/Countdown";
import RSVPPreview from "@/components/sections/RSVPPreview";
import LoveStory from "@/components/sections/LoveStory";
import MemoryLane from "@/components/sections/MemoryLane";
import Gifts from "@/components/sections/Gifts";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  return (
    <main>
      <SplashScreen onEnter={() => setEntered(true)} />
      <Hero shouldPlay={entered} />
      <Welcome />
      <Countdown />
      <RSVPPreview />
      <LoveStory />
      <MemoryLane />
      <Gifts />
      <FAQ />
      <Footer />
    </main>
  );
}
