import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOpenSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      { }
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-5" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          { }
          <div className="md:col-span-2">
            <h2 className="text-7xl font-bold text-foreground mb-4 glitch" data-text="QUANTICA">
              QUANTI<span className="text-primary">CA</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Delhi NCR's biggest and first esports tournament. Experience the
              thrill of competitive gaming at its finest with massive prize
              pools and legendary battles.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <IoMailOpenSharp size={18} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Events */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider text-sm">
              Tournaments
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/events/bgmi"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  BGMI Championship
                </Link>
              </li>
              <li>
                <Link
                  to="/events/valorant"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Valorant Masters
                </Link>
              </li>
              <li>
                <Link
                  to="/events/freefire"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Free Fire League
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 QUANTICA. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Delhi NCR's Premier Esports Organization
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
