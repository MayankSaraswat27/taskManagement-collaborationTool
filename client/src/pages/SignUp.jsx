import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const benefits = [
    "Unlimited tasks and projects",
    "Real-time collaboration",
    "Advanced analytics",
    "Priority support",
    "Custom workflows",
    "Mobile apps",
  ];

  return (
    <div className="min-h-screen flex">

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-700 hover:text-blue-600"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* LEFT SIDE (UNCHANGED ORIGINAL STYLE) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-orange-600 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start w-full p-12 text-white">

          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Start Your Journey
          </motion.h1>

          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/90 mb-12 max-w-md"
          >
            Join thousands of teams already using Trackify to boost their productivity
          </motion.p>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 w-full max-w-md"
          >
            <h3 className="text-2xl font-bold mb-6">What you'll get:</h3>

            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3"
              >
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE (FIXED INPUTS) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold mb-6">Create Account</h2>

          {success && (
            <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center">
              Account created successfully 🎉
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-lg peer focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm">
                Full Name
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-lg peer focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm">
                Email Address
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-lg peer focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm">
                Password
              </label>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-lg peer focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm">
                Confirm Password
              </label>
            </div>

            <Button type="submit" className="w-full">
              {success ? "Creating..." : "Create Account"}
            </Button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};