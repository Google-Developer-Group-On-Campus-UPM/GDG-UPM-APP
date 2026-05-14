import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

interface EventCardTicketButtonProps {
	showGetTicket: boolean;
	onGetTicketClick?: () => void;
}

export default function EventCardTicketButton({
	showGetTicket,
	onGetTicketClick,
}: EventCardTicketButtonProps) {
	if (!showGetTicket) return null;
	return (
		<button
			onClick={onGetTicketClick}
			className={`
				${poppins.className} font-bold text-xs leading-snug tracking-normal text-white
				bg-transparent border-none outline-none cursor-pointer p-0 self-start rounded-md
				transition-all duration-300 ease-out hover:-translate-y-[1px] active:scale-95 active:duration-100
				focus:bg-transparent
			`}
			style={{
				minWidth: "auto",
			}}
		>
			Get Ticket &rarr;
		</button>
	);
}
