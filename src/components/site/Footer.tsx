import { Phone, MessageCircle } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";

const hours = [
  ["Martes – Domingo", "11:30 – 14:30 · 18:30 – 21:30"],
  ["Lunes", "Cerrado"],
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-ink pt-24 pb-10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <h2 className="text-[clamp(2rem,8vw,6.5rem)] text-cream/10">
          VIRGEN DEL CARMEN
        </h2>

        <div className="mt-12 grid gap-12 border-t border-cream/15 pt-12 md:grid-cols-4">
          <div>
            <h3 className="text-sm tracking-[0.3em] text-secondary uppercase">
              Dónde
            </h3>

            <p className="mt-4 leading-relaxed text-cream/70">
              {RESTAURANT.city}
              <br />
              España
            </p>

            <p className="mt-4 flex items-center gap-2 text-cream/70">
              <Phone className="h-4 w-4 text-secondary" />
              {RESTAURANT.phone}
            </p>
            <p className="flex items-center gap-2 text-cream/70">
              <MessageCircle className="h-4 w-4 text-secondary" />
              {RESTAURANT.whatsapp}
            </p>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.3em] text-secondary uppercase">
              Horarios
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              {hours.map(([d, h]) => (
                <li key={d}>
                  <span className="block font-semibold text-cream">{d}</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm tracking-[0.3em] text-secondary uppercase">
              Encargos
            </h3>
            <p className="mt-4 max-w-sm leading-relaxed text-cream/70">
              Encarga tu pollo asado por WhatsApp y recógelo caliente a la
              hora que te venga bien. También preparamos pedidos grandes para
              celebraciones y eventos.
            </p>
          </div>
        </div>

        <p className="mt-14 text-xs tracking-widest text-cream/35 uppercase">
          © {new Date().getFullYear()} Virgen del Carmen · Pollos Asados
        </p>
      </div>
    </footer>
  );
}
