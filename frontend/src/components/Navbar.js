import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/* ──────────────── NAV ITEMS ──────────────── */
const navItems = [
  { title: "Home", url: "/", icon: "fa-solid fa-house" },
  { title: "About", url: "/about", icon: "fa-solid fa-circle-info" },
  { title: "Service", url: "/service", icon: "fa-solid fa-briefcase" },
  { title: "Contact", url: "/contact", icon: "fa-solid fa-address-book" },
];

/* ──────────────── NAVBAR LINK ──────────────── */
function NavLink({ item, isActive, onClick }) {
  return (
    <Link
      to={item.url}
      onClick={onClick}
      className="relative group px-4 py-2 text-sm font-medium transition-colors duration-300"
    >
      {/* Text */}
      <span
        className={`flex items-center gap-2 transition-colors duration-300 ${
          isActive
            ? "text-teal"
            : "text-warm-white/70 group-hover:text-warm-white"
        }`}
      >
        <i className={`${item.icon} text-xs`} />
        {item.title}
      </span>

      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-teal rounded-full transition-all duration-300 ease-out ${
          isActive
            ? "w-3/4 opacity-100"
            : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

/* ──────────────── MAIN NAVBAR ──────────────── */
function NavbarInner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* Scroll listener — flips scrolled state at 50px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (url) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  /* ──── Framer Motion variants ──── */
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.08 * i, duration: 0.35, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ease-out ${
          scrolled
            ? "bg-navy/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-lg shadow-teal/20"
            >
              <i className="fa-solid fa-paper-plane text-white text-sm" />
            </motion.div>
            <span className="text-xl font-bold font-playfair text-warm-white tracking-wide group-hover:text-teal transition-colors duration-300">
              Trippy
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.url} item={item} isActive={isActive(item.url)} />
            ))}

            {isAdmin() && (
              <NavLink
                item={{ title: "Admin", url: "/admin", icon: "fa-solid fa-shield-halved" }}
                isActive={isActive("/admin")}
              />
            )}

            {/* ── Auth button ── */}
            {isLoggedIn() ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-teal to-teal-dark text-navy
                  shadow-lg shadow-teal/20 hover:shadow-teal/40
                  transition-shadow duration-300 cursor-pointer"
              >
                Logout {user?.name ? `(${user.name})` : ""}
              </motion.button>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-5 py-2 rounded-full text-sm font-semibold
                    bg-gradient-to-r from-teal to-teal-dark text-navy
                    shadow-lg shadow-teal/20 hover:shadow-teal/40
                    transition-shadow duration-300 cursor-pointer"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[1001] cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-warm-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2px] bg-warm-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-warm-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[998] bg-navy/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.url}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.url}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-playfair font-semibold tracking-wide transition-colors duration-300 flex items-center gap-3 ${
                      isActive(item.url)
                        ? "text-teal"
                        : "text-warm-white/70 hover:text-warm-white"
                    }`}
                  >
                    <i className={`${item.icon} text-lg`} />
                    {item.title}
                    {isActive(item.url) && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className="w-2 h-2 rounded-full bg-teal"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}

              {isAdmin() && (
                <motion.li
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-playfair font-semibold tracking-wide transition-colors duration-300 flex items-center gap-3 ${
                      isActive("/admin")
                        ? "text-teal"
                        : "text-warm-white/70 hover:text-warm-white"
                    }`}
                  >
                    <i className="fa-solid fa-shield-halved text-lg" />
                    Admin
                  </Link>
                </motion.li>
              )}

              {/* Auth button */}
              <motion.li
                custom={navItems.length + 1}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                {isLoggedIn() ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="px-8 py-3 rounded-full text-base font-semibold
                      bg-gradient-to-r from-teal to-teal-dark text-navy
                      shadow-lg shadow-teal/20 cursor-pointer"
                  >
                    Logout {user?.name ? `(${user.name})` : ""}
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <button
                      className="px-8 py-3 rounded-full text-base font-semibold
                        bg-gradient-to-r from-teal to-teal-dark text-navy
                        shadow-lg shadow-teal/20 cursor-pointer"
                    >
                      Login
                    </button>
                  </Link>
                )}
              </motion.li>
            </ul>

            {/* Decorative blurred circles */}
            <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-teal/5 blur-3xl pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarInner;
