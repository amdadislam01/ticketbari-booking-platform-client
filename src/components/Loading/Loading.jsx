// Loading.jsx
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-6">
      {/* Glass Card */}
      <div className="
        backdrop-blur-2xl
        bg-white/10
        border border-white/20
        shadow-[0_0_40px_rgba(255,255,255,0.1)]
        rounded-3xl
        p-12
        flex flex-col items-center
      ">
        
        {/* Neon Glowing Circle Loader */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>

          {/* Inner Pulsing Core */}
          <motion.div
            className="w-12 h-12 rounded-full bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.9, 0.4, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          ></motion.div>
        </motion.div>

        {/* Smooth Fade Text */}
        <motion.p
          className="text-white mt-6 text-xl tracking-widest font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
