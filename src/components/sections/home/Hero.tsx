import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroData } from "../../../constantData/ConstantData";
const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gray-900 pt-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587559070757-f72a388edbba')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
            AI-Powered Pet Care Excellence
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your pet&apos;s care journey with personalized AI
            recommendations, expert grooming services, and comprehensive health
            monitoring.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              to="/services"
              className="px-8 py-3 rounded-lg border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HeroData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
