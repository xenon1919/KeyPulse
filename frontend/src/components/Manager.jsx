/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    id: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchPasswords();
    }
  }, [token, navigate]);

  const fetchPasswords = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/passwords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPasswordArray(data);
      } else {
        toast.error("Failed to fetch passwords!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
      }
    } catch (error) {
      toast.error("Error connecting to server!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        const method = form.id ? "PUT" : "POST";
        const url = form.id
          ? `http://localhost:3000/api/passwords/${form.id}`
          : "http://localhost:3000/api/passwords";
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          const { password } = await response.json();
          let updatedArray;
          if (form.id) {
            updatedArray = passwordArray.map((item) =>
              item.id === form.id ? { ...form } : item
            );
          } else {
            updatedArray = [
              ...passwordArray,
              password || { ...form, id: uuidv4() },
            ];
          }
          setPasswordArray(updatedArray);
          setForm({ site: "", username: "", password: "", id: "" });
          toast.success(form.id ? "Password updated!" : "Password saved!", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        } else {
          toast.error("Failed to save password!", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
          if (response.status === 401 || response.status === 403) {
            handleLogout();
          }
        }
      } catch (error) {
        toast.error("Error connecting to server!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    } else {
      toast.error("Fields need 4+ characters!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const deletePassword = async (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/passwords/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const updatedArray = passwordArray.filter((item) => item.id !== id);
          setPasswordArray(updatedArray);
          toast.success("Password deleted!", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        } else {
          toast.error("Failed to delete password!", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
          if (response.status === 401 || response.status === 403) {
            handleLogout();
          }
        }
      } catch (error) {
        toast.error("Error connecting to server!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setPasswordArray([]);
    setForm({ site: "", username: "", password: "", id: "" });
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-cream-100 text-charcoal-900 font-poppins">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
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

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-lavender-200 flex flex-col gap-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-end">
              <motion.button
                onClick={handleLogout}
                className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-400 transition-all flex items-center gap-2"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </motion.button>
            </div>
            <motion.input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="w-full p-3 mb-4 bg-cream-100 border border-gray-300 rounded-lg text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              type="text"
              name="site"
              id="site"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <motion.input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full p-3 bg-cream-100 border border-gray-300 rounded-lg text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                type="text"
                name="username"
                id="username"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <div className="relative w-full">
                <motion.input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-3 bg-cream-100 border border-gray-300 rounded-lg text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
                <motion.button
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                      ></path>
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
            <motion.button
              onClick={savePassword}
              className="mt-6 w-full bg-emerald-500 text-white font-medium py-3 rounded-lg hover:bg-emerald-400 transition-all flex justify-center items-center gap-2"
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
                  d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.376 1 1.723V15a1 1 0 001 1h4a1 1 0 001-1v-2.277c.598-.347 1-.985 1-1.723 0-1.104-.896-2-2-2s-2 .896-2 2m-2 0h4"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7V5a5 5 0 0110 0v2m-2 14H9a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
                ></path>
              </svg>
              {form.id ? "Update Password" : "Lock it Down!"}
            </motion.button>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md border border-lavender-200"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Password Vault</h2>
            {passwordArray.length === 0 ? (
              <p className="text-gray-500">No passwords saved yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-lavender-100">
                    <tr>
                      <th className="py-3 px-4 text-charcoal-900">Website</th>
                      <th className="py-3 px-4 text-charcoal-900">Username</th>
                      <th className="py-3 px-4 text-charcoal-900">Password</th>
                      <th className="py-3 px-4 text-charcoal-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passwordArray.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        className="border-b border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:underline"
                            >
                              {item.site}
                            </a>
                            <motion.button
                              onClick={() => copyText(item.site)}
                              className="text-gray-500 hover:text-orange-500 transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
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
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{item.username}</span>
                            <motion.button
                              onClick={() => copyText(item.username)}
                              className="text-gray-500 hover:text-orange-500 transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
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
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{"•".repeat(item.password.length)}</span>
                            <motion.button
                              onClick={() => copyText(item.password)}
                              className="text-gray-500 hover:text-orange-500 transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
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
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <motion.button
                            onClick={() => editPassword(item.id)}
                            className="text-gray-500 hover:text-emerald-500 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828l-5.657 1.414 1.414-5.657L18.586 2.586z"
                              ></path>
                            </svg>
                          </motion.button>
                          <motion.button
                            onClick={() => deletePassword(item.id)}
                            className="text-gray-500 hover:text-emerald-500 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2h8a2 2 0 00-2-2m-4 0a2 2 0 00-2 2m-2 0h8"
                              ></path>
                            </svg>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Manager;
