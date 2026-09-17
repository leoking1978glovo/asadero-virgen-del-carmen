import logo from "@/assets/logo-nav.png";

const items = [
  "Pollo asado al carbón",
  "Recién hecho",
  "Para llevar",
  { type: "logo" as const },
  "Lata de bebida gratis",
  { type: "logo" as const },
  "Virgen del Carmen",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-primary py-4">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-10">
            {items.map((item, idx) => (
              <span
                key={idx + "-" + dup}
                className="flex items-center gap-4 font-display text-2xl tracking-tight text-cream uppercase md:text-4xl"
              >
                {typeof item === "string" ? (
                  <>
                    {item} <span className="text-secondary">✦</span>
                  </>
                ) : (
                  <img
                    src={logo}
                    alt="Virgen del Carmen"
                    className="h-10 w-10 rounded-full md:h-14 md:w-14 drop-shadow-sm"
                  />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
