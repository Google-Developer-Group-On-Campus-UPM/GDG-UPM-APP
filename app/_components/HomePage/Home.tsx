
import { Button } from "../../../components/ui/button"
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image"
import { useEffect, useState } from "react"

type HomeProps = {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
}

interface ImageItem {
    imageUrl: string;
    position: number;
}

const Home = ({ homeRef, aboutRef }: HomeProps) => {

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const images: ImageItem[] = [
        { imageUrl: "images/hero/Image_1.png", position: 0 },
        { imageUrl: "images/hero/Image_2.png", position: 1 },
        { imageUrl: "images/hero/Image_3.png", position: 2 },
    ];

    const [[currentIndex, direction], setCurrentIndex] = useState([0, 1]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex(([prevIndex]) => {
                const nextIndex = (prevIndex + 1) % images.length;
                return [nextIndex, 1]; // direction 1 = forward
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
        }),
    };

    return (
        <>
            <motion.section
                ref={homeRef}
                className="min-h-screen min-w-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid xl:grid-cols-[0.7fr_1fr] lg:grid-cols-2">
                    {/* Left Grid Item with Background + Blur Mask */}
                    <div
                        className="bg-[url('/images/hero/Bg_left.png')] bg-cover bg-center h-[150%] lg:min-h-screen lg:h-[100%] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:[mask-image:none]"
                    >

                        {/* Main Content */}
                        <div className="flex justify-center items-center flex-col min-h-screen relative z-20">
                            <Image
                                src="/images/GDG_Logo.svg"
                                alt=""
                                width={400}
                                height={300}
                                className="hidden lg:block max-h-[400px] max-w-[400px] cursor-pointer"
                            />
                            <Image
                                src="/images/GDG_Logo.svg"
                                alt=""
                                width={200}
                                height={200}
                                className="block lg:hidden max-h-[400px] max-w-[400px] cursor-pointer"
                            />
                            <div className="text-white text-center">
                                <h1 className="md:text-2xl lg:text-4xl">Google Developer Groups</h1>
                                <h4 className="md:text-xl lg:text-2xl">
                                    on Campus. Universiti Putra Malaysia
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Right Grid Item */}
                    <div className="min-h-screen relative">

                        <img className="absolute top-0 left-0 z-10 h-[100%] opacity-70" src="images/hero/Gradient.png" alt="" />

                        <div
                            className={"min-h-screen min-w-screen"}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <AnimatePresence custom={direction}>
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex].imageUrl}
                                    alt={`Image ${currentIndex}`}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.8 }}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </motion.section>
        </>
    )
}
export default Home