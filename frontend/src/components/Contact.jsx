/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 font-poppins">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 flex justify-center items-center gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.svg
            className="w-8 h-8 text-emerald-500"
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
          Contact KeyPulse
        </motion.h1>
        <motion.div
          className="max-w-3xl mx-auto text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="mb-4">
            Have a question or need assistance? Reach out to the KeyPulse team,
            and we’ll get back to you with a smile.
          </p>
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md border border-lavender-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-charcoal-900">
              Get in Touch
            </h2>
            <p className="mb-2">
              <strong>Email:</strong> support@keypulse.app
            </p>
            <p className="mb-4">
              <strong>X:</strong>{" "}
              <motion.a
                href="https://x.com/keypulse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                @keypulse
              </motion.a>
            </p>
            <p>
              We strive to respond within 24 hours. Thank you for choosing
              KeyPulse!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
