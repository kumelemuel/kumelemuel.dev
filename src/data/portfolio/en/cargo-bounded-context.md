---
title: "cargo-bounded-context"
translationKey: "cargo-bounded-context"
summary: "A Cargo subcommand that scaffolds, in a single command, the structure of a bounded context in hexagonal architecture with Rust."
kind: lab
status: open-source
year: 2026
stack: ["Rust", "Cargo"]
links:
  repo: "https://github.com/kumelemuel/cargo-bounded-context"
order: 4
---

## Context

In my Rust backends, each bounded context is a crate with the same layers and folders: domain, application and infrastructure. Creating them by hand every time was repetitive and easy to get wrong, so I wrote a small tool to do it for me.

## What I built

A Cargo subcommand installed with `cargo install` and used like this:

```
cargo bounded-context add <name>
```

It generates a new crate with:

- **`domain`**: aggregates, entities, errors, events and value objects.
- **`application`**: commands, errors, policies, results, use cases, and inbound and outbound ports.
- **`infrastructure`**: persistence.
- The `mod.rs` of every folder already wired up, a `lib.rs` exposing the three layers, and its `Cargo.toml`.

## Decisions

- **A Cargo subcommand instead of a script**: a binary named `cargo-bounded-context` integrates with Cargo automatically and is available in any project.
- **No template files**: the structure lives in the code itself, so the tool stays small and needs no external files.
- **It never overwrites**: if the context already exists, it stops with an error instead of clobbering existing work.
