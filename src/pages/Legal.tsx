import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";

export type LegalKind = "aviso-legal" | "privacidad" | "cookies";

const TITLES: Record<LegalKind, string> = {
  "aviso-legal": "Aviso Legal",
  privacidad: "Política de Privacidad",
  cookies: "Política de Cookies",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-primary uppercase tracking-wide">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-[#333333]">{children}</div>
    </section>
  );
}

function AvisoLegal() {
  return (
    <>
      <Section title="1. Datos identificativos del titular">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos
          del titular de este sitio web:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Titular:</strong> {"<<CAMBIAR: NOMBRE O RAZÓN SOCIAL DEL TITULAR>>"}</li>
          <li><strong>NIF/CIF:</strong> {"<<CAMBIAR: NIF O CIF>>"}</li>
          <li><strong>Domicilio:</strong> {"<<CAMBIAR: DIRECCIÓN COMPLETA DEL ASADOR>>"}, {RESTAURANT.city}, España</li>
          <li><strong>Teléfono:</strong> {RESTAURANT.phone}</li>
          <li><strong>Correo electrónico:</strong> {"<<CAMBIAR: EMAIL DE CONTACTO>>"}</li>
        </ul>
      </Section>
      <Section title="2. Objeto">
        <p>
          Este sitio web tiene por objeto dar a conocer los productos y servicios del Asador de
          Pollos Virgen del Carmen, así como facilitar la realización de pedidos para recogida en
          local a través de un asistente virtual automatizado.
        </p>
      </Section>
      <Section title="3. Condiciones de uso">
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación
          de las presentes condiciones. El usuario se compromete a hacer un uso lícito del sitio y a
          no emplearlo para fines contrarios a la ley, la moral o el orden público.
        </p>
        <p>
          Los pedidos realizados a través del asistente virtual quedan sujetos a confirmación por
          parte del establecimiento. Los precios mostrados incluyen IVA y pueden variar; el precio
          definitivo será el confirmado en el momento de la recogida.
        </p>
      </Section>
      <Section title="4. Propiedad intelectual">
        <p>
          Todos los contenidos de este sitio web (textos, imágenes, logotipos, vídeos y diseño) son
          titularidad del Asador de Pollos Virgen del Carmen o de terceros que han autorizado su
          uso, y están protegidos por la normativa de propiedad intelectual. Queda prohibida su
          reproducción, distribución o comunicación pública sin autorización expresa.
        </p>
      </Section>
      <Section title="5. Responsabilidad">
        <p>
          El titular no se responsabiliza de los daños que puedan derivarse de interferencias,
          omisiones, interrupciones o desconexiones en el funcionamiento del sitio web por causas
          ajenas a su control, ni del uso indebido que terceros puedan hacer de la información
          publicada.
        </p>
      </Section>
      <Section title="6. Legislación aplicable">
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier
          controversia serán competentes los juzgados y tribunales de {RESTAURANT.city}, salvo que
          la normativa de consumidores disponga otro fuero.
        </p>
      </Section>
    </>
  );
}

