import Image from "next/image";

import FlexChip from "@/components/ui/FlexChip";

const AnnoucementSection: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-black flex justify-center items-center relative z-0">
            <Image
                src="/images/announcement/announcement-bg.svg"
                className="absolute z-[-10] w-full h-full top-30"
                width={4000}
                height={100}
                alt=""
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
                }}
            />

            <div className="mx-4 md:mx-16 lg:mx-32 xl:mx-64 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 items-center max-w-screen-xl w-full">
                <div className="row-start-2 col-start-1 md:row-span-2 md:col-start-1 flex justify-center md:justify-end">
                    <Image
                        src="/images/hero/Image-Announcement.png"
                        alt="Announcement"
                        width={800}
                        height={100}
                        className="w-full h-auto max-w-md md:max-w-full"
                    />
                </div>

                <div className="flex justify-center md:justify-start pt-6 pb-6 md:pb-0 row-start-1 col-start-1 md:col-start-2">
                    <FlexChip
                        content={[{ text: "Announcements" }]}
                        sx={{
                            lineHeight: "18px",
                            textAlign: "center",
                            borderRadius: "9999px",
                            borderWidth: "1px",
                            padding: "6px 10px",
                            gap: "6px",
                            width: "fit-content",
                            marginTop: 0,
                            marginBottom: 0,
                        }}
                    />
                </div>


                <div className={"row-start-3 col-start-1 md:row-start-2 md:col-start-2"}>
                    <div className="space-y-8">

                        <p className="text-3xl font-medium text-white text-center md:text-left">
                            “At GDG, We Commit to{" "}
                            <span className="font-black">
                                Advancing Theoretical Knowledge and Technical Skills”
                            </span>
                        </p>
                        <p className="text-base md:text-lg text-white text-center md:text-left">
                            To nurturing well-rounded developers by offering resources, mentorship, and a collaborative environment that bridges...
                        </p>

                        <div className={"flex justify-center md:justify-start"}>
                            <button className="text-white text-base md:text-lg px-8 py-3 rounded-full bg-[radial-gradient(circle,_#515EF3,_#2F21D9)] hover:opacity-90 transition border border-transparent shadow-white shadow">
                                Read Full Article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AnnoucementSection