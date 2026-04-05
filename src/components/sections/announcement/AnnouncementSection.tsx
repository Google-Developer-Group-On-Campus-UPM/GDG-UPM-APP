import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import FlexChip from "@/components/ui/FlexChip";

const AnnouncementSection: React.FC = () => {
	return (
		<div id="about" className="min-h-screen w-full bg-black flex justify-center items-center relative z-0">
			<Image
				src="/images/announcement/announcement-bg.svg"
				className="absolute -z-10 w-full h-full top-30"
				width={4000}
				height={100}
				alt="Announcement Background"
				style={{
					WebkitMaskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
					maskImage: 'linear-gradient(to bottom, transparent 2%, black 100%)',
				}}
			/>
			<div className="mx-4 md:mx-16 lg:mx-32 xl:mx-64 grid grid-cols-1 md:grid-cols-2 grid-rows-[0.2fr_1fr] gap-x-10 gap-y-5 items-center max-w-7xl w-full">
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
							To nurturing well-rounded developers by offering resources, mentorship, and a collaborative environment that bridges...
						</p>
						<div className="flex justify-center md:justify-start">
							{/* TODO: Add appropriate href */}
							<CTAButton href="/" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default AnnouncementSection;
