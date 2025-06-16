"use client";

import NavBar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/home/HomeSection";

export default function App() {
  // Your logic goes here

  /**
   *  1. Initialize Firebase
   *  2. Fetch data from Firebase
   *  3. Store data in state variables
   *  4. Render components with fetched data
   */

  // Fetch teams from Firebase
  // const teams = await firebase.getTeams();

  // Fetch events from Firebase
  // const events = await firebase.getEvents();

  return (
    /**
     * Navbar Component
     * 1. Hero Section
     * 2. About Section
     * 3. Teams Section (from Firebase) -> INPUT: none; OUTPUT: teams
     * 4. Events Section (from Firebase) -> INPUT: none; OUTPUT: events
     * 5. Partners Section
     * Footer Component
     */

    <>
      <NavBar/>
      <HeroSection/>
      {/*     
        <Navbar onHandleChange={onHandleChange} />
        <HomeSection />
        <AboutSection />
        <TeamsSection teams={teams} />
        <EventsSection events={events} />
        <PartnersSection />
        <Footer /> 
      */}
    </>
  );
}
