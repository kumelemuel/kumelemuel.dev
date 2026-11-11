---
# TODO: review the text (inferred from the repository code, which has no README).
title: "Kumenity"
translationKey: "kumenity"
summary: "Rust backend for a community platform: accounts, communities and memberships modeled with hexagonal architecture and domain-driven design."
kind: lab
status: open-source
year: 2025
stack: ["Rust", "Axum", "Tokio", "JWT", "Argon2"]
links:
  repo: "https://github.com/kumelemuel/kumenity-backend-rust"
order: 1
---

## Context

Kumenity is the backend of a platform for creating and running communities. I use it as a lab to practice **hexagonal architecture** and **domain-driven design (DDD)** in Rust, with explicit business rules that are tested from day one. It is a work in progress.

## What I built

A Cargo workspace with one crate per bounded context and an HTTP API that exposes them:

- **`iam` (identity and access)**: sign-up, account verification with a code, identification and sign-in. Passwords are stored with Argon2 and sessions use JWT.
- **`communities`**: creating communities with a unique name and slug, and membership policies (open, by invitation, by application or closed).
- **`membership`**: members with a nickname, a status and roles (owner, admin and member), each with its own permissions.
- **`shared`**: common errors and the authentication context.
- **`apps/api`**: the Axum API, with routes such as `/sign-up`, `/verify`, `/sign-in` and `/communities/create`, and a middleware that validates the token.

## Decisions

- **Ports and adapters**: each context separates domain, application (use cases, inbound and outbound ports) and infrastructure. The domain does not depend on Axum, the database or the hashing algorithm.
- **Statuses as state machines**: an account's status (registered, active, suspended, deactivated or deleted) only changes through allowed transitions, and deleted is final.
- **Value objects that validate on creation**: an email, username, slug or password can never exist in an invalid state.
- **In-memory persistence behind a port**: it lets me test the use cases and move the domain forward before choosing a database.
