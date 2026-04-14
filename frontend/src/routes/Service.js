import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ───── Services data ───── */
const services = [
  { icon: "fa-solid fa-plane-departure", title: "Flight Booking", desc: "Book domestic & international flights at unbeatable prices. Access 500+ airlines worldwide.", color: "from-blue-500/20 to-blue-600/20" },
  { icon: "fa-solid fa-bed", title: "Hotel Reservations", desc: "Luxury stays to budget gems — 100,000+ properties handpicked for quality.", color: "from-purple-500/20 to-purple-600/20" },
  { icon: "fa-solid fa-map-signs", title: "Tour Packages", desc: "Curated itineraries led by local experts. Adventure, culture, or relaxation — your pick.", color: "from-orange-500/20 to-orange-600/20" },
  { icon: "fa-solid fa-car", title: "Car Rentals", desc: "Premium vehicles at your destination. Self-drive or chauffeur, daily or weekly.", color: "from-green-500/20 to-green-600/20" },
  { icon: "fa-solid fa-shield-halved", title: "Travel Insurance", desc: "Comprehensive coverage for medical, cancellation, and luggage — travel worry-free.", color: "from-red-500/20 to-red-600/20" },
  { icon: "fa-solid fa-passport", title: "Visa Assistance", desc: "Expert guidance for visa applications. We handle paperwork, you pack bags.", color: "from-indigo-500/20 to-indigo-600/20" },
];

/* ───── Why choose us data ───── */
const reasons = [
  { icon: "fa-solid fa-tags", text: "Best price guarantee on every booking" },
  { icon: "fa-solid fa-headset", text: "24/7 dedicated customer support" },
  { icon: "fa-solid fa-shield-check", text: "Verified & trusted travel partners" },
  { icon: "fa-solid fa-bolt", text: "Instant booking confirmation" },
  { icon: "fa-solid fa-rotate-left", text: "Free cancellation on select bookings" },
  { icon: "fa-solid fa-star", text: "Curated experiences by travel experts" },
];

/* ───── Pricing data ───── */
const pricing = [
  { tier: "Basic", price: "299", period: "/trip", features: ["Flight booking", "Hotel search", "Email support", "Basic insurance"], popular: false },
  { tier: "Standard", price: "599", period: "/trip", features: ["Everything in Basic", "Tour packages", "24/7 support", "Premium insurance", "Car rental access"], popular: true },
  { tier: "Premium", price: "999", period: "/trip", features: ["Everything in Standard", "VIP concierge", "Visa assistance", "Priority booking", "Luxury upgrades", "Personal travel advisor"], popular: false },
];

/* ───── Wave SVG divider ───── */
function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="#0A1628"
          opacity=".8"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          fill="#0A1628"
          opacity=".5"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill="#0A1628"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE PAGE
   ═══════════════════════════════════════════ */
export default function Service() {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });
  const reasonsRef = useRef(null);
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-navy min-h-screen">
      <Navbar />

      {/* ── HERO WITH PARALLAX EFFECT ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-warm-gray text-sm mb-4 flex items-center justify-center gap-2"
          >
            <a href="/" className="hover:text-teal transition-colors">Home</a>
            <i className="fa-solid fa-chevron-right text-[10px] text-teal" />
            <span className="text-teal">Services</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-playfair text-4xl md:text-6xl text-warm-white font-bold"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-warm-gray mt-4 max-w-lg mx-auto"
          >
            Everything you need for the perfect trip, all in one place
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 px-6" ref={servicesRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">What We Offer</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3">
              Travel Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl bg-navy-light border border-white/5 p-7 overflow-hidden
                  cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500
                  hover:border-teal/30"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/0 to-teal-dark/0
                  group-hover:from-teal group-hover:to-teal-dark transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-teal/10 group-hover:bg-white/20 flex items-center justify-center mb-5
                      transition-colors duration-500"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <i className={`${s.icon} text-teal group-hover:text-navy text-xl transition-colors duration-500`} />
                  </motion.div>

                  <h3 className="text-warm-white group-hover:text-navy font-bold text-xl mb-2 transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-warm-gray group-hover:text-navy/70 text-sm leading-relaxed mb-4 transition-colors duration-500">
                    {s.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-teal group-hover:text-navy font-semibold text-sm transition-colors duration-500">
                    Learn More
                    <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-6 bg-navy-dark/50" ref={reasonsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">Why Trippy</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={reasonsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-navy-light/50 border border-white/5
                  hover:border-teal/20 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={reasonsInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  className="w-10 h-10 rounded-lg bg-teal/10 flex-shrink-0 flex items-center justify-center"
                >
                  <i className="fa-solid fa-check text-teal text-sm" />
                </motion.div>
                <p className="text-warm-white text-sm">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">Pricing</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3">
              Choose Your Package
            </h2>
            <p className="text-warm-gray mt-3 max-w-md mx-auto">
              Flexible plans designed for every type of traveler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: plan.popular ? "0 20px 60px rgba(0,201,167,0.25)" : "0 20px 40px rgba(0,0,0,0.3)" }}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-teal/20 to-teal/5 border-2 border-teal/40 shadow-xl shadow-teal/10"
                    : "bg-navy-light border border-white/5 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-teal text-navy text-xs font-bold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-warm-white font-bold text-xl mb-2">{plan.tier}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-teal text-4xl font-bold">${plan.price}</span>
                    <span className="text-warm-gray text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-warm-gray">
                      <i className="fa-solid fa-circle-check text-teal text-xs" />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-none ${
                    plan.popular
                      ? "bg-teal text-navy shadow-lg shadow-teal/20 hover:shadow-teal/40"
                      : "bg-white/5 text-warm-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
