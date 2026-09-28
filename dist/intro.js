'use strict';
(function lightweightIntro() {
    const root = document.documentElement, layer = document.getElementById('intro-wave'); if (!layer) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'); let raf = 0, finished = false;
    function finish() { if (finished) return; finished = true; cancelAnimationFrame(raf); root.classList.remove('intro-pending'); layer.remove(); window.removeEventListener('keydown', finish); window.removeEventListener('pointerdown', finish); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', finish) }
    function visibility() { if (document.hidden) finish() }
    if (!root.classList.contains('intro-pending') || reduced.matches) { finish(); return }
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d', { alpha: true }); if (!ctx) { finish(); return }
    const width = innerWidth, height = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); canvas.style.width = '100%'; canvas.style.height = '100%'; ctx.scale(dpr, dpr); layer.appendChild(canvas); layer.classList.add('canvas-ready');
    const cell = Math.max(48, Math.sqrt(width * height / 600)), cols = Math.ceil(width / cell), rows = Math.ceil(height / cell), cw = width / cols, ch = height / rows, max = Math.hypot(width / 2, height / 2), tiles = [];
    const light = root.dataset.theme === 'light';
    for (let y = 0; y < rows; y++)for (let x = 0; x < cols; x++)tiles.push({ x: x * cw, y: y * ch, delay: Math.hypot((x + .5) * cw - width / 2, (y + .5) * ch - height / 2) / max * 540 });
    const start = performance.now(); let previous = -Infinity;
    function draw(now) {
        if (finished) return; if (now - start > 1350) { finish(); return } raf = requestAnimationFrame(draw); if (now - previous < 1000 / 30) return; previous = now; ctx.clearRect(0, 0, width, height);
        for (const tile of tiles) { const p = Math.max(0, Math.min(1, (now - start - tile.delay) / 720)); if (p >= 1) continue; const wave = Math.sin(p * Math.PI), lift = wave * 9, fade = p > .64 ? 1 - (p - .64) / .36 : 1; ctx.globalAlpha = fade; ctx.fillStyle = light ? '#e7edf7' : '#060b14'; ctx.fillRect(tile.x, tile.y, cw + .5, ch + .5); ctx.fillStyle = wave > .2 ? '#17448b' : light ? '#c3cede' : '#111f36'; ctx.fillRect(tile.x + 1, tile.y + 4 - lift, cw - 2, ch - 4 + lift); ctx.fillStyle = wave > .58 ? '#377cff' : light ? '#f4f7fc' : '#101b2d'; ctx.fillRect(tile.x + 1, tile.y + 1 - lift, cw - 2, ch - 6); ctx.fillStyle = wave > .58 ? '#88b7ff' : light ? '#ffffff' : '#243550'; ctx.fillRect(tile.x + 1, tile.y + 1 - lift, cw - 2, 1) } ctx.globalAlpha = 1;
    }
    window.addEventListener('keydown', finish); window.addEventListener('pointerdown', finish, { once: true }); document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', finish); draw(start);
})();
