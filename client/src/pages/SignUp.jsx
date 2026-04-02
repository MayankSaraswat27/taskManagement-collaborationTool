import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { User, Mail, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      navigate('/dashboard');
    }
  };

  const benefits = [
    'Unlimited tasks and projects',
    'Real-time collaboration',
    'Advanced analytics',
    'Priority support',
    'Custom workflows',
    'Mobile apps'
  ];

  return (
    <div className="min-h-screen flex">
      
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="w-full max-w-md">

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get started with your free account today
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <Input
              type="text"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={
                confirmPassword && password !== confirmPassword
                  ? "Passwords don't match"
                  : undefined
              }
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold">
                Sign in
              </Link>
            </p>

          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};