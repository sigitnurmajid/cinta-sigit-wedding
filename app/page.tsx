"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import Countdown from "@/components/sections/Countdown";
import LoveStory from "@/components/sections/LoveStory";
import MemoryLane from "@/components/sections/MemoryLane";
import Venue from "@/components/sections/Venue";
import Details from "@/components/sections/Details";
import Gifts from "@/components/sections/Gifts";
import RSVPSection from "@/components/sections/RSVPSection";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  return (
    <main>
      <SplashScreen onEnter={() => setEntered(true)} />
      <div id="home">
        <Hero shouldPlay={entered} />
      </div>
      <Welcome />
      <Countdown />
      <LoveStory />
      <MemoryLane />
      <Venue />
      <Details />
      <Gifts />
      <RSVPSection />
      {/* <FAQ /> */}
      <Footer />
    </main>
  );
}
