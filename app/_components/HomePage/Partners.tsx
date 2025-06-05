import { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import { User, Users, Building2, ChevronDown } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { PartnerCard, type partnerCardProps } from "../ui/PartnerCard";
import { motion } from "framer-motion";

const poppins = Poppins({ weight: "400", subsets: ["latin"]});
const inter = Inter({ weight: ["400", "500"], subsets: ["latin"]});

interface partnersPillProps {
	partnersPill: {
		text: string;
		icon: React.ReactNode;
	};
}



function Partners() {
	const [activeTab, setActiveTab] = useState<number>(2);

	function handleClick(index: number) {
		setActiveTab(index);
	}

	function PartnersPill({ partnersPill }: partnersPillProps) {	
		return (
			<div className={`flex gap-3`}>
				<div className="flex justify-center items-center w-6 h-6">{ partnersPill.icon }</div>
				<p className={`text-sm text-center leading-normal text-[#F2F4F8] ${inter.className}`}>{ partnersPill.text }</p>
			</div>
		)
	}

// TODO: Transfer the array to Firebase

	const partners = [
    {
		text: 'Industry Leaders',
		icon: <User color="#ffffff" aria-hidden />,
		content: [
        {
			text: 'Industry Leader 1',
			images: [
            {
				name: 'Something',
				link: '/images/test.png',
				url: 'https://example.com',
				alt: 'Image 1',
				width: 200,
				height: 100,
            },
			],
        },
		],
    },
    {
		text: 'Partnered Companies',
		icon: <Building2 color="#ffffff" aria-hidden />,
		content: [
        {
			text: 'Company 1',
			images: [
            {
				name: 'Something',
				link: '/images/test.png',
				url: 'https://example2.com',
				alt: 'Image 2',
				width: 200,
				height: 100,
            },
			],
        },
		],
    },
    {
		text: 'Supported by Google',
		icon: <SiGoogle color="#ffffff" aria-hidden />,
		content: [
        {
			text: 'GDG is honoured to be supported by global leaders in technology and developer communities',
			images: [
            {
				name: 'Something',
				link: '/images/test.png',
				url: 'https://google.com',
				alt: 'Google Image',
				width: 200,
				height: 100,
            },
			{
				name: 'Something',
				link: '/images/test.png',
				url: 'https://google.com',
				alt: 'Google Image',
				width: 200,
				height: 100,
            }
			],
        },
		],
    },
    {
		text: 'Partnered Associates',
		icon: <Users color="#ffffff" aria-hidden />,
		content: [
		{
			text: 'Associate 1',
			images: [
			{
				name: 'Something',
				link: '/images/test.png',
				url: 'https://example4.com',
				alt: 'Image 4',
				width: 200,
				height: 100,
			},
			],
        },
		],
    },
];


	return (
		<section className="partner-section" aria-label="Partners Section">
			<div className={"flex flex-col items-center"}>
				<div className="text-center my-5">
					<h1 className="font-medium tracking-tight  bg-gradient-to-l from-[#d596d9] to-[#fdc0c4]/80 dark:from-white dark:to-[#ececec]/45 min-h-[5.5rem] max-w-6xl gap-[0.625rem] bg-clip-text text-transparent text-7xl md:text-8xl mx-auto mb-3">Our Partners</h1>
					<p className="font-normal text-xl leading-[1.3] m-auto bg-gradient-to-r from-[#d592d9] to-[#efadb2] bg-clip-text text-transparent dark:text-[#ececec]/65 dark:bg-none" aria-hidden>
						From global companies to student clubs,
						<br />
						we came together as one
					</p>
				</div>
				<div className="my-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
						{partners.map((partner, index) => (
							<button key={index} onClick={() => handleClick(index)} aria-label={`${partner.text} tab`} className={`flex justify-center items-center gap-2 px-5 py-3 rounded-3xl border-2 border-gradient-to-r from-black dark:from-white to-[#4285F4] border-slice-1 border-repeat-stretch ${
								activeTab === index
								? `bg-[#0056B3] dark:bg-black`
								: ` bg-[#C62828] dark:bg-white/30`}`}>
								<PartnersPill partnersPill={partner} />
							</button>
						))}
					</div>
				</div>
				<motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}> 
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						{/* TODO: Switch gradient colour depending on theme  */}
						<div className="m-5 p-5 max-w-md min-w-96 min-h-[27rem] rounded-lg flex flex-col border-gradient-to-r from-black dark:from-white to-[#4285F4] border-slice-1 border-repeat-stretch" aria-label="Partners Menu" style={{
							backgroundImage: "linear-gradient(to right, #06233B, #1060A1), linear-gradient(to right, hsla(210, 91%, 17%, 0.24), hsla(215, 94%, 13%, 1))",
							backgroundBlendMode: "screen"
						}}>
						{partners[activeTab].content.map((card, index) => (
							<PartnerCard key={index} text={card.text} images={card.images} />
						))}
						</div>
					</motion.div>
				</motion.div>
				<div className="self-stretch">
					<ChevronDown width={48} height={48} className="mx-auto my-4" aria-hidden></ChevronDown>
					<div className="my-6 flex-wrap flex gap-10 justify-center min-h-[4rem]">
						<p className={`text-center font-normal text-xl leading-[1.3] text-black/95 dark:text-[#ECECEC]/65 ${poppins.className}`}>
							Interested in Partnering with Us ?
							<br />
							<i>Let's create something impactful together</i>
						</p>
						<a href="/" className="p-4 flex flex-col justify-center rounded-full bg-[#0056B3] dark:bg-black border-2 border-black dark:border-white" aria-label="Go to become GDG Partner link">
							<p className={`text-center font-medium text-white ${inter.className}`}>Become GDG Partner</p>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Partners;
