import { motion } from "motion/react";
import kitchen from "@/assets/story-kitchen.jpg";

export function Story() {
  return (
    <section id="nosotros" className="bg-[#EDD3A8] py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-6"
        >
          <img
            src={kitchen}
            alt="Asador con pollos girando al carbón"
            loading="lazy"
            width={1024}
            height={1408}
            className="w-full rounded-3xl object-cover shadow-[0_30px_80px_-30px_rgba(43,20,12,0.5)] ring-8 ring-white"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-5 md:col-start-8"
        >
          <p className="mb-6 text-xs font-semibold tracking-[0.4em] text-primary uppercase">
            Nuestra historia
          </p>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] text-ink">
            El asador de <span className="text-fire">toda la vida</span>
          </h2>
          <p className="mt-6 leading-relaxed text-ink/70">
            En el Virgen del Carmen hacemos las cosas como siempre se han
            hecho: pollo marinado 12 horas, carbón encendido cada mañana y el
            asador girando sin parar para que recojas tu pollo recién hecho.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Sin atajos y sin prisas. Compramos pollo de calidad, lo asamos
            lentamente y lo servimos dorado, crujiente y jugoso. Si buscas el
            sabor del pollo asado de verdad, este es tu sitio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
