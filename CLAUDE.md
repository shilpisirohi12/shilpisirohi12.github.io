# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static portfolio website for Shilpi Sirohi, deployed on GitHub Pages at `shilpisirohi12.github.io`. No build system, no package manager, no dependencies — pure HTML, CSS, and vanilla JS.

## Development

Open `index.html` directly in a browser. No build step or server required. For live reload, use any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

Deploy by pushing to the `master` branch — GitHub Pages auto-publishes from there. The `CNAME` file controls the custom domain.

## Architecture

**Single-page layout:** `index.html` is the entire site. All content lives inline; it is the source of truth for personal data (name, jobs, skills, etc.).

**Two-column layout:** A fixed-width sidebar (`<aside class="sidebar">`) + scrollable main content (`<main class="main-content">`). On screens ≤960px the sidebar hides and a mobile header with a hamburger drawer replaces it.

**Theming:** CSS custom properties in `:root` (dark) and `[data-theme="light"]` blocks in `css/style.css` control all colors. Switching themes sets `data-theme` on `<html>` and persists via `localStorage`.

**Key CSS patterns:**

- `.reveal` / `.reveal.visible` — scroll-triggered fade-in (IntersectionObserver in `js/script.js`)
- `.bar-fill` / `.bar-fill.animated` — skill bar animation, triggered when `#skills` scrolls into view; percentage set via `style="--w:XX%"`
- `.tl-extra` / `.tl-card.expanded` — extra experience bullets hidden by default, shown when card gets `.expanded` class
- `.tl-expand-btn` — the Show more/less toggle button inside each experience card

**JS responsibilities** (`js/script.js`):

- Theme toggle (both sidebar `#themeToggle2` and mobile `#themeToggle`)
- Mobile burger menu open/close
- Active sidebar nav link tracking on scroll
- Scroll reveal observer
- Skill bar animation observer
- Experience expand/collapse
- Smooth scroll for anchor links

## Content Editing Guide

All personal content is in `index.html`:

- **Sidebar:** name, title, subtitle, location, nav links, social URLs, resume PDF link — inside `<aside class="sidebar">`
- **About:** paragraphs, info grid (location/email/phone/status), stats row — `<section id="about">`
- **Experience:** each job is a `.tl-item`; first 3 `<li>` are always visible, additional ones need class `tl-extra`
- **Skills:** each `.bar-fill` has `style="--w:XX%"` for the bar width and a sibling `.skill-pct` span for the label
- **Projects:** `.proj-card` blocks; add `class="proj-link live"` for live demo links
- **Certifications:** `.cert-badge` color set by class (`oracle`, `safe`, `aws`)
- **Resume:** replace `Shilpi_Sirohi-Resume.pdf` in the root; the `href` is in the sidebar `.resume-btn`

## Design Tokens

Dark theme accent: `#00e5b0` (mint green). Light theme accent: `#1565c0` (royal blue). Background layers: `--bg` → `--bg-surface` → `--bg-card` (progressively lighter). All defined in the `:root` block at the top of `css/style.css`.
