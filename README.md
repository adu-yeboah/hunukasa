# Hunukasa Twi

**A free, open-source Asante Twi course.** Hunukasa means "understand language":
our mission is helping the diaspora and friends of Ghana actually *speak* Twi —
greetings, market, directions, respecton a curriculum that's verifiably real,
not invented.

**The curriculum is adapted from the public-domain
[FSI Twi Basic Course](https://fsi-languages.yojik.eu/languages/FSI/Twi/Basic/FSI%20-%20Twi%20Basic%20Course%20-%20Student%20Text.pdf)
(US Foreign Service Institute, 1963, 20 units + 5 hrs of native audio) and the
Peace Corps "Twi For All" lessons**every unit in the app cites its source.
Free forever. Community-built. See the provenance statement in
`TWI_COURSE_CONTENT.md`.

## The plan

> **[ACTION_PLAN.md](ACTION_PLAN.md) is the current plan.** Start there.
> Community-first: build the verified Stage 0–1 slice → open the doors →
> invite native-speaker reviewers and contributors.

| Doc | What it is |
|---|---|
| [ACTION_PLAN.md](ACTION_PLAN.md) | **The current plan** (phases, exit tests, what we dropped) |
| [TWI_PLAN.md](TWI_PLAN.md) | Why the FSI backbone; competitor landscape |
| [TWI_COURSE.md](TWI_COURSE.md) | The course handbookstages, timing, lesson arcs, practice |
| [TWI_COURSE_CONTENT.md](TWI_COURSE_CONTENT.md) | The exact content spec (units, dialogues, exercises, citations) |
| [COURSE_DESIGN.md](COURSE_DESIGN.md) | Pedagogythe exercise ladder and how practice works |
| [DESIGN.md](DESIGN.md) | Design system (palette, Nsoromma mascot, motion) |

## Repo layout

- `web/`Next.js prototype & design system (`/design`, `/mascot`)
- `app/`Expo (React Native) app; the playable core loop
- Assets are generated from source: `web/scripts/` (mascot GIFs, app icons, Figma kit)

## Run it

```bash
# web prototype
cd web && npm install && npm run dev        # http://localhost:3000

# mobile (Expo)
cd app && npm install && npx expo start
```

## Help build it

The course improves through native-speaker review. Watch this space —
contribution lanes (30-minute unit reviews, content authoring, code) land with
the Phase 1 open-sourcing. Found a phrase that sounds wrong? That instinct is
exactly what the project needs.
