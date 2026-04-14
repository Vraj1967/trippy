import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ───── Team data ───── */
const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", img: null, initials: "AM",
    bio: "15 years in travel, passionate about connecting people with experiences.",
    social: { twitter: "#", linkedin: "#", instagram: "#" } },
  { name: "Priya Sharma", role: "Head of Operations", img: null, initials: "PS",
    bio: "Logistics expert who ensures every trip runs seamlessly.",
    social: { twitter: "#", linkedin: "#", instagram: "#" } },
  { name: "Rahul Patel", role: "Lead Designer", img: null, initials: "RP",
    bio: "Crafts beautiful digital experiences for travelers worldwide.",
    social: { twitter: "#", linkedin: "#", instagram: "#" } },
  { name: "Sneha Iyer", role: "Customer Success", img: null, initials: "SI",
    bio: "Dedicated to making every traveler feel supported and valued.",
    social: { twitter: "#", linkedin: "#", instagram: "#" } },
];

/* ───── Stats data ───── */
const stats = [
  { label: "Happy Travelers", target: 10000, suffix: "+", icon: "fa-solid fa-users" },
  { label: "Destinations", target: 150, suffix: "+", icon: "fa-solid fa-map-marker-alt" },
  { label: "Years Experience", target: 5, suffix: "+", icon: "fa-solid fa-award" },
  { label: "Satisfaction", target: 98, suffix: "%", icon: "fa-solid fa-heart" },
];

/* ───── Animated counter hook ───── */
function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

/* ───── Stat card component ───── */
function StatCard({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(stat.target, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <div className="w-14 h-14 mx-auto rounded-xl bg-teal/10 flex items-center justify-center mb-4">
        <i className={`${stat.icon} text-teal text-xl`} />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-teal font-inter mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <p className="text-warm-gray text-sm">{stat.label}</p>
    </motion.div>
  );
}

/* ───── Team card with 3D flip ───── */
function TeamCard({ member, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group h-80"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-navy-light border border-white/5 shadow-xl p-6
            flex flex-col items-center justify-center backface-hidden
            group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-2xl font-bold text-navy mb-4 shadow-lg shadow-teal/20">
            {member.initials}
          </div>
          <h3 className="text-warm-white font-bold text-lg">{member.name}</h3>
          <p className="text-teal text-sm mt-1">{member.role}</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal to-teal-dark p-6
            flex flex-col items-center justify-center
            group-hover:[transform:rotateY(0deg)] [transform:rotateY(-180deg)] transition-transform duration-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-navy text-center text-sm leading-relaxed mb-6">{member.bio}</p>
          <div className="flex gap-4">
            {Object.entries(member.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                className="w-10 h-10 rounded-full bg-navy/20 flex items-center justify-center hover:bg-navy/40 transition-colors duration-300"
              >
                <i className={`fa-brands fa-${platform} text-navy`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */
export default function About() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });

  return (
    <div className="bg-navy min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-warm-gray text-sm mb-4 flex items-center justify-center gap-2"
          >
            <a href="/" className="hover:text-teal transition-colors">Home</a>
            <i className="fa-solid fa-chevron-right text-[10px] text-teal" />
            <span className="text-teal">About</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-playfair text-4xl md:text-6xl text-warm-white font-bold"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section ref={storyRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image with floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=700&q=80"
                alt="Travelers exploring"
                className="w-full h-[420px] object-cover animate-float"
                style={{ animationDuration: "8s" }}
              />
            </div>
            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute -bottom-6 -right-4 md:-right-8 bg-teal text-navy rounded-2xl px-6 py-4 shadow-xl shadow-teal/20"
            >
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm font-medium opacity-80">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -top-4 -left-4 md:-left-6 bg-navy-light border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl"
            >
              <div className="text-xl font-bold text-gold">150+</div>
              <div className="text-xs text-warm-gray">Destinations</div>
            </motion.div>
          </motion.div>

          {/* Right: Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">Our Story</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3 mb-6">
              Connecting People with Extraordinary Experiences
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4">
              Trippy was born from a simple dream: make travel accessible, exciting, and unforgettable for everyone.
              Founded in 2020, we started as a small team of passionate travelers and tech innovators.
            </p>
            <p className="text-warm-gray leading-relaxed mb-6">
              Today, we connect thousands of adventurers with handpicked destinations, curated experiences,
              and premium accommodations across 150+ locations worldwide. Our team of expert travel consultants
              ensures every journey is seamless from booking to return.
            </p>
            <div className="flex gap-4">
              <div className="px-5 py-3 bg-teal/10 rounded-xl border border-teal/20">
                <div className="text-teal font-bold text-lg">24/7</div>
                <div className="text-warm-gray text-xs">Support</div>
              </div>
              <div className="px-5 py-3 bg-teal/10 rounded-xl border border-teal/20">
                <div className="text-teal font-bold text-lg">500+</div>
                <div className="text-warm-gray text-xs">Partners</div>
              </div>
              <div className="px-5 py-3 bg-teal/10 rounded-xl border border-teal/20">
                <div className="text-teal font-bold text-lg">4.9★</div>
                <div className="text-warm-gray text-xs">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 px-6 bg-navy-dark/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: "fa-solid fa-bullseye", title: "Our Mission",
              text: "To democratize travel by making world-class experiences accessible to everyone, powered by technology and driven by passion." },
            { icon: "fa-solid fa-eye", title: "Our Vision",
              text: "To become the world's most trusted travel companion — a platform where every journey begins with confidence and ends with unforgettable memories." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative rounded-2xl bg-navy-light border border-white/5 p-8 overflow-hidden
                hover:border-teal/30 transition-all duration-500 shadow-lg"
            >
              {/* Border gradient glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(0,201,167,0.05), transparent)" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-5
                  group-hover:bg-teal/20 transition-colors duration-300">
                  <i className={`${card.icon} text-teal text-xl`} />
                </div>
                <h3 className="text-warm-white font-bold text-xl mb-3">{card.title}</h3>
                <p className="text-warm-gray leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">By The Numbers</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3">
              Our Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 px-6 bg-navy-dark/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-teal font-semibold text-sm uppercase tracking-[3px]">Our Team</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-bold mt-3">
              Meet the Explorers
            </h2>
            <p className="text-warm-gray mt-3 max-w-lg mx-auto">
              Hover over each card to discover more about our passionate team
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
