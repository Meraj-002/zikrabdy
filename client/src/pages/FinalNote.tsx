import { useConfig } from "@/hooks/use-config";
import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { Loader2, Heart, Sparkles, Feather } from "lucide-react";
import { usePartner } from "@/hooks/use-partner";

const LoadingScreen = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <Loader2 className="w-12 h-12 animate-spin text-pink-400" />
    <p className="mt-4 font-handwriting text-xl text-pink-600">
      Preparing something special for you...
    </p>
  </div>
));

export default function FinalNote() {
  const { isLoading } = useConfig();
  const { name } = usePartner();

  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const fullText = `Happy Birthday, my love.

I may not be there with you today,
but my heart is celebrating you from here.

From that one eye contact
to everything we are today,
you became my favorite person,
my peace, my happiness.

And this chocolate…
is just a small way to remind you
how special you are to me.

I’m really lucky to have you ❤️`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i >= fullText.length) {
        clearInterval(timer);
        setDone(true);
        return;
      }
      setText(fullText.slice(0, i + 1));
      i++;
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">

      <div className="w-full max-w-3xl">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-pink-200 p-6 sm:p-10 md:p-14 relative"
        >

          {/* HEADER */}
          <div className="text-center space-y-4 mb-8">
            <Feather className="mx-auto text-amber-500" />

            <h1 className="text-3xl md:text-4xl font-handwriting bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text">
              Happy Birthday {name || "My Love"}
            </h1>

            <div className="flex justify-center items-center gap-2">
              <div className="h-px w-10 bg-pink-300" />
              <Heart className="text-pink-500 fill-pink-400 w-4 h-4" />
              <div className="h-px w-10 bg-pink-300" />
            </div>
          </div>

          {/* TEXT */}
          <p className="text-center text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
            {text}
            {!done && <span className="animate-pulse">|</span>}
          </p>

          {/* CHOCOLATE IMAGE */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex justify-center"
            >
              <img
                src="https://res.cloudinary.com/dfhiyvm2x/image/upload/v1777050225/WhatsApp_Image_2026-04-24_at_10.33.30_PM_xrntiz.jpg"   // 👉 PUT YOUR IMAGE HERE
                alt="gift"
                className="rounded-xl shadow-lg max-w-[280px] sm:max-w-sm"
              />
            </motion.div>
          )}

          {/* SIGNATURE */}
          {done && (
            <div className="mt-10 text-right space-y-2">
              <p className="text-xl font-handwriting text-rose-600">
                Always Yours ❤️
              </p>
              <p className="text-sm text-gray-400 italic">
                Birthday 25th April{new Date().getFullYear()}
              </p>
            </div>
          )}

        </motion.div>

        {/* FINAL MESSAGE */}
        {done && (
          <div className="text-center mt-6">
            <p className="text-pink-600 font-handwriting text-lg animate-pulse">
              Happy Birthday, meri jaan ♡
            </p>
          </div>
        )}

      </div>
    </div>
  );
}