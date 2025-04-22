"use client";

import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TeamCardProps {
    ImageLink: string;
    MemberName: string;
    MemberRole: string;
    imagePositions: string;
}

const ROTATION_RANGE = 12;
const HALF_ROTATION_RANGE = 10 / 2;


const TeamCard: React.FC<TeamCardProps> = ({ ImageLink, MemberName, MemberRole, imagePositions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "";
    //     }
    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, [isOpen]);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <>
            {/* Team Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
            >
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transformStyle: "preserve-3d",
                        transform,
                    }}
                >
                    <div
                        className="w-[13.3rem] h-[15.3rem] bg-gradient-to-br from-[#dfdede] via-[#7f7f7f] to-transparent rounded-md flex justify-center items-center cursor-pointer shadow-lg"
                        style={{
                            transform: "translateZ(75px)",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <div className="w-[13rem] h-[15rem] bg-white rounded-[6px] overflow-hidden">
                            <Image
                                width={100}
                                height={100}
                                src={ImageLink}
                                alt="team"
                                className={`w-full h-3/5 object-cover ${imagePositions !== "" ? imagePositions : "object-[50%_28%]"} rounded-t-[6px]`}
                                onClick={() => setIsOpen(true)}
                            />

                            <div className="pt-4 px-3" >
                                <h1 className="font-bold text-sm">{MemberName}</h1>
                                <h5 className="text-xs text-gray-600">{MemberRole}</h5>
                            </div>

                            <div className="flex gap-2 pt-4 items-center px-3">
                                <Link href={""}>
                                    <Image width={5} height={5} src={"/images/social/facebook.svg"} alt="facebook" />
                                </Link>
                                <Link href={""}>
                                    <Image width={10} height={10} src={"/images/social/twitter.svg"} alt="twitter" />
                                </Link>
                                <Link href={""}>
                                    <Image width={10} height={10} src={"/images/social/github.svg"} alt="github" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        ref={dialogRef}
                        className="relative w-[90%] max-w-4xl h-[70vh] bg-white shadow-lg flex flex-col md:flex-row rounded-md overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="relative flex-1 h-full group">
                            <Image
                                src={ImageLink}
                                alt={MemberName}
                                layout="fill"
                                className={`object-cover transition-all duration-300 ease-in-out 
                      ${imagePositions !== "" ? imagePositions : "object-[50%_28%]"} 
                      blur-md md:blur-none`}
                            />

                            {/* Description Overlay (only on hover) */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-100 md:opacity-0 transition-opacity duration-300 text-white text-center p-4">
                                <p className="text-sm sm:text-base italic">Full-time wizard, part-time coffee enthusiast. Can code a website faster than you can say 'debug' and hopefully won't break it too.</p>
                            </div>
                        </div>

                        {/* Diagonal Effect (only on desktop) */}
                        <div className="hidden md:block absolute inset-y-0 left-[40%] w-2/12 bg-white transform -skew-x-12 origin-left z-10"></div>

                        {/* Right Side Content (only on desktop) */}
                        <div className="hidden md:flex flex-col justify-center items-start flex-1 p-6 z-20">
                            <h2 className="text-2xl font-semibold mb-2">{MemberName}</h2>
                            <p className="text-gray-600">{MemberRole}</p>
                            {/* Add more details if needed */}
                        </div>
                    </motion.div>
                </div>
            )}



        </>
    );
};

export default TeamCard;
