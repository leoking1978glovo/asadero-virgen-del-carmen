import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";

export function MapSection() {
  return (
    <section id="ubicacion" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] text-ink">
            Encuéntranos
          </h2>
          <p className="mt-2 flex items-center gap-2 text-base text-ink/60 md:text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            {RESTAURANT.city} — Recoge tu pedido caliente en tienda
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
        >
          <iframe
            src="https://maps.google.com/maps?q=Almer%C3%AD&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Ubicación Virgen del Carmen"
            className="h-[300px] w-full md:h-[450px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
