import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";
import logo from "@/assets/logo-nav.png";
import {
  getBotReply,
  SUGGESTIONS,
  type ChatMessage,
} from "@/lib/chat-knowledge";

let nextId = 1;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      from: "bot",
      text: "¡Hola! Soy el asistente del asador Virgen del Carmen. Pregúntame por la carta, precios, horarios o haz tu encargo. ¿En qué te ayudo?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((prev) => [...prev, { id: nextId++, from: "user", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId++, from: "bot", text: getBotReply(clean) },
      ]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed right-5 bottom-5 z-[80] flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_10px_30px_rgba(121,33,8,0.45)] ring-4 ring-cream md:right-8 md:bottom-8"
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-7 w-7 text-cream" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageCircle className="h-7 w-7 text-cream" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-secondary ring-2 ring-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed right-5 bottom-24 z-[80] flex h-[480px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(43,20,12,0.35)] ring-1 ring-ink/10 md:right-8 md:bottom-28"
          >
            <div className="flex items-center gap-3 bg-primary px-5 py-4">
              <div className="relative">
                <img
                  src={logo}
                  alt="Virgen del Carmen"
                  className="h-11 w-11 rounded-full ring-2 ring-cream/40"
                />
                <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-primary bg-emerald-400" />
              </div>
              <div>
                <p className="font-display text-base tracking-tight text-cream">
                  Asistente Virgen del Carmen
                </p>
                <p className="text-xs text-cream/70">
                  En línea · responde al momento
                </p>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-cream/60 px-4 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.from === "user"
                        ? "rounded-br-md bg-primary text-cream"
                        : "rounded-bl-md bg-white text-ink shadow-sm ring-1 ring-ink/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-ink/5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="h-2 w-2 rounded-full bg-primary/60"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-ink/5 bg-white px-4 pt-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-cream"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink/10 bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 rounded-full border border-ink/15 bg-cream/50 px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-cream transition-colors hover:bg-primary/90 disabled:opacity-40"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}