import React from "react";



type MaskedBackgroundProps = {
    children?: React.ReactNode;
    className?: string;
    template?: "template1" | "template2" | "template3";
    direction?: string;
    stops?: string[];
    backgroundColor?: string;
    style?: React.CSSProperties;
};

const templates: Record<string, string> = {
    template1: "linear-gradient(to bottom, transparent 90%, black 100%)",
    template2: "linear-gradient(to bottom, black 0%, transparent 50%, black 100%)",
    template3: "linear-gradient(to bottom, black 5%, transparent 15%)",
};

export default function MaskedBackground({
    children,
    className = "",
    template,
    direction = "to bottom",
    stops = ["transparent 90%", "black 100%"],
    backgroundColor = "black",
    style = {},
}: MaskedBackgroundProps) {
    const maskImage = template
        ? templates[template]
        : `linear-gradient(${direction},${stops.join(",")})`;

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center z-0 ${className}`}
            style={{
                background: backgroundColor,
                maskImage,
                WebkitMaskImage: maskImage,
                ...style,
            }}
        >
            {children}
        </div>
    );
}