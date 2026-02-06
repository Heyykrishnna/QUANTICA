import { motion, scale } from "framer-motion";
import { useEffect, useState } from "react";
const sponsors = [
	{
		name: "Garena",
		logo: "https://ik.imagekit.io/jbckhvkvo/FFM_Community%20India%20logo%201.svg",
		link: "https://www.garena.com",
		className: 'scale-80'
	},
	{
		name: "ESFI",
		logo: "https://thebridge.in/h-upload/2022/06/01/29366-esfi-logo.jpg",
		link: "https://esportsfederation.in/",
	},
	{
		name: "Takumi",
		logo: "https://ik.imagekit.io/jbckhvkvo/image%20187.png",
		link: "https://www.instagram.com/takumi.sonipat/",
	},
	{
		name: "Jio Games",
		logo: "https://play-lh.googleusercontent.com/5wei91oDawARajh0dDkWxuRZByTJYLS8TzxndGEfsIhA5Rc7M00FTdr3X4G1C-E5ZQxQ",
		link: "https://jiogames.com/",
	},
	{
		name: "Red Bull",
		logo: "https://www.svgrepo.com/show/303227/redbull-logo.svg",
		link: "https://www.redbull.com",
	},
	// {
	// 	name: "Meta Space",
	// 	logo: "https://metaspacechain.b-cdn.net/img/logo.png",
	// 	link: "https://metaspacechain.com/",
	// },
	{
		name: "Denver",
		logo: "https://denverformen.com/cdn/shop/files/Denver_Horizontal_Logo_Final_1.png?v=1648750177&width=500",
		link: "https://denverformen.com/",
		className: "scale-80",
	},
	{
		name: "Unstop",
		logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg",
		link: "https://unstop.com",
		className: "scale-80",
	},
	{
		name: "Inglu",
		logo: "https://i0.wp.com/ingluglobal.in/wp-content/uploads/2024/02/Untitled-1.png?w=1200&ssl=1",
		link: "https://ingluglobal.in/",
		className: "scale-120",
	},
	{
		name: "Burger Singh",
		logo: "https://www.burgersinghonline.com/wp-content/themes/burger-singh/front/images/logo-v=0.1.png",
		link: "https://www.burgersinghonline.com/",
		className: "scale-120",
	},
	{
		name: "Prera",
		logo: "https://ik.imagekit.io/jbckhvkvo/PRERA.jpg",
		link: "https://www.instagram.com/prera_official/",
		className: "scale-120",
	},
	{
		name: "Truscholar",
		logo: "https://framerusercontent.com/images/E6CZSGneOrMTibzmJbhUNuyivDk.svg?width=193&height=34",
		link: "https://www.truscholar.io/",
		className: "scale-120",
	},
	{
		name: "Hell Energy",
		logo: "https://optim.tildacdn.one/tild3734-6539-4366-b133-653032393935/-/resize/450x/-/format/webp/HELL_ENERGY_logo.png.webp",
		link: "https://www.hellenergy.com/in/",
		className: "scale-150",
	},
	{
		name: "7th Heaven",
		logo: "https://ik.imagekit.io/jbckhvkvo/ChatGPT%20Image%20Feb%204,%202026,%2003_20_52%20AM.png",
		link: "https://www.7thheaven.in/",
		className: "scale-140",
	},
	// {
	// 	name: "ASUS",
	// 	logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
	// 	link: "https://www.asus.com",
	// 	className: "brightness-0 invert",
	// },
	// {
	// 	name: "Acer",
	// 	logo: "https://images.acer.com/is/content/acer/acer-4",
	// 	link: "https://www.acer.com",
	// 	className: "scale-150",
	// },
	{
		name: "Meta Nova",
		logo: "https://metanovaesports.com/wp-content/uploads/2026/01/cropped-1__3_-removebg-preview-1.png",
		link: "https://metanovaesports.com/",
		className: "scale-150",
	},
	{
		name: "Eve Paper",
		logo: "https://evepaper.com/wp-content/uploads/2026/01/EvePaper_Logo_White-removebg-e1769027876216.png",
		link: "https://evepaper.com/",
		className: "scale-100 brightness-0 invert",
	},
	{
		name: "Ginni Chaap",
		logo: "https://ik.imagekit.io/jbckhvkvo/Screenshot%202026-02-05%20at%206.18.04%E2%80%AFPM%201.png",
		link: "https://www.instagram.com/ginnichaap/",
		className: "scale-100",
	},

	// {
	// 	name: "PlayStation",
	// 	logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Playstation_logo_colour.svg",
	// 	link: "https://www.playstation.com",
	// 	className: "brightness-0 invert",
	// },
	// {
	// 	name: "PlayStation",
	// 	logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Playstation_logo_colour.svg",
	// 	link: "https://www.playstation.com",
	// 	className: "brightness-0 invert",
	// },
];

const SponsorsSection = () => {
	const [marqueeDuration, setMarqueeDuration] = useState<number>(() => {
		if (typeof window === "undefined") return 20;
		return window.innerWidth >= 768 ? 40 : 20;
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mql = window.matchMedia("(min-width: 768px)");
		const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
			setMarqueeDuration((e as any).matches ? 40 : 20);
		};
		// initialize
		onChange(mql);
		if (mql.addEventListener) mql.addEventListener("change", onChange);
		else mql.addListener(onChange);
		return () => {
			if (mql.removeEventListener) mql.removeEventListener("change", onChange);
			else mql.removeListener(onChange);
		};
	}, []);

	return (
		<section className="py-24 bg-card border-y border-border overflow-hidden">
			<div className="container mx-auto px-4 mb-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-foreground">
						OUR{" "}
						<span className="text-primary">PARTNERS</span>
					</h2>
				</motion.div>
			</div>
			<div className="relative">
				<div className="flex overflow-hidden">
					<motion.div
						className="flex"
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							x: {
								repeat: Infinity,
								repeatType: "loop",
								duration: marqueeDuration,
								ease: "linear",
							},
						}}
					>
						{[...sponsors, ...sponsors, ...sponsors, ...sponsors].map(
							(sponsor, index) => (
								<a
									key={`${sponsor.name}-${index}`}
									href={sponsor.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-shrink-0 mx-8 md:mx-16 w-32 md:w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 pointer-events-auto"
								>
									<img
										src={sponsor.logo}
										alt={sponsor.name}
										className={`max-w-full max-h-full object-contain ${sponsor.className || ""
											}`}
									/>
								</a>
							),
						)}
					</motion.div>
				</div>
				<div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent pointer-events-none" />
			</div>
			{/* <div className="container mx-auto px-4 mt-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center"
					>
						<p className="text-primary text-3xl font-bold">6+</p>
						<p className="text-muted-foreground text-sm uppercase tracking-wider">
							Title Sponsors
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-center"
					>
						<p className="text-secondary text-3xl font-bold">10+</p>
						<p className="text-muted-foreground text-sm uppercase tracking-wider">
							Tech Partners
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-center"
					>
						<p className="text-primary text-3xl font-bold">15+</p>
						<p className="text-muted-foreground text-sm uppercase tracking-wider">
							Media Partners
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="text-center"
					>
						<p className="text-secondary text-3xl font-bold">20+</p>
						<p className="text-muted-foreground text-sm uppercase tracking-wider">
							Community Partners
						</p>
					</motion.div>
				</div>
			</div> */}
		</section>
	);
};
export default SponsorsSection;