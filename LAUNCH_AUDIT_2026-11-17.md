# Dasha English Practice Lab — Public Launch Audit
Date: 17 November 2026
Scope: GitHub code review of `dasha-english/toefl-practice-lab`; live Cloudflare pages and real devices have NOT been verified in this audit.

## Verdict
**Promising product structure, not yet public-launch verified.** The homepage already includes an interactive vocabulary demonstration, mobile navigation, optional muted-by-default sound, accessibility labels and responsive styling. The largest weakness is not a shortage of trainers: it is a fragmented visitor journey across several generations of pages.

## Verified findings

### P0 — Resolve before a broad public launch
1. **Content permission:** Reading tests appear to include questions and passages recreated from screenshots. ETS states that reproduction of its copyrighted TOEFL material requires permission, and says requests to reproduce it on publicly accessible or non-secure websites will not be granted. Verify ownership and rights of each passage, prompt, image and audio asset before promoting a public version. Develop independent, original exam-style content for public modules.
   - https://www.ets.org/legal/permissions/licensing.html
   - https://www.ets.org/legal/permissions/how-to-request.html
2. **Content accuracy:** The source header for `trainers/reading-practice-test-15-module-1.html` says some slots were reconstructed from low-resolution screenshots and need validation. Audit every answer key and explanation against the source before claiming a realistic scored simulation.
3. **Mobile function:** Independently test iPhone Safari and iPad Safari for blank iframes, frozen buttons, missing keyboard focus and scroll traps. A working desktop view does not establish iPad compatibility.
4. **Navigation:** Ensure all visible exercises are reachable from the catalogue and every trainer has a clear route back to the relevant section.

### P1 — Improve early release quality
5. **Two design systems:** `assets/site.css` powers older `labs/` and `exercises/` pages while `assets/styles.css` and `assets/test-practice.css` power the newer homepage and test practice pages. Standardise layouts and vocabulary gradually.
6. **Misleading placeholders:** The pre-audit `skill-builders.html` said all four trainer links were still to be added even though Build a Sentence, Complete the Words, Type It Faster and Oral Pattern Lab V3 already existed.
7. **Disconnected trainer links:** Reading tests 115 and 118 had `index.html` links that resolve inside `trainers/`; Complete the Words linked to a legacy file-name snapshot.
8. **Duplicated source files:** `test-practice (1).html` and the files named `Skill Builders _ dashaenglish..html` and `Test Practice _ dashaenglish..html` are confusing legacy assets. Do not delete them until hosting routing is checked.
9. **Funnel weakness:** The original site mentioned Dasha and linked to the main site but lacked a dedicated lessons/services journey and a clear contact call to action.
10. **Exactness of promises:** Avoid text promising “every TOEFL task type” while Listening and parts of Writing remain unavailable.

## Product navigation to aim for
Home → (Skill Builders OR Test Practice) → skill/task listing → exercise → result + explanation → retry or explore another task.
“Work with Dasha” should remain discoverable in the header, mobile menu and selected result screens without intrusive sales pop-ups.

## First implementation prepared in the review branch
- New `services.html`: TOEFL 1:1, IELTS/Academic English and Professional/Legal English with a direct contact CTA. No unverified prices.
- New `writing-practice.html`: accessible writing landing page linked to Build a Sentence and typing practice.
- Main navigation standardised across homepage, Skill Builders, Test Practice and Reading.
- Active links and refined line icons added to Skill Builders.
- Reading and Complete the Words return links repaired.
- Exercise iframe wrappers restyled to fit the new header and given “open directly” fallback links.
- Original `trainers/word-formation-blitz.html` prototype with 15 original items, timed/untimed modes, explanations, retry and browser-only best score. The instructional content and runtime still need testing.
- Static audit of the primary page link paths passed for the files checked. This does NOT substitute for browser testing.

## Next small trainers ranked by launch value
| Exercise | Student appeal | Build effort | Content audit |
| --- | --- | --- | --- |
| Word Formation Blitz | High: quick success and academic relevance | Low | Verify each correct word form and distractor |
| Fix the Sentence | High: easy to understand and score | Low | One unambiguous correction per question |
| Collocation Match | High: useful and replayable | Low | Match each word pair uniquely |
| Paraphrase Challenge | High: applicable to Reading and Writing | Low–medium | Check semantic equivalence carefully |
| Email Tone Fix | High: familiar real-life context | Low | Review politeness and register |
| Idea Builder mini-sprint | Medium–high: bridges Speaking and Writing | Medium | Review logical argument coherence |

## AI-feasible features
- Easy: short practice rounds, timed/untimed switch, randomized original task bank, deterministic answer feedback, retry mistakes, keyboard controls, category filters, mobile-friendly review.
- Moderate: browser-only practice history, daily challenge, shareable result card, progress per skill, saved session and resume, print/download a result.
- Harder: trustworthy free-response assessment, natural voice grading, adaptive difficulty, cross-device accounts and synchronisation. These require stronger validation and usually a backend. Do not imply that a deterministic answer checker provides ETS-equivalent scoring.

## Design recommendations
- Keep the newer blue/soft-neutral visual language, ample whitespace and friendly illustrations.
- Use one icon style across all category cards rather than mixing screenshot placeholders, emoji and old layouts.
- On section pages, make exercises the primary content immediately; avoid large empty hero regions above the first task.
- Use consistent names for “Practice,” “Skill Builders,” “Try,” “Review” and “Work with me.”
- Keep the dinosaur as a restrained brand character instead of decorating every page with it.
- Add a visible route back after completing a task, particularly inside standalone Reading simulators.

## Before merging this draft branch
- [ ] Verify the deployed preview URL resolves to HTML rather than raw source.
- [ ] Test Home → Skill Builders → each exercise → Back on desktop, iPhone Safari and iPad Safari.
- [ ] Test Home → Test Practice → Reading and Writing routes.
- [ ] Test each Reading simulator start, clock, answer selection, finish, evidence highlighting and review.
- [ ] Verify all source answer keys and question wording independently.
- [ ] Confirm original-content rights and third-party trademark compliance. See https://www.ets.org/legal/trademarks.html
- [ ] Test browser back navigation, narrow screen widths and keyboard navigation.
- [ ] Verify audio on supported browsers and permissions where audio is present.
- [ ] Test that every contact CTA opens the intended professional channel.
- [ ] Review the new Word Formation Blitz as a teacher before presenting it as an established trainer.
- [ ] Confirm Cloudflare deployment source and main branch mapping before merging.

This is a source-code and information architecture audit, not a passed end-to-end production QA certification.
