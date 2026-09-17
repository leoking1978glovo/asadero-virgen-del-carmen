import polloEntero from "@/assets/dish-pollo-entero.jpg";
import medioPollo from "@/assets/dish-medio-pollo.jpg";
import costillas from "@/assets/dish-costillas.jpg";
import alitas from "@/assets/dish-alitas.jpg";
import croquetas from "@/assets/dish-croquetas.jpg";

export const RESTAURANT = {
  name: "Virgen del Carmen",
  tagline: "Asador de Pollos",
  phone: "950 880 023",
  phoneIntl: "+34950880023",
  whatsapp: "641 18 45 57",
  whatsappIntl: "34641184557",
  city: "Almería",
};

export type Dish = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
};

export const dishes: Dish[] = [
  {
    name: "Pollo asado entero",
    description:
      "Pollo campero marinado 12 horas en nuestra mezcla secreta de especias y asado lentamente al carbón.",
    price: "10,50 €",
    image: polloEntero,
    tag: "El favorito",
  },
  {
    name: "Medio pollo con patatas",
    description:
      "Media pieza dorada y jugosa acompañada de patatas fritas caseras y salsa a elegir.",
    price: "6,00 €",
    image: medioPollo,
  },
  {
    name: "Costillas a la brasa",
    description:
      "Costillas glaseadas con salsa BBQ casera, cocinadas a fuego lento hasta que la carne se desprende sola.",
    price: "12,50 €",
    image: costillas,
  },
  {
    name: "Alitas picantes",
    description:
      "Alitas asadas con toque picante, crujientes por fuera y tiernas por dentro. Con alioli para refrescar.",
    price: "7,50 €",
    image: alitas,
  },
  {
    name: "Croquetas caseras de pollo",
    description:
      "Cremosas por dentro, crujientes por fuera. Hechas cada mañana con el pollo de nuestro asador.",
    price: "6,00 €",
    image: croquetas,
  },
];

export type MenuItemChoice = {
  label: string;
  options: string[];
};

export type MenuCategory = {
  title: string;
  items: {
    name: string;
    description: string;
    price: string;
    choices?: MenuItemChoice[];
  }[];
};

export const menu: MenuCategory[] = [
  {
    title: "Nuestros pollos",
    items: [
      {
        name: "Pollo asado entero",
        description: "Marinado 12 horas y asado al carbón. Peso aprox. 1,8 kg.",
        price: "10.50 €",
      },
      { name: "Medio pollo asado", description: "", price: "6.00 €" },
      { name: "Cuarto de pollo asado", description: "", price: "3.80 €" },
      {
        name: "Pechuga asada",
        description: "Jugosa, con piel crujiente.",
        price: "4.50 €",
      },
      {
        name: "Pollo desmigado",
        description: "Ideal para ensaladas, empanadas y bocadillos.",
        price: "8.50 €",
      },
    ],
  },
  {
    title: "A la brasa",
    items: [
      {
        name: "Costillas BBQ",
        description: "Glaseadas con salsa barbacoa casera.",
        price: "12.50 €",
      },
      {
        name: "Alitas picantes (8 uds.)",
        description: "Con alioli casero.",
        price: "7.50 €",
      },
      { name: "Muslos a la brasa (4 uds.)", description: "", price: "6.50 €" },
      { name: "Chorizo criollo a la brasa", description: "", price: "4.50 €" },
      {
        name: "Pinchitos de pollo (4 uds.)",
        description: "Marinados al limón y pimentón.",
        price: "6.00 €",
      },
    ],
  },
  {
    title: "Combos para llevar",
    items: [
      {
        name: "Combo individual",
        description: "1/4 de pollo + patatas + pan + bebida.",
        price: "8.50 €",
        choices: [
          {
            label: "Elige tu bebida",
            options: ["Coca Cola", "Fanta", "Aquarius", "Agua"],
          },
          {
            label: "Elige tu salsa",
            options: ["Mojo", "Alioli", "BBQ", "Sin salsa"],
          },
        ],
      },
      {
        name: "Combo familiar",
        description:
          "2 pollos + 2 patatas grandes + refresco de 2 litros y un alioli de regalo.",
        price: "30.00 €",
        choices: [
          {
            label: "Elige tu refresco de 2 litros",
            options: ["Coca Cola", "Fanta naranja", "Fanta limón"],
          },
        ],
      },
      {
        name: "Menú infantil",
        description: "Nuggets de pollo + patatas + helado.",
        price: "6.50 €",
      },
    ],
  },
  {
    title: "Acompañamientos",
    items: [
      { name: "Patatas asadas al romero", description: "", price: "3.50 €" },
      { name: "Patatas fritas caseras", description: "", price: "3.00 €" },
      { name: "Ensalada mixta", description: "", price: "4.50 €" },
      { name: "Arroz blanco", description: "", price: "2.50 €" },
      { name: "Pan", description: "", price: "0.80 €" },
      {
        name: "Salsa extra",
        description: "Mojo, alioli o BBQ.",
        price: "1.00 €",
      },
    ],
  },
  {
    title: "Casero",
    items: [
      {
        name: "Croquetas de pollo (6 uds.)",
        description: "Hechas cada mañana.",
        price: "6.00 €",
      },
      { name: "Empanadillas (3 uds.)", description: "", price: "4.50 €" },
      { name: "Flan casero", description: "", price: "3.00 €" },
      { name: "Tarta de queso", description: "", price: "4.00 €" },
    ],
  },
  {
    title: "Bebidas",
    items: [
      {
        name: "Refrescos",
        description: "Coca Cola, Fanta, Aquarius.",
        price: "2.20 €",
      },
      { name: "Cerveza", description: "", price: "2.50 €" },
      { name: "Agua", description: "", price: "1.50 €" },
      { name: "Vino de la casa (botella)", description: "", price: "8.00 €" },
    ],
  },
];
