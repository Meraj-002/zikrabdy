import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, memo, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

const DecorativeSparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform"
    style={{ left, top }}
    animate={{ y: [0, -15, 0], opacity: [0.2, 0.35, 0.2] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/30" />
  </motion.div>
));

DecorativeSparkle.displayName = "DecorativeSparkle";

const StorySection = memo(({ item, index, total }: { item: any; index: number; total: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" });
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 md:px-6 relative"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(2)].map((_, i) => (
          <DecorativeSparkle key={i} delay={i} left={`${30 + i * 40}%`} top={`${20 + i * 30}%`} />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className={cn(
          "max-w-6xl w-full grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10 will-change-transform",
          !isEven && "md:grid-flow-dense"
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={cn("space-y-4 sm:space-y-6", !isEven && "md:col-start-2")}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full text-rose-600 font-handwriting text-sm md:text-base shadow-sm border border-pink-200/50"
          >
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-rose-400" />
            Chapter {index + 1} of {total}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-700 via-pink-600 to-purple-600 leading-tight"
          >
            {item.title}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-body leading-relaxed md:leading-loose"
          >
            {item.content}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-2 text-pink-400/50"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-pink-300/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-pink-300/50 to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn("relative group w-full", !isEven && "md:col-start-1")}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <motion.div
            animate={{ rotate: isImageHovered ? 4 : 2, scale: isImageHovered ? 1.01 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl sm:rounded-3xl shadow-md will-change-transform"
          />

          <motion.div
            animate={{ rotate: isImageHovered ? -2 : -1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="absolute inset-0 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-2xl sm:rounded-3xl shadow-sm will-change-transform"
          />

          <motion.div
            animate={{ y: isImageHovered ? -6 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white overflow-hidden aspect-[4/3] will-change-transform"
          >
            {item.imageUrl ? (
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
style={{ objectPosition: item.objectPosition || "center" }}
                animate={{ scale: isImageHovered ? 1.03 : 1 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <span className="text-4xl sm:text-6xl md:text-8xl">❤️</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

StorySection.displayName = "StorySection";

export default function Story() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const sortedStory = [
  {
    id: 1,
    title: "The Wedding Day",
    content:
      "It all started at someone brother’s wedding. You were there, and at the end, our eyes met for a moment. That one eye contact stayed in my heart. Without even talking much, I started feeling something special for you.",
    imageUrl:
      "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777041342/IMG_20260424_181730_002.jpg_espmke.jpg",
    objectPosition: "center",
    order: 1,
  },
  {
    id: 2,
    title: "The Silent Feelings",
    content:
      "We did not message each other at first, but our numbers were exchanged that day. For months, I quietly loved seeing your WhatsApp status. I may not have said anything, but my heart was already connected to you.",
    imageUrl:
      "https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777041343/IMG_20260424_200208_303_v9xbhq.png",
    objectPosition: "top",
    order: 2,
  },
  {
    id: 3,
    title: "Where Our Journey Began",
    content:
      "After 9–10 months, I reacted with a sad emoji on your status. You asked me, “Why are you crying?” That one question started our journey. From that day, everything changed beautifully.",
    imageUrl:
      "https://res.cloudinary.com/dfhiyvm2x/image/upload/c_fill,ar_3:4/v1777041342/IMG_20260415_160210_263.jpg_xeoyaf.jpg",
    objectPosition: "top",
    order: 3,
  },
];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent pointer-events-none" />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-[100px] will-change-transform"
      />

      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header ref={headerRef} className="text-center py-12 sm:py-16 md:py-24 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 15px rgba(244, 114, 182, 0.08)",
                  "0 0 20px rgba(244, 114, 182, 0.12)",
                  "0 0 15px rgba(244, 114, 182, 0.08)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
            >
              Our Beautiful Story
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              This birthday, I want to remind you how beautifully our story began.
            </motion.p>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400/50 fill-pink-300/50" />
            ))}
          </div>
        </header>

        <div className="space-y-0">
          {sortedStory.map((segment, idx) => (
            <StorySection key={segment.id} item={segment} index={idx} total={sortedStory.length} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-32 px-4 relative"
        >
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center">
            <p className="font-handwriting text-lg sm:text-xl md:text-2xl mb-3 text-pink-600">
              And today, on your birthday, I just want to say...
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 italic max-w-2xl mx-auto">
              Happy Birthday to the girl I met by chance, loved in silence, and now dream to marry.
            </p>

            <Link href="/memories">
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden will-change-transform touch-manipulation"
              >
                <span className="relative flex items-center gap-2 sm:gap-3">
                  See Your Surprise
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </motion.button>
            </Link>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 italic">
              Our story is my favorite gift.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}