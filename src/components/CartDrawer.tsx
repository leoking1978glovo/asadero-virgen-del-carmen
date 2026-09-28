import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ChefHat,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalPrice,
    clearCart,
  } = useCart();

  const handlePedirAhora = () => {
    if (items.length === 0) return;

    const lines = items.map(
      (item) =>
        `- ${item.name} x${item.quantity} = ${(item.priceValue * item.quantity)
          .toFixed(2)
          .replace(".", ",")} €`,
    );

    const total = totalPrice.toFixed(2).replace(".", ",");

    const message = `Hola Jose, acabo de confirmar mi pedido desde la web:

${lines.join("\n")}

💰 Total: ${total} €

¿Podrías procesarlo y confirmarme cuando esté listo?`;

    clearCart();
    closeCart();

    window.dispatchEvent(
      new CustomEvent("jose-pending-message", {
        detail: { message },
      })
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="flex items-center gap-3 font-display text-2xl tracking-tight text-ink">
                <ShoppingCart className="h-6 w-6 text-primary" />
                Tu pedido
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ChefHat className="mb-4 h-16 w-16 text-ink/20" />
                  <p className="font-display text-xl text-ink/60">
                    Tu pedido está vacío
                  </p>
                  <p className="mt-2 text-sm text-ink/40">
                    Añade algo rico de la carta
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-sm text-primary">
                          {(item.priceValue * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          €
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-secondary/40"
                          aria-label="Quitar uno"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-secondary/40"
                          aria-label="Añadir uno"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 bg-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-tight text-ink">
                    Total
                  </span>
                  <span className="font-display text-2xl text-primary">
                    {totalPrice.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                <button
                  onClick={handlePedirAhora}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-display text-base tracking-tight text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar pedido a Jose
                </button>
                <p className="mt-3 text-center text-xs text-ink/40">
                  El pedido se envía a nuestro asistente y te confirma la hora
                  de recogida al momento
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}