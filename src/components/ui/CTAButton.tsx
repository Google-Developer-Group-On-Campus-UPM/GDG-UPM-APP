import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

type GradientType = "linear" | "radial" | "none";

interface CTAButtonProps {
	// Inner div
	innerGradientType?: GradientType;
	innerGradientColors?: string;
	text?: string;
	insetShadow?: string;
	// Outer div
	outerGradientType?: GradientType;
	outerGradientColors?: string;
	outerBorder?: boolean;
	boxShadow?: boolean;
	shadowH?: number;
	shadowV?: number;
	shadowBlur?: number;
	shadowSpread?: number;
	shadowColor?: string;
	shadowOpacity?: number;
	// Button/link props
	href?: string; // If provided, renders as a link
	onClick?: () => void;
	className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
	// Inner
	innerGradientType = "radial",
	innerGradientColors = "circle, #515EF3 0%, #2F21D9 100%",
	text = "Read Full Article",
	insetShadow = "inset 0px -4px 2px 0px rgba(37,25,163,1), inset 0px 4px 2px 0px rgba(63,60,229,1)",

	// Outer
	outerGradientType = "none",
	outerGradientColors = "",
	outerBorder = false,
	boxShadow = false,
	shadowH = 0,
	shadowV = 10,
	shadowBlur = 400,
	shadowSpread = 29,
	shadowColor = "#002EFF",
	shadowOpacity = 0.49,

	// Button/link
	href,
	onClick,
	className = "",
}) => {
	// Outer background: lighter when no shadow, darker when shadow is enabled
	const outerBg =
		outerGradientType === "none"
			? boxShadow
				? "bg-gray-300/40"
				: "bg-gray-300/10"
			: "";

	// Outer border gradient (not used by default)
	const borderStyle =
		outerBorder && outerGradientType !== "none"
			? {
					border: "2px solid",
					borderImage: `${outerGradientType}-gradient(${outerGradientColors}) 1`,
				}
			: {};

	// Box shadow
	const shadowStyle = boxShadow
		? {
				boxShadow: `${shadowH}px ${shadowV}px ${shadowBlur}px ${shadowSpread}px rgba(${parseInt(
					shadowColor.slice(1, 3),
					16,
				)},${parseInt(shadowColor.slice(3, 5), 16)},${parseInt(
					shadowColor.slice(5, 7),
					16,
				)},${shadowOpacity})`,
			}
		: {};

	// Inner gradient
	const innerBg =
		innerGradientType === "radial"
			? { background: `radial-gradient(${innerGradientColors})` }
			: innerGradientType === "linear"
				? { background: `linear-gradient(${innerGradientColors})` }
				: { background: "#515EF3" };

	const buttonContent = (
		<span
			className={`${poppins.className} text-white text-[20px] px-[48px] py-[12px] rounded-[30px] font-light transition hover:opacity-90 cursor-pointer ${className}`}
			style={{
				...innerBg,
				boxShadow: insetShadow,
				display: "inline-block",
				textAlign: "center",
			}}
		>
			{text}
		</span>
	);

	return (
        <div
			className={`inline-block rounded-[30px] p-[2.8px] ${outerBg}`}
			style={{
				...borderStyle,
				...shadowStyle,
			}}
		>
            {href ? (
				<Link href={href} tabIndex={0} style={{ display: "inline-block" }}>

                    {buttonContent}

                </Link>
			) : (
				<button
					type="button"
					className="bg-transparent border-none p-0 m-0"
					style={{ display: "inline-block" }}
					onClick={onClick}
				>
					{buttonContent}
				</button>
			)}
        </div>
    );
};

export default CTAButton;

/*
  Usage examples for CTAButton:

  // 1. Default (no outer box shadow)
  <CTAButton />

  // 2. With outer box shadow (default values)
  <CTAButton boxShadow />

  // 3. Without any shadow (no outer box shadow, no inset shadow)
  <CTAButton boxShadow={false} insetShadow="" />

  // 4. With custom text and linear gradient
  <CTAButton
    text="Join Now"
    innerGradientType="linear"
    innerGradientColors="90deg, #ff7e5f 0%, #feb47b 100%"
  />

  // 5. With outer border and gradient
  <CTAButton
    outerBorder
    outerGradientType="linear"
    outerGradientColors="90deg, #43cea2 0%, #185a9d 100%"
  />

  // 6. With custom inset shadow
  <CTAButton
    insetShadow="inset 0px -2px 8px 0px rgba(255,0,0,0.5), inset 0px 2px 8px 0px rgba(0,255,0,0.5)"
  />

  // 7. As a Next.js link (navigates to /about)
  <CTAButton href="/about" text="Go to About Page" />

  // 8. As a button with onClick handler
  <CTAButton onClick={() => alert("Clicked!")} text="Click
*/
