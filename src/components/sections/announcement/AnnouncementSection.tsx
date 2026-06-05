import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import FlexChip from "@/components/ui/FlexChip";
import { LINKS } from "@/constants/links";

export default function AnnouncementSection() {
  return (
    <div
      id="about"
      className="relative overflow-hidden bg-black w-full flex justify-center items-center font-sans z-0"
    >
      {/* Background Container (max width 2560px to prevent infinite zoom scaling) */}
      <div className="absolute inset-0 w-full h-full max-w-[2560px] mx-auto -z-10">
        <div
          className="absolute inset-0 w-full h-full bg-[url('/images/announcement/announcement-bg.svg')] bg-cover bg-center bg-no-repeat -z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 2%, black 100%)",
            maskImage: "linear-gradient(to bottom, transparent 2%, black 100%)",
          }}
        />
        {/* Side Fades to blend with layout pillars starting outside 1080p limit */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none -z-10"
          style={{
            background:
              "linear-gradient(to right, black 0%, black calc(50% - 1200px), transparent calc(50% - 960px), transparent calc(50% + 960px), black calc(50% + 1200px), black 100%)",
          }}
        />
      </div>

      <div className="relative z-10 py-24 md:py-32 w-full flex justify-center items-center">
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 grid grid-cols-1 md:grid-cols-2 grid-rows-[0.2fr_1fr] gap-x-10 gap-y-5 items-center max-w-7xl w-full">
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
            <FlexChip content={[{ text: "announcements" }]} />
          </div>
          <div className="row-start-3 col-start-1 md:row-start-2 md:col-start-2 self-start">
            <div className="flex flex-col justify-between h-full space-y-8">
              <p className="font-small text-white text-center md:text-left text-[clamp(24px,2.5vw,48px)]">
                “At GDG, We Commit to{" "}
                <span className="font-black">
                  Advancing Theoretical Knowledge and Technical Skills”
                </span>
              </p>
              <p className="font-small text-white text-center md:text-left text-[clamp(14px,1.2vw,20px)]">
                To nurturing well-rounded developers by offering resources,
                mentorship, and a collaborative environment that bridges...
              </p>
              <div className="flex justify-center md:justify-start">
                <CTAButton href={LINKS.MEDIUM} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
