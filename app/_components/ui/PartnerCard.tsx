import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ weight: "400", subsets: ["latin"]});

interface partnerCardProps {
	text: string,
	images: {
		name: string,
		link: string,
		url: string,
		alt?: string,
		width: number,
		height: number
	}[]
}

function PartnerCard({ text, images }: partnerCardProps) {
	return (
		<div className="flex-grow">
			<p className={`max-w-[50ch] text-sm p-2 leading-[1.3] text-center flex-1 text-white dark:text-[#ECECEC]/95 font-normal mb-5  ${poppins.className}`} aria-label="Partner Description">{ text }</p>
			<div className="flex justify-center flex-wrap gap-8">
			{images.map((image, index) => {
				if (image.alt) {
					return (
						<a href={image.url} className="" aria-label={`Go to ${image.name} website`}>
							<Image src={image.link} alt={`Logo of ${image.alt}`} width={image.width} height={image.height} className="flex-shrink-0" key={index}></Image>
						</a>
					)
				}
				return (
					<Image src={image.link} alt={`Logo of ${image.name}`} width={image.width} height={image.height} className="" key={index}></Image>
				)
				})}
			</div>
		</div>
	)
}

export { PartnerCard };
export type { partnerCardProps };