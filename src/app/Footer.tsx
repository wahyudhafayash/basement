import React from "react";
import Link from "next/link";
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 text-muted-foreground py-12 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-left">
          <Link href="/" className="text-lg font-black tracking-tighter text-foreground">
            basement<span className="text-primary font-serif">co.</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs">
            Studio teknologi digital tepercaya di Indonesia. Kami merekayasa website premium super cepat.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Twitter"
          >
            <BsTwitter size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Facebook"
          >
            <BsFacebook size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Instagram"
          >
            <BsInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <BsLinkedin size={20} />
          </a>
        </div>

        {/* Copy */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Basement Co. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
