import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const Loading = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50
        overflow-hidden p-6 pointer-events-none ${isDarkMode ? "bg-black" : "bg-transparent"}`}
    >

      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 120, -120, 0],
          y: [0, -80, 80, 0],
          rotate: [0, 360],
        }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        style={{
          background: isDarkMode
            ? "conic-gradient(from 0deg, #ff6a00, #ff008c, #6900ff, #00eaff)"
            : "conic-gradient(from 0deg, #ff7b00, #ff3f9e, #7a00ff, #00c3ff)"
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-2xl opacity-30"
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 60, -60, 0],
          rotate: [0, -360],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, #ff008c, #6900ff, transparent)"
            : "radial-gradient(circle, #ff3f9e, #7a00ff, transparent)"
        }}
      />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`
          backdrop-blur-3xl rounded-4xl p-14 flex flex-col items-center relative z-10
          shadow-2xl border pointer-events-auto
          ${isDarkMode 
            ? "bg-white/5 border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)]"
            : "bg-white/50 border-gray-300 shadow-[0_0_60px_rgba(0,0,0,0.12)]"
          }
        `}
      >
        {/* Neon Rings */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <motion.div
            className="absolute w-44 h-44 rounded-full"
            style={{
              border: isDarkMode
                ? "5px solid rgba(255,255,255,0.15)"
                : "5px solid rgba(0,0,0,0.15)"
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          />

          <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-dashed"
            style={{
              borderColor: isDarkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />

          <motion.div
            className="absolute w-24 h-24 rounded-full"
            style={{
              background: isDarkMode
                ? "conic-gradient(#ff6a00, #ff008c, #6900ff, #00eaff)"
                : "conic-gradient(#ff7b00, #ff3f9e, #7a00ff, #00c3ff)"
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />

          <motion.div
            className={`
              w-14 h-14 rounded-full shadow-xl
              ${isDarkMode
                ? "bg-white/50 shadow-[0_0_30px_rgba(255,255,255,0.7)]"
                : "bg-gray-600/40 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
              }
            `}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.8, 0.3, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className={`
            mt-10 text-2xl tracking-widest font-bold
            ${isDarkMode 
              ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              : "text-gray-900 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            }
          `}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
