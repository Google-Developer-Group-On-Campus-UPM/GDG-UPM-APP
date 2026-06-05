"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AnnouncementSection from "@/components/sections/announcement/AnnouncementSection";
import EventsSection from "@/components/sections/events/EventsSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AnnouncementSection />
      <EventsSection />
      {/* <TestimonialsSection /> */}
      <Footer />
    </>
  );
}
