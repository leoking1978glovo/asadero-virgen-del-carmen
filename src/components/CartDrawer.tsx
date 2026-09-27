import { useMemo, useState } from "react";
import { useCart } from "../lib/cart-context";
import { useLanguage } from "../lib/language-context";
import { enviarPedidoTPV } from "../lib/tpv";

const PICKUP_SLOTS: string[] = (() => {
  const slots: string[] = [];
  const ranges = [[11, 15], [19.5, 22.5]]; // 11:00-15:00 y 19:30-22:30
  for (const [start, end] of ranges) {
    for (let h = start; h < end; h += 0.25) {
      const hh = Math.floor(h);
      const mm = Math.round((h - hh) * 60).toString().padStart(2, "0");
      slots.push(`${hh.toString().padStart(2, "0")}:${mm}`);
    }
  }
  return slots;
})();

export default function CartDrawer() {
  const { items, updateQuantity, clearCart, count, totalPrice, isOpen, closeCart } = useCart();
  const { t } = useLanguage();

  const [step, setStep] = useState<"cart" | "form" | "done">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("Lo antes posible");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const formatter = useMemo(
    () => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }),
    []
  );

  const buildWhatsAppMessage = () => {
    const lines = items.map(
      (i) => `• ${i.quantity} x ${i.name}${i.options?.length ? ` (${i.options.join(", ")})` : ""}`
    );
    return encodeURIComponent(
      `Hola, quiero hacer un pedido para recoger:\n${lines.join("\n")}\nTotal: ${formatter.format(totalPrice)}`
    );
  };

  const resetFlow = () => {
    setStep("cart");
    setName(""); setPhone(""); setPickup("Lo antes posible"); setNotes("");
    setOrderId(null); setErrorMsg(""); setSending(false);
  };

  const handleClose = () => { resetFlow(); closeCart(); };

  const submitOrder = async () => {
    if (sending) return;
    setSending(true); setErrorMsg("");
    // Las opciones (ej. "sin cebolla") se añaden a notas; el nombre base debe existir en el TPV
    const optsNotes = items
      .filter((i) => i.options?.length)
      .map((i) => `${i.name}: ${i.options!.join(", ")}`)
      .join("; ");
    const result = await enviarPedidoTPV({
      name: name.trim(),
      phone: phone.trim(),
      type: "recogida",
      pickup,
      notes: [notes.trim(), optsNotes].filter(Boolean).join(" | "),
      items: items.map((i) => ({ name: i.name, qty: i.quantity })),
    });
    setSending(false);
    if (result.ok) {
      setOrderId(result.id ?? null);
      clearCart();
      setStep("done");
    } else if (result.error === "closed") {
      setErrorMsg("En este momento no aceptamos pedidos online. Llámanos o pasa por el local.");
    } else {
      setErrorMsg("No se pudo enviar el pedido. Revisa los datos o prueba por WhatsApp.");
    }
  };

  return (
    <>
      <div
        id="cart-drawer"
        aria-hidden={!isOpen}
        onClick={handleClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <aside
          id="panel"
          className={isOpen ? "open" : ""}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={t("cart.title")}
        >
          <div className="header">
            <strong>{t("cart.title")}</strong>
            <button className="close" onClick={handleClose} aria-label={t("cart.close")}>✕</button>
          </div>

          {/* PASO 1: carrito */}
          {step === "cart" && (
            <>
              <div id="items">
                {items.length === 0 && <p className="empty">{t("cart.empty")}</p>}
                {items.map((i) => {
                  const key = `${i.name}-${JSON.stringify(i.options || [])}`;
                  return (
                    <div key={key} className="item">
                      <div className="item-info">
                        <strong>{i.name}</strong>
                        {i.options?.length ? <small>{i.options.join(", ")}</small> : null}
                        <span>{formatter.format(i.price * i.quantity)}</span>
                      </div>
                      <div className="item-qty">
                        <button onClick={() => updateQuantity(key, -1)} aria-label={t("cart.decrease")}>−</button>
                        <b>{i.quantity}</b>
                        <button onClick={() => updateQuantity(key, +1)} aria-label={t("cart.increase")}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div id="cart-footer">
                <div className="total-row">
                  <span>{t("cart.total")}</span>
                  <strong>{formatter.format(totalPrice)}</strong>
                </div>
                <button
                  className="primary"
                  disabled={items.length === 0}
                  onClick={() => setStep("form")}
                  style={{ width: "100%", marginBottom: 8 }}
                >
                  🛍️ Pedir online (recogida)
                </button>
                <a
                  id="whatsapp-cart-btn"
                  className="wa"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/?text=${buildWhatsAppMessage()}`}
                >
                  {t("cart.whatsapp")}
                </a>
              </div>
            </>
          )}

          {/* PASO 2: datos del pedido online */}
          {step === "form" && (
            <div id="items" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{ margin: 0 }}>Datos para tu pedido</h3>
              <input
                placeholder="Tu nombre *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "2px solid #ece4da", fontSize: 14 }}
              />
              <input
                placeholder="Teléfono *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "2px solid #ece4da", fontSize: 14 }}
              />
              <label style={{ fontSize: 13, fontWeight: 600 }}>Hora de recogida</label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "2px solid #ece4da", fontSize: 14 }}
              >
                <option>Lo antes posible</option>
                {PICKUP_SLOTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <textarea
                placeholder="Notas (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                style={{ padding: 12, borderRadius: 10, border: "2px solid #ece4da", fontSize: 14, resize: "none" }}
              />
              <div className="total-row">
                <span>{t("cart.total")}</span>
                <strong>{formatter.format(totalPrice)}</strong>
              </div>
              <p style={{ fontSize: 12, color: "#7a6a62", margin: 0 }}>
                Lo pagas al recoger en el local (efectivo o tarjeta)
              </p>
              {errorMsg && <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{errorMsg}</p>}
              <button
                className="primary"
                disabled={!name.trim() || phone.trim().length < 6 || sending}
                onClick={submitOrder}
                style={{ padding: 14, fontWeight: 700 }}
              >
                {sending ? "Enviando…" : "✅ Confirmar pedido"}
              </button>
              <button onClick={() => setStep("cart")} style={{ background: "none", border: "none", color: "#7a6a62", cursor: "pointer" }}>
                ← Volver al carrito
              </button>
            </div>
          )}

          {/* PASO 3: confirmación */}
          {step === "done" && (
            <div style={{ padding: 24, textAlign: "center", marginTop: 40 }}>
              <div style={{ fontSize: 52 }}>🎉</div>
              <h3>¡Pedido confirmado!</h3>
              <p style={{ color: "#7a6a62" }}>
                Tu pedido <strong>{orderId ? `#${orderId}` : ""}</strong> está en cocina.
                Págalo al recoger en el local.
              </p>
              <button className="primary" onClick={handleClose} style={{ padding: 12, fontWeight: 700 }}>
                Cerrar
              </button>
            </div>
          )}
        </aside>
      </div>

      <button
        id="cart-count-badge"
        aria-label={t("cart.open")}
        onClick={() => { resetFlow(); closeCart(); window.dispatchEvent(new CustomEvent("open-cart")); }}
      >
        🛒 {count}
      </button>

      <style>{`
        #cart-count-badge {
          position: fixed; right: 18px; bottom: 18px; z-index: 60;
          border: none; border-radius: 999px; padding: 12px 18px;
          background: #7a1d0e; color: #fff; font-weight: 700; cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,.25);
        }
        #cart-drawer .primary {
          background: #7a1d0e; color: #fff; border: none; border-radius: 12px;
          padding: 12px; cursor: pointer; font-size: 15px;
        }
        #cart-drawer .primary:disabled { opacity: .4; cursor: not-allowed; }
        #cart-drawer input:focus, #cart-drawer select:focus, #cart-drawer textarea:focus {
          outline: none; border-color: #b4701b !important;
        }
      `}</style>
    </>
  );
}