function Privacidad() {
  return (
    <>
      <Section title="1. Responsable del tratamiento">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Responsable:</strong> {"<<CAMBIAR: NOMBRE O RAZÓN SOCIAL DEL TITULAR>>"}</li>
          <li><strong>NIF/CIF:</strong> {"<<CAMBIAR: NIF O CIF>>"}</li>
          <li><strong>Domicilio:</strong> {"<<CAMBIAR: DIRECCIÓN COMPLETA DEL ASADOR>>"}, {RESTAURANT.city}, España</li>
          <li><strong>Correo electrónico:</strong> {"<<CAMBIAR: EMAIL DE CONTACTO>>"}</li>
        </ul>
      </Section>
      <Section title="2. Datos que recogemos y finalidad">
        <p>
          Cuando realizas un pedido a través del asistente virtual del sitio web, podemos tratar los
          siguientes datos personales: nombre, número de teléfono, dirección de correo electrónico y
          el contenido de tu pedido.
        </p>
        <p>
          La finalidad del tratamiento es exclusivamente la gestión y preparación de tu pedido para
          su recogida en el establecimiento, así como la comunicación contigo en relación con el
          mismo. La base jurídica es la ejecución del contrato de compraventa solicitado por ti
          (art. 6.1.b del RGPD).
        </p>
      </Section>
      <Section title="3. Asistente virtual con inteligencia artificial">
        <p>
          El chat de este sitio web funciona mediante un asistente virtual con inteligencia
          artificial llamado Jose. No estás hablando con una persona: las respuestas son generadas
          automáticamente por un sistema de IA.
        </p>
        <p>
          El servicio del asistente es prestado por un proveedor tecnológico externo (Relevance AI),
          que actúa como encargado del tratamiento y puede procesar las conversaciones en servidores
          ubicados fuera de la Unión Europea, con las garantías adecuadas conforme al RGPD. Te
          recomendamos no compartir en el chat datos especialmente sensibles (salud, datos
          bancarios, etc.).
        </p>
      </Section>
      <Section title="4. Conservación de los datos">
        <p>
          Los datos se conservarán durante el tiempo necesario para gestionar tu pedido y, una vez
          finalizado, durante los plazos legalmente exigibles para atender posibles
          responsabilidades.
        </p>
      </Section>
      <Section title="5. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad escribiendo a {"<<CAMBIAR: EMAIL DE CONTACTO>>"}, adjuntando un documento que
          acredite tu identidad. También tienes derecho a reclamar ante la Agencia Española de
          Protección de Datos (www.aepd.es).
        </p>
      </Section>
    </>
  );
}

function Cookies() {
  return (
    <>
      <Section title="1. Qué son las cookies y tecnologías similares">
        <p>
          Las cookies y tecnologías similares (como el almacenamiento local del navegador) son
          pequeños datos que se guardan en tu dispositivo cuando visitas un sitio web.
        </p>
      </Section>
      <Section title="2. Qué utiliza este sitio web">
        <p>Este sitio web utiliza únicamente almacenamiento técnico y funcional:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Carrito de la compra:</strong> se guarda en tu navegador el contenido de tu
            carrito para que no se pierda mientras navegas por la web.
          </li>
          <li>
            <strong>Asistente virtual (chat):</strong> se guarda en tu navegador una clave técnica
            que permite mantener la conversación con el asistente mientras navegas. Al cerrar el
            chat con el botón X, esta clave se elimina y la siguiente conversación comienza de cero.
          </li>
        </ul>
        <p>
          Estos almacenamientos son necesarios para el funcionamiento del servicio solicitado y no
          requieren consentimiento conforme al artículo 22.2 de la LSSI-CE.
        </p>
      </Section>
      <Section title="3. Cookies de terceros">
        <p>
          Este sitio web no utiliza cookies de publicidad, analítica ni redes sociales. Si en el
          futuro se incorporaran, se actualizaría esta política y se solicitaría tu consentimiento
          previo.
        </p>
      </Section>
      <Section title="4. Cómo eliminar los datos almacenados">
        <p>
          Puedes borrar en cualquier momento los datos almacenados por este sitio desde la
          configuración de tu navegador (opción de borrar datos de navegación o almacenamiento del
          sitio).
        </p>
      </Section>
    </>
  );
}

export default function Legal({ kind }: { kind: LegalKind }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${TITLES[kind]} · Asador de Pollos Virgen del Carmen`;
  }, [kind]);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la web
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-ink">{TITLES[kind]}</h1>
        <p className="mt-2 text-sm text-[#666666]">
          Asador de Pollos Virgen del Carmen · Última actualización: septiembre de 2026
        </p>

        {kind === "aviso-legal" && <AvisoLegal />}
        {kind === "privacidad" && <Privacidad />}
        {kind === "cookies" && <Cookies />}
      </div>
    </div>
  );
}