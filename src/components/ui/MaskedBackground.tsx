import React from "react";

// Example usage of the MaskedBackground component:
//
// - To use a predefined gradient template, pass the `template` prop:
//   <MaskedBackground template="template1">...</MaskedBackground>
//
// - To use a custom gradient, pass `direction` and `stops` props:
//   <MaskedBackground direction="to_right" stops={["black_0%", "transparent_100%"]}>...</MaskedBackground>

type MaskedBackgroundProps = {
    className?: string;
    template?: "template1" | "template2" | "template3";
    direction?: string; 
    stops?: string[];  
    children?: React.ReactNode;
};

const templates: Record<string, string> = {
    // Transparent at top, black at bottom
    template1: "linear-gradient(to_bottom,transparent_90%,black_100%)",
    // Black at top, transparent in middle, black at bottom
    template2: "linear-gradient(to_bottom,black_0%,transparent_50%,black_100%)",
    // Black at top, transparent at bottom
    template3: "linear-gradient(to_bottom,black_10%,transparent_100%)",
};

const MaskedBackground: React.FC<MaskedBackgroundProps> = ({
    className = "",
    template,
    direction = "to_bottom",
    stops = ["transparent_90%", "black_100%"],
    children,
}) => {
    // Choose mask-image value
    const maskImage = template
        ? templates[template]
        : `linear-gradient(${direction},${stops.join(",")})`;

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black z-0 [mask-image:${maskImage}] ${className}`}
        >
            {children}
        </div>
    );
};

export default MaskedBackground;