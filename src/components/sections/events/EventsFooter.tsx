import { Box, Typography } from "@mui/material";
import CTAButton from "@/components/ui/CTAButton";

export default function EventsFooter({
	onCTAClick,
}: {
	onCTAClick: () => void;
}) {
	return (
		<div className="w-full flex justify-center items-center py-16 px-4 sm:px-6 md:px-12">
			<div className="w-full max-w-5xl rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/[0.08] backdrop-blur-xl p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-2xl relative overflow-hidden">
				{/* Subtle glow effect inside the card */}
				<div className="absolute inset-0 bg-gradient-to-tr from-[#4285f4]/10 via-transparent to-[#0f9d58]/10 pointer-events-none" />
				
				<div className="flex-1 text-center md:text-left z-10">
					<h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">
						Have an idea for our next event?
					</h3>
					<p className="text-gray-400 text-base sm:text-lg font-light max-w-2xl mx-auto md:mx-0">
						What kind of event do you expect from GDGoC UPM? Share your idea with us and let's bring it to life together.
					</p>
				</div>
				<div className="shrink-0 z-10">
					<CTAButton text="Suggest Event" onClick={onCTAClick} />
				</div>
			</div>
		</div>
	);
}
