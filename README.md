# Dasha English TOEFL Practice Lab — Starter v1

## Open locally
Unzip the folder and open `index.html` in a browser. All pages are linked using relative paths.

## What works
- 7 lab category pages grouped into Exam Practice and Skill Boosters.
- Build a Sentence and Type It Faster available from their relevant lab pages.
- Each preexisting trainer is loaded in its own iframe to isolate its JavaScript and CSS.
- Grammar Lab also links to the same Build a Sentence page (no duplicate trainer).
- TOEFLsaurus image assets are stored locally.

## What still needs work
- Speaking and Reading trainer files weren't present in the available set; placeholders are intentional.
- Test the trainers themselves, particularly timer behavior, mobile scroll, iframe height, browser accessibility and page reload.
- Replace iframe prototypes with reusable self-contained modules over time, using a shared component library and content bank.
- Add deployment pipeline, automated tests, progress tracking, privacy notice, and optional accounts only when needed.

## Suggested hosting
Deploy this directory as a static site using Cloudflare Pages, Netlify, or similar. For a custom domain, use lab.dashaenglish.pro once you choose a host. No account or database is required at this stage.

## Content editing
Edit lab listings in `labs/*.html`. Trainer code is kept intact in `trainers/*.html` until each is reviewed.
