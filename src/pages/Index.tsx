import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import GlitchText from "../components/GlitchText";
import EventCard from "../components/EventCard";
import PageTransition from "../components/PageTransition";
import SponsorsSection from "../components/SponsorsSection";
import FAQSection from "../components/FAQSection";
import CountdownTimer from "../components/CountdownTimer";
import GallerySection from "../components/GallerySection";
import LiveStreamSection from "../components/LiveStreamSection";
const events = [
	{
		title: "BGMI 2026",
		game: "BGMI",
		date: "March 15-17, 2026",
		targetDate: "2026-03-15T10:00:00",
		prizePool: "₹5,00,000",
		teams: "64",
		image: "https://wstatic-prod-boc.krafton.com/common/content/media/20250507/kcDutagb/33.1_Sanhok_Destruction_KV.jpg",
		slug: "bgmi",
		color: "cyan" as const,
	},
	{
		title: "Valorant",
		game: "Valorant",
		date: "April 5-7, 2026",
		targetDate: "2026-04-05T11:00:00",
		prizePool: "₹3,00,000",
		teams: "32",
		image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/f657721a7eb06acae52a29ad3a951f20c1e5fc60-1920x1080.jpg?accountingTag=VAL?auto=format&fit=fill&q=80&w=1082",
		slug: "valorant",
		color: "magenta" as const,
	},
	{
		title: "Free Fire MAX",
		game: "Free Fire",
		date: "April 20-21, 2026",
		targetDate: "2026-04-20T10:00:00",
		prizePool: "₹2,00,000",
		teams: "48",
		image: "https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/4e48ada584910e68b5ae7a09f3072109.jpg",
		slug: "freefire",
		color: "cyan" as const,
	},
];
const stats = [
	{ value: "₹10L+", label: "Total Prize Pool" },
	{ value: "144+", label: "Teams Competing" },
	{ value: "500+", label: "Players" },
	{ value: "3", label: "Epic Events" },
];
const Index = () => {
	return (
		<PageTransition>
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
				<div className="absolute inset-0 z-0">
					<video
						autoPlay
						loop
						muted
						playsInline
						className="w-full h-full object-cover opacity-60"
					>
						<source
							src="https://res.cloudinary.com/dqh5g2nmn/video/upload/v1762449578/GAMETRAILERF_utywly.mp4"
							type="video/mp4"
						/>
					</video>
					<div className="absolute inset-0 bg-background/70" />
				</div>
				{ }
				<div className="absolute inset-0 grid-bg opacity-20" />
				{ }
				<div className="absolute inset-0 scanlines pointer-events-none" />
				{ }
				<div className="relative z-10 container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
							Delhi NCR's Biggest Esports Tournament
						</p>
					</motion.div>
					<motion.h1
						className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight break-words"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<GlitchText text="QUANTICA" className="text-foreground" />
					</motion.h1>
					<motion.p
						className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						Where legends are born. The ultimate battleground for esports
						warriors. Are you ready to claim your glory?
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className="mb-12"
					>
						<p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
							Next Event Starts In
						</p>
						<CountdownTimer targetDate="2026-02-07T10:00:00" color="cyan" />
					</motion.div>
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7 }}
					>
						<Link to="/events" className="cyber-btn">
							<span>Register Now</span>
						</Link>
						<Link to="/about" className="cyber-btn-outline">
							<span>Learn More</span>
						</Link>
					</motion.div>
				</div>
				<motion.div
					className="absolute bottom-8 left-1/2 -translate-x-1/2"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<ChevronDown className="text-primary" size={32} />
				</motion.div>
				<div className="absolute top-24 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/30" />
				<div className="hidden md:block absolute top-24 right-8 w-24 h-24 border-r-2 border-t-2 border-secondary/30" />
				<div className="hidden md:block absolute bottom-24 left-8 w-24 h-24 border-l-2 border-b-2 border-secondary/30" />
				<div className="hidden md:block absolute bottom-24 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
			</section>
			<section className="bg-primary py-4 overflow-hidden">
				<div className="hidden sm:flex animate-marquee whitespace-nowrap">
					{[...Array(10)].map((_, i) => (
						<span
							key={i}
							className="text-primary-foreground font-bold text-xs sm:text-lg mx-6 sm:mx-8 uppercase tracking-wider"
						>
							BGMI • VALORANT • FREE FIRE • ESPORTS • DELHI NCR • CHAMPIONSHIP •
						</span>
					))}
				</div>
			</section>
			<section className="py-24 bg-card relative">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="text-center"
							>
								<p className="text-4xl md:text-5xl font-bold text-primary mb-2">
									{stat.value}
								</p>
								<p className="text-muted-foreground uppercase tracking-wider text-sm">
									{stat.label}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			<section className="py-24 relative">
				<div className="absolute inset-0 grid-bg opacity-10" />
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
							Upcoming Tournaments
						</p>
						<h2 className="text-4xl mt-8 md:text-5xl font-bold text-foreground">
							CHOOSE YOUR{" "}
							<span className="text-secondary text-[30px] md:text-[48px]">
								BATTLEFIELD
							</span>
						</h2>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{events.map((event) => (
							<EventCard key={event.slug} {...event} showCountdown />
						))}
					</div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mt-12"
					>
						<Link to="/events" className="cyber-btn-outline">
							View All Events
						</Link>
					</motion.div>
				</div>
			</section>
			<SponsorsSection />
			<LiveStreamSection />
			<section className="py-24 relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
								About QUANTICA
							</p>
							<h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-play">
								THE FUTURE OF
								<br />
								<span className="text-primary">ESPORTS</span> IS HERE
							</h2>
							<p className="text-muted-foreground text-lg mb-8">
								QUANTICA is Delhi NCR's first and biggest esports tournament
								organization. We bring together the best players, the biggest
								stages, and the most electrifying gaming experiences. Our
								mission is to elevate Indian esports to the global stage.
							</p>
							<div className="flex flex-wrap gap-4">
								<div className="px-6 py-3 border border-primary text-primary text-sm uppercase tracking-wider">
									Professional Production
								</div>
								<div className="px-6 py-3 border border-secondary text-secondary text-sm uppercase tracking-wider">
									Massive Prize Pools
								</div>
								<div className="px-6 py-3 border border-primary text-primary text-sm uppercase tracking-wider">
									Live Streaming
								</div>
								<div className="px-6 py-3 border border-secondary text-secondary text-sm uppercase tracking-wider">
									Esports Exposure
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="relative"
						>
							<div className="relative clip-corner overflow-hidden">
								<img
									src="https://wallpapers.com/images/hd/gaming-tournaments-2048-x-1365-wallpaper-9fxtxbortr8qimwp.jpg"
									alt="Esports Arena"
									className="w-full h-56 md:h-96 object-cover"
								/>
								<div className="absolute" />
							</div>
							<div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-secondary" />
							<div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary" />
						</motion.div>
					</div>
				</div>
			</section>
			<FAQSection />
			<section className="py-24 relative">
				<div className="absolute inset-0 grid-bg opacity-20" />
				<div className="container mx-auto px-4 relative z-10 text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
							READY TO <span className="text-primary">COMPETE</span>?
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
							Register now and secure your spot in Delhi NCR's biggest esports
							tournament. Glory awaits.
						</p>
						<Link to="/events" className="cyber-btn text-lg">
							<span>Register Your Team</span>
						</Link>
					</motion.div>
				</div>
			</section>
		</PageTransition>
	);
};
export default Index;
