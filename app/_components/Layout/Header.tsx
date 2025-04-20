"use client"

import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion"
import Image from 'next/image';
import { SidebarProvider } from "@/components/ui/sidebar";

import { Moon, Sun } from "lucide-react"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarSub,
    MenubarTrigger,
} from "@/components/ui/menubar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarTrigger,
    SidebarMenuItem,
    SidebarMenuButton,

    SidebarMenuSub,
    SidebarMenuSubItem,

} from "@/components/ui/sidebar"


import { useSidebar } from "@/components/ui/sidebar"


import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react"
import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";





type SubEvent = {
    title: string;
    href: string;
};

type EventContent = {
    title: string;
    href: string;
    subEvents?: SubEvent[]; 
};


const eventsContents: EventContent[] = [

    {
        title: "CSS Workshops: From Basics To Frameworks",
        href: "",  
    }
    
];

const moreContents: { title: string; href: string; description: string; src: string }[] = [
    {
        title: "Home",
        href: "/#home-section",
        description: "",
        src: ""
    },
    {
        title: "Events",
        href: "/#events-section",
        description: "",
        src: ""
    },
    {
        title: "Teams",
        href: "/#faqs-section",
        description: "",
        src: ""
    },
    {
        title: "Contact",
        href: "/#faqs-section",
        description: "",
        src: ""
    },

]


type HeaderProps = {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
    whatWeDoRef: React.RefObject<HTMLDivElement>
    teamRef: React.RefObject<HTMLDivElement>
    eventsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
}

