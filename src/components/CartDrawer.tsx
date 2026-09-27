import { useMemo, useState, type CSSProperties } from "react";
import { useCart } from "../lib/cart-context";
import { enviarPedidoTPV } from "../lib/tpv";

const PICKUP_SLOTS: string[] = (() => {
  const slots: string[] = [];
  const ranges: [number, number][] = [[11, 15], [19.5, 22.5]];
  for (const [start, end] of ranges) {
    for (let h = start; h < end; h += 0.25) {
      const hh = Math.floor(h);
      const mm = Math.round((h - hh) * 60).toString().padStart(2, "0");
      slots.push(`${hh.toString().padStart(2, "0")}:${mm}`);
    }
  }
  return slots;
})();

export function CartDrawer() {
  const { items, updateQuantity, clearCart, isOpen, closeCart } = useCart();
  const [step, setStep] = useState<"cart" | "form" | "done">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("Lo antes posible");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const total = items.reduce((s, i) => s + Number(i.price) * i.quantity, 0);

  const formatter = useMemo(
    () => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }),
    []
  );

  const resetFlow = () => {
    setStep("cart");
    setName(""); setPhone(""); setPickup("Lo antes posible"); setNotes("");
    setOrderId(null); setErrorMsg(""); setSending(false);
  };
  const handleClose = () => { resetFlow(); closeCart(); };

  const waMsg = encodeURIComponent(
    `Hola, quiero pedir para recoger:\n${items.map((i) => `• ${i.quantity} x ${i.name}`).join("\n")}\nTotal: ${formatter.format(total)}`
  );

  const submitOrder = async () => {
    if (sending) return;
    setSending(true); setErrorMsg("");
    const result = await enviarPedidoTPV({
      name: name.trim(),
      phone: phone.trim(),
      type: "recogida",
      pickup,
      notes: notes.trim(),
      items: items.map((i) => ({ name: i.name, qty: i.quantity })),
    });
    setSending(false);
    if (result.ok) {
      setOrderId(result.id ?? null);
      clearCart();
      setStep("done");
    } else if (result.error === "closed") {
      setErrorMsg("Ahora mismo no aceptamos pedidos online. Llámanos o pasa por el local.");
    } else {
      setErrorMsg("No se pudo enviar. Revisa los datos o pide por WhatsApp.");
    }
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer" onClick={handleClose}>
      <aside id="panel" className="open" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="header">
          <strong>Tu pedido</strong>
          <button className="close" onClick={handleClose} aria-label="Cerrar">✕</button>
        </div>

        {step === "cart" && (
          <>
            <div id="items">
              {items.length === 0 && <p className="empty">El carrito está vacío</p>}
              {items.map((i) => (
                <div key={i.name} className="item">
                  <div className="item-info">
                    <strong>{i.name}</strong>
                    <span>{formatter.format(Number(i.price) * i.quantity)}</span>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => updateQuantity(i.name, -1)} aria-label="Quitar">−</button>
                    <b>{i.quantity}</b>
                    <button onClick={() => updateQuantity(i.name, +1)} aria-label="Añadir">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div id="cart-footer">
              <div className="total-row">
                <span>Total</span>
                <strong>{formatter.format(total)}</strong>
              </div>
              <button className="primary" disabled={items.length === 0} onClick={() => setStep("form")}>
                🛍️ Pedir online (recogida)
              </button>
              <a className="wa" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${waMsg}`}>
                Pedir por WhatsApp
              </a>
            </div>
          </>
        )}

        {step === "form" && (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 style={{ margin: 0 }}>Datos para tu pedido</h3>
            <input placeholder="Tu nombre *" value={name} onChange={(e) => setName(e.target.value)} style={inp} />
            <input placeholder="Teléfono *" value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} />
            <label style={{ fontSize: 13, fontWeight: 600 }}>Hora de recogida</label>
            <select value={pickup} onChange={(e) => setPickup(e.target.value)} style={inp}>
              <option>Lo antes posible</option>
              {PICKUP_SLOTS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <textarea placeholder="Notas (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ ...inp, resize: "none" }} />
            <div className="total-row"><span>Total</span><strong>{formatter.format(total)}</strong></div>
            <p style={{ fontSize: 12, color: "#7a6a62", margin: 0 }}>Lo pagas al recoger (efectivo o tarjeta)</p>
            {errorMsg && <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{errorMsg}</p>}
            <button className="primary" disabled={name.trim().length < 2 || phone.trim().length < 6 || sending} onClick={submitOrder}>
              {sending ? "Enviando…" : "✅ Confirmar pedido"}
            </button>
            <button onClick={() => setStep("cart")} style={{ background: "none", border: "none", color: "#7a6a62", cursor: "pointer" }}>
              ← Volver al carrito
            </button>
          </div>
        )}

        {step === "done" && (
          <div style={{ padding: 24, textAlign: "center", marginTop: 40 }}>
            <div style={{ fontSize: 52 }}>🎉</div>
            <h3>¡Pedido confirmado!</h3>
            <p style={{ color: "#7a6a62" }}>
              Pedido <strong>{orderId ? `#${orderId}` : ""}</strong> en cocina. Págalo al recoger.
            </p>
            <button className="primary" onClick={handleClose}>Cerrar</button>
          </div>
        )}
      </aside>

      <style>{`
        #cart-drawer .primary { background:#7a1d0e; color:#fff; border:none; border-radius:12px; padding:12px; cursor:pointer; font-size:15px; width:100%; margin:8px 0; }
        #cart-drawer .primary:disabled { opacity:.4; cursor:not-allowed; }
      `}</style>
    </div>
  );
}

const inp: CSSProperties = { padding: 12, borderRadius: 10, border: "2px solid #ece4da", fontSize: 14 };

export default CartDrawer;