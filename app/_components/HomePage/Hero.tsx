"use client"

import { Poppins } from "next/font/google"
import React, { useState, useEffect } from "react"
import Link from "next/link"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

const words = ["Developers", "Designers"]


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
      <div className={"space-y-10"}>

        <div className={"flex justify-center w-full"}>
          <div className={"border border-gray-200 backdrop-blur-md rounded-full h-8 py-2 px-6 bg-gray-300/20 mt-52 flex items-center justify-center"}>
            <div className={"flex items-center justify-center gap-2"}>
              <img src="/images/hero/hat-icon.svg" alt="" />
              <span>Student Developer Club</span>
              <span>-</span>
              <Link href={"/"} className={"text-white italic hover:underline"}>
                Learn More
              </Link>
            </div>

          </div>
        </div>

        <div className={"space-y-3"}>

          <h1 className={`${poppins.className} text-white text-8xl text-center font-medium`}>
            <span
              className="inline-block relative
                   [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [mask-mode:alpha] [-webkit-mask-mode:alpha]"
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
              for <span className={"italic"}>{displayed}<span className="border-r-2 border-white animate-pulse ml-1" /></span>
            </span>
          </h1>

          <p className={"text-lg text-gray-400 font-light text-center"}>An open-space community where ideas thrive, skills grow, and <br />everyone belongs — welcome to GDGoC UPM.</p>

        </div>

        {/* Cards */}
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <div className={""}>

          </div>


        </div>


      </div>




    </div >
  )
}

export default Hero