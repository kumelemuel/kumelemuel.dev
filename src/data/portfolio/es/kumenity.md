---
# TODO: revisar el texto (deducido del código del repositorio, que no tiene README).
title: "Kumenity"
translationKey: "kumenity"
summary: "Backend en Rust para una plataforma de comunidades: cuentas, comunidades y membresías modelados con arquitectura hexagonal y diseño guiado por el dominio."
kind: lab
status: open-source
year: 2025
stack: ["Rust", "Axum", "Tokio", "JWT", "Argon2"]
links:
  repo: "https://github.com/kumelemuel/kumenity-backend-rust"
order: 1
---

## Contexto

Kumenity es el backend de una plataforma para crear y gestionar comunidades. Lo uso como laboratorio para practicar **arquitectura hexagonal** y **diseño guiado por el dominio (DDD)** en Rust, con reglas de negocio explícitas y probadas desde el primer día. Está en desarrollo.

## Qué construí

Un _workspace_ de Cargo con un crate por contexto delimitado y una API HTTP que los expone:

- **`iam` (identidad y acceso)**: registro, verificación de la cuenta con código, identificación e inicio de sesión. Las contraseñas se guardan con Argon2 y las sesiones usan JWT.
- **`communities`**: creación de comunidades con nombre y _slug_ únicos, y políticas de ingreso (abierta, por invitación, por solicitud o cerrada).
- **`membership`**: miembros con apodo, estado y roles (propietario, administrador y miembro), cada uno con sus permisos.
- **`shared`**: errores comunes y el contexto de autenticación.
- **`apps/api`**: la API con Axum, rutas como `/sign-up`, `/verify`, `/sign-in` y `/communities/create`, y un middleware que valida el token.

## Decisiones

- **Puertos y adaptadores**: cada contexto separa dominio, aplicación (casos de uso, puertos de entrada y salida) e infraestructura. El dominio no depende de Axum, de la base de datos ni del algoritmo de hash.
- **Estados como máquinas de transición**: el estado de una cuenta (registrada, activa, suspendida, desactivada o eliminada) solo cambia por transiciones permitidas, y eliminar es un estado final.
- **Objetos de valor que validan al crearse**: email, nombre de usuario, _slug_ o contraseña no pueden existir en un estado inválido.
- **Persistencia en memoria detrás de un puerto**: permite probar los casos de uso y avanzar en el dominio antes de elegir la base de datos.
