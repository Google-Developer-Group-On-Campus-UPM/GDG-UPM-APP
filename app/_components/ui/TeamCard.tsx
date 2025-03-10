"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TeamCardProps {
    ImageLink: string;
    MemberName: string;
    MemberRole: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ ImageLink, MemberName, MemberRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

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

    return (
        <>
            {/* Team Card */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
            >
                <div
                    className="w-[13.3rem] h-[15.3rem] bg-gradient-to-br from-[#dfdede] via-[#7f7f7f] to-transparent rounded-md flex justify-center items-center cursor-pointer shadow-lg"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="w-[13rem] h-[15rem] bg-white rounded-[6px] overflow-hidden">
                        <Image
                            width={100}
                            height={100}
                            src={ImageLink}
                            alt="team"
                            className="w-full h-3/5 object-cover object-[50%_10%] rounded-t-[6px]"
                        />

                        <div className="pt-4 px-3">
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
            </motion.section>

          
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        ref={dialogRef}
                        className="relative w-[80%] max-w-4xl h-[60vh] bg-white shadow-lg flex rounded-md overflow-hidden"
                    >
                       
                        <div className="relative w-1/2 h-full z-[-10]">
                            <Image
                                src={ImageLink} 
                                alt={MemberName}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        </div>

                        {/* Right Side - Content */}
                        <div className="relative w-1/2 bg-white flex flex-col justify-center px-8 z-20">
                            <h2 className="text-2xl font-bold">{MemberName}</h2>
                            <p className="text-gray-600">{MemberRole}</p>
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Diagonal Effect */}
                        <div className="absolute inset-y-0 left-[43%] w-2/12 bg-white transform -skew-x-12 origin-left z-10"></div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default TeamCard;
