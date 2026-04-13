/**
 * SDD Course Enhancement JavaScript
 * Interactive features, progress tracking, theme toggle,
 * Mermaid dark mode, and Canvas theme-aware redraw system
 */

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();        // must run first — sets data-theme
    initProgressIndicator();
    initSmoothScrolling();
    initCodeCopyButtons();
    initInteractiveTOC();
    initSearchFunctionality();
    initKeyboardShortcuts();
    initLessonProgress();
    initQuizInteractivity();
    initMobileMenu();
    initAccessibilityFeatures();
    initPrintStyles();
    initAnalytics();
    // Canvas redraws happen after page scripts register via window.registerCanvas()
    // We trigger an initial redraw once everything is loaded
    window.addEventListener('load', () => redrawAllCanvases());
});

/* ===========================
   Canvas Theme-Aware Redraw System
   =========================== */

// Registry: { canvasId: drawFunction }
const _canvasRegistry = {};

/**
 * Register a canvas draw function. Call this from page-level scripts.
 * The draw function receives (ctx, width, height, colors) where colors
 * is an object of resolved CSS custom property values.
 */
window.registerCanvas = function(canvasId, drawFn) {
    _canvasRegistry[canvasId] = drawFn;
};

/**
 * Read current CSS custom properties for canvas drawing.
 * Returns a palette object with resolved color strings.
 */
function getCanvasColors() {
    const style = getComputedStyle(document.documentElement);
    const get = (prop) => style.getPropertyValue(prop).trim();
    return {
        bg:         get('--canvas-bg'),
        text:       get('--canvas-text'),
        textLight:  get('--canvas-text-light'),
        accent1:    get('--canvas-accent-1'),
        accent2:    get('--canvas-accent-2'),
        accent3:    get('--canvas-accent-3'),
        accent4:    get('--canvas-accent-4'),
        accent5:    get('--canvas-accent-5'),
        highlight:  get('--canvas-highlight'),
        danger:     get('--canvas-danger'),
        muted:      get('--canvas-muted'),
        card:       get('--canvas-card'),
        border:     get('--canvas-border'),
        sky:        get('--canvas-sky'),
        grass:      get('--canvas-grass'),
        road:       get('--canvas-road'),
        // Also expose the semantic colors
        primary:    get('--primary-color'),
        primaryHover: get('--primary-hover'),
        codeBg:     get('--code-bg'),
        cardBg:     get('--card-bg'),
        successBg:  get('--success-bg'),
        successBorder: get('--success-border'),
        warningBg:  get('--warning-bg'),
        warningBorder: get('--warning-border'),
        infoBg:     get('--info-bg'),
        infoBorder: get('--info-border'),
        dangerBg:   get('--danger-bg'),
        dangerBorder: get('--danger-border'),
    };
}

/** Redraw every registered canvas with current theme colors. */
function redrawAllCanvases() {
    const colors = getCanvasColors();
    for (const [id, drawFn] of Object.entries(_canvasRegistry)) {
        const canvas = document.getElementById(id);
        if (!canvas) continue;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        try { drawFn(ctx, w, h, colors); }
        catch (e) { console.warn(`Canvas redraw failed for #${id}:`, e); }
    }
}

// Expose helpers globally
window.getCanvasColors = getCanvasColors;
window.redrawAllCanvases = redrawAllCanvases;

/* ===========================
   Theme Toggle (Light / Dark)
   =========================== */

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');

    // Determine initial theme
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');

    applyTheme(theme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update all toggle buttons
    document.querySelectorAll('#theme-toggle').forEach(btn => {
        btn.textContent = theme === 'light' ? '🌙' : '☀️';
        btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });

    // Re-initialize Mermaid if available
    reinitMermaid(theme);

    // Redraw all theme-aware canvases
    // Small delay to let CSS variables update
    requestAnimationFrame(() => redrawAllCanvases());
}

function reinitMermaid(theme) {
    const mermaid = window.__mermaid;
    if (!mermaid) return;

    const isDark = theme === 'dark';
    mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        themeVariables: isDark
            ? { primaryColor: '#334155', primaryTextColor: '#e2e8f0', primaryBorderColor: '#6366f1', lineColor: '#94a3b8', secondaryColor: '#1e293b', tertiaryColor: '#0f172a' }
            : { primaryColor: '#eff6ff', primaryTextColor: '#1e293b', primaryBorderColor: '#3b82f6', lineColor: '#64748b', secondaryColor: '#f8fafc', tertiaryColor: '#f1f5f9' }
    });

    // Re-render all diagrams
    document.querySelectorAll('.mermaid').forEach(el => {
        if (!el.dataset.src) {
            el.dataset.src = el.textContent.trim();
        }
        el.removeAttribute('data-processed');
        el.innerHTML = el.dataset.src;
    });

    try { mermaid.run(); } catch (_) { /* diagram may not exist on this page */ }
}

