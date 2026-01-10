import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOpenSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768039872/FooterBG_hgl0zb.png"
          alt="Footer Background"
          className="w-full h-full object-cover opacity-15 select-none"
        />
        <div className="absolute inset-0" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
      <div className="absolute inset-0 grid-bg opacity-5 z-0" />
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          <div className="md:col-span-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-3 glitch" data-text="QUANTICA">
              QUANTI<span className="text-primary">CA</span>
            </h2>
            <p className="text-sm md:text-sm text-muted-foreground max-w-sm">
              Delhi NCR's biggest and first esports tournament. Experience the
              thrill of competitive gaming at its finest with massive prize
              pools and legendary battles.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/quantica.fest/"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <FiInstagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/@SageClubRU"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="mailto:quantica.fest@gmail.com"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <IoMailOpenSharp size={18} />
              </a>
            </div>
          </div>
          <div className="md:col-start-4 md:pl-6">
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider text-md md:text-sm">
              Quick Links
            </h3>
            <ul className="flex flex-row gap-4 md:flex-col md:space-y-3">
              <li>
                <Link
                  to="/events"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/play-arena"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Play Arena
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-start-5">
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider text-md md:text-sm">
              Events
            </h3>
            <ul className="flex flex-row gap-4 md:flex-col md:space-y-3">
              <li>
                <Link
                  to="/events/bgmi"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  BGMI
                </Link>
              </li>
              <li>
                <Link
                  to="/events/valorant"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Valorant
                </Link>
              </li>
              <li>
                <Link
                  to="/events/freefire"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Free Fire MAX
                </Link>
              </li>
              <li>
                <Link
                  to="/events/efootball"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  EFOOTBALL
                </Link>
              </li>
              <li>
                <Link
                  to="/events/tekken8"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tekken 8
                </Link>
              </li>
              <li>
                <Link
                  to="/events/eafootball26"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  EAFC 26
                </Link>
              </li>
              <li>
                <Link
                  to="/events/f126"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  F1 - 26
                </Link>
              </li>
              <li>
                <Link
                  to="/events/clashroyale"
                  className="text-sm md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Clash Royale
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 md:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs md:text-xs">
            © 2026 QUANTICA. All rights reserved.
          </p>
          <p className="text-muted-foreground text-[10px] md:text-xs">
            Delhi NCR's Premier Esports Organization
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