const Header = ({ homeRef, aboutRef, whatWeDoRef, teamRef, eventsRef, contactRef }: HeaderProps) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { toggleSidebar, open } = useSidebar(); 

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && show && !isAnimating) {
                if (open) {
                    setIsAnimating(true);
                    toggleSidebar(); 
                    setTimeout(() => {
                        setShow(false);
                        setIsAnimating(false);
                    }, 400); 
                } else {
                    setShow(false);
                }
            } else if (currentScrollY < lastScrollY && !show) {
                setShow(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [show, lastScrollY, open, toggleSidebar, isAnimating]);



    const MoreMobileItem = forwardRef<
        React.ElementRef<typeof Link>,
        React.ComponentPropsWithoutRef<typeof Link> & { src?: string }
    >(({ className, title, src, ...props }, ref) => {
        return (
            <SidebarMenuSubItem>
                <Link
                    ref={ref}
                    onClick={() => toggleSidebar()}
                    className={cn(
                        "flex items-center gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    {/* Icon */}
                    {src && (
                        <Image
                            src={src}
                            alt={`${title} icon`}
                            width={24}
                            height={24}
                            className="w-6 h-6 flex-shrink-0 dark:invert dark:brightness-0 dark:filter"
                        />
                    )}

                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                        <div className="text-sm font-medium leading-none">{title}</div>
                    </div>
                </Link>
            </SidebarMenuSubItem>
        );
    });
    MoreMobileItem.displayName = "MoreMobileItem";

    const MoreItem = forwardRef<
        React.ElementRef<typeof Link>,
        React.ComponentPropsWithoutRef<typeof Link> & { src?: string }
    >(({ className, title, src, children, ...props }, ref) => {
        return (
            <MenubarItem asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "flex items-center gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    {/* Icon */}
                    {src && (
                        <Image
                            src={src}
                            alt={`${title} icon`}
                            width={24}
                            height={24}
                            className="w-6 h-6 flex-shrink-0 dark:invert dark:brightness-0 dark:filter"
                        />
                    )}

                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="text-sm leading-snug text-muted-foreground">{children}</p>
                    </div>
                </Link>
            </MenubarItem>
        );
    });
    MoreItem.displayName = "MoreItem";

    const EventItem = forwardRef<
        React.ElementRef<"a">,
        React.ComponentPropsWithoutRef<"a"> & {
            title: string;
            href?: string;
            subEvents?: { title: string; href: string }[];
        }
    >(({ className, title, href, subEvents, ...props }, ref) => {
        return subEvents && subEvents.length > 0 ? (
            <MenubarSub>
                <MenubarSubTrigger className={"justify-center"}>{title}</MenubarSubTrigger>
                <MenubarSubContent>
                    {subEvents.map((subEvent) => (
                        <MenubarItem key={subEvent.title} asChild>
                            <Link href={subEvent.href}>{subEvent.title}</Link>
                        </MenubarItem>
                    ))}
                </MenubarSubContent>
            </MenubarSub>
        ) : (
            <MenubarItem asChild>
                <Link
                    ref={ref}
                    href={href || "#"}
                    onClick={() => toggleSidebar()}
                    className={cn(
                        "w-full flex justify-end gap-1 px-3 py-2 rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-right">{title}</div>
                </Link>
            </MenubarItem>
        );
    });
    EventItem.displayName = "EventItem";

    const EventMobileItem = forwardRef<
        React.ElementRef<"a">,
        React.ComponentPropsWithoutRef<"a"> & {
            title: string;
            href?: string;
            subEvents?: { title: string; href: string }[];
        }
    >(({ className, title, href, subEvents, ...props }, ref) => {
        return subEvents && subEvents.length > 0 ? (
            <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {title}
                                <ChevronsUpDown className="h-4 w-4" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {subEvents.map((subEvent) => (
                                    <SidebarMenuSubItem key={subEvent.title}>
                                        <Link href={subEvent.href} onClick={() => toggleSidebar()}>{subEvent.title}</Link>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        ) : (
            <SidebarMenuSubItem>
                <Link
                    ref={ref}
                    href={href || "#"}
                    onClick={() => toggleSidebar()}
                    className={cn(
                        "flex flex-col gap-1 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                </Link>
            </SidebarMenuSubItem>
        );
    });
    EventMobileItem.displayName = "EventItem";

    return (
        <>


            <motion.header
                className={`h-16 xl:h-16 text-[15px] fixed top-0 left-0 right-0 z-20 transition-transform duration-300 ease-in-out
    ${show ? "translate-y-0" : "-translate-y-full"}
    bg-black/60 backdrop-blur-md backdrop-saturate-150 shadow-lg border-b border-white/10`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* <nav className="mx-6 lg:ml-24 lg:mr-12 flex justify-center items-center h-full min-w-screen"> */}
                <nav className="lg:ml-24 lg:mr-24 flex items-center justify-between h-full min-w-screen">

                    <div className="">
                        <Link href={"/"} className={""}>
                            <Image src="/images/GDG_Logo.svg" alt="" width={200} height={300} className="max-h-[100px] max-w-[100px] md:max-h-[120px] md:max-w-[120px] cursor-pointer" />
                        </Link>
                        
                    </div>

                    <div className={"hidden xl:flex xl:items-center xl:mr-auto xl:ml-10"}>
                        <Menubar className={"bg-transparent border-none shadow-none data-[state=open]:bg-transparent  text-white data-[state=open]:text-white aria-selected:text-white group-active:text-white space-x-10"}>
                            <MenubarMenu>
                                <MenubarTrigger className={"bg-transparent border-none  data-[state=open]:bg-white/10 text-white  data-[state=open]:text-black aria-selected:text-black group-active:text-black"}>
                                    <Link href={"/#faqs-section"}>
                                        Home
                                    </Link>

                                </MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className={"bg-transparent border-none  data-[state=open]:bg-white/10 text-white  data-[state=open]:text-black aria-selected:text-black group-active:text-black"}>
                                    <Link href={"/#about-section"}>
                                        Events
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className={"bg-transparent border-none  data-[state=open]:bg-white/10 text-white  data-[state=open]:text-black aria-selected:text-black group-active:text-black"}>
                                    <Link href={"/#sdg-ai"}>
                                        Teams
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className={"bg-transparent border-none  data-[state=open]:bg-white/10 text-white  data-[state=open]:text-black aria-selected:text-black group-active:text-black"}>
                                    <Link href={"/#criteria"}>
                                        Contacts
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>

                        </Menubar>
                    </div>


                    {/* <div className={"flex gap-4 items-center ml-auto"}>

                        <Menubar className={"bg-transparent border-none active:bg-transparent focus:bg-transparent focus-visible:bg-transparent data-[state=open]:bg-transparent aria-selected:bg-transparent group-active:bg-transparent shadow-md"}>
                            <MenubarMenu>
                                <MenubarTrigger className="p-1 bg-transparent border-none active:bg-white/10 focus:bg-white/10 focus-visible:bg-white/10 data-[state=open]:bg-white/10 aria-selected:bg-white/10 group-active:bg-white/10">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 border-none text-white" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem]  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 border-none text-white" />
                                    <span className="sr-only">Toggle theme</span>
                                </MenubarTrigger>
                                <MenubarContent className={""} align="end">
                                    <MenubarItem onClick={() => setTheme("light")}>
                                        Light
                                    </MenubarItem>
                                    <MenubarItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </MenubarItem>
                                    <MenubarItem onClick={() => setTheme("system")}>
                                        System
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                        </Menubar>

                      

                    </div> */}



                    <SidebarTrigger className={"xl:hidden text-white bg-transparent border-none active:bg-transparent focus:bg-transparent focus-visible:bg-transparent data-[state=open]:bg-transparent aria-selected:bg-transparent group-active:bg-transparent data-[state=open]:text-black aria-selected:text-black group-active:text-black flex items-center space-x-1 rounded-md border shadow-md ml-auto mr-6 md:mr-0 h-[36px] w-[36px]"} />

                    <div className={"z-50"}>
                        <Sidebar
                            side="right"
                            collapsible="offcanvas"
                            variant="sidebar"
                            onClick={toggleSidebar}
                            className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg h-screen fixed top-0 right-0 z-50 overflow-y-auto">
                            <SidebarContent className="bg-white">
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            <Collapsible defaultOpen className="group/collapsible">
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton>
                                                            GDGoC UPM Info

                                                            <ChevronsUpDown className="h-4 w-4" />

                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {moreContents.map((moreContent) => (


                                                                <MoreMobileItem
                                                                    key={moreContent.title}
                                                                    title={moreContent.title}
                                                                    src={moreContent.src}
                                                                    href={moreContent.href}
                                                                    className={"px-2 py-3"}
                                                                >
                                                                    {moreContent.description}
                                                                </MoreMobileItem>


                                                            ))}

                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            </Collapsible>
                                            <Collapsible defaultOpen className="group/collapsible">
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton>
                                                            Events

                                                            <ChevronsUpDown className="h-4 w-4" />

                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {eventsContents.map((event) => (
                                                                <EventMobileItem key={event.title} title={event.title} href={event.href} subEvents={event.subEvents} />
                                                            ))}

                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            </Collapsible>
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                            </SidebarContent>
                        </Sidebar>

                    </div>
                </nav>

            </motion.header>

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 bg-white"
                style={{ scaleX }}
            />

        </>
    )
}
export default Header