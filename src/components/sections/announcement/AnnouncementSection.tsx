import Image from "next/image";


const AnnoucementSection: React.FC = () => {
    return (
        <div
            className={
                "min-h-screen w-full bg-black flex justify-center items-center relative z-0"
            }
        >
            <Image
                src="/images/announcement/announcement-bg.svg"
                className="absolute z-[-10] w-full h-full top-40"
                width={4000}
                height={100}
                alt=""
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
                }}
            />
            <div className="w-full h-full flex justify-between items-center max-w-[70%] gap-[48px]">
                <Image
                    src="/images/hero/Image-Announcement.png"
                    className="w-full h-full"
                    width={400}
                    height={100}
                    alt="Announcement"
                />
                <div className="w-full flex-col flex gap-[32px] font-[400]">
                    <div className="w-fit border border-white rounded-[18px]">
                        <p className="px-[10px] py-[4px] text-[12px]">announcements</p>
                    </div>
                    <div>
                        <p className="text-[48px]">
                            “At GDG, We Commit to{" "}
                            <span className="font-black">
                                Advancing Theoretical Knowledge and Technical Skills”
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[20px]">
                            To nurturing well-rounded developers by offering resources,
                            mentorship, and a collaborative environment that bridges...
                        </p>
                    </div>
                    <div>
                        <button className="text-white text-[20px] px-[48px] py-[12px] rounded-[30px] bg-[radial-gradient(circle,_#515EF3,_#2F21D9)] hover:opacity-90 cursor-pointer transition border border-transparent shadown-white shadow">
                            Read Full Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnnoucementSection