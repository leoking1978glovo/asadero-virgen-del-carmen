import { menu, RESTAURANT } from "@/data/restaurant";

export type ChatMessage = {
  id: number;
  from: "user" | "bot";
  text: string;
};

export const SUGGESTIONS = [
  "¿Cuánto cuesta un pollo entero?",
  "¿Qué lleva el combo familiar?",
  "¿Qué horario tenéis?",
  "Quiero hacer un pedido",
];

function flattenMenu(): string {
  return menu
    .map(
      (cat) =>
        `${cat.title}: ${cat.items
          .map((i) => `${i.name} (${i.price})`)
          .join(", ")}`,
    )
    .join("\n");
}

const MENU_TEXT = flattenMenu();

function findPrices(query: string): string | null {
  const q = query.toLowerCase();
  const hits: string[] = [];
  for (const cat of menu) {
    for (const item of cat.items) {
      const name = item.name.toLowerCase();
      const keywords = name
        .replace(/[()]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3);
      if (keywords.some((k) => q.includes(k))) {
        hits.push(`${item.name}: ${item.price}`);
      }
    }
  }
  if (hits.length === 0) return null;
  const unique = [...new Set(hits)].slice(0, 5);
  return `Esto es lo que tengo:\n${unique.map((h) => `• ${h}`).join("\n")}\n\n¿Quieres que te lo apunte para recoger?`;
}

export function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (/(hola|buenas|buenos días|buenas tardes|hey)/.test(q)) {
    return `¡Hola! Bienvenido al asador Virgen del Carmen. Puedo contarte precios, la carta, horarios o ayudarte a hacer tu encargo. ¿Qué necesitas?`;
  }

  if (/(combo familiar|familiar)/.test(q)) {
    return `El combo familiar son 30 € e incluye: 2 pollos asados, 2 patatas grandes, un refresco de 2 litros y un alioli de regalo. Perfecto para 4-5 personas. ¿Te lo reservo por WhatsApp?`;
  }

  if (/(horario|hora|abierto|abiertos|cerrado|abrís|abren|cuándo)/.test(q)) {
    return `Abrimos de martes a domingo, de 11:30 a 14:30 y de 18:30 a 21:30. Los lunes cerramos. Si encargas con antelación, te lo tenemos listo a la hora que prefieras dentro del horario.`;
  }

  if (/(pedido|encarg|reserv|pedir|comprar|llevar|recoger)/.test(q)) {
    return `¡Genial! Para hacer tu encargo escríbenos por WhatsApp al ${RESTAURANT.whatsapp} o llámanos al ${RESTAURANT.phone}. Dinos qué quieres y a qué hora pasas a recogerlo, y te lo tendremos caliente. También puedes usar el carrito de la carta y enviarlo directo por WhatsApp.`;
  }

  if (/(whatsapp|teléfono|telefono|llamar|contacto|número|numero)/.test(q)) {
    return `Puedes escribirnos por WhatsApp al ${RESTAURANT.whatsapp} o llamarnos al ${RESTAURANT.phone}. ¡Te atendemos encantados!`;
  }

  if (/(dónde|donde|dirección|direccion|ubicación|ubicacion|calle|llegar|mapa)/.test(q)) {
    return `Estamos en ${RESTAURANT.city}. En la sección "Encuéntranos" de esta misma página tienes el mapa. Los pedidos se recogen en tienda, recién hechos.`;
  }

  if (/(carta|menú|menu|qué tenéis|que teneis|qué hay|que hay|comida|platos)/.test(q)) {
    return `Nuestra carta:\n${MENU_TEXT}\n\nSi quieres el detalle de algo, pregúntame.`;
  }

  if (/(precio|cuánto|cuanto|cuesta|vale|€|euro)/.test(q)) {
    const prices = findPrices(q);
    if (prices) return prices;
    return `Nuestros precios van desde 0,80 € (pan) hasta 30 € (combo familiar). El pollo entero son 10,50 € y el medio pollo 6 €. Pregúntame por cualquier plato concreto.`;
  }

  if (/(alerg|gluten|celiac|celíac)/.test(q)) {
    return `Para temas de alérgenos, mejor consúltanos directamente por WhatsApp al ${RESTAURANT.whatsapp} y te confirmamos los ingredientes de cada plato.`;
  }

  if (/(gracias|perfecto|genial|vale|ok|adiós|adios|hasta luego)/.test(q)) {
    return `¡Gracias a ti! Si necesitas algo más, aquí estoy. Y recuerda: encargos por WhatsApp al ${RESTAURANT.whatsapp}. ¡Que aproveche!`;
  }

  const prices = findPrices(q);
  if (prices) return prices;

  return `No estoy seguro de haberte entendido. Puedo ayudarte con precios, la carta, horarios o encargos. Si prefieres hablar con nosotros directamente, escríbenos por WhatsApp al ${RESTAURANT.whatsapp}.`;
}