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

const inp: CSSProperties = { padding: 12, borderRadius: 10, border: "2px solid #e8d9c3", fontSize: 14, width: "100%", boxSizing: "border-box" };

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
  const formatter = useMemo(() => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }), []);

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
      name: name.trim(), phone: phone.trim(), type: "recogida",
      pickup, notes: notes.trim(),
      items: items.map((i) => ({ name: i.name, qty: i.quantity })),
    });
    setSending(false);
    if (result.ok) { setOrderId(result.id ?? null); clearCart(); setStep("done"); }
    else if (result.error === "closed") { setErrorMsg("Ahora mismo no aceptamos pedidos online. Llámanos o pasa por el local."); }
    else { setErrorMsg("No se pudo enviar. Revisa los datos o pide por WhatsApp."); }
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: isOpen ? "rgba(30,15,5,.45)" : "transparent",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "background .25s",
      }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(420px, 92vw)",
          background: "#fdf9f2",
          boxShadow: "-12px 0 40px rgba(0,0,0,.25)",
          transform: isOpen ? "translateX(0)" : "translateX(105%)",
          transition: "transform .28s ease",
          display: "flex", flexDirection: "column",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          color: "#2a1510",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: "2px solid #792108" }}>
          <strong style={{ fontSize: 17 }}>Tu pedido</strong>
          <button onClick={handleClose} aria-label="Cerrar" style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#792108" }}>✕</button>
        </div>

        {step === "cart" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 18px" }}>
              {items.length === 0 && <p style={{ color: "#7a6a62" }}>El carrito está vacío</p>}
              {items.map((i) => (
                <div key={i.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px dashed #e0d3c0" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{i.name}</div>
                    <div style={{ fontSize: 13, color: "#7a6a62" }}>{formatter.format(Number(i.price) * i.quantity)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => updateQuantity(i.name, -1)} style={qtyBtn}>−</button>
                    <b>{i.quantity}</b>
                    <button onClick={() => updateQuantity(i.name, +1)} style={qtyBtn}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "1px solid #e0d3c0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 16 }}>
                <span>Total</span>
                <strong>{formatter.format(total)}</strong>
              </div>
              <button
                onClick={() => setStep("form")}
                disabled={items.length === 0}
                style={{ ...primary, opacity: items.length === 0 ? 0.4 : 1 }}
              >
                🛍️ Pedir online (recogida)
              </button>
              <a href={`https://wa.me/?text=${waMsg}`} target="_blank" rel="noreferrer"
                 style={{ display: "block", textAlign: "center", marginTop: 8, fontSize: 14, color: "#1e8f5a", fontWeight: 600 }}>
                o pedir por WhatsApp
              </a>
            </div>
          </>
        )}

        {step === "form" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 17 }}>Datos para tu pedido</h3>
            <input placeholder="Tu nombre *" value={name} onChange={(e) => setName(e.target.value)} style={inp} />
            <input placeholder="Teléfono *" value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} />
            <label style={{ fontSize: 13, fontWeight: 600 }}>Hora de recogida</label>
            <select value={pickup} onChange={(e) => setPickup(e.target.value)} style={inp}>
              <option>Lo antes posible</option>
              {PICKUP_SLOTS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <textarea placeholder="Notas (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ ...inp, resize: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, marginTop: 4 }}>
              <span>Total</span><strong>{formatter.format(total)}</strong>
            </div>
            <p style={{ fontSize: 12, color: "#7a6a62", margin: 0 }}>Lo pagas al recoger (efectivo o tarjeta)</p>
            {errorMsg && <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{errorMsg}</p>}
            <button onClick={submitOrder} disabled={name.trim().length < 2 || phone.trim().length < 6 || sending} style={primary}>
              {sending ? "Enviando…" : "✅ Confirmar pedido"}
            </button>
            <button onClick={() => setStep("cart")} style={{ background: "none", border: "none", color: "#7a6a62", cursor: "pointer" }}>
              ← Volver al carrito
            </button>
          </div>
        )}

        {step === "done" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", gap: 8 }}>
            <div style={{ fontSize: 52 }}>🎉</div>
            <h3 style={{ margin: 0, fontSize: 20 }}>¡Pedido confirmado!</h3>
            <p style={{ color: "#7a6a62" }}>
              Pedido <strong>{orderId ? `#${orderId}` : ""}</strong> en cocina. Págalo al recoger en el local.
            </p>
            <button onClick={handleClose} style={{ ...primary, maxWidth: 200 }}>Cerrar</button>
          </div>
        )}
      </aside>
    </div>
  );
}

const qtyBtn: CSSProperties = { width: 30, height: 30, borderRadius: 8, border: "2px solid #e0d3c0", background: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", color: "#792108" };
const primary: CSSProperties = { background: "#792108", color: "#fff", border: "none", borderRadius: 12, padding: "13px", cursor: "pointer", fontSize: 15, fontWeight: 700, width: "100%" };

export default CartDrawer;