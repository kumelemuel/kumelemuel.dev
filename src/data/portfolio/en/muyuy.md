---
# TODO: review the text (inferred from the repository code, which has no README).
title: "Muyuy"
translationKey: "muyuy"
summary: "2D role-playing game engine written from scratch in Rust, with GPU rendering, entities and components, and the story, maps and characters in Lua."
kind: lab
status: open-source
year: 2025
stack: ["Rust", "wgpu", "WGSL", "winit", "hecs", "Lua"]
links:
  repo: "https://github.com/kumelemuel/muyuy"
order: 2
---

## Context

Muyuy is a 2D role-playing game and, above all, the engine that runs it, written from scratch in Rust. It is my lab for understanding how an engine works inside (GPU rendering, the game loop, entities and scripting) and for testing that hexagonal architecture also works outside web applications. It is a work in progress.

## What I built

- **GPU rendering with wgpu** and custom WGSL shaders: instanced sprite drawing, layer composition and scene transitions.
- **An entity-component world (ECS)** with hecs, with movement, collision, animation, input and drawing systems.
- **Tile maps** designed in Tiled, with layers, collisions, portals, stairs and a camera.
- **A navigable "multiverse"**: realms, towns and segments that make up the world map.
- **Content in Lua**: stages (such as the boot screen with its fades), characters, their dialogue and the story scenes are written as scripts loaded with mlua.
- **On-screen text** with glyphon and keyboard input with winit.

## Decisions

- **Domain separated from technology**: graphics, input, maps, characters and scripting are defined through ports, and wgpu, winit, hecs and mlua are swappable adapters.
- **Engine in Rust, content in Lua**: the story, dialogue and character behavior can change without recompiling, and stay separate from the engine code.
- **Data-driven story**: each scene declares where it starts, its narration (text, pauses and effects) and the story flags it changes.
