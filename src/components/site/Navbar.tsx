import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import logo from "@/assets/logo-nav.png";

const links = [
  { label: "Carta", href: "#menu" },
  { label: "Encargos", href: "#reservas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-cream/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-6 py-4 md:px-12">
        <div className="hidden gap-8 text-xs font-semibold tracking-[0.25em] text-ink uppercase md:flex">
          {links.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#top"
          className="col-start-1 flex items-center gap-3 justify-self-start md:col-start-2 md:justify-self-center"
        >
          <img
            src={logo}
            alt="Virgen del Carmen - Asador de Pollos"
            className="h-11 w-11 rounded-full md:h-14 md:w-14"
          />
          <span className="hidden font-display text-xl tracking-tight text-ink lg:block">
            VIRGEN <span className="text-primary">DEL CARMEN</span>
          </span>
        </a>

        <div className="hidden items-center justify-end gap-8 text-xs font-semibold tracking-[0.25em] text-ink uppercase md:flex">
          {links.slice(2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Pedido</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-cream">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: solo carrito */}
        <div className="col-start-3 flex justify-end md:hidden">
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-cream"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-cream">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
