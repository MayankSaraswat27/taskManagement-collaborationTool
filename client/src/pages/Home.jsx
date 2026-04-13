import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
  Zap,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Flag
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

export const Home = () => {
  const features = [
    {
      icon: Target,
      title: 'Drag & Drop Tasks',
      description: 'Effortlessly organize your work with intuitive drag-and-drop functionality',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together seamlessly with your team in real-time',
      gradient: 'from-orange-400 to-pink-500'
    },
    {
      icon: Flag,
      title: 'Priority Labels',
      description: 'Color-coded priority system to keep your focus on what matters most',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Smart Organization',
      description: 'Intelligent task categorization and progress tracking',
      gradient: 'from-purple-500 to-violet-500'
    }
  ];

  const workingSteps = [
    { step: 1, title: 'Add Task', description: 'Create and organize your tasks', icon: Sparkles },
    { step: 2, title: 'Move Cards', description: 'Drag tasks across columns', icon: ArrowRight },
    { step: 3, title: 'Track Progress', description: 'Monitor your workflow', icon: TrendingUp },
    { step: 4, title: 'Complete', description: 'Celebrate achievements', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Organize Work.
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Collaborate Better.
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Achieve More.
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform the way you manage tasks with our beautifully designed, intuitive platform.
              Built for teams who want to get things done without the hassle.
            </p>

            <div className="flex justify-center">
              <Link to="/login">
                <Button variant="primary" size="lg">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-20 relative"
            >
              {/* PREVIEW */}
<div className="mt-16 bg-white p-10 rounded-2xl shadow-xl">
  <div className="grid md:grid-cols-3 gap-10 text-center">

    {[
      { label: "To Do", value: 60, color: "#f97316" },
      { label: "In Progress", value: 45, color: "#ec4899" },
      { label: "Done", value: 82, color: "#0ea5e9" },
    ].map((item, index) => {
      const angle = item.value * 3.6;

      return (
        <div key={index} className="flex flex-col items-center">

          {/* Circle */}
          <div
            className="relative w-40 h-40 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(${item.color} ${angle}deg, #e5e7eb ${angle}deg)`
            }}
          >
            {/* Inner white circle */}
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="text-2xl font-bold text-gray-700">
                {item.value}%
              </span>
            </div>
          </div>

          {/* Label */}
          <h3 className="mt-6 font-semibold text-black uppercase tracking-wide">
            {item.label}
          </h3>

          

        </div>
        
      );
    })}

  
</div>
</div>
   </motion.div>
   
        </motion.div>
</div>
      </section>
      

      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to supercharge your productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{
                    background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="working" className="py-20 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Simple, intuitive, and powerful workflow
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {workingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

   <section className="py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Ready to boost your productivity?
      </h2>

      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Join thousands of teams already using Trackify
      </p>

      <div className="flex justify-center">
        <Link to="/signup">
          <Button variant="primary" size="lg">
            Start Free Today <Zap className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  </div>
</section>

      <Footer />
    </div>
  );
};
export default Home;