---
title: "AI Harness"
translationKey: "ai-harness"
summary: "A reusable harness for AI agents: my architecture and craftsmanship principles written once and packaged as Claude Code plugins, with automated verification and katas that measure quality and cost."
kind: lab
status: open-source
year: 2026
stack: ["Claude Code", "Python", "Rust", "Astro", "TypeScript", "GitHub Actions"]
links:
  repo: "https://github.com/kumelemuel/ai-harness"
order: 3
---

## Context

When an AI agent writes code, a team's conventions usually live in someone's head or are scattered across prompts that contradict each other. AI Harness gathers mine (hexagonal architecture, error handling, TDD, verification and website quality) in one place, without tying them to any tool, and hands them to the agent only when it needs them.

## What I built

- **Principles as the source of truth** in `core/`, one file per topic, with stable identifiers (`HEX-4`, `ERR-2`, `WEB-7`). Each principle has a rule, a rationale, typical violations and how it is verified.
- **Two Claude Code plugins** published as a marketplace: `craft-backend` (hexagonal, errors, TDD and Rust) and `craft-web` (web principles, Astro and client delivery). They include skills, reviewer subagents and hooks.
- **Runnable templates** for Rust (a layered Cargo workspace with architecture tests) and for Astro on Cloudflare Workers.
- **Hooks that enforce the rules**: after each edit they format the file and run the architecture tests; before the agent finishes, they require `clippy` and the full test suite to pass.
- **A consistency checker** in Python that fails when a cited ID does not exist, a link or symlink is broken, a test cited as a guarantee does not exist, or a plugin changed without bumping its version.
- **Evaluation katas** with hidden acceptance tests that measure whether the agent solves a typical task correctly and how much it costs.

## Decisions

- **One copy of each principle**: skills link the documents in `core/` through symlinks instead of copying them, so they never drift apart.
- **Measure before recommending**: the katas showed that implementing with Sonnet and reviewing with Opus costs 24% less than using Opus alone, with comparable findings. That is why the architecture reviewer pins its model.
- **Every rule states how it is verified**: an inventory assigns each principle a mechanism (test, tool or reviewer), and CI checks that the promise holds.
- **Per-project installation**: each plugin activates only in the kind of repository where it applies, so the agent does not load backend rules in a website.
