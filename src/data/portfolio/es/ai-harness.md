---
title: "AI Harness"
translationKey: "ai-harness"
summary: "Harness reutilizable para agentes de IA: mis principios de arquitectura y artesanía escritos una sola vez y empaquetados como plugins de Claude Code, con verificación automática y katas que miden calidad y costo."
kind: lab
status: open-source
year: 2026
stack: ["Claude Code", "Python", "Rust", "Astro", "TypeScript", "GitHub Actions"]
links:
  repo: "https://github.com/kumelemuel/ai-harness"
order: 3
---

## Contexto

Cuando un agente de IA escribe código, las convenciones del equipo suelen vivir en la cabeza de alguien o repartidas en prompts que se contradicen. AI Harness reúne las mías (arquitectura hexagonal, manejo de errores, TDD, verificación y calidad de sitios web) en un solo lugar, sin atarlas a ninguna herramienta, y las entrega al agente solo cuando las necesita.

## Qué construí

- **Principios como fuente de verdad** en `core/`, un archivo por tema, con identificadores estables (`HEX-4`, `ERR-2`, `WEB-7`). Cada principio tiene regla, fundamento, violaciones típicas y cómo se verifica.
- **Dos plugins de Claude Code** publicados como marketplace: `craft-backend` (hexagonal, errores, TDD y Rust) y `craft-web` (principios web, Astro y proceso comercial). Incluyen skills, subagentes revisores y _hooks_.
- **Plantillas ejecutables** para Rust (workspace Cargo por capas, con tests de arquitectura) y para Astro en Cloudflare Workers.
- **_Hooks_ que hacen cumplir las reglas**: tras cada edición formatean y corren los tests de arquitectura; antes de que el agente termine, exigen `clippy` y la suite completa en verde.
- **Un verificador de consistencia** en Python que falla si un ID citado no existe, si un enlace o symlink está roto, si un test citado como garantía no existe o si un plugin cambió sin subir su versión.
- **Katas de evaluación** con tests de aceptación ocultos que miden si el agente resuelve bien una tarea típica y cuánto cuesta.

## Decisiones

- **Una sola copia de cada principio**: las skills enlazan los documentos de `core/` con symlinks en vez de copiarlos, así no se desincronizan.
- **Medir antes de recomendar**: las katas mostraron que implementar con Sonnet y revisar con Opus cuesta un 24 % menos que usar solo Opus, con hallazgos comparables. Por eso el revisor de arquitectura fija su modelo.
- **Toda regla dice cómo se verifica**: un inventario asigna a cada principio un mecanismo (test, herramienta o revisor), y el CI comprueba que esa promesa sea real.
- **Instalación por proyecto**: cada plugin se activa solo en el tipo de repositorio donde aplica, para que el agente no cargue reglas de backend en un sitio web.
