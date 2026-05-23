"use client";

import { Testimonial } from "@/constants/types/testimonials.type";
import TestimonialCard from "./TestimonialCard";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialStack from "./TestimonialStack";

/* ─── Placeholder data ─── */

const VIDEO_TESTIMONIAL: Testimonial = {
	id: "t-video-1",
	variant: "video",
	title: "\"Their creative approach truly impressed me.",
	description:
		"I've collaborated with other branding before, but non matched their clarity and precision. Form the first meeting to final delivery, everything was smooth, thoughtful, and impactful. Still unsure? Trust me - this team delivers every time",
	author: "Jamie R.",
	role: "3rd Year Computer Science Student",
	videoSrc: "https://lorem.video/720p",
};

const TEXT_TESTIMONIALS: Testimonial[] = [
	{
		id: "t-text-1",
		variant: "text",
		description:
			"\"It completely transformed my journey as a Computer Science student. **Through hands-on workshops, hackathons, and mentorship sessions**, I gained practical experience that went far beyond classroom learning.\"",
		author: "Claire Ramirez",
		role: "BS Computer Engineering Student",
		avatarSrc: "/images/testimonials/avatar-1.png",
	},
	{
		id: "t-text-2",
		variant: "text",
		description:
			"\"**Joining GDG opened my eyes as a Business Management student**—I learned how Google Analytics and AI tools can transform business strategies. Even without a tech background, GDG made learning fun and practical. Now I see how tech and business truly work together!\"",
		author: "Mika Dela Cruz",
		role: "BS Business Management Student",
		avatarSrc: "/images/testimonials/avatar-2.png",
	},
	{
		id: "t-text-3",
		variant: "text",
		description:
			"\"**Joining GDG opened my eyes as a Business Management student**—I learned how Google Analytics and AI tools can transform business strategies. Even without a tech background, GDG made learning fun and practical. Now I see how tech and business truly work together!\"",
		author: "Mika Dela Cruz",
		role: "BS Business Management Student",
		avatarSrc: "/images/testimonials/avatar-3.png",
	},
	{
		id: "t-text-4",
		variant: "text",
		description:
			"\"I learned to build and optimize apps using Flutter and Firebase, and **the community events gave me the chance to collaborate with real developers and mentors**.\"",
		author: "Daniel Lim",
		role: "4th Year Computer Science Student",
		avatarSrc: "/images/testimonials/avatar-4.png",
	},
];

export default function TestimonialsSection() {
	return (
		<section
			id="testimonials"
			className="relative w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
		>
			{/* Background image — contained, masked, non-repeating */}
			<div className="absolute inset-0 w-full h-full max-w-[2560px] mx-auto -z-10">
				<div
					className="absolute inset-0 w-full h-full bg-[url('/images/testimonials/bg-testimonials.png')] bg-cover bg-center bg-no-repeat"
					style={{
						WebkitMaskImage:
							"linear-gradient(to bottom, transparent 2%, black 30%, black 70%, transparent 98%)",
						maskImage:
							"linear-gradient(to bottom, transparent 2%, black 30%, black 70%, transparent 98%)",
					}}
				/>
				{/* Side fade to blend with page pillars */}
				<div
					className="absolute inset-0 w-full h-full pointer-events-none"
					style={{
						background:
							"linear-gradient(to right, black 0%, black calc(50% - 1200px), transparent calc(50% - 960px), transparent calc(50% + 960px), black calc(50% + 1200px), black 100%)",
					}}
				/>
			</div>

			<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
				<TestimonialsHeader />

				{/* Content: Video card (left) + Stacked cards (right) */}
				<div className="flex flex-col lg:flex-row items-start justify-center gap-4 w-full">
					{/* Video testimonial */}
					<div className="w-full lg:w-auto flex justify-center lg:justify-start">
						<TestimonialCard testimonial={VIDEO_TESTIMONIAL} />
					</div>

					{/* Text testimonials stack */}
					<TestimonialStack testimonials={TEXT_TESTIMONIALS} />
				</div>
			</div>
		</section>
	);
}
