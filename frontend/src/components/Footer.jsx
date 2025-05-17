/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-white text-gray-500 font-poppins py-6 border-t border-lavender-200"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-2">
        <motion.div
          className="text-xl font-bold flex items-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <svg
            className="w-5 h-5 text-emerald-500"
            fill="url(#pulse-gradient)"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="pulse-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" style={{ stopColor: "#2ECC71" }} />
                <stop offset="100%" style={{ stopColor: "#FF7F50" }} />
              </linearGradient>
            </defs>
            <path d="M12 4c-1.1 0-2 .9-2 2v2h-2v2h2v2h-2v2h2v6c0 1.1.9 2 2 2s2-.9 2-2v-6h2v-2h-2v-2h2V8h-2V6c0-1.1-.9-2-2-2zm0 2v2h2v2h-2v2h2v2h-2v6h-2v-6h2v-2h-2v-2h2V8h-2V6h2z"></path>
          </svg>
          KeyPulse
        </motion.div>
        <div className="flex items-center gap-2">
          Crafted with
          <motion.svg
            className="w-5 h-5 text-orange-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <path d="M11.999 4.5c-2.586 0-4.686 2.1-4.686 4.686 0 2.586 2.1 4.686 4.686 4.686 1.294 0 2.473-.525 3.328-1.374l.001-.001c.849-.849 1.374-2.028 1.374-3.322 0-2.586-2.1-4.686-4.686-4.686zm0 7.686c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm7.06-1.06c-.586-.586-1.535-.586-2.121 0l-4.939 4.939-4.939-4.939c-.586-.586-1.535-.586-2.121 0-.586.586-.586 1.535 0 2.121l6 6c.293.293.677.439 1.061.439s.768-.146 1.061-.439l6-6c.586-.586.586-1.535 0-2.121z"></path>
          </motion.svg>
          by KeyPulse
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
