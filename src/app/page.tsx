"use client";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import AnnouncementSection from "@/components/sections/announcement/AnnouncementSection";
import EventsSection from "@/components/sections/events/EventsSection";
import HeroSection from "@/components/sections/hero/HeroSection";

export default function App() {
  return (
    /**
     * Navbar Component
     * 1. Hero Section
     * 2. About Section
     * 3. Events Section (from Firebase) -> INPUT: none; OUTPUT: events
     * 3. Testimonials Section
     * Footer Component
     */

    <>
      <NavBar />
      <HeroSection />
      <AnnouncementSection />
      <EventsSection />
      <Footer />
    </>
  );
}
