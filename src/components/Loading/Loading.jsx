// Loading.jsx
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 flex flex-col items-center">

        {/* Glowing Circle Animation */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
        >
          {/* Inner Pulse */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white/40"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          ></motion.div>
        </motion.div>

        {/* Smooth Text Animation */}
        <motion.p
          className="text-white mt-6 text-lg tracking-wide font-medium"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
