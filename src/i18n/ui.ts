import type { Lang } from "./config";

type Messages = {
  header: {
    home: string;
    who: string;
    articles: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    skipToContent: string;
    switchLanguage: Record<Lang, string>;
  };
  footer: {
    privacyLink: string;
    rights: string;
  };
  rss: {
    title: string;
    description: string;
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
      exploreSectionTitle: string;
      exploreSectionText: string;
      exploreImageAlt: string;
      designSectionTitle: string;
      designSectionText: string;
      designImageAlt: string;
      craftSectionTitle: string;
      craftSectionText: string;
      craftImageAlt: string;
      bloomSectionTitle: string;
      bloomSectionText: string;
      bloomImageAlt: string;
    };
    who: {
      title: string;
      description: string;
      biographyHtml: string;
    };
    articles: {
      title: string;
      description: string;
      read: string;
      empty: string;
      published: string;
      tags: string;
    };
    portfolio: {
      title: string;
      description: string;
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
      message: string;
      messagePlaceholder: string;
      send: string;
      submitUnexpectedError: string;
      networkError: string;
      timeoutError: string;
      sending: string;
      successTitle: string;
      privacyNote: string;
    };
    privacy: {
      title: string;
      description: string;
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
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      mainNav: "Navegación principal",
      skipToContent: "Saltar al contenido",
      switchLanguage: { es: "Ver en español", en: "Ver en inglés" },
    },
    footer: {
      privacyLink: "Política de privacidad",
      rights: "Todos los derechos reservados.",
    },
    rss: {
      title: "Kumelemuel — Artículos",
      description: "Artículos sobre ingeniería de software, arquitectura, y modelos de gobernanza digital.",
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
        exploreSectionTitle: "exploración",
        exploreSectionText:
          "Todo proyecto comienza con preguntas, no con respuestas. Antes de escribir una línea de código me detengo a entender el problema, a las personas que lo viven y el contexto que lo sostiene. Explorar es investigar, prototipar y equivocarse a tiempo, para que las decisiones importantes se tomen con información y no por inercia.",
        exploreImageAlt: "Ilustración de exploración",
        designSectionTitle: "diseño",
        designSectionText:
          "Diseñar es decidir qué forma tendrá un sistema y, con ello, qué permite y qué restringe. Modelo dominios, defino límites y elijo patrones pensando en quienes lo usarán y en quienes lo mantendrán mañana. Un buen diseño no se nota: hace que lo correcto sea lo más fácil de hacer.",
        designImageAlt: "Ilustración de diseño de software",
        craftSectionTitle: "artesanía",
        craftSectionText:
          "La artesanía del software va más allá de escribir código que funcione. Implica comprender el contexto, anticipar consecuencias y diseñar soluciones que perduren. Cada decisión arquitectónica, cada nombre de variable, cada patrón elegido refleja una cosmovisión sobre cómo deberían interactuar las personas y los sistemas. El código no es neutral: siempre estructura posibilidades. Mi trabajo busca que esas posibilidades sean las correctas.",
        craftImageAlt: "Ilustración de artesanía del software",
        bloomSectionTitle: "florecer",
        bloomSectionText:
          "El software bien cuidado no termina con su lanzamiento: florece. Crece junto a las comunidades que lo habitan, se adapta sin perder su esencia y deja espacio para que otros construyan sobre él. Ese es el horizonte de Kumelemuel: sistemas abiertos, sostenibles y con sentido, que sigan aportando mucho después de haber sido escritos.",
        bloomImageAlt: "Ilustración de un jardín de flores silvestres",
      },
      who: {
        title: "Quién soy",
        description:
          "Ingeniero de software. Mi trabajo profesional se desarrolla dentro de organizaciones privadas, donde diseño e implemento soluciones bajo objetivos, restricciones y marcos ya establecidos.",
        biographyHtml:
          "<p>Soy Diego Arenas, ingeniero de software.</p><p>Mi trabajo profesional se desarrolla dentro de organizaciones privadas, donde diseño e implemento soluciones bajo objetivos, restricciones y marcos ya establecidos. Ese ejercicio me ha dado disciplina técnica, criterio arquitectónico y una comprensión práctica de cómo los sistemas evolucionan bajo presión real.</p><p>Kumelemuel nace de una necesidad distinta. No es un alter ego ni una ruptura, sino un espacio de autonomía. Es la dimensión donde puedo explorar el software sin condicionamientos externos, definiendo no solo la implementación, sino también los principios que la sostienen.</p><p>Con el tiempo entendí que el código no es únicamente una herramienta técnica. Es un mecanismo que formaliza reglas, incentivos y dinámicas de interacción. Cada decisión arquitectónica, desde un modelo de dominio hasta una regla de acceso, influye en el comportamiento de las personas que habitan el sistema. La tecnología no es neutral; siempre estructura posibilidades.</p><p>Kumelemuel es el lugar donde asumo esa responsabilidad de forma explícita. Aquí trabajo en proyectos open source, experimento con modelos de gobernanza digital y diseño sistemas que integran lo técnico y lo humano como un todo coherente.</p><p>No busco producir más software.<br>Busco diseñar sistemas que puedan sostenerse, evolucionar y aportar al bien común sin perder claridad ni intención.</p><p>Ese es el punto de encuentro entre el oficio y la conciencia.</p>",
      },
      articles: {
        title: "Artículos",
        description: "Artículos sobre ingeniería de software, arquitectura, y modelos de gobernanza digital.",
        read: "Leer artículo",
        empty: "Pronto publicaré los primeros artículos. Vuelve en unos días.",
        published: "Publicado",
        tags: "Tags",
      },
      portfolio: {
        title: "Portafolio",
        description:
          "Proyectos y aplicaciones desarrolladas, mostrando el trabajo en tecnología al servicio del bien común.",
        visit: "Visitar",
        imageAlt: "Vista previa del proyecto",
      },
      contact: {
        title: "Contacto",
        intro:
          "Este es un espacio personal. Si algo de lo que escribo te hizo pensar, tienes una pregunta o simplemente quieres conversar sobre software, open source o gobernanza digital, escríbeme. Leo y respondo cada mensaje personalmente.",
        name: "Tu nombre",
        namePlaceholder: "Ej. Roberto Nesta",
        email: "Correo electrónico",
        emailPlaceholder: "tu-correo@dominio.com",
        message: "Tu mensaje",
        messagePlaceholder: "¿Sobre qué te gustaría conversar?",
        send: "Enviar mensaje",
        submitUnexpectedError: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        networkError: "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
        timeoutError: "La solicitud tardó demasiado. Inténtalo nuevamente.",
        sending: "Enviando...",
        successTitle: "Mensaje enviado correctamente.",
        privacyNote: "Tus datos solo se usan para responderte.",
      },
      privacy: {
        title: "Política de Privacidad",
        description:
          "Cómo se tratan los datos que envías a través del formulario de contacto de este sitio personal.",
        bodyHtml: `<section>
  <p><em>Última actualización: 3 de noviembre de 2026.</em></p>

  <h2>1. Un sitio personal</h2>
  <p>
    kumelemuel.dev es el sitio personal de <strong>Diego Arenas</strong> (Kumelemuel). No es un negocio:
    no ofrece servicios, no vende productos y no tiene fines comerciales.
  </p>
  <p>
    Si tienes cualquier duda sobre tu información, puedes escribir a través del
    <a href="/es/contact/">formulario de contacto</a>.
  </p>

  <h2>2. Qué datos recibo</h2>
  <p>Solo los que tú decides enviar en el formulario de contacto:</p>
  <ul>
    <li>Tu nombre</li>
    <li>Tu correo electrónico</li>
    <li>El contenido de tu mensaje</li>
  </ul>
  <p>Te pido no incluir datos sensibles en tu mensaje.</p>

  <h2>3. Para qué los uso</h2>
  <p>
    Únicamente para leer tu mensaje y responderte de forma personal. Tus datos no se usan con fines comerciales
    ni publicitarios, no se venden, no se comparten con terceros y no se publican.
  </p>

  <h2>4. Cuánto tiempo se conservan</h2>
  <p>
    El sitio no tiene una base de datos. Tu mensaje llega a mi correo personal y se conserva ahí
    mientras dure la conversación. El servicio de envío de correo puede guardar temporalmente
    un registro técnico del envío, conforme a sus propias políticas.
  </p>

  <h2>5. Servicios que intervienen</h2>
  <p>
    Para que el sitio funcione se usan los siguientes servicios, que pueden procesar datos en servidores
    ubicados fuera de México (principalmente en Estados Unidos):
  </p>
  <ul>
    <li><strong>Vercel</strong>: alojamiento del sitio y ejecución del formulario de contacto.</li>
    <li><strong>Resend</strong>: envío del correo con tu mensaje.</li>
    <li><strong>Google (Gmail)</strong>: recepción del correo.</li>
    <li><strong>Vercel Web Analytics</strong>: estadísticas agregadas y anónimas de visitas (páginas vistas, país, tipo de dispositivo), sin cookies ni identificadores persistentes.</li>
  </ul>

  <h2>6. Tus datos, tu decisión</h2>
  <p>
    Puedes pedirme en cualquier momento que te diga qué datos tuyos tengo, que los corrija o que borre
    tus mensajes. Escríbeme por el <a href="/es/contact/">formulario de contacto</a> indicando el correo
    con el que me escribiste; te responderé en un plazo máximo de 20 días hábiles.
  </p>

  <h2>7. Cookies</h2>
  <p>
    Este sitio no utiliza cookies. La analítica de visitas funciona sin cookies y no permite identificarte.
  </p>

  <h2>8. Cambios</h2>
  <p>
    Si este aviso cambia, la versión vigente será siempre la publicada aquí, con su fecha de última actualización.
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
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mainNav: "Main navigation",
      skipToContent: "Skip to content",
      switchLanguage: { es: "View in Spanish", en: "View in English" },
    },
    footer: {
      privacyLink: "Privacy policy",
      rights: "All rights reserved.",
    },
    rss: {
      title: "Kumelemuel — Articles",
      description: "Articles on software engineering, architecture, and digital governance models.",
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
        card2Body:
          "I conceive each solution as a whole, integrating technical and human concerns from the design stage.",
        card3Title: "Purpose",
        card3Body: "Technology in service of the common good and the collective.",
        exploreSectionTitle: "exploration",
        exploreSectionText:
          "Every project begins with questions, not answers. Before writing a single line of code, I take time to understand the problem, the people who live it, and the context that sustains it. Exploring means researching, prototyping, and failing early, so that important decisions are made with information rather than by inertia.",
        exploreImageAlt: "Exploration illustration",
        designSectionTitle: "design",
        designSectionText:
          "Designing is deciding what shape a system will take and, with it, what it enables and what it restricts. I model domains, define boundaries, and choose patterns with both the people who will use it and those who will maintain it tomorrow in mind. Good design goes unnoticed: it makes the right thing the easiest thing to do.",
        designImageAlt: "Software design illustration",
        craftSectionTitle: "craftsmanship",
        craftSectionText:
          "Software craftsmanship goes beyond writing code that works. It involves understanding context, anticipating consequences, and designing solutions that endure. Every architectural decision, every variable name, every pattern chosen reflects a worldview on how people and systems should interact. Code is not neutral: it always structures possibilities. My work seeks to make those possibilities the right ones.",
        craftImageAlt: "Software craftsmanship illustration",
        bloomSectionTitle: "bloom",
        bloomSectionText:
          "Well-tended software does not end at launch: it blooms. It grows alongside the communities that inhabit it, adapts without losing its essence, and leaves room for others to build upon it. That is the horizon of Kumelemuel: open, sustainable, and meaningful systems that keep contributing long after they were written.",
        bloomImageAlt: "Illustration of a wildflower garden",
      },
      who: {
        title: "Who am I?",
        description:
          "Software engineer. My professional work takes place within private organizations, where I design and implement solutions under established goals, constraints, and frameworks.",
        biographyHtml:
          "<p>I am Diego Arenas, a software engineer.</p><p>My professional work takes place within private organizations, where I design and implement solutions under established goals, constraints, and frameworks. That practice has given me technical discipline, architectural judgment, and a practical understanding of how systems evolve under real pressure.</p><p>Kumelemuel was born from a different need. It is not an alter ego or a rupture, but a space of autonomy. It is the dimension where I can explore software without external conditioning, defining not only implementation details but also the principles that sustain them.</p><p>Over time, I understood that code is not only a technical tool. It is a mechanism that formalizes rules, incentives, and interaction dynamics. Every architectural decision, from a domain model to an access rule, influences the behavior of the people who inhabit the system. Technology is not neutral; it always structures possibilities.</p><p>Kumelemuel is the place where I take that responsibility explicitly. Here I work on open source projects, experiment with digital governance models, and design systems that integrate the technical and the human as one coherent whole.</p><p>I am not trying to produce more software.<br>I seek to design systems that can be sustained, evolve, and contribute to the common good without losing clarity or intention.</p><p>That is the meeting point between craft and awareness.</p>",
      },
      articles: {
        title: "Articles",
        description: "Articles on software engineering, architecture, and digital governance models.",
        read: "Read article",
        empty: "The first articles are coming soon. Check back in a few days.",
        published: "Published",
        tags: "Tags",
      },
      portfolio: {
        title: "Portfolio",
        description:
          "Projects and applications developed, showcasing work in technology in service of the common good.",
        visit: "Visit",
        imageAlt: "Project preview image",
      },
      contact: {
        title: "Contact",
        intro:
          "This is a personal space. If something I wrote made you think, you have a question, or you simply want to talk about software, open source, or digital governance, write to me. I read and reply to every message personally.",
        name: "Your name",
        namePlaceholder: "e.g. Robert Nesta",
        email: "Email address",
        emailPlaceholder: "your-email@domain.com",
        message: "Your message",
        messagePlaceholder: "What would you like to talk about?",
        send: "Send message",
        submitUnexpectedError: "An unexpected error occurred. Please try again.",
        networkError: "Could not connect to the server. Check your connection and try again.",
        timeoutError: "The request took too long. Please try again.",
        sending: "Sending...",
        successTitle: "Message sent successfully.",
        privacyNote: "Your data is only used to reply to you.",
      },
      privacy: {
        title: "Privacy Policy",
        description: "How the data you send through the contact form of this personal site is handled.",
        bodyHtml: `<section>
  <p><em>Last updated: November 3, 2026.</em></p>

  <h2>1. A personal site</h2>
  <p>
    kumelemuel.dev is the personal website of <strong>Diego Arenas</strong> (Kumelemuel). It is not a business:
    it does not offer services, does not sell products, and has no commercial purpose.
  </p>
  <p>
    If you have any question about your information, you can write through the
    <a href="/en/contact/">contact form</a>.
  </p>

  <h2>2. What data I receive</h2>
  <p>Only what you choose to send through the contact form:</p>
  <ul>
    <li>Your name</li>
    <li>Your email address</li>
    <li>The content of your message</li>
  </ul>
  <p>Please do not include sensitive data in your message.</p>

  <h2>3. What I use it for</h2>
  <p>
    Only to read your message and reply to you personally. Your data is not used for commercial or advertising
    purposes, is not sold, is not shared with third parties, and is not published.
  </p>

  <h2>4. How long it is kept</h2>
  <p>
    The site has no database. Your message arrives in my personal inbox and is kept there
    for as long as the conversation lasts. The email delivery service may temporarily keep
    a technical log of the delivery, according to its own policies.
  </p>

  <h2>5. Services involved</h2>
  <p>
    The following services are used to run the site and may process data on servers
    located outside Mexico (mainly in the United States):
  </p>
  <ul>
    <li><strong>Vercel</strong>: website hosting and execution of the contact form.</li>
    <li><strong>Resend</strong>: delivery of the email containing your message.</li>
    <li><strong>Google (Gmail)</strong>: receipt of the email.</li>
    <li><strong>Vercel Web Analytics</strong>: aggregated, anonymous visit statistics (page views, country, device type), without cookies or persistent identifiers.</li>
  </ul>

  <h2>6. Your data, your choice</h2>
  <p>
    You can ask me at any time to tell you what data of yours I have, to correct it, or to delete
    your messages. Write through the <a href="/en/contact/">contact form</a> including the email address
    you wrote from; I will reply within a maximum of 20 business days.
  </p>

  <h2>7. Cookies</h2>
  <p>
    This site does not use cookies. Visit analytics works without cookies and cannot identify you.
  </p>

  <h2>8. Changes</h2>
  <p>
    If this notice changes, the current version will always be the one published here, along with its last updated date.
  </p>
</section>`,
      },
    },
  },
};

export function t(lang: Lang) {
  return ui[lang];
}
