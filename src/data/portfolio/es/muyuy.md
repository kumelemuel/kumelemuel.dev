---
# TODO: revisar el texto (deducido del código del repositorio, que no tiene README).
title: "Muyuy"
translationKey: "muyuy"
summary: "Motor de juego de rol 2D escrito desde cero en Rust, con renderizado en GPU, entidades y componentes, y la historia, los mapas y los personajes en Lua."
kind: lab
status: open-source
year: 2025
stack: ["Rust", "wgpu", "WGSL", "winit", "hecs", "Lua"]
links:
  repo: "https://github.com/kumelemuel/muyuy"
order: 2
---

## Contexto

Muyuy es un juego de rol 2D y, sobre todo, el motor que lo hace funcionar, escrito desde cero en Rust. Es mi laboratorio para entender cómo funciona un motor por dentro (render en GPU, bucle de juego, entidades y _scripting_) y para probar que la arquitectura hexagonal también sirve fuera de las aplicaciones web. Está en desarrollo.

## Qué construí

- **Render en GPU con wgpu** y _shaders_ propios en WGSL: dibujo de _sprites_ por instancias, composición de capas y transiciones entre escenas.
- **Mundo con entidades y componentes (ECS)** usando hecs, con sistemas de movimiento, colisiones, animación, entrada y dibujo.
- **Mapas de _tiles_** diseñados en Tiled, con capas, colisiones, portales, escaleras y cámara.
- **Un «multiverso» navegable**: reinos, pueblos y segmentos que forman el mapa del mundo.
- **Contenido en Lua**: las etapas (como la pantalla de arranque con sus fundidos), los personajes, sus diálogos y las escenas de la historia se escriben como scripts cargados con mlua.
- **Texto en pantalla** con glyphon y entrada de teclado con winit.

## Decisiones

- **Dominio separado de la tecnología**: gráficos, entrada, mapas, personajes y _scripting_ se definen con puertos, y wgpu, winit, hecs y mlua son adaptadores intercambiables.
- **El motor en Rust y el contenido en Lua**: la historia, los diálogos y el comportamiento de los personajes se pueden cambiar sin recompilar, y quedan separados del código del motor.
- **Historia basada en datos**: cada escena declara dónde empieza, su narración (texto, pausas y efectos) y los indicadores de historia que cambia.
