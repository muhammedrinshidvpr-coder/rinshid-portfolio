---
title: CosmIQ Sync
slug: cosmiq-sync
summary: A shared workspace for moving code snippets and screenshots between a lab computer and your own device.
status: prototype
draft: false
featured: true
order: 2
problem: Getting a small piece of work off a shared lab computer often means signing into a personal account or emailing a file to yourself.
audience: Engineering students working between shared computers and personal devices.
role: Developer of the public CosmIQ Sync web application.
features:
  - Create or join a workspace using a five-character room code.
  - Post code snippets, copy them, or download them as named text files.
  - Upload screenshots and manually remove a workspace and its listed images.
technologies: [React, TypeScript, Supabase, Vite]
lessons:
  - A short room code makes joining simple, but is not the same as private account-based access.
  - An expiry countdown in the interface and actual server-side deletion are separate responsibilities.
limitations:
  - A shared room code is an access mechanism; this should not be treated as a confidential file vault.
  - Retention descriptions differ between older portfolio copy and the repository. Automatic deletion is not guaranteed by this case study.
  - The reviewed workspace fetches items on load and after local changes; automatic cross-device live updates are not claimed here.
source: https://github.com/muhammedrinshidvpr-coder/cosmiq-sync
demo: https://cosmiq-sync.vercel.app/
---
## Built around the lab workflow

The starting point is familiar: finish a program on a shared machine, then find a way to take it home. CosmIQ Sync gives that handoff a dedicated interface. One device opens a room; the other joins with its code.

Code snippets and screenshots have separate views. Snippets can be copied or downloaded with a chosen filename, and the workspace includes a manual cleanup action.

## What the prototype explores

The application connects a React interface to Supabase database and storage operations. It is an exploration of low-friction sharing, with explicit trade-offs around room access, refresh behavior, and cleanup. The public source is available for anyone who wants to inspect those decisions.
