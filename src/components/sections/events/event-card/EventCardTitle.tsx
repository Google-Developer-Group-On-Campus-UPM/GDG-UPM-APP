import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardTitleProps {
	title: string;
}

export default function EventCardTitle({ title }: EventCardTitleProps) {
	return (
		<h3
			className="font-bold text-[18px] leading-[109%] tracking-normal text-left pt-1 pb-0.5 m-0"
			style={{
				...getGradientTextStyle(0.9),
				background: `linear-gradient(0deg, rgba(240, 240, 240, 0.9), rgba(240, 240, 240, 0.9)),
          linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)`,
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
				backgroundClip: "text",
			}}
		>
			{title}
		</h3>
	);
}
