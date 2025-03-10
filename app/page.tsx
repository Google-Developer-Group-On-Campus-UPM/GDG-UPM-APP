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
    topBoard: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },


    ],
    webApp: [
      {
        name: "Muhammad Azzumar",
        role: "Web App Dev Lead",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Wan Hafizuddin",
        role: "Web App Dev Member",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Athallah",
        role: "Web App Dev Member",
        image: "/images/team/dwight.webp",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
    ],
    mobileApp: [
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Ngooi Xue Yang",
        role: "Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        }
      },
      {
        name: "Zikry Zaherman",
        role: "Vice-Secretary",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
      },
      {
        name: "Lim Lizhe",
        role: "Treasurer",
        image: "AJ",
        social: {
          facebook: "",
          twitter: "",
          github: "",
        }
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
        © {new Date().getFullYear()} GDG UPM. All rights reserved. Developed by Wong Yong Xi
      </footer>
    </div>
  )
}