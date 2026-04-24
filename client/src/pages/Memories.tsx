import { useMemories } from "@/hooks/use-memories";
import { PolaroidCard } from "@/components/PolaroidCard";
import { Loader2, Heart, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, memo } from "react";

// Memoized loading spinner
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="will-change-transform"
    >
      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-4 sm:mt-6 font-handwriting text-lg sm:text-xl text-pink-600"
    >
      Loading our precious moments...
    </motion.p>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

// Memoized decorative sparkle
const DecorativeSparkle = memo(({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    className="absolute will-change-transform pointer-events-none"
    style={{
      left: `${15 + index * 20}%`,
      top: `${10 + (index % 3) * 25}%`,
    }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.15, 0.3, 0.15],
      scale: [0.9, 1, 0.9],
    }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/40" />
  </motion.div>
));

DecorativeSparkle.displayName = "DecorativeSparkle";

export default function Memories() {
  const { data: memories, isLoading } = useMemories();

  // Instant scroll reset
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Placeholder data if empty
  const displayMemories = (memories && memories.length > 0) ? memories : [
    {
      id: 1,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777042012/IMG_20260424_201405_754.jpg_u9mdrj.jpg",
      type: "image",
      caption: "The smile I fell for",
      date: "The reason behind my happiness",
      rotation: -2
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777042011/b53423b9-1300-4516-ab35-6c00aec71951_tkqigh.jpg",
      type: "image",
      caption: "Perfect without trying",
      date: "Like an angel",
      rotation: 3
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777042070/IMG_20260424_201729_095.jpg_fbdxnp.jpg",
      type: "image",
      caption: "The cutest version of you",
      date: "Feels like a beautiful dream",
      rotation: -4
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777042012/IMG_20260424_201441_855.jpg_zsfkwd.jpg",
      type: "image",
      caption: "Lost in your beauty",
      date: "You’re my favorite view",
      rotation: 2
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777041343/IMG_20260424_200201_056_k358qy.png",
      type: "image",
      caption: "My dream girl",
      date: "I could look at you forever",
      rotation: 5
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777042012/IMG_20260424_201508_439.jpg_c7alpi.jpg",
      type: "image",
      caption: "How are you this beautiful?",
      date: "Too beautiful to be real",
      rotation: -3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Simplified background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Single optimized glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-r from-pink-300/25 to-purple-300/25 rounded-full blur-[100px] will-change-transform"
      />

      {/* Reduced floating sparkles - only 4 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <DecorativeSparkle key={i} delay={i * 0.5} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Top decorative element - simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 15px rgba(244, 114, 182, 0.1)",
                  "0 0 22px rgba(244, 114, 182, 0.15)",
                  "0 0 15px rgba(244, 114, 182, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
            >
              Moments of You ❤️
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              I may not have memories with you yet, but I have these moments of you.
            </motion.p>
          </motion.div>

          {/* Simplified heart decoration - only 3 hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="will-change-transform"
              >
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400/50 fill-pink-300/50" />
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        {/* Optimized Memory Grid - mobile-first responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-24"
        >
          {displayMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px", amount: 0.1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <PolaroidCard memory={memory} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16 relative"
        >
          {/* Simplified background glow */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.1, 0.18, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[60px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-handwriting text-lg sm:text-xl md:text-2xl text-pink-600 px-4"
            >
              Ready for the grand finale?
            </motion.p>

            <Link href="/surprise">
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden will-change-transform touch-manipulation"
              >
                {/* Simplified glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />

                <span className="relative flex items-center gap-2 sm:gap-3">
                  Continue the Journey
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="will-change-transform"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 italic px-4"
            >
              The best is yet to come ♡
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}