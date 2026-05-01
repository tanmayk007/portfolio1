/* ============================================================
   SANJANA GAIKWAD — PORTFOLIO SCRIPTS
   ============================================================ */

// ── Typing Effect ────────────────────────────────────────────
(function () {
    const phrases = [
        'B.Tech CSE Student',
        'Python Developer',
        'AI Enthusiast',
        'Creative Problem Solver',
        'Lifelong Learner'
    ];
    let i = 0, j = 0, deleting = false;
    const el = document.getElementById('typed-text');
    if (!el) return;

    function type() {
        const cur = phrases[i % phrases.length];
        el.textContent = deleting ? cur.slice(0, --j) : cur.slice(0, ++j);
        if (!deleting && j === cur.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
        if (deleting && j === 0) { deleting = false; i++; }
        setTimeout(type, deleting ? 50 : 90);
    }
    setTimeout(type, 1200);
})();

// ── Scroll Reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), idx * 80);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
revealEls.forEach(el => obs.observe(el));

// ── Active Nav Highlight ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });

// ── Mobile Nav ───────────────────────────────────────────────
function toggleNav() {
    document.getElementById('nav-links').classList.toggle('open');
}
// close on link click
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('open');
    });
});

// ── Lightbox ─────────────────────────────────────────────────
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-img').src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.getElementById('lb-img').src = '';
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

// ── Smooth Nav Shadow ────────────────────────────────────────
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 40) {
        nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.4)';
    } else {
        nav.style.boxShadow = 'none';
    }
}, { passive: true });

// ── Contact form (no back-end, just feedback) ─────────────────
const formBtn = document.querySelector('.form-btn');
if (formBtn) {
    formBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        let hasValue = false;
        inputs.forEach(i => { if (i.value.trim()) hasValue = true; });
        if (hasValue) {
            formBtn.textContent = '✓ Message Sent!';
            formBtn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
            setTimeout(() => {
                formBtn.textContent = 'Send Message →';
                formBtn.style.background = '';
                inputs.forEach(i => i.value = '');
            }, 2800);
        }
    });
}