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
role: Built the portal for the Pragathi help-desk context, bringing student resources into one interface.
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
source: https://github.com/muhammedrinshidvpr-coder/pragathi-keam-portal
---
## Bringing the information together

I built the portal to give applicants one place to explore cutoff information, find answer keys and events, and reach a department help desk. Each resource has its own section so visitors can start with the question they have.

TanStack Start and React provide the interface, while Supabase stores the reference information. An administration area supports maintaining the resources. The predictor helps people explore historical cutoffs; official admissions sources remain the place to check current rules and decisions.
