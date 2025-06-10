"use client"

import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})


const Hero = () => {
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
            className="inline-block relative
                   [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1%,rgba(0,0,0,1)_99%,rgba(0,0,0,1)_100%)]
                   [mask-mode:alpha] [-webkit-mask-mode:alpha]"
          >
            for <span className={"italic"}>Developers</span>
          </span>
        </h1>
        <div>

        </div>
      </div>




    </div >
  )
}

export default Hero