# Shilpi Sirohi — Static Portfolio Website

A static single-page portfolio built with vanilla HTML, CSS, and JavaScript.
Compatible with GitHub Pages. Live site: https://shilpisirohi.com/

---

## Project Structure

```
learn-claude/
├── index.html          # Single page — all sections here
├── css/
│   └── style.css       # All styles, themes, responsive breakpoints
├── js/
│   └── script.js       # Theme toggle, scroll animations, nav, expand/collapse
├── images/
│   ├── image.png       # Color scheme reference
│   └── image-1.png     # Theme toggle button reference
└── CLAUDE.md
```

---

## Sections (in order)

| Section        | ID                 | Notes                                              |
|----------------|--------------------|----------------------------------------------------|
| About          | `#about`           | Full-width, info grid (4-col), 4 stat cards        |
| Experience     | `#experience`      | Timeline cards, show 3 bullets, expand to show all |
| Education      | `#education`       | Cards with year, degree, school, GPA               |
| Skills         | `#skills`          | Animated bar charts, triggered on scroll           |
| Projects       | `#projects`        | Cards with live/GitHub links and tech tags         |
| Certifications | `#certifications`  | Oracle, SAFe, AWS cards with colored badges        |
| Interests      | `#interests`       | Icon cards grid                                    |
| Contact        | `#contact`         | Email CTA + social links                           |

---

## Left Sidebar (desktop only, sticky)

- Avatar (initials "SS", gradient circle)
- Name: Shilpi Sirohi
- Title: Senior Software Engineer
- Subtitle: Java · Spring Boot · AI Enthusiast · AWS Cloud
- Location: Mississauga, ON
- Navigation links (all 8 sections, with SVG icons)
- Social icons: GitHub, LinkedIn, Email (each with `aria-label`)
- Resume button → `resume.pdf`
- Theme toggle pill (Night Mode / Day Mode) — matches `images/image-1.png`

On mobile (<960px): sidebar is hidden; replaced by a fixed top header with burger menu + drawer nav.

---

## Theme

- Default: **dark** (deep navy `#060e20` + mint `#00e5b0`)
- Light: white/blue (`#f0f8ff` + royal blue `#1565c0`)
- Persisted in `localStorage`
- Toggle updates both sidebar pill and mobile emoji button

---

## Key Behaviors (JavaScript)

- **Theme toggle** — both sidebar (`#themeToggle2`) and mobile (`#themeToggle`) buttons call `applyTheme()`
- **Active nav** — sidebar nav item highlights based on scroll position
- **Scroll reveal** — `.reveal` elements fade in via `IntersectionObserver`
- **Skill bars** — `.bar-fill` elements animate (`scaleX 0→1`) when `#skills` scrolls into view; staggered by 60ms per bar
- **Experience expand** — `.tl-expand-btn` toggles `.expanded` on `.tl-card`; extra bullets use class `.tl-extra`
- **Smooth scroll** — all `a[href^="#"]` anchors use `scrollTo` with mobile offset (64px)

---

## SEO & Accessibility (added)

- `<meta name="description">` — keyword-rich summary
- `<meta name="author">`, `<meta name="robots">`, `<link rel="canonical">`
- Open Graph tags: `og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`
- Twitter Card meta tags
- JSON-LD `schema.org/Person` structured data (name, job title, email, location, social links, skills)
- `<link rel="preload" as="style">` for Google Fonts CSS
- `aria-label` on all social icon links
- `aria-expanded` on experience expand buttons

---

## Design References

- Color scheme: `images/image.png` (blue/teal dark palette)
- Theme toggle: `images/image-1.png` (pill with circular thumb, DAY/NIGHT label)
- Inspiration: https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code

---

## Responsive Breakpoints

| Breakpoint   | Behavior                                              |
|--------------|-------------------------------------------------------|
| >960px       | Sidebar visible, main content beside it               |
| ≤960px       | Sidebar hidden, mobile header + drawer shown          |
| ≤640px       | Single-column grids, reduced padding, stacked layouts |

---

## Deployment (GitHub Pages)

1. Push repo to GitHub
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`
3. Place `resume.pdf` in the root folder before deploying
4. Site will be live at `https://<username>.github.io/<repo>/`
5. Update `<link rel="canonical">` and JSON-LD `url` fields to match live URL

---

## How to Update Content

All content is in `index.html`. Each section is clearly commented:
- `<!-- About -->`, `<!-- Experience -->`, etc.
- Add a new experience: copy a `.tl-item` block and update text/tags
- Add a skill bar: copy a `.skill-row` block and set `style="--w:XX%"`
- Add a project: copy a `.proj-card` block
- Add a certification: copy a `.cert-card` block

To change colors/fonts, edit CSS custom properties at the top of `css/style.css`.
