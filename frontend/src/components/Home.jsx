/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 font-poppins">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4 flex justify-center items-center gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.svg
            className="w-10 h-10 text-emerald-500"
            fill="url(#pulse-gradient)"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
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
          </motion.svg>
          Welcome to KeyPulse
        </motion.h1>
        <motion.p
          className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Discover the most elegant way meridional secure your passwords.
          KeyPulse combines vibrant design with robust protection for your
          digital world.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            to="/manager"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-emerald-400 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.376 1 1.723V15a1 1 0 001 1h4a1 1 0 001-1v-2.277c.598-.347 1-.985 1-1.723 0-1.104-.896-2-2-2s-2 .896-2 2m-2 0h4"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 7V5a5 5 0 0110 0v2m-2 14H9a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
              ></path>
            </svg>
            Explore the Vault
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