/* ===========================
   Progress Indicator
   =========================== */

function initProgressIndicator() {
    const bar = document.querySelector('.progress-bar');
    if (!bar) return;

    const update = () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (docH <= 0) return;
        bar.style.width = Math.min((window.scrollY / docH) * 100, 100) + '%';
    };

    window.addEventListener('scroll', throttle(update, 50));
    update();
}

/* ===========================
   Smooth Scrolling
   =========================== */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            history.pushState(null, null, this.getAttribute('href'));
        });
    });
}

/* ===========================
   Code Copy Buttons enhancement
   =========================== */

function initCodeCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const orig = this.textContent;
            this.textContent = 'Copied!';
            this.classList.add('copied');
            setTimeout(() => { this.textContent = orig; this.classList.remove('copied'); }, 2000);
        });
    });
}

/* ===========================
   Interactive Table of Contents
   =========================== */

function initInteractiveTOC() {
    const tocLinks = document.querySelectorAll('.toc-link');
    if (!tocLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.toc-link[href="#${id}"]`);
            if (link) {
                tocLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    tocLinks.forEach(link => {
        const id = link.getAttribute('href')?.slice(1);
        const section = id && document.getElementById(id);
        if (section) observer.observe(section);
    });
}

/* ===========================
   Search
   =========================== */

function initSearchFunctionality() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    const index = [];
    document.querySelectorAll('h1, h2, h3, p, li').forEach((el, i) => {
        index.push({ id: i, text: el.textContent.toLowerCase(), element: el, type: el.tagName.toLowerCase() });
    });

    input.addEventListener('input', debounce(e => {
        const q = e.target.value.toLowerCase().trim();
        if (q.length < 2) { results.style.display = 'none'; return; }

        const hits = index.filter(item => item.text.includes(q)).slice(0, 10);
        if (!hits.length) {
            results.innerHTML = '<div style="padding:0.75rem 1rem;color:var(--text-light);">No results found</div>';
            results.style.display = 'block';
            return;
        }

        results.innerHTML = hits.map(h => {
            const idx = h.text.indexOf(q);
            const start = Math.max(0, idx - 30);
            const end = Math.min(h.text.length, idx + q.length + 30);
            let excerpt = (start > 0 ? '…' : '') + h.text.substring(start, end) + (end < h.text.length ? '…' : '');
            excerpt = excerpt.replace(new RegExp(q, 'gi'), '<mark>$&</mark>');
            return `<div class="search-result-item" data-idx="${h.id}"><small style="color:var(--text-light);">${h.type}</small> ${excerpt}</div>`;
        }).join('');
        results.style.display = 'block';

        results.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const el = index[item.dataset.idx].element;
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight');
                setTimeout(() => el.classList.remove('highlight'), 2000);
                input.value = '';
                results.style.display = 'none';
            });
        });
    }, 200));

    document.addEventListener('click', e => {
        if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none';
    });
}

/* ===========================
   Keyboard Shortcuts
   =========================== */

function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            case '/': {
                const s = document.getElementById('search-input');
                if (s) { e.preventDefault(); s.focus(); }
                break;
            }
            case 'Escape': {
                const r = document.getElementById('search-results');
                if (r) r.style.display = 'none';
                document.getElementById('search-input')?.blur();
                document.querySelector('.shortcuts-modal')?.remove();
                break;
            }
            case 'ArrowLeft': {
                const prev = document.querySelector('.prev-lesson');
                if (prev) window.location.href = prev.href;
                break;
            }
            case 'ArrowRight': {
                const next = document.querySelector('.next-lesson');
                if (next) window.location.href = next.href;
                break;
            }
            case 'h': window.location.href = 'index.html'; break;
            case '?': showShortcutsModal(); break;
        }
    });
}

function showShortcutsModal() {
    if (document.querySelector('.shortcuts-modal')) return;
    const modal = document.createElement('div');
    modal.className = 'shortcuts-modal';
    modal.innerHTML = `
        <div class="shortcuts-content">
            <h3>Keyboard Shortcuts</h3>
            <button class="close-modal">&times;</button>
            <dl>
                <dt>/</dt><dd>Focus search</dd>
                <dt>ESC</dt><dd>Close search/modal</dd>
                <dt>←</dt><dd>Previous lesson</dd>
                <dt>→</dt><dd>Next lesson</dd>
                <dt>H</dt><dd>Go to home</dd>
                <dt>?</dt><dd>Show this help</dd>
            </dl>
        </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

/* ===========================
   Lesson Progress
   =========================== */

function initLessonProgress() {
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const progress = JSON.parse(localStorage.getItem('sddLessonProgress') || '{}');

    progress[page] = { visited: true, lastVisited: new Date().toISOString(), scrollPosition: 0 };
    localStorage.setItem('sddLessonProgress', JSON.stringify(progress));

    if (page === 'index') updateProgressIndicators(progress);

    // Save scroll on leave
    window.addEventListener('beforeunload', () => {
        progress[page].scrollPosition = window.scrollY;
        localStorage.setItem('sddLessonProgress', JSON.stringify(progress));
    });

    // Restore scroll
    const saved = progress[page]?.scrollPosition;
    if (saved > 0) setTimeout(() => window.scrollTo(0, saved), 100);
}

function updateProgressIndicators(progress) {
    const links = document.querySelectorAll('.lesson-link');
    let done = 0;
    links.forEach(link => {
        const name = link.getAttribute('href')?.replace('.html', '');
        if (progress[name]?.visited) {
            link.classList.add('visited');
            done++;
            if (!link.querySelector('.checkmark')) {
                const cm = document.createElement('span');
                cm.className = 'checkmark';
                cm.textContent = ' ✓';
                link.appendChild(cm);
            }
        }
    });
    const total = links.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const el = document.getElementById('overall-progress');
    if (el) {
        el.innerHTML = `<h3>Your Progress</h3>
            <div class="progress-bar-container"><div class="progress-bar" style="width:${pct}%"></div></div>
            <p>${done} of ${total} lessons completed (${pct}%)</p>`;
    }
}

/* ===========================
   Quiz
   =========================== */

function initQuizInteractivity() {
    document.querySelectorAll('.quiz-question').forEach(q => {
        const options = q.querySelectorAll('.quiz-option');
        const feedback = q.querySelector('.quiz-feedback');
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
                opt.classList.add('selected');
                const ok = opt.dataset.correct === 'true';
                opt.classList.add(ok ? 'correct' : 'incorrect');
                if (feedback) {
                    feedback.textContent = ok ? ('Correct! ' + (opt.dataset.explanation || '')) : ('Try again. ' + (opt.dataset.hint || ''));
                    feedback.className = 'quiz-feedback ' + (ok ? 'correct' : 'incorrect');
                }
            });
        });
    });
}

