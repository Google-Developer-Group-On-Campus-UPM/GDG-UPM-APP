import Image from "next/image";
import React from "react";

/**
 * A centered, animated arrow-down icon for indicating scroll.
 */
const ScrollDownArrow: React.FC = () => (
	<div className="flex justify-center">
		<Image
			src="/images/hero/arrow-down-icon.svg"
			alt="Scroll Down"
			width={50}
			height={50}
			className="left-1/2 transform -translate-x-1/2 animate-bounce"
		/>
	</div>
);

export default ScrollDownArrow;
