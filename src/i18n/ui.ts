import type { Lang } from "./config";

type Messages = {
  header: {
    home: string;
    who: string;
    articles: string;
    contact: string;
  };
  footer: {
    privacyLink: string;
    rights: string;
  };
  pages: {
    home: {
      eyebrow: string;
      title: string;
      intro: string;
      card1Title: string;
      card1Body: string;
      card2Title: string;
      card2Body: string;
      card3Title: string;
      card3Body: string;
      craftSectionTitle: string;
      craftSectionText: string;
    };
    who: {
      title: string;
      biographyHtml: string;
    };
    articles: {
      title: string;
      read: string;
      empty: string;
      published: string;
      tags: string;
    };
    portfolio: {
      title: string;
      visit: string;
      imageAlt: string;
    };
    contact: {
      title: string;
      intro: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      phoneHelp: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      submitUnexpectedError: string;
    };
    privacy: {
      title: string;
      bodyHtml: string;
    };
  };
};

export const ui: Record<Lang, Messages> = {
  es: {
    header: {
      home: "Inicio",
      who: "Quién soy",
      articles: "Artículos",
      contact: "Contacto",
    },
    footer: {
      privacyLink: "Política de privacidad",
      rights: "Todos los derechos reservados.",
    },
    pages: {
      home: {
        eyebrow: "ARTESANO DEL SOFTWARE",
        title: "Construyo software con criterio, estructura y sentido humano.",
        intro:
          "Entiendo el software como oficio y como herramienta cultural. Desarrollo proyectos que buscan aportar al bien común, fortaleciendo lo humano, lo social y las estructuras que sostienen una convivencia más justa.",
        card1Title: "Oficio",
        card1Body: "El software como artesanía: disciplina, criterio y mejora continua.",
        card2Title: "Holístico",
        card2Body: "Concibo cada solución como un todo, integrando lo técnico y lo humano desde el diseño.",
        card3Title: "Propósito",
        card3Body: "Tecnología al servicio del bien común y lo colectivo.",
        craftSectionTitle: "artesanía",
        craftSectionText: "La artesanía del software va más allá de escribir código que funcione. Implica comprender el contexto, anticipar consecuencias y diseñar soluciones que perduren. Cada decisión arquitectónica, cada nombre de variable, cada patrón elegido refleja una cosmovisión sobre cómo deberían interactuar las personas y los sistemas. El código no es neutral: siempre estructura posibilidades. Mi trabajo busca que esas posibilidades sean las correctas.",
      },
      who: {
        title: "Quién soy",
        biographyHtml:
          "Soy Diego Arenas, ingeniero de software.<br><br>Mi trabajo profesional se desarrolla dentro de organizaciones privadas, donde diseño e implemento soluciones bajo objetivos, restricciones y marcos ya establecidos. Ese ejercicio me ha dado disciplina técnica, criterio arquitectónico y una comprensión práctica de cómo los sistemas evolucionan bajo presión real.<br><br>Kumelemuel nace de una necesidad distinta. No es un alter ego ni una ruptura, sino un espacio de autonomía. Es la dimensión donde puedo explorar el software sin condicionamientos externos, definiendo no solo la implementación, sino también los principios que la sostienen.<br><br>Con el tiempo entendí que el código no es únicamente una herramienta técnica. Es un mecanismo que formaliza reglas, incentivos y dinámicas de interacción. Cada decisión arquitectónica, desde un modelo de dominio hasta una regla de acceso, influye en el comportamiento de las personas que habitan el sistema. La tecnología no es neutral; siempre estructura posibilidades.<br><br>Kumelemuel es el lugar donde asumo esa responsabilidad de forma explícita. Aquí trabajo en proyectos open source, experimento con modelos de gobernanza digital y diseño sistemas que integran lo técnico y lo humano como un todo coherente.<br><br>No busco producir más software.<br>Busco diseñar sistemas que puedan sostenerse, evolucionar y aportar al bien común sin perder claridad ni intención.<br><br>Ese es el punto de encuentro entre el oficio y la conciencia.",
      },
      articles: {
        title: "Artículos",
        read: "Leer artículo",
        empty: "No se encontraron artículos en src/data/articles.",
        published: "Publicado",
        tags: "Tags",
      },
      portfolio: {
        title: "Portafolio",
        visit: "Visitar",
        imageAlt: "Vista previa del proyecto",
      },
      contact: {
        title: "Contacto",
        intro:
          "Estoy abierto a colaborar en proyectos que valoren el criterio, la claridad y el impacto humano del software. Si crees que podemos construir algo con sentido, conversemos.",
        name: "Tu nombre",
        namePlaceholder: "Ej. Roberto Nesta",
        email: "Correo electrónico",
        emailPlaceholder: "tu-correo@dominio.com",
        phone: "WhatsApp (opcional)",
        phonePlaceholder: "+52 55 1234 5678",
        phoneHelp: "Incluye lada o código de país para contactarte fácilmente.",
        message: "Cuéntame sobre tu proyecto",
        messagePlaceholder: "Comparte contexto, objetivo y tiempos estimados...",
        send: "Enviar mensaje",
        submitUnexpectedError: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      },
      privacy: {
        title: "Política de Privacidad",
        bodyHtml:
          `<section>
  <h2>1. Identidad del responsable</h2>
  <p>
    En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP),
    se informa que el responsable del tratamiento de los datos personales recabados a través de este sitio web es <strong>kumelemuel</strong>.
  </p>
  <p>
    Para cualquier asunto relacionado con privacidad y protección de datos personales, puedes contactar mediante los medios publicados en este sitio.
  </p>

  <h2>2. Datos personales recabados</h2>
  <p>
    A través del formulario de contacto se podrán solicitar los siguientes datos personales:
  </p>
  <ul>
    <li>Nombre</li>
    <li>Correo electrónico</li>
    <li>Número de WhatsApp (opcional)</li>
  </ul>
  <p>No se recaban datos personales sensibles.</p>

  <h2>3. Finalidad del tratamiento</h2>
  <p>
    Los datos personales proporcionados serán utilizados exclusivamente para atender y responder
    mensajes o solicitudes enviadas voluntariamente por el usuario.
  </p>
  <p>
    La información enviada a través del formulario es transmitida por correo electrónico al responsable
    del sitio con el único propósito de dar respuesta a la comunicación recibida.
  </p>
  <p>
    No se elaboran perfiles, no se utilizan los datos para fines publicitarios masivos
    y no se realizan tratamientos automatizados.
  </p>

  <h2>4. Almacenamiento de la información</h2>
  <p>
    Este sitio no cuenta con base de datos ni almacena la información enviada a través del formulario.
    Los datos son recibidos únicamente vía correo electrónico para efectos de respuesta directa.
  </p>

  <h2>5. Transferencias de datos</h2>
  <p>
    Los datos personales no serán vendidos, cedidos ni transferidos a terceros, salvo obligación legal
    o requerimiento de autoridad competente.
  </p>
  <p>
    El servicio de correo electrónico utilizado para recibir los mensajes puede implicar
    tratamiento técnico por parte del proveedor correspondiente, conforme a sus propias políticas de privacidad.
  </p>

  <h2>6. Derechos ARCO</h2>
  <p>
    De conformidad con la LFPDPPP, el titular puede solicitar información sobre el tratamiento de sus datos
    mediante los medios de contacto publicados en este sitio.
  </p>
  <p>
    Dado que el sitio no mantiene una base de datos estructurada ni almacenamiento sistemático
    de información personal, los derechos de rectificación, cancelación u oposición
    aplicarán en la medida en que resulte materialmente posible respecto del tratamiento realizado.
  </p>

  <h2>7. Uso de cookies</h2>
  <p>
    Este sitio puede utilizar cookies técnicas necesarias para su correcto funcionamiento.
    No se utilizan mecanismos de rastreo invasivo ni publicidad comportamental.
  </p>

  <h2>8. Modificaciones</h2>
  <p>
    La presente Política de Privacidad puede actualizarse para reflejar cambios normativos o técnicos.
    La versión vigente será siempre la publicada en este sitio.
  </p>
</section>`,
      },
    },
  },
  en: {
    header: {
      home: "Home",
      who: "Who am I?",
      articles: "Articles",
      contact: "Contact",
    },
    footer: {
      privacyLink: "Privacy policy",
      rights: "All rights reserved.",
    },
    pages: {
      home: {
        eyebrow: "SOFTWARE CRAFTSMAN",
        title: "I build software with judgment, structure, and human purpose.",
        intro:
          "I understand software as a craft and as a cultural tool. I build projects that seek to contribute to the common good, strengthening people, social systems, and the structures that sustain fairer coexistence.",
        card1Title: "Craft",
        card1Body: "Software as craftsmanship: discipline, judgment, and continuous improvement.",
        card2Title: "Holistic",
        card2Body: "I conceive each solution as a whole, integrating technical and human concerns from the design stage.",
        card3Title: "Purpose",
        card3Body: "Technology in service of the common good and the collective.",
        craftSectionTitle: "craftsmanship",
        craftSectionText: "Software craftsmanship goes beyond writing code that works. It involves understanding context, anticipating consequences, and designing solutions that endure. Every architectural decision, every variable name, every pattern chosen reflects a worldview on how people and systems should interact. Code is not neutral: it always structures possibilities. My work seeks to make those possibilities the right ones.",
      },
      who: {
        title: "Who am I?",
        biographyHtml:
          "I am Diego Arenas, a software engineer.<br><br>My professional work takes place within private organizations, where I design and implement solutions under established goals, constraints, and frameworks. That practice has given me technical discipline, architectural judgment, and a practical understanding of how systems evolve under real pressure.<br><br>Kumelemuel was born from a different need. It is not an alter ego or a rupture, but a space of autonomy. It is the dimension where I can explore software without external conditioning, defining not only implementation details but also the principles that sustain them.<br><br>Over time, I understood that code is not only a technical tool. It is a mechanism that formalizes rules, incentives, and interaction dynamics. Every architectural decision, from a domain model to an access rule, influences the behavior of the people who inhabit the system. Technology is not neutral; it always structures possibilities.<br><br>Kumelemuel is the place where I take that responsibility explicitly. Here I work on open source projects, experiment with digital governance models, and design systems that integrate the technical and the human as one coherent whole.<br><br>I am not trying to produce more software.<br>I seek to design systems that can be sustained, evolve, and contribute to the common good without losing clarity or intention.<br><br>That is the meeting point between craft and awareness.",
      },
      articles: {
        title: "Articles",
        read: "Read article",
        empty: "No articles found in src/data/articles.",
        published: "Published",
        tags: "Tags",
      },
      portfolio: {
        title: "Portfolio",
        visit: "Visit",
        imageAlt: "Project preview image",
      },
      contact: {
        title: "Contact",
        intro:
          "I am open to collaborating on projects that value judgment, clarity, and the human impact of software. If you think we can build something meaningful, let's talk.",
        name: "Your name",
        namePlaceholder: "e.g. Robert Nesta",
        email: "Email address",
        emailPlaceholder: "your-email@domain.com",
        phone: "WhatsApp (optional)",
        phonePlaceholder: "+1 555 123 4567",
        phoneHelp: "Include country/area code so I can contact you easily.",
        message: "Tell me about your project",
        messagePlaceholder: "Share context, goals, and expected timeline...",
        send: "Send message",
        submitUnexpectedError: "An unexpected error occurred. Please try again.",
      },
      privacy: {
        title: "Privacy Policy",
        bodyHtml:
          `<section>
  <h2>1. Data controller identity</h2>
  <p>
    In compliance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP),
    the data controller responsible for processing personal data collected through this website is <strong>kumelemuel</strong>.
  </p>
  <p>
    For any matter related to privacy and personal data protection, you can contact us through the channels published on this site.
  </p>

  <h2>2. Personal data collected</h2>
  <p>
    Through the contact form, the following personal data may be requested:
  </p>
  <ul>
    <li>Name</li>
    <li>Email address</li>
    <li>WhatsApp number (optional)</li>
  </ul>
  <p>No sensitive personal data is collected.</p>

  <h2>3. Purpose of processing</h2>
  <p>
    The personal data provided will be used exclusively to address and respond
    to messages or requests voluntarily submitted by the user.
  </p>
  <p>
    Information sent through the form is transmitted by email to the site owner
    for the sole purpose of responding to the communication received.
  </p>
  <p>
    No profiling is carried out, data is not used for mass advertising purposes,
    and no automated decision-making is performed.
  </p>

  <h2>4. Information storage</h2>
  <p>
    This site does not have a database and does not store information sent through the form.
    Data is received only by email for direct response purposes.
  </p>

  <h2>5. Data transfers</h2>
  <p>
    Personal data will not be sold, assigned, or transferred to third parties, except where legally required
    or requested by a competent authority.
  </p>
  <p>
    The email service used to receive messages may involve technical processing
    by the corresponding provider, according to its own privacy policies.
  </p>

  <h2>6. ARCO rights</h2>
  <p>
    In accordance with the LFPDPPP, data subjects may request information about the processing of their data
    through the contact channels published on this site.
  </p>
  <p>
    Since the site does not maintain a structured database or systematic storage
    of personal information, rights of rectification, cancellation, or objection
    will apply to the extent materially possible for the processing carried out.
  </p>

  <h2>7. Use of cookies</h2>
  <p>
    This site may use technical cookies necessary for proper operation.
    No invasive tracking mechanisms or behavioral advertising are used.
  </p>

  <h2>8. Changes</h2>
  <p>
    This Privacy Policy may be updated to reflect legal or technical changes.
    The current version will always be the one published on this site.
  </p>
</section>`,
      },
    },
  },
};

export function t(lang: Lang) {
  return ui[lang];
}
