import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";
import logo from "@/assets/logo-nav.png";

export function Reservation() {
  const whatsappUrl = `https://wa.me/${RESTAURANT.whatsappIntl}?text=${encodeURIComponent(
    "Hola, quiero encargar un pollo asado para recoger. ¿Me confirmáis hora de recogida?",
  )}`;

  return (
    <section id="reservas" className="bg-primary py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
        {/* TEXTO IZQUIERDA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <h2 className="text-[clamp(2.75rem,9vw,6.5rem)] text-cream">
            Encarga tu pollo
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-cream/80">
            Encarga con antelación y recógelo caliente a la hora que te venga
            bien. Para pedidos grandes, celebraciones o eventos, llámanos
            directamente.
          </p>
          <p className="mt-8 flex items-center gap-3 font-display text-2xl text-cream">
            <Phone className="h-6 w-6 text-secondary" />
            {RESTAURANT.phone}
          </p>
        </motion.div>

        {/* TARJETA WHATSAPP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center rounded-3xl bg-ink p-8 text-center md:col-span-6 md:col-start-7 md:p-10"
        >
          {/* LOGO */}
          <div className="relative">
            <img
              src={logo}
              alt="Virgen del Carmen"
              className="h-36 w-36 rounded-full md:h-44 md:w-44"
            />
            <span className="absolute right-2 bottom-2 h-6 w-6 rounded-full border-4 border-ink bg-emerald-500" />
          </div>

          <h3 className="mt-6 font-display text-2xl text-cream">
            Tu pedido, listo a tu hora
          </h3>
          <p className="mt-3 max-w-xs leading-relaxed text-cream/60">
            Escríbenos por WhatsApp, dinos qué quieres y a qué hora pasas a
            recogerlo. Sin esperas y recién asado.
          </p>

          {/* BOTÓN WHATSAPP */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-5 font-display text-xl tracking-tight text-secondary-foreground uppercase"
          >
            <MessageCircle className="h-6 w-6" />
            Encargar por WhatsApp
          </motion.a>
          <p className="mt-3 text-sm text-cream/50">{RESTAURANT.whatsapp}</p>
        </motion.div>
      </div>
    </section>
  );
}
