---
description: "Use when creating or editing pages that sell, rent, or promote a service, space, or product — such as the auditorium, classrooms, event spaces, or any page whose goal is to generate a contact/reservation/purchase. Covers CTA strategy, headline writing, urgency signals, and page structure."
applyTo: "components/auditorium/**,components/classrooms/**,components/page-templates/**"
---

# Conversion-Focused Page Design

Pages that sell or rent a space/service must generate desire and reduce friction — **not just describe what exists**.

## Core Principle

> Every section should answer: _"Why should the user act NOW?"_

Think like a landing page, not a brochure.

---

## Headlines

- Lead with the **benefit or outcome** for the client, not with the product name.
- ❌ `"Nosso Auditório"` → ✅ `"O Espaço Ideal para o Seu Evento"`
- ❌ `"Sobre o Espaço"` → ✅ `"Tudo o que você precisa em um só lugar"`
- Use the primary color highlight for the emotional/outcome part of the headline.

## CTA Strategy

- **Never have just one CTA** on a conversion page.
- Place CTAs at minimum: hero, mid-page (after describing features), after gallery, and final closing section.
- CTA copy must be action + benefit, not just a label:
  - ❌ `"Entre em contato"` → ✅ `"Verificar disponibilidade agora"`
  - ❌ `"Reservar"` → ✅ `"Garantir minha data"`
  - ❌ `"Ver mais"` → ✅ `"Gostou? Verifique a disponibilidade"`
- WhatsApp message text should mention the _intent_ (orçamento, reserva, disponibilidade), not just say "olá".

## Urgency & Trust Signals

Always include at least one of each in the hero:

- **Urgency**: `"Datas Disponíveis — Reserve Agora"`, `"Datas se esgotam rápido"`
- **Speed**: `"Resposta em até 1h"`, `"Respondemos no mesmo dia"`
- **Capacity/size**: visible badges (people count, area in m²)

## Self-Identification Section

For spaces that serve multiple use cases, add a section that lists event/use types (e.g., corporate events, graduations, weddings, lectures). This lets the user mentally place themselves in the space, which dramatically increases conversion intent.

- Use icons + label + short description per type
- Grid layout: 2 cols on mobile, 3 on desktop
- Follow with a CTA: `"Solicitar orçamento para o meu evento"`

## Features → Benefits Framing

- List section title: ❌ `"Recursos Disponíveis"` → ✅ `"Incluído na locação"`
- Each feature is a benefit. Prefer: `"Projetor HD"` → `"Projetor HD para apresentações impactantes"` when space allows.

## Closing Section (Required)

All conversion pages **must end** with a full-bleed section using the primary brand color that:

1. States the scarcity/urgency headline (`"Datas se esgotam rápido."`)
2. Has a supporting line that reduces hesitation
3. Contains two buttons: main CTA + softer secondary CTA (e.g., "Falar com a equipe")

```tsx
// Pattern
<section style={{ background: "var(--color-primary)" }}>
  <h2>
    Datas se esgotam rápido.
    <br />
    <span>Garanta a sua antes que alguém leve.</span>
  </h2>
  <p>
    Entre em contato e receba informações sobre disponibilidade e condições.
  </p>
  <Button>Verificar disponibilidade agora</Button>
  <Button variant="outline">Falar com a equipe</Button>
</section>
```

## Fallback Texts (constants/textFallbacks.ts)

Fallback texts for conversion pages must also be conversion-oriented:

- ❌ `"Nosso Auditório"` → ✅ `"O Espaço Ideal para o Seu Evento"`
- ❌ `"Entre em contato para saber mais."` → ✅ `"Estrutura completa para que você se preocupe apenas em aproveitar o evento."`

## Hero Secondary Action

If the page has a gallery, always add a ghost/outline secondary button in the hero that anchors to `#galeria`:

```tsx
<a href="#galeria">
  <Camera size={18} />
  Ver fotos do espaço
</a>
```

This serves users who are still in the consideration phase.
