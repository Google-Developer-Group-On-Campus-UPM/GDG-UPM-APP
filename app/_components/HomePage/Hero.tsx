"use client"

import { Poppins } from "next/font/google"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./Hero.module.css"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

const words = ["Developers", "Designers"]

const cards = [
  {
    icon: "/images/hero/connect-icon.svg",
    title: "Connect",
    description: "Collaborate on projects, and  grow lasting friendships.",
  },
  {
    icon: "/images/hero/learn-icon.svg",
    title: "Learn",
    description: "From workshops to hands-on sessions  — always something new to explore.",
  },
  {
    icon: "/images/hero/grow-icon.svg",
    title: "Grow",
    description: "Unlock opportunities, and grow as a tech leader.",
  },
]


const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (typing) {
      if (displayed.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length + 1))
        }, 130)
      } else {
        timeout = setTimeout(() => setTyping(false), 1200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length - 1))
        }, 50)
      } else {
        setTyping(true)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, typing, wordIndex])


  return (
    <div className="min-h-screen">
      <div className={"space-y-20"}>

        <div className={"space-y-10"}>
          <div className={"flex justify-center w-full"}>
            <div className={`${styles.gradientBorder} mt-32 sm:mt-40 md:mt-48 lg:mt-52`}>
              <div className={"backdrop-blur-md rounded-full py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8 bg-gray-300/20 flex items-center justify-center"}>
                <div className={"flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3"}>
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
                    className={"text-white italic hover:underline text-sm sm:text-base md:text-lg"}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={"space-y-3 mx-5"}>

            <h1 className={`${poppins.className} text-white text-[2.6rem] xm:text-[2.5rem] sm:text-[3rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none text-center font-medium`}>
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
                for <br className={"hidden"}/> <span className={"italic"}>{displayed}<span className="border-r-2 border-white animate-pulse ml-1" /></span>
              </span>
            </h1>

            <p className={"text-sm sm:text-base lg:text-lg xl:text-lg text-gray-400 font-light text-center text-wrap"}>An open-space community where ideas thrive, skills grow, and everyone belongs — welcome to GDGoC UPM.</p>

          </div>
        </div>

        {/* Cards */}
        <div className={"mx-12 sm:mx-14 md:mx-20 lg:mx-24 xl:mx-64 grid grid-cols-1 lg:grid-cols-3 gap-4"}>
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
                  <p className={"text-gray-400 font-light lg:text-base xl:text-lg"}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>




    </div >
  )
}

export default Hero