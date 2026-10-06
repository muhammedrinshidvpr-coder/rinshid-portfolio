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
role: Built the web application, including room creation, code sharing, and screenshot uploads.
features:
  - Create or join a workspace using a five-character room code.
  - Post code snippets, copy them, or download them as named text files.
  - Upload screenshots and manually remove a workspace and its listed images.
technologies: [React, TypeScript, Supabase, Vite]
lessons:
  - A short room code makes joining simple, but is not the same as private account-based access.
  - An expiry countdown in the interface and actual server-side deletion are separate responsibilities.
limitations:
  - Access is based on a shared room code. Avoid putting sensitive files in a workspace.
  - The interface shows an expiry countdown; server-side automatic deletion still needs verification.
  - Items load when a workspace opens and after local changes. The current interface does not subscribe to live updates from another device.
source: https://github.com/muhammedrinshidvpr-coder/cosmiq-sync
demo: https://cosmiq-sync.vercel.app/
---
## A simpler handoff

I built CosmIQ Sync around a familiar lab workflow: finish a program on a shared computer, then take it to your own device. One device creates a room; the other joins with its code. There’s no account sign-in step.

The React interface uses Supabase for workspace data and image storage. Code can be copied or downloaded as a named file, and the workspace includes a manual cleanup action. The prototype makes the handoff easier to try while leaving room to improve access, updates, and cleanup.
