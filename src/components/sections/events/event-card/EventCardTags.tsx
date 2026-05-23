import FlexChip from "@/components/ui/FlexChip";
import { Event } from "@/constants/types/events.type";

interface EventCardTagsProps {
	tags?: Event["tags"];
}

export default function EventCardTags({ tags }: EventCardTagsProps) {
	if (!tags || tags.length === 0) return null;

	return (
		<div className="flex flex-wrap pt-[2px] pb-[4px]">
			{tags.map((tagItem, index) =>
				tagItem ? (
					<FlexChip
						key={index}
						content={[{ text: tagItem.tag }]}
						preset={tagItem.presetColor}
						hasLogo={false}
						fontFamily="Poppins"
						fontWeight={500}
						fontSize="10px"
						sx={{
							lineHeight: "18px",
							letterSpacing: "0%",
							textAlign: "center",
							borderRadius: "9999px", // rounded-full
							borderWidth: "1px",
							padding: "6px 10px", // top/bottom: 6px, left/right: 10px
							gap: "6px",
						}}
					/>
				) : null,
			)}
		</div>
	);
}
