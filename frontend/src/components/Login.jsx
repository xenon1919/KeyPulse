/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Username and password are required!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        navigate("/manager");
      } else {
        toast.error("Invalid credentials!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error connecting to server!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-cream-100 text-charcoal-900 font-poppins">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Non-Fixed Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
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
              KeyPulse
            </h1>
            <p className="text-gray-500 mt-2">
              Secure your digital life with elegance
            </p>
          </motion.div>

          {/* Centered Form */}
          <div className="flex items-center justify-center">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-md border border-lavender-200 w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl font-semibold mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Login to KeyPulse
              </motion.h2>
              <motion.input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-3 mb-4 bg-cream-100 border border-gray-300 rounded-lg text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                type="text"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <motion.input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 mb-6 bg-cream-100 border border-gray-300 rounded-lg text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                type="password"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              <motion.button
                onClick={handleLogin}
                className="w-full bg-emerald-500 text-white font-medium py-3 rounded-lg hover:bg-emerald-400 transition-all flex justify-center items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  ></path>
                </svg>
                Login
              </motion.button>
              <motion.p
                className="text-center mt-4 text-gray-500"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                Don't have an account?{" "}
                <button
                  onClick={handleRegisterRedirect}
                  className="text-orange-500 hover:underline"
                >
                  Register
                </button>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
