"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MaskedBackground from "@/components/ui/MaskedBackground";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";
import { LINKS } from "@/constants/links";

const words = ["Developers", "Designers"];

const cards = [
  {
    icon: "/images/hero/connect-icon.svg",
    title: "Connect",
    description: "Collaborate on projects, and grow lasting friendships.",
  },
  {
    icon: "/images/hero/learn-icon.svg",
    title: "Learn",
    description:
      "From workshops to hands-on sessions — always something new to explore.",
  },
  {
    icon: "/images/hero/grow-icon.svg",
    title: "Grow",
    description: "Unlock opportunities, and grow as a tech leader.",
  },
];

export default function HeroSection() {
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
        timeout = setTimeout(() => {
          setTyping(true);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans flex justify-center">
      {/* Background Container (max width 2560px to prevent infinite zoom scaling) */}
      <div className="absolute inset-0 w-full h-full max-w-[2560px] mx-auto -z-10">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-[url('/images/hero/Main.webp')] bg-cover bg-center bg-no-repeat" />

        {/* Side Fades to blend with the black background starting outside the 1080p center */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, black 0%, black calc(50% - 1200px), transparent calc(50% - 960px), transparent calc(50% + 960px), black calc(50% + 1200px), black 100%)",
          }}
        />
      </div>

      <div className="min-h-screen w-full relative z-10 flex flex-col justify-between pb-12 pt-6 lg:pb-16 lg:pt-8">
        <MaskedBackground template="template1" />

        <div className="relative z-10 space-y-12 md:space-y-20 max-w-7xl mx-auto w-full">
          <div className="space-y-10">
            <div className="flex justify-center w-full">
              <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-52 flex justify-center w-full">
                <div
                  className="rounded-[68.1px] px-[20px] py-[5px] flex items-center justify-center gap-[8.8px] border-[1.36px] border-muted"
                  style={{
                    background:
                      "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)) padding-box, linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(66, 133, 244, 0.2)) border-box",
                  }}
                >
                  <Image
                    src="/images/hero/hat-icon.svg"
                    alt="Hat Icon"
                    width={24}
                    height={24}
                    className="w-auto h-auto"
                  />
                  <span className="text-[14px] font-normal leading-[150%] text-[#F2F4F8] font-sans tracking-wide">
                    Student Developer Club -
                    <Link
                      href={LINKS.COMMUNITY_PLATFORM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="italic hover:underline ml-1"
                    >
                      Learn More
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mx-5">
              <h1 className="text-white text-[2.6rem] xm:text-[2.5rem] sm:text-[3rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none text-center font-medium">
                <span
                  className="inline-block relative text-wrap
                   mask-[linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   mask-alpha [-webkit-mask-mode:alpha]"
                >
                  Your #1 Tech Community
                </span>
                <br />

                <span
                  className="inline-block relative leading-[1.2] pb-2
                   mask-[linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   mask-alpha [-webkit-mask-mode:alpha]"
                >
                  for <br className="hidden" />{" "}
                  <span className="italic">
                    {displayed}
                    <span className="border-r-[10px] border-white animate-pulse px-2" />
                  </span>
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-lg text-gray-400 font-light text-center text-wrap">
                An open-space community where ideas thrive, skills grow, and
                everyone belongs — welcome to GDGoC UPM.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="mx-6 sm:mx-14 md:mx-20 lg:mx-24 xl:max-w-[1000px] xl:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-px rounded-lg relative bg-linear-to-r from-[#67A4D5] to-[#ADEDFF] cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="bg-linear-to-r from-[#06233B] to-[#09365b] rounded-lg text-white space-y-1 h-full">
                  <div className="flex items-center justify-end pt-2 pr-2">
                    <Image
                      src="/images/hero/hover-action.svg"
                      alt="Hover Action"
                      width={20}
                      height={20}
                      className="w-auto h-auto"
                    />
                  </div>
                  <div className="pb-6 pr-6 pl-6">
                    <div className="flex items-center">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={26}
                        height={26}
                      />
                      <span className="text-xl ml-2 font-medium">
                        {card.title}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-400 font-light lg:text-base xl:text-lg">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ScrollDownArrow />
      </div>
    </div>
  );
}
