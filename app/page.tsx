'use client'

import { useRef } from "react"


//Components
import NavBar from "./_components/NavBar"
import Home from "./_components/Home"
import About from "./_components/About"
import WhatWeDo from "./_components/WhatWeDo"
import OurTeam from "./_components/OurTeam"
import Events from "./_components/Events"
import GetInTouch from "./_components/GetInTouch"


export default function App() {

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const whatWeDoRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const team = {
    lead: [
      {
        name: "Dwight Cutad",
        role: "President of GDGoC UPM",
        image: "/images/team/lead/dwight.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_35%]"
      },
      {
        name: "Javan Herlambang",
        role: "Vice President of GDGoC UPM",
        image: "/images/team/lead/javan.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_26%]"
      },
    ],
    topBoard: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "/images/team/topboard/NgooiXueYang.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_30%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "/images/team/topboard/ZikryZaherman.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_39%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "/images/team/topboard/LimLizhe.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Aminah Abujiya",
        role: "Internal Relation Lead",
        image: "/images/team/topboard/AminahAbujiya.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "/images/team/topboard/ZikryZaherman.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_39%]"
      },
      {
        name: "Francis Lim Beng Cong",
        role: "TechOps 1",
        image: "/images/team/topboard/FrancisLimBengCong.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_44%]"
      },
      {
        name: "Law Yee Qi",
        role: "TechOps 2",
        image: "/images/team/topboard/LawYeeQi.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_50%]"
      },
      {
        name: "Yelilan Rajarajan",
        role: "Postgraduate Representative",
        image: "/images/team/topboard/Yelilan.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_39%]"
      },


    ],
    webApp: [
      {
        name: "Muhammad Azzumar",
        role: "Web App Dev Lead",
        image: "/images/team/webapp/Azzumar.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Wan Hafizuddin",
        role: "Web App Dev Member",
        image: "/images/team/webapp/WanHafizuddin.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_37%]"
      },
      {
        name: "Athallah",
        role: "Web App Dev Member",
        image: "/images/team/webapp/Athallah.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_26%]"
      },
    ],
    mobileApp: [
      {
        name: "Yang Zixun",
        role: "Mobile App Lead",
        image: "/images/team/mobileapp/YangZixun.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_39%]"
      },
      {
        name: "Muhammad Ilhand Naquib",
        role: "Mobile App Member",
        image: "/images/team/mobileapp/IlhanNaquib.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_24%]"
      },
      {
        name: "Ong Jia Yee",
        role: "Mobile App Member",
        image: "/images/team/mobileapp/OngJiaYee.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_48%]"
      },
      {
        name: "Oscar Chung",
        role: "Mobile App Member",
        image: "/images/team/mobileapp/OscarChung.jpg",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    cloud: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    aiMl: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    cyberSecurity: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    uiUx: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    communitySocials: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    creatives: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
    ],
    externalRelations: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        },
        imagePositions: "object-[50%_28%]"   
      },
    ]
  };


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar homeRef={homeRef} aboutRef={aboutRef} whatWeDoRef={whatWeDoRef} teamRef={teamRef} eventsRef={eventsRef} contactRef={contactRef} />

      <main className="flex-1 container py-6 space-y-20">
        <Home homeRef={homeRef} aboutRef={aboutRef} />
        <About aboutRef={aboutRef} />
        <WhatWeDo whatWeDoRef={whatWeDoRef} />
        <OurTeam team={team} teamRef={teamRef} />
        <Events eventsRef={eventsRef} />
        <GetInTouch contactRef={contactRef} />
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GDG UPM. All rights reserved. Developed by Wong Yong Xi and Google Developer Group on Campus UPM
      </footer>
    </div>
  )
}