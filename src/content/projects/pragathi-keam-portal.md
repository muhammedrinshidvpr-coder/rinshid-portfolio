---
title: Pragathi KEAM Portal
slug: pragathi-keam-portal
summary: A student-facing admissions help desk that brings historical cutoffs, learning resources, and department contacts together.
status: prototype
draft: false
featured: true
order: 3
problem: College applicants need to navigate cutoff information and find the right help-desk contact, often on a phone.
audience: KEAM aspirants and students looking for TKM College of Engineering help-desk resources.
role: Developer credited in the public repository, built for the Pragathi help-desk context.
features:
  - A cutoff-predictor section alongside events and answer-key resources.
  - Department help-desk and general contact sections.
  - Supabase-backed data and an administration area for maintaining resources.
technologies: [TanStack Start, React, Supabase, Tailwind CSS]
lessons:
  - Admissions information needs understandable context as well as a searchable interface.
  - Student-facing information and the tools for maintaining it serve different users.
limitations:
  - Historical cutoffs are reference information, not a guarantee of admission or current eligibility.
  - Applicants should verify dates, rules, and allotment decisions with official admissions sources.
  - Adoption totals and institutional endorsement are not asserted in this case study.
source: https://github.com/muhammedrinshidvpr-coder/pragathi-keam-portal
---
## One place to start asking questions

This portal groups the resources a new applicant might need: cutoff exploration, answer keys, events, and ways to reach a department help desk. The public code organizes these as separate sections rather than one long set of unstructured links.

## A maintained information tool

The repository uses TanStack Start with React and a Supabase data layer. Its administration tools support updating the reference information. The important boundary is between helping someone explore past data and making a promise about a future admission result.