/* ===========================
   Mobile Menu
   =========================== */

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const open = nav.classList.toggle('active');
        btn.setAttribute('aria-expanded', open);
        btn.textContent = open ? '✕' : '☰';
    });

    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = '☰';
        }
    });
}

/* ===========================
   Accessibility
   =========================== */

function initAccessibilityFeatures() {
    const skip = document.querySelector('.skip-to-main');
    if (skip) {
        skip.addEventListener('click', e => {
            e.preventDefault();
            const main = document.getElementById('main-content');
            if (main) { main.tabIndex = -1; main.focus(); }
        });
    }

    document.addEventListener('keydown', e => { if (e.key === 'Tab') document.body.classList.add('keyboard-nav'); });
    document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));
}

/* ===========================
   Print
   =========================== */

function initPrintStyles() {
    document.getElementById('print-button')?.addEventListener('click', e => { e.preventDefault(); window.print(); });
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('details').forEach(d => d.setAttribute('open', 'true'));
    });
}

/* ===========================
   Analytics (local only)
   =========================== */

function initAnalytics() {
    let a = JSON.parse(localStorage.getItem('sddAnalytics') || '[]');
    a.push({ page: location.pathname, ts: new Date().toISOString() });
    if (a.length > 100) a = a.slice(-100);
    localStorage.setItem('sddAnalytics', JSON.stringify(a));
}

/* ===========================
   Utilities
   =========================== */

function debounce(fn, ms) {
    let t;
    return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
}

function throttle(fn, ms) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn.apply(this, args); }
    };
}

// Expose for other scripts
window.courseEnhancements = { debounce, throttle, applyTheme, reinitMermaid, updateProgressIndicators };
