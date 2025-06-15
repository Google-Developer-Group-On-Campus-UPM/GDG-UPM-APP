"use client";

import { Chip, SvgIconProps } from "@mui/material";
import { ReactElement } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

// Configure Poppins font
const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface TitleChipProps {
  icon?: ReactElement<SvgIconProps>;
  label: string;
  margin?: string | number;
}

export default function TitleChip({ icon, label, margin = 1 }: TitleChipProps) {
  const defaultIcon = (
    <Image
      src="/globe.svg"
      alt="globe"
      width={16}
      height={16}
      style={{ borderRadius: "50%" }}
    />
  );
  const chipContent = label;

  return (
    <Chip
      icon={icon || defaultIcon}
      label={chipContent}
      variant="outlined"
      onClick={() => {}}
      clickable={false}
      sx={{
        margin: margin,
        borderRadius: "20px",
        height: "auto",
        fontFamily: poppins.style.fontFamily,
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "white",
        borderColor: "white",
        boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
        "& .MuiChip-label": {
          padding: "8px 12px",
          fontFamily: poppins.style.fontFamily,
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "white",
        },
        "& .MuiChip-icon": {
          marginLeft: "8px",
          color: "white",
        },
      }}
    />
  );
}
