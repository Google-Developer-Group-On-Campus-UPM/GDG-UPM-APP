import { Link } from "@mui/material";
import Image from "next/image";
import { LINKS } from "@/constants/links";

export default function FooterHeader() {
  return (
    <Link
      href={LINKS.COMMUNITY_PLATFORM}
      aria-label="GDG on Campus UPM Home"
      sx={{
        display: "inline-flex",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.02)",
          opacity: 0.9,
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <Image
        src="/images/navbar/gdg-logo.svg"
        alt="GDG on Campus UPM Logo"
        width={200}
        height={54}
        style={{ objectFit: "contain" }}
        className="w-auto h-auto"
        priority
      />
    </Link>
  );
}
