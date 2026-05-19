"use client";

import { motion } from "motion/react";
import { Testimonial } from "@/constants/types/testimonials.type";
import TestimonialCard from "./TestimonialCard";

interface TestimonialStackProps {
	testimonials: Testimonial[];
}

/**
 * Stacked positions — cards start offset and rotated, then spring
 * into a clean masonry grid when the container enters the viewport.
 */
const STACKED_POSITIONS = [
	{ x: 76, y: 31, rotate: -12 },
	{ x: 92, y: -30, rotate: -8 },
	{ x: -92, y: 23, rotate: 8 },
	{ x: -76, y: -31, rotate: 12 },
];

const SPRING = { type: "spring" as const, stiffness: 260, damping: 20 };

export default function TestimonialStack({
	testimonials,
}: TestimonialStackProps) {
	return (
		<div className="relative flex justify-center items-center">
			<div className="max-w-[575px] mx-auto">
				<div
					className="w-full"
					style={{
						columns: "280px 2",
						columnGap: "15px",
					}}
				>
					{testimonials.map((testimonial, index) => {
						const pos = STACKED_POSITIONS[index % STACKED_POSITIONS.length];

						return (
							<motion.div
								key={testimonial.id}
								initial={{ x: pos.x, y: pos.y, rotate: pos.rotate, opacity: 0 }}
								whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									...SPRING,
									delay: index * 0.08,
									opacity: { duration: 0.4, delay: index * 0.08 },
								}}
								style={{
									display: "inline-block",
									width: "100%",
									marginBottom: "15px",
									breakInside: "avoid",
								}}
							>
								<TestimonialCard testimonial={testimonial} />
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
