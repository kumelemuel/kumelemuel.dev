---
title: "cargo-bounded-context"
translationKey: "cargo-bounded-context"
summary: "Subcomando de Cargo que genera, con un solo comando, la estructura de un contexto delimitado en arquitectura hexagonal con Rust."
kind: lab
status: open-source
year: 2026
stack: ["Rust", "Cargo"]
links:
  repo: "https://github.com/kumelemuel/cargo-bounded-context"
order: 4
---

## Contexto

En mis backends en Rust cada contexto delimitado es un crate con las mismas capas y carpetas: dominio, aplicación e infraestructura. Crearlas a mano cada vez era repetitivo y propenso a olvidos, así que escribí una pequeña herramienta que lo hace por mí.

## Qué construí

Un subcomando de Cargo que se instala con `cargo install` y se usa así:

```
cargo bounded-context add <nombre>
```

Genera un crate nuevo con:

- **`domain`**: agregados, entidades, errores, eventos y objetos de valor.
- **`application`**: comandos, errores, políticas, resultados, casos de uso y puertos de entrada y salida.
- **`infrastructure`**: persistencia.
- Los `mod.rs` de cada carpeta ya enlazados, un `lib.rs` que expone las tres capas y su `Cargo.toml`.

## Decisiones

- **Subcomando de Cargo en vez de script**: un binario llamado `cargo-bounded-context` se integra solo con Cargo y queda disponible en cualquier proyecto.
- **Sin dependencias de plantillas**: la estructura vive en el propio código, así que la herramienta es pequeña y no necesita archivos externos.
- **No sobrescribe nada**: si el contexto ya existe, se detiene con un error en lugar de pisar el trabajo hecho.
