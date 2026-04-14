import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ───── Cycling headlines ───── */
const headlines = [
  "Explore the World",
  "Find Your Adventure",
  "Discover Hidden Gems",
  "Create Lasting Memories",
];

/* ───── Feature highlights data ───── */
const features = [
  { icon: "fa-solid fa-plane", title: "Best Flights", desc: "Top airlines & unbeatable deals worldwide" },
  { icon: "fa-solid fa-hotel", title: "Top Hotels", desc: "Luxury stays handpicked for you" },
  { icon: "fa-solid fa-map-location-dot", title: "Guided Tours", desc: "Expert-led adventures in 150+ cities" },
  { icon: "fa-solid fa-sack-dollar", title: "Best Prices", desc: "Price match guarantee on every booking" },
];

/* ───── Destinations data ───── */
const destinations = [
  { name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80" },
  { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
  { name: "Swiss Alps", country: "Switzerland", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80" },
  { name: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
  { name: "Maldives", country: "Indian Ocean", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
  { name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
];

/* ───── Testimonials data ───── */
const testimonials = [
  { name: "Sarah Johnson", role: "Travel Blogger", stars: 5, text: "Trippy made my dream vacation to Bali absolutely seamless. From booking to check-out, everything was perfect!", avatar: "SJ" },
  { name: "Michael Chen", role: "Business Traveler", stars: 5, text: "I travel 200+ days a year and Trippy is the only platform I trust. Their support team is incredible.", avatar: "MC" },
  { name: "Emma Rodriguez", role: "Adventure Seeker", stars: 4, text: "Found hidden gems I never would have discovered on my own. The guided tours are world-class!", avatar: "ER" },
  { name: "David Kim", role: "Family Traveler", stars: 5, text: "Planning family trips used to be stressful. Trippy's packages made it effortless and affordable.", avatar: "DK" },
];

/* ═══════════════════════════════════════════
   REUSABLE: Section wrapper with scroll fade
   ═══════════════════════════════════════════ */
function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   HERO – Full-screen with cycling text
   ═══════════════════════════════════════════ */
function Hero() {
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeadlineIdx((i) => (i + 1) % headlines.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')" }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-teal/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-teal/5 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Cycling headline */}
        <div className="h-20 sm:h-24 md:h-28 flex items-center justify-center mb-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineIdx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-warm-white leading-tight"
            >
              {headlines[headlineIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover extraordinary destinations, curate your perfect itinerary, and create memories that last a lifetime — all in one place.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto border border-white/10 shadow-2xl"
        >
          <div className="flex-1 relative">
            <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-teal text-sm" />
            <input
              type="text"
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-3.5 bg-white/10 rounded-xl text-warm-white placeholder-warm-gray/60 outline-none focus:ring-2 focus:ring-teal/40 transition-all duration-300 text-sm"
            />
          </div>
          <div className="flex-1 relative">
            <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-teal text-sm" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3.5 bg-white/10 rounded-xl text-warm-white outline-none focus:ring-2 focus:ring-teal/40 transition-all duration-300 text-sm"
            />
          </div>
          <div className="flex-1 relative">
            <i className="fa-solid fa-user-group absolute left-4 top-1/2 -translate-y-1/2 text-teal text-sm" />
            <select className="w-full pl-10 pr-4 py-3.5 bg-white/10 rounded-xl text-warm-white outline-none focus:ring-2 focus:ring-teal/40 transition-all duration-300 text-sm appearance-none cursor-pointer">
              <option value="" className="text-navy">Travelers</option>
              <option value="1" className="text-navy">1 Traveler</option>
              <option value="2" className="text-navy">2 Travelers</option>
              <option value="3" className="text-navy">3 Travelers</option>
              <option value="4" className="text-navy">4+ Travelers</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-teal to-teal-dark text-navy font-bold rounded-xl
              shadow-lg shadow-teal/25 hover:shadow-teal/50 transition-shadow duration-300
              text-sm whitespace-nowrap cursor-pointer"
          >
            <i className="fa-solid fa-magnifying-glass mr-2" />
            Search
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 text-warm-gray/50"
        >
          <i className="fa-solid fa-chevron-down text-xl" />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURES STRIP
   ═══════════════════════════════════════════ */
function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative z-10 -mt-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,201,167,0.15)" }}
            className="bg-navy-light/80 backdrop-blur-xl rounded-2xl p-6 border border-white/5
              shadow-lg cursor-pointer transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4
              group-hover:bg-teal/20 transition-colors duration-300">
              <i className={`${f.icon} text-teal text-lg`} />
            </div>
            <h3 className="text-warm-white font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-warm-gray text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   POPULAR DESTINATIONS
   ═══════════════════════════════════════════ */
function Destinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="destinations" className="py-24 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-teal font-semibold text-sm uppercase tracking-[3px]"
          >
            Popular Destinations
          </motion.span>
          <h2 className="font-playfair text-3xl md:text-5xl text-warm-white font-bold mt-3">
            Where Will You Go Next?
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 shadow-lg"
            >
              {/* Image */}
              <img
                src={d.img}
                alt={d.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-teal text-xs uppercase tracking-widest mb-1">{d.country}</p>
                <h3 className="text-warm-white font-playfair text-2xl font-bold mb-3">{d.name}</h3>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-teal text-sm font-semibold
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Explore <i className="fa-solid fa-arrow-right text-xs" />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">Testimonials</span>
        <h2 className="font-playfair text-3xl md:text-5xl text-warm-white font-bold mt-3 mb-14">
          What Travelers Say
        </h2>

        <div className="relative h-64 md:h-52">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <motion.i
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: si * 0.1 }}
                    className={`fa-solid fa-star text-sm ${si < testimonials[current].stars ? "text-gold" : "text-warm-gray/30"}`}
                  />
                ))}
              </div>
              <p className="text-warm-white/90 text-base md:text-lg leading-relaxed italic max-w-2xl mb-4">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-sm">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="text-warm-white font-semibold text-sm">{testimonials[current].name}</p>
                  <p className="text-warm-gray text-xs">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                i === current ? "bg-teal w-8" : "bg-warm-gray/30 hover:bg-warm-gray/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════ */
function CtaBanner() {
  return (
    <Section className="py-24 px-6 bg-gradient-to-r from-teal-dark via-teal to-teal-light relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-playfair text-3xl md:text-5xl text-navy font-bold mb-4">
          Start Your Journey Today
        </h2>
        <p className="text-navy/70 text-lg mb-8 max-w-xl mx-auto">
          Join 10,000+ happy travelers who trust Trippy for their dream vacations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/service">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(10,22,40,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-navy text-warm-white font-bold rounded-full shadow-xl text-base cursor-pointer border-none"
            >
              Book Now
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-navy font-bold rounded-full border-2 border-navy text-base cursor-pointer"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Destinations />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
}
