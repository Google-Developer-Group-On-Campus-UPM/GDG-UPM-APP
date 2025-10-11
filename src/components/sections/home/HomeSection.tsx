"use client";

import { Poppins } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import MaskedBackground from "@/components/ui/MaskedBackground";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";

import type { ComponentType } from "react"
import { motion, useSpring } from "motion/react"



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
    cardImage: "",
  },
  {
    icon: "/images/hero/learn-icon.svg",
    title: "Learn",
    description:
      "From workshops to hands-on sessions  — always something new to explore.",
    cardImage: "",
  },
  {
    icon: "/images/hero/grow-icon.svg",
    title: "Grow",
    description: "Unlock opportunities, and grow as a tech leader.",
    cardImage: "",
  },
];

const spring: { type: "spring"; stiffness: number; damping: number } = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};


const HeroSection: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  const [rotateXaxis, setRotateXaxis] = useState(0)
  const [rotateYaxis, setRotateYaxis] = useState(0)
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return; 
    const elementRect = element.getBoundingClientRect();
    const elementWidth = elementRect.width;
    const elementHeight = elementRect.height;
    const elementCenterX = elementWidth / 2;
    const elementCenterY = elementHeight / 2;
    const mouseX = event.clientY - elementRect.y - elementCenterY;
    const mouseY = event.clientX - elementRect.x - elementCenterX;
    const degreeX = (mouseX / elementWidth) * 20;
    const degreeY = (mouseY / elementHeight) * 20;
    setRotateXaxis(degreeX);
    setRotateYaxis(degreeY);
  }

  const handleMouseEnd = () => {
    setRotateXaxis(0)
    setRotateYaxis(0)
  }

  const dx = useSpring(0, spring)
  const dy = useSpring(0, spring)

  useEffect(() => {
    dx.set(-rotateXaxis)
    dy.set(rotateYaxis)
  }, [rotateXaxis, rotateYaxis])

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
    <div className="min-h-screen relative overflow-hidden">
      <div className="min-h-screen w-full bg-[url('/images/hero/Main.webp')] bg-cover bg-center bg-no-repeat relative space-y-10">
        <MaskedBackground
          template="template1"
        />

        <div className={"relative z-10 space-y-20 "}>

          <div className="space-y-10">
            <div className="flex justify-center w-full">
              <div className={`${styles.gradientBorder} mt-32 sm:mt-40 md:mt-48 lg:mt-52`}>
                <div className="backdrop-blur-md rounded-full py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8 bg-gray-300/20 flex items-center justify-center">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                    <Image
                      src="/images/hero/hat-icon.svg"
                      alt="Hat Icon"
                      width={24}
                      height={24}
                      className="w-4 sm:w-5 md:w-6"
                    />
                    <span className="text-sm sm:text-base md:text-lg">
                      Student Developer Club
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">-</span>
                    <Link
                      href="/"
                      className="text-white italic hover:underline text-sm sm:text-base md:text-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 mx-5">
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
                  for <br className="hidden" />{" "}
                  <span className="italic">
                    {displayed}
                    <span className="border-r-2 border-white animate-pulse ml-1" />
                  </span>
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-lg text-gray-400 font-light text-center text-wrap">
                An open-space community where ideas thrive, skills grow, and
                everyone belongs — welcome to GDGoC UPM.
              </p>
            </div>
          </div>
          {/* Old Card */}
          {/* <div className="mx-12 sm:mx-14 md:mx-20 lg:mx-24 xl:mx-54 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-[1px] rounded-lg relative bg-gradient-to-r from-[#67A4D5] to-[#ADEDFF] cursor-pointer"
              >
                <div className="bg-gradient-to-r from-[#06233B] to-[#09365b] rounded-lg text-white space-y-1 h-full">
                  <div className="flex items-center justify-end pt-2 pr-2">
                    <Image src="/images/hero/hover-action.svg" alt="Hover Action" width={20} height={20} />
                  </div>
                  <div className="pb-6 pr-6 pl-6">
                    <div className="flex">
                      <Image src={card.icon} alt={card.title} width={26} height={26} />
                      <span className="text-xl ml-2">{card.title}</span>
                    </div>
                    <p className="text-gray-400 font-light lg:text-base xl:text-lg">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="mx-12 sm:mx-14 md:mx-20 lg:mx-24 xl:mx-54 grid grid-cols-1 lg:grid-cols-3 gap-1">
            {cards.map((card, idx) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const [localIsFlipped, setLocalIsFlipped] = useState(false);
              const [localRotateX, setLocalRotateX] = useState(0);
              const [localRotateY, setLocalRotateY] = useState(0);
              const localDx = useSpring(0, spring);
              const localDy = useSpring(0, spring);

              const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
                const element = cardRef.current;
                if (!element) return;
                const rect = element.getBoundingClientRect();
                const w = rect.width, h = rect.height;
                const x = event.clientX - rect.left - w / 2;
                const y = event.clientY - rect.top - h / 2;
                setLocalRotateX((y / h) * 20);
                setLocalRotateY((x / w) * 20);
              };
              useEffect(() => {
                localDx.set(-localRotateX);
                localDy.set(localRotateY);
              }, [localRotateX, localRotateY]);

              const handleCardMouseEnd = () => {
                setLocalRotateX(0);
                setLocalRotateY(0);
              };

              return (
                <motion.div
                  key={card.title}
                  className="flex justify-center items-center"
                  style={{ perspective: "1200px" }}
                  onMouseEnter={() => setLocalIsFlipped(true)}
                  onMouseLeave={() => setLocalIsFlipped(false)}
                >
                  <motion.div
                    ref={cardRef}
                    whileHover={{ scale: 1.05 }}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseEnd}
                    transition={spring}
                    className="w-full h-full"
                    style={{
                      width: "100%",
                      height: "100%",
                      minWidth: "260px",
                      minHeight: "320px",
                      maxWidth: "340px",
                      maxHeight: "380px",
                      rotateX: localIsFlipped ? 0 : localDx,
                      rotateY: localIsFlipped ? 0 : localDy,
                    }}
                  >
                    <motion.div
                      animate={{ rotateY: localIsFlipped ? 180 : 0 }}
                      transition={spring}
                      className="relative w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(0deg)",
                        }}
                      >
                        <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#67A4D5] to-[#ADEDFF] cursor-pointer w-full h-50 flex flex-col">
                          <div className="bg-gradient-to-r from-[#06233B] to-[#09365b] rounded-lg text-white space-y-1 flex-1 flex flex-col">
                            <div className="flex items-center justify-end pt-2 pr-2">
                              <Image src="/images/hero/hover-action.svg" alt="Hover Action" width={20} height={20} />
                            </div>
                            <div className="pb-6 pr-6 pl-6 flex-1 flex flex-col justify-center">
                              <div className="flex items-center">
                                <Image src={card.icon} alt={card.title} width={26} height={26} />
                                <span className="text-xl ml-2">{card.title}</span>
                              </div>
                              <p className="text-gray-400 font-light lg:text-base xl:text-lg">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#67A4D5] to-[#ADEDFF] cursor-pointer w-full h-50 flex flex-col">
                          <div className="bg-gradient-to-r from-[#06233B] to-[#09365b] rounded-lg w-full h-full relative overflow-hidden">
                            <Image
                              src="/images/hero/Image_1.png"
                              alt="Hat Icon"
                              fill
                              className="object-cover w-full h-full rounded-lg"
                              style={{ borderRadius: "0.5rem" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>


        </div>

        <ScrollDownArrow />
      </div>
    </div>
  );
};


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
