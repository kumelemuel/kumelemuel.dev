---
# TODO: confirmar rol, año de inicio y si hay repositorio público (deducidos de la app publicada).
title: "Pictos"
translationKey: "pictos"
summary: "PWA de accesibilidad cognitiva: explica con pictogramas, paso a paso, cómo hacer trámites en distintos servicios y permite a la comunidad evaluar qué tan accesibles son."
kind: featured
status: pwa
role: "Desarrollo"
year: 2025
stack: ["Vue 3", "Pinia", "Vue Router", "Vue I18n", "Vite", "PWA", "Web Speech API"]
links:
  site: "https://app.pictos.cl"
cover: "../../../assets/portfolio/pictos.webp"
coverAlt: "Pantalla de bienvenida de Pictos: ilustración de una persona pulsando el botón de audio en un teléfono y el texto «Activa el audio»"
order: 2
---

## Contexto

Para muchas personas con discapacidad cognitiva, o que simplemente tienen dificultades con la lectura, hacer un trámite en un lugar desconocido es una barrera: señalética confusa, instrucciones extensas y pasos que nadie explica. Pictos nace para facilitar esas tareas «en pasos simples» y, al mismo tiempo, para que la comunidad muestre qué lugares son accesibles y cuáles necesitan mejorar.

## Qué construí

Una aplicación web progresiva (PWA) instalable en el teléfono, con dos grandes funciones:

- **Ayudas para realizar tareas**: se busca un lugar o servicio (por ejemplo, una estación de metro o un terminal de buses) y la app muestra las tareas que se pueden hacer ahí, explicadas paso a paso con pictogramas.
- **Evaluación de accesibilidad**: cualquier persona puede evaluar un lugar en varias capas (comprensión de mensajes y señales, tamaño de letra, colores y contraste, limpieza, iluminación y acústica), con fotos opcionales. El resultado se resume en un nivel: malo, regular, bueno o excelente.

Además:

- **Audio en todas las pantallas** para quien no puede o no quiere leer.
- **Ubicación**: lugares con ayudas cerca, con opción de cambiar de comuna o verlos en el mapa.
- **Aportes de la comunidad**: sugerir lugares nuevos o crear una tarea con entre 3 y 9 pasos y su apoyo gráfico, sujeta a aprobación.
- **Guía de instalación** según el dispositivo, para agregar Pictos a la pantalla de inicio.

## Decisiones

- **PWA en lugar de app nativa**: se instala desde el navegador, sin pasar por las tiendas de aplicaciones, y una sola base de código sirve en Android, iOS y escritorio.
- **Vue 3 con Pinia y Vue Router**: estado centralizado para la ubicación, el perfil y el avance de las evaluaciones, y navegación por pantallas pensada como un flujo guiado.
- **Lectura en voz alta con la Web Speech API**: el audio usa la síntesis de voz del propio dispositivo, sin grabar ni descargar archivos.
- **Diseño cognitivamente accesible**: una idea por pantalla, textos breves, botones grandes, indicador de «paso X de Y» e ilustraciones de apoyo.
- **Textos centralizados con Vue I18n**, lo que facilita ajustar el lenguaje y abre la puerta a otros idiomas.

<!-- TODO: añadir una sección «Aprendizajes» con lo que aprendiste en este proyecto. -->
