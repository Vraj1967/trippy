import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/service" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  "Flight Booking",
  "Hotel Reservations",
  "Tour Packages",
  "Car Rentals",
  "Travel Insurance",
  "Visa Assistance",
];

const socials = [
  { icon: "fa-brands fa-instagram", label: "Instagram", color: "hover:bg-pink-500/20 hover:text-pink-400" },
  { icon: "fa-brands fa-facebook-f", label: "Facebook", color: "hover:bg-blue-500/20 hover:text-blue-400" },
  { icon: "fa-brands fa-twitter", label: "Twitter", color: "hover:bg-sky-500/20 hover:text-sky-400" },
  { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", color: "hover:bg-blue-600/20 hover:text-blue-500" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-navy-dark border-t border-white/5">
      {/* ── MAIN FOOTER ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 – Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-lg shadow-teal/20">
                <i className="fa-solid fa-paper-plane text-white text-sm" />
              </div>
              <span className="text-xl font-bold font-playfair text-warm-white group-hover:text-teal transition-colors duration-300">
                Trippy
              </span>
            </Link>
            <p className="text-warm-gray text-sm leading-relaxed mb-5">
              Your perfect travel companion. Discover amazing destinations and create unforgettable memories with Trippy.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10
                    flex items-center justify-center text-warm-gray text-sm
                    ${s.color} transition-all duration-300`}
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-warm-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-warm-gray text-sm hover:text-teal hover:translate-x-1 inline-flex items-center gap-2
                      transition-all duration-300"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-teal/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Services */}
          <div>
            <h4 className="text-warm-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/service"
                    className="text-warm-gray text-sm hover:text-teal hover:translate-x-1 inline-flex items-center gap-2
                      transition-all duration-300"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-teal/50" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Newsletter */}
          <div>
            <h4 className="text-warm-white font-semibold mb-5 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-warm-gray text-sm leading-relaxed mb-4">
              Subscribe for exclusive deals and travel inspiration delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl
                  text-warm-white text-sm placeholder-warm-gray/50 outline-none
                  focus:border-teal/40 focus:ring-2 focus:ring-teal/20 transition-all duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg
                  bg-teal flex items-center justify-center cursor-pointer border-none"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <motion.i
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="fa-solid fa-check text-navy text-xs"
                  />
                ) : (
                  <i className="fa-solid fa-arrow-right text-navy text-xs" />
                )}
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal text-xs mt-2"
              >
                Thanks for subscribing!
              </motion.p>
            )}

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <p className="text-warm-gray text-sm flex items-center gap-2">
                <i className="fa-solid fa-envelope text-teal/50 text-xs" /> info@trippy.com
              </p>
              <p className="text-warm-gray text-sm flex items-center gap-2">
                <i className="fa-solid fa-phone text-teal/50 text-xs" /> +91 98765 43210
              </p>
              <p className="text-warm-gray text-sm flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-teal/50 text-xs" /> Mumbai, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-warm-gray/60 text-xs">
            © {new Date().getFullYear()} Trippy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-warm-gray/40 text-xs">
            <a href="#" className="hover:text-warm-gray transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-warm-gray transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-warm-gray transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
