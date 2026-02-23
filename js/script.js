// =============================================
// Theme toggle (both sidebar + mobile buttons)
// =============================================
const html = document.documentElement;
const themeToggleMobile = document.getElementById('themeToggle');
const themeToggleSidebar = document.getElementById('themeToggle2');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update mobile toggle emoji
  if (themeToggleMobile) {
    themeToggleMobile.textContent = theme === 'light' ? '☀️' : '🌙';
  }

  // Update sidebar toggle label text
  if (themeToggleSidebar) {
    const label = themeToggleSidebar.querySelector('.th-label');
    if (label) label.textContent = theme === 'light' ? 'Day Mode' : 'Night Mode';
  }
}

// Load saved theme (default dark)
applyTheme(localStorage.getItem('theme') || 'dark');

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
if (themeToggleSidebar) themeToggleSidebar.addEventListener('click', toggleTheme);

// =============================================
// Mobile burger menu
// =============================================
const burger = document.getElementById('burger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function closeDrawer() {
  mobileDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  burger.classList.remove('open');
}

burger.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.toggle('open');
  drawerOverlay.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
});

drawerOverlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// =============================================
// Active nav link (sidebar) on scroll
// =============================================
const sections = Array.from(document.querySelectorAll('section[id]'));
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

function updateActiveNav() {
  let current = sections[0]?.id || '';

  sections.forEach(section => {
    if (window.scrollY + window.innerHeight / 3 >= section.offsetTop) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// =============================================
// Scroll reveal
// =============================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// =============================================
// Skill bar animation — triggered when skills
// section scrolls into view
// =============================================
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.bar-fill');

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small staggered delay per bar for a wave effect
        skillBars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 60);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

if (skillsSection) skillObserver.observe(skillsSection);

// =============================================
// Experience expand / collapse
// =============================================
document.querySelectorAll('.tl-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.tl-card');
    const expanded = card.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', expanded);
    const label = btn.childNodes[0]; // text node
    label.textContent = expanded ? 'Show less ' : 'Show more ';
  });
});

// =============================================
// Smooth scroll for anchor links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = window.innerWidth <= 960 ? 64 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
