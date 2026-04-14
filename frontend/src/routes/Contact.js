import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ───── Contact info data ───── */
const contactInfo = [
  { icon: "fa-solid fa-location-dot", title: "Address", lines: ["123 Travel Street", "Mumbai, Maharashtra 400001"] },
  { icon: "fa-solid fa-phone", title: "Phone", lines: ["+91 98765 43210", "+91 12345 67890"] },
  { icon: "fa-solid fa-envelope", title: "Email", lines: ["info@trippy.com", "support@trippy.com"] },
  { icon: "fa-solid fa-clock", title: "Working Hours", lines: ["Mon – Fri: 9 AM – 8 PM", "Sat – Sun: 10 AM – 6 PM"] },
];

/* ───── Social links ───── */
const socials = [
  { icon: "fa-brands fa-instagram", label: "Instagram", color: "hover:text-pink-400" },
  { icon: "fa-brands fa-facebook-f", label: "Facebook", color: "hover:text-blue-400" },
  { icon: "fa-brands fa-twitter", label: "Twitter", color: "hover:text-sky-400" },
  { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", color: "hover:text-blue-500" },
];

/* ───── Floating label input ───── */
function FloatingInput({ name, type = "text", value, onChange, required = true }) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={`contact-${name}`}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl
          text-warm-white text-sm outline-none
          focus:border-teal/50 focus:ring-2 focus:ring-teal/20
          transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={`contact-${name}`}
        className={`absolute left-4 transition-all duration-300 pointer-events-none text-warm-gray
          ${hasValue ? "top-2 text-[11px] text-teal" : "top-4 text-sm"}
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-teal`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ name, value, onChange, required = true }) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <textarea
        name={name}
        id={`contact-${name}`}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl
          text-warm-white text-sm outline-none resize-none
          focus:border-teal/50 focus:ring-2 focus:ring-teal/20
          transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={`contact-${name}`}
        className={`absolute left-4 transition-all duration-300 pointer-events-none text-warm-gray
          ${hasValue ? "top-2 text-[11px] text-teal" : "top-4 text-sm"}
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-teal`}
      >
        {label}
      </label>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════ */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(""); // idle, loading, success, error
  const [statusMsg, setStatusMsg] = useState("");
  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setStatusMsg("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 4000);
      } else {
        setStatus("error");
        setStatusMsg(data.message || "Something went wrong");
        setTimeout(() => setStatus(""), 4000);
      }
    } catch {
      setStatus("error");
      setStatusMsg("Could not connect to server. Please try again.");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <div className="bg-navy min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 mx-auto rounded-2xl bg-teal/20 backdrop-blur-xl flex items-center justify-center mb-5"
          >
            <i className="fa-solid fa-location-dot text-teal text-2xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-playfair text-4xl md:text-6xl text-warm-white font-bold"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-warm-gray mt-3"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT SECTION (split layout) ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
          {/* LEFT – Info Cards */}
          <div ref={infoRef} className="md:col-span-2 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-navy-light/60 border border-white/5
                  hover:border-teal/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex-shrink-0 flex items-center justify-center
                  group-hover:bg-teal/20 transition-colors duration-300">
                  <i className={`${info.icon} text-teal`} />
                </div>
                <div>
                  <h4 className="text-warm-white font-semibold text-sm mb-1">{info.title}</h4>
                  {info.lines.map((line, li) => (
                    <p key={li} className="text-warm-gray text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-4"
            >
              <p className="text-warm-gray text-sm mb-3">Follow us</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10
                      flex items-center justify-center text-warm-gray
                      hover:bg-white/10 hover:border-teal/30 ${s.color}
                      transition-all duration-300`}
                    aria-label={s.label}
                  >
                    <i className={s.icon} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT – Glassmorphism Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-warm-white font-bold text-xl mb-1">Send us a message</h3>
              <p className="text-warm-gray text-sm mb-6">Fill out the form and we'll respond within 24 hours</p>

              {/* Status messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-4 p-4 rounded-xl bg-teal/10 border border-teal/20 flex items-center gap-3"
                  >
                    <motion.i
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 360] }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="fa-solid fa-circle-check text-teal text-lg"
                    />
                    <span className="text-teal text-sm font-medium">{statusMsg}</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-circle-exclamation text-red-400 text-lg" />
                    <span className="text-red-400 text-sm font-medium">{statusMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput name="name" value={formData.name} onChange={handleChange} />
                  <FloatingInput name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <FloatingInput name="subject" value={formData.subject} onChange={handleChange} />
                <FloatingTextarea name="message" value={formData.message} onChange={handleChange} />

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2
                    transition-all duration-300 cursor-pointer border-none ${
                      status === "loading"
                        ? "bg-teal/50 text-navy/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal to-teal-dark text-navy shadow-lg shadow-teal/20 hover:shadow-teal/40"
                    }`}
                >
                  {status === "loading" ? (
                    <>
                      <motion.i
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="fa-solid fa-spinner"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            title="Trippy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160984904!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000000"
            width="100%"
            height="350"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
            allowFullScreen=""
            loading="lazy"
          />
          {/* Map overlay card */}
          <div className="absolute top-6 left-6 bg-navy/90 backdrop-blur-xl rounded-xl border border-white/10 p-5 shadow-xl max-w-xs">
            <h4 className="text-warm-white font-bold mb-1">Trippy HQ</h4>
            <p className="text-warm-gray text-sm leading-relaxed">
              123 Travel Street, Mumbai,<br />Maharashtra 400001, India
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
