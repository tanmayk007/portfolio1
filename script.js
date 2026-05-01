/* ══════════════════════════════════════════════
   TANMAY KHANDELWAL — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════════ */
// ── Typing Effect ──
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
        if (!deleting && j === cur.length) { deleting = true; setTimeout(type, 2000); return; }
        if (deleting && j === 0) { deleting = false; i++; }
        setTimeout(type, deleting ? 50 : 90);
    }
    setTimeout(type, 1200);
})();
// ── Scroll Progress Bar ──
window.addEventListener('scroll', () => {
    const prog = document.getElementById('scroll-progress');
    if (prog) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (window.scrollY / h * 100) + '%';
    }
}, { passive: true });
// ── Scroll Reveal ──
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
// ── Counter Animation ──
const counterEls = document.querySelectorAll('.stat-num[data-target]');
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = current;
            }, 40);
            counterObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));
// ── Active Nav Highlight ──
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
// ── Nav Shadow on Scroll ──
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.boxShadow = window.scrollY > 40
        ? '0 4px 30px rgba(124,58,237,0.08)'
        : 'none';
}, { passive: true });
// ── Mobile Nav ──
function toggleNav() {
    document.getElementById('nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('open');
    });
});
// ── Lightbox ──
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
// ── Contact Form (no backend) ──
const formBtn = document.getElementById('form-btn');
if (formBtn) {
    formBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        let hasValue = false;
        inputs.forEach(i => { if (i.value.trim()) hasValue = true; });
        if (hasValue) {
            formBtn.textContent = '✓ Message Sent!';
            formBtn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
            setTimeout(() => {
                formBtn.textContent = 'Send Message →';
                formBtn.style.background = '';
                inputs.forEach(i => i.value = '');
            }, 2800);
        }
    });
}