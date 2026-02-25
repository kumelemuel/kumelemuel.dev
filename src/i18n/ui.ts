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
        eyebrow: "INGENIERO DE SOFTWARE",
        title: "Construyo experiencias digitales robustas, rápidas y con impacto real.",
        intro:
          "Transformo ideas de producto en software mantenible con arquitectura clara, frontend cuidado y backend escalable.",
        card1Title: "Product Engineering",
        card1Body: "De la idea al release: enfoque en calidad, velocidad y resultados.",
        card2Title: "Backend y APIs",
        card2Body: "Servicios sólidos, contratos claros y observabilidad desde el inicio.",
        card3Title: "Entrega Limpia",
        card3Body: "Flujos de trabajo limpios, testing útil y despliegue continuo.",
      },
      who: {
        eyebrow: "INGENIERO DE SOFTWARE",
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
        eyebrow: "SOFTWARE ENGINEER",
        title: "I build digital experiences that are robust, fast, and meaningful.",
        intro:
          "I transform product ideas into maintainable software with clean architecture, polished frontend, and scalable backend.",
        card1Title: "Product Engineering",
        card1Body: "From idea to release with quality, speed, and measurable outcomes.",
        card2Title: "Backend & APIs",
        card2Body: "Reliable services, clear contracts, and observability by default.",
        card3Title: "Clean Delivery",
        card3Body: "Clean workflows, useful testing, and frictionless continuous delivery.",
      },
      who: {
        eyebrow: "SOFTWARE ENGINEER",
        title: "I build digital products that are elegant for users and reliable for teams.",
        summary:
          "I focus on turning ideas into production-ready software with clean architecture, thoughtful UX, and maintainable delivery practices.",
        pillar1Title: "Systems Thinking",
        pillar1Body: "From frontend to backend, I design solutions that scale with product growth.",
        pillar2Title: "Team Collaboration",
        pillar2Body: "I value clear communication, shared standards, and smooth handoffs.",
        pillar3Title: "Execution Quality",
        pillar3Body: "I ship fast without sacrificing correctness or clarity.",
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
