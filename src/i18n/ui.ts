import type { Lang } from "./config";

type Messages = {
  header: {
    home: string;
    who: string;
    portfolio: string;
    articles: string;
    contact: string;
  };
  footer: {
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
  pages: {
    whoTitle: string;
    whoBiography: string;
    portfolioTitle: string;
    contactTitle: string;
    articlesTitle: string;
    articleRead: string;
    articlesEmpty: string;
    contactName: string;
    contactEmail: string;
    contactMessage: string;
    contactSend: string;
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
    };
    who: {
      eyebrow: string;
      title: string;
      summary: string;
      pillar1Title: string;
      pillar1Body: string;
      pillar2Title: string;
      pillar2Body: string;
      pillar3Title: string;
      pillar3Body: string;
      principle1: string;
      principle2: string;
      principle3: string;
    };
  };
};

export const ui: Record<Lang, Messages> = {
  es: {
    header: {
      home: "Inicio",
      who: "Quién soy",
      portfolio: "Portafolio",
      articles: "Artículos",
      contact: "Contacto",
    },
    footer: {
      privacy: "Privacidad",
      terms: "Términos",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
    },
    pages: {
      whoTitle: "Quién soy",
      whoBiography:
        "Soy Diego Arenas, ingeniero de software.<br><br>Mi trabajo profesional se desarrolla dentro de organizaciones privadas, donde diseño e implemento soluciones bajo objetivos, restricciones y marcos ya establecidos. Ese ejercicio me ha dado disciplina técnica, criterio arquitectónico y una comprensión práctica de cómo los sistemas evolucionan bajo presión real.<br><br>Kumelemuel nace de una necesidad distinta. No es un alter ego ni una ruptura, sino un espacio de autonomía. Es la dimensión donde puedo explorar el software sin condicionamientos externos, definiendo no solo la implementación, sino también los principios que la sostienen.<br><br>Con el tiempo entendí que el código no es únicamente una herramienta técnica. Es un mecanismo que formaliza reglas, incentivos y dinámicas de interacción. Cada decisión arquitectónica —desde un modelo de dominio hasta una regla de acceso— influye en el comportamiento de las personas que habitan el sistema. La tecnología no es neutral; siempre estructura posibilidades.<br><br>Kumelemuel es el lugar donde asumo esa responsabilidad de forma explícita. Aquí trabajo en proyectos open source, experimento con modelos de gobernanza digital y diseño sistemas que integran lo técnico y lo humano como un todo coherente.<br><br>No busco producir más software.<br>Busco diseñar sistemas que puedan sostenerse, evolucionar y aportar al bien común sin perder claridad ni intención.<br><br>Ese es el punto de encuentro entre el oficio y la conciencia.",
      portfolioTitle: "Portafolio",
      contactTitle: "Contacto",
      articlesTitle: "Artículos",
      articleRead: "Leer artículo",
      articlesEmpty: "No se encontraron artículos en src/data/articles.",
      contactName: "Nombre",
      contactEmail: "Correo",
      contactMessage: "Mensaje",
      contactSend: "Enviar",
      home: {
        eyebrow: "ARTESANO DEL SOFTWARE",
        title: "Construyo software con criterio, estructura y sentido humano.",
        intro:
          "Entiendo el software como oficio y como herramienta cultural. Desarrollo proyectos que buscan aportar al bien común, fortaleciendo lo humano, lo social y las estructuras que sostienen una convivencia más justa.",
        card1Title: "Oficio",
        card1Body: "El software como artesanía: disciplina, criterio y mejora continua.",
        card2Title: "Holistico",
        card2Body: "Concibo cada solución como un todo, integrando lo técnico y lo humano desde el diseño.",
        card3Title: "Propósito",
        card3Body: "Tecnología al servicio de lo humano y lo colectivo.",
      },
      who: {
        eyebrow: "ARTESANO DEL SOFTWARE",
        title: "Construyo productos digitales elegantes para usuarios y confiables para equipos.",
        summary:
          "Me enfoco en convertir ideas en software listo para producción con arquitectura limpia, UX cuidada y prácticas de entrega mantenibles.",
        pillar1Title: "Visión de Sistema",
        pillar1Body: "Diseño soluciones de frontend a backend que escalan con el producto.",
        pillar2Title: "Colaboración",
        pillar2Body: "Valoro comunicación clara, estándares compartidos y handoffs fluidos.",
        pillar3Title: "Calidad de Ejecución",
        pillar3Body: "Busco entregar rápido sin sacrificar claridad ni corrección técnica.",
        principle1: "Pragmático",
        principle2: "Orientado a producto",
        principle3: "Aprendiz continuo",
      },
    },
  },
  en: {
    header: {
      home: "Home",
      who: "Who am I?",
      portfolio: "Portfolio",
      articles: "Articles",
      contact: "Contact",
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    pages: {
      whoTitle: "Who am I?",
      whoBiography:
        "I am Diego Arenas, a software engineer.<br><br>My professional work takes place within private organizations, where I design and implement solutions under established goals, constraints, and frameworks. That practice has given me technical discipline, architectural judgment, and a practical understanding of how systems evolve under real pressure.<br><br>Kumelemuel is born from a different need. It is not an alter ego or a rupture, but a space of autonomy. It is the dimension where I can explore software without external conditioning, defining not only the implementation, but also the principles that sustain it.<br><br>Over time, I understood that code is not only a technical tool. It is a mechanism that formalizes rules, incentives, and interaction dynamics. Every architectural decision, from a domain model to an access rule, influences the behavior of the people who inhabit the system. Technology is not neutral; it always structures possibilities.<br><br>Kumelemuel is the place where I assume that responsibility explicitly. Here I work on open source projects, experiment with digital governance models, and design systems that integrate the technical and the human as one coherent whole.<br><br>I am not trying to produce more software.<br>I seek to design systems that can be sustained, evolve, and contribute to the common good without losing clarity or intention.<br><br>That is the meeting point between craft and awareness.",
      portfolioTitle: "Portfolio",
      contactTitle: "Contact",
      articlesTitle: "Articles",
      articleRead: "Read article",
      articlesEmpty: "No articles found in src/data/articles.",
      contactName: "Name",
      contactEmail: "E-mail",
      contactMessage: "Message",
      contactSend: "Send",
      home: {
        eyebrow: "SOFTWARE CRAFTSMAN",
        title: "I build software with judgment, structure, and human purpose.",
        intro:
          "I understand software as a craft and as a cultural tool. I build projects that seek to contribute to the common good, strengthening the human, the social, and the structures that sustain fairer coexistence.",
        card1Title: "Craft",
        card1Body: "Software as craftsmanship: discipline, judgment, and continuous improvement.",
        card2Title: "Holistic",
        card2Body: "I conceive each solution as a whole, integrating technical and human concerns from design.",
        card3Title: "Purpose",
        card3Body: "Technology in service of people and the collective.",
      },
      who: {
        eyebrow: "SOFTWARE CRAFTSMAN",
        title: "I build digital products that are elegant for users and reliable for teams.",
        summary:
          "I focus on turning ideas into production-ready software with clean architecture, thoughtful UX, and maintainable delivery practices.",
        pillar1Title: "Systems Vision",
        pillar1Body: "I design frontend-to-backend solutions that scale with product growth.",
        pillar2Title: "Collaboration",
        pillar2Body: "I value clear communication, shared standards, and smooth handoffs.",
        pillar3Title: "Execution Quality",
        pillar3Body: "I aim to ship fast without sacrificing clarity or technical correctness.",
        principle1: "Pragmatic",
        principle2: "Product-oriented",
        principle3: "Continuous learner",
      },
    },
  },
};

export function t(lang: Lang) {
  return ui[lang];
}
