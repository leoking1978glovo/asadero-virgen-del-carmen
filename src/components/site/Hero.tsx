import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/virgen-del-carmen-logo.png";
import { RESTAURANT } from "@/data/restaurant";

const words = ["Pollo asado", "al carbón"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-cream pt-28 pb-16 md:pt-32"
    >
      {/* Resplandores cálidos */}
      <div className="absolute -top-40 right-0 h-[60vh] w-[50vw] rounded-full bg-secondary/30 blur-[140px]" />
      <div className="absolute -bottom-20 -left-20 h-[40vh] w-[40vw] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 md:grid-cols-12 md:px-12">
        {/* TEXTO */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-8"
          >
            <img
              src={logo}
              alt="Virgen del Carmen - Asador de Pollos"
              className="h-32 w-auto md:h-44 drop-shadow-[0_10px_30px_rgba(121,33,8,0.25)]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-6 text-xs font-semibold tracking-[0.4em] text-primary uppercase"
          >
            Brasa de verdad · Sabor de siempre
          </motion.p>

          <h1 className="max-w-[14ch] text-[clamp(3.5rem,10vw,8.5rem)] text-ink">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: "60%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 * i + 0.3,
                  duration: 0.7,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className={`mr-4 inline-block ${i === 1 ? "text-fire" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
          >
            Pollo marinado 12 horas y asado lentamente al carbón, dorado y
            jugoso, listo para llevar. Encarga por WhatsApp y recógelo
            caliente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#reservas"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{
                scale: {
                  delay: 1.4,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 font-display text-lg tracking-tight text-primary-foreground uppercase shadow-[var(--shadow-fire)]"
            >
              Encargar pollo
              <span aria-hidden>→</span>
            </motion.a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/20 px-8 py-4 font-display text-lg tracking-tight text-ink uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Ver la carta
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-semibold text-ink/70"
          >
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {RESTAURANT.phone}
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              {RESTAURANT.whatsapp}
            </span>
          </motion.div>
        </div>

        {/* FOTO */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative md:col-span-5"
        >
          <img
            src={heroBg}
            alt="Pollos asándose al carbón"
            width={2048}
            height={1152}
            className="w-full rounded-[2rem] object-cover shadow-[0_30px_80px_-20px_rgba(43,20,12,0.5)] ring-8 ring-white"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
            className="absolute -top-6 -left-6 flex h-28 w-28 rotate-[-10deg] items-center justify-center rounded-full bg-secondary text-center font-display text-sm leading-tight text-ink uppercase shadow-lg md:h-32 md:w-32 md:text-base"
          >
            ¡Recién
            <br />
            hecho!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
