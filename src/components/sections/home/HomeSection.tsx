"use client";

import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const words = ["Developers", "Designers"];

const cards = [
  {
    icon: "/images/hero/connect-icon.svg",
    title: "Connect",
    description: "Collaborate on projects, and  grow lasting friendships.",
  },
  {
    icon: "/images/hero/learn-icon.svg",
    title: "Learn",
    description:
      "From workshops to hands-on sessions  — always something new to explore.",
  },
  {
    icon: "/images/hero/grow-icon.svg",
    title: "Grow",
    description: "Unlock opportunities, and grow as a tech leader.",
  },
];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayed.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length + 1));
        }, 130);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length - 1));
        }, 50);
      } else {
        setTyping(true);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div
        className={
          "space-y-20 bg-[url('/images/hero/Main.webp')] bg-cover bg-center bg-no-repeat"
        }
      >
        <div className={"space-y-10"}>
          <div className={"flex justify-center w-full"}>
            <div
              className={`${styles.gradientBorder} mt-32 sm:mt-40 md:mt-48 lg:mt-52`}
            >
              <div
                className={
                  "backdrop-blur-md rounded-full py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8 bg-gray-300/20 flex items-center justify-center"
                }
              >
                <div
                  className={
                    "flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3"
                  }
                >
                  <img
                    src="/images/hero/hat-icon.svg"
                    alt=""
                    className="w-4 sm:w-5 md:w-6"
                  />
                  <span className="text-sm sm:text-base md:text-lg">
                    Student Developer Club
                  </span>
                  <span className="text-sm sm:text-base md:text-lg">-</span>
                  <Link
                    href={"/"}
                    className={
                      "text-white italic hover:underline text-sm sm:text-base md:text-lg"
                    }
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={"space-y-3 mx-5"}>
            <h1
              className={`${poppins.className} text-white text-[2.6rem] xm:text-[2.5rem] sm:text-[3rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none text-center font-medium`}
            >
              <span
                className="inline-block relative
                   [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [mask-mode:alpha] [-webkit-mask-mode:alpha] text-wrap"
              >
                Your #1 Tech Community
              </span>
              <br />

              <span
                className="inline-block relative leading-[1.2] pb-2
             [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
             [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
             [mask-mode:alpha] [-webkit-mask-mode:alpha]"
              >
                for <br className={"hidden"} />{" "}
                <span className={"italic"}>
                  {displayed}
                  <span className="border-r-2 border-white animate-pulse ml-1" />
                </span>
              </span>
            </h1>

            <p
              className={
                "text-sm sm:text-base lg:text-lg xl:text-lg text-gray-400 font-light text-center text-wrap"
              }
            >
              An open-space community where ideas thrive, skills grow, and
              everyone belongs — welcome to GDGoC UPM.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          className={
            "mx-12 sm:mx-14 md:mx-20 lg:mx-24 xl:mx-64 grid grid-cols-1 lg:grid-cols-3 gap-4"
          }
        >
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className={`p-[1px] rounded-lg relative bg-gradient-to-r from-[#67A4D5] to-[#ADEDFF] cursor-pointer`}
            >
              <div className="bg-gradient-to-r from-[#06233B] to-[#09365b] rounded-lg text-white space-y-1 h-full">
                <div className={"flex items-center justify-end pt-2 pr-2"}>
                  <img src="/images/hero/hover-action.svg" alt="" />
                </div>
                <div className={"pb-6 pr-6 pl-6"}>
                  <div className={"flex"}>
                    <img src={card.icon} alt="" />
                    <span className={"text-xl ml-2"}>{card.title}</span>
                  </div>
                  <p
                    className={
                      "text-gray-400 font-light lg:text-base xl:text-lg"
                    }
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "bg-[url('/images/hero/BG-Announcement.png')] bg-cover bg-bottom bg-no-repeat flex justify-center items-center"
        }
      >
        <div className="w-full h-full flex justify-between items-center py-[264px] max-w-[70%] gap-[48px]">
          <PhotoLayout />
          <div className="w-full flex-col flex gap-[32px] font-[400]">
            <div className="w-fit border border-white rounded-[18px]">
              <p className="px-[10px] py-[4px] text-[12px]">announcements</p>
            </div>
            <div>
              <p className="text-[48px]">
                “At GDG, We Commit to{" "}
                <span className="font-black">
                  Advancing Theoretical Knowledge and Technical Skills”
                </span>
              </p>
            </div>
            <div>
              <p className="text-[20px]">
                To nurturing well-rounded developers by offering resources,
                mentorship, and a collaborative environment that bridges...
              </p>
            </div>
            <div>
              <button className="text-white text-[20px] px-[48px] py-[12px] rounded-[30px] bg-[radial-gradient(circle,_#515EF3,_#2F21D9)] hover:opacity-90 cursor-pointer transition border border-transparent shadown-white shadow">
                Read Full Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function PhotoLayout() {
  return (
    <div className="w-full h-full">
      <img
        src="images/hero/Image-Announcement.png"
        className="w-full h-full"
        alt=""
      />
    </div>
  );
}

export default HeroSection;

// export default function HomeSection() {
//   // Your home section logic goes here

//   /**
//    * Home/Hero Section Logic:
//    * 1. Display animated hero content and branding
//    * 2. Show call-to-action buttons
//    * 3. Handle scroll animations and parallax effects
//    * 4. Display featured content or announcements
//    * 5. Track user interactions for analytics
//    */

//   // Animation and scroll state
//   // const [isLoaded, setIsLoaded] = useState(false);
//   // const [scrollY, setScrollY] = useState(0);
//   // const heroRef = useRef<HTMLDivElement>(null);

//   // Handle scroll animations
//   // useEffect(() => {
//   //   const handleScroll = () => setScrollY(window.scrollY);
//   //   window.addEventListener('scroll', handleScroll);
//   //   return () => window.removeEventListener('scroll', handleScroll);
//   // }, []);

//   // Handle component mount animation
//   // useEffect(() => {
//   //   setIsLoaded(true);
//   // }, []);

//   // Handle CTA button clicks
//   // const handleLearnMoreClick = () => {
//   //   // Track analytics event
//   //   analytics.track('hero_learn_more_clicked');
//   //   // Smooth scroll to about section
//   //   const aboutSection = document.getElementById('about');
//   //   aboutSection?.scrollIntoView({ behavior: 'smooth' });
//   // };

//   // const handleJoinUsClick = () => {
//   //   // Track analytics event
//   //   analytics.track('hero_join_us_clicked');
//   //   // Scroll to contact or teams section
//   //   const contactSection = document.getElementById('contact');
//   //   contactSection?.scrollIntoView({ behavior: 'smooth' });
//   // };

//   return (
//     /**
//      * Hero Section Structure:
//      * 1. Background with gradient and animations
//      * 2. Main hero content (title, subtitle, description)
//      * 3. Call-to-action buttons
//      * 4. Featured images or graphics
//      * 5. Scroll indicator
//      *
//      * Components to render:
//      * - HeroBackground -> INPUT: scrollY; OUTPUT: animated background
//      * - HeroContent -> INPUT: isLoaded; OUTPUT: animated text content
//      * - CTAButtons -> INPUT: onClick handlers; OUTPUT: action buttons
//      * - FeaturedImages -> INPUT: none; OUTPUT: GDG/UPM branding images
//      * - ScrollIndicator -> INPUT: none; OUTPUT: scroll down arrow
//      */

//     <></>
//   );
// }
