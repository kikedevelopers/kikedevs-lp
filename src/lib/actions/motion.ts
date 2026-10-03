/**
 * motion.ts — developer-terminal motion engine
 * Scroll-driven parallax, reveal-on-view, spring pointer-tilt, and the
 * cursor spotlight.
 * All work runs on a single rAF ticker and only touches transform/opacity
 * (GPU-friendly). Everything degrades to no-op under prefers-reduced-motion.
 */
import type { Action } from 'svelte/action';

const reduced = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ──────────────────────────────────────────────────────────────
 * Shared ticker: one scroll/rAF loop drives every parallax element.
 * ────────────────────────────────────────────────────────────── */
type ParallaxEntry = {
	el: HTMLElement;
	speed: number;
	axis: 'y' | 'x';
	base: number;
};

const entries = new Set<ParallaxEntry>();
let ticking = false;
let viewportH = 0;

function measure() {
	viewportH = window.innerHeight;
}

function frame() {
	ticking = false;
	const mid = viewportH / 2;
	for (const e of entries) {
		const rect = e.el.getBoundingClientRect();
		const elMid = rect.top + rect.height / 2;
		// distance of element centre from viewport centre, normalised
		const delta = (elMid - mid) / viewportH;
		const shift = -delta * e.speed * 100;
		if (e.axis === 'y') {
			e.el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
		} else {
			e.el.style.transform = `translate3d(${shift.toFixed(2)}px, 0, 0)`;
		}
	}
}

function requestTick() {
	if (!ticking) {
		ticking = true;
		requestAnimationFrame(frame);
	}
}

let listening = false;
function ensureListening() {
	if (listening) return;
	listening = true;
	measure();
	window.addEventListener('scroll', requestTick, { passive: true });
	window.addEventListener('resize', () => {
		measure();
		requestTick();
	});
}

/** use:parallax={{ speed: 0.3, axis: 'y' }} — positive speed moves slower than scroll. */
export const parallax: Action<
	HTMLElement,
	{ speed?: number; axis?: 'y' | 'x' } | undefined
> = (node, params) => {
	if (reduced()) return {};
	const entry: ParallaxEntry = {
		el: node,
		speed: params?.speed ?? 0.25,
		axis: params?.axis ?? 'y',
		base: 0
	};
	node.style.willChange = 'transform';
	ensureListening();
	entries.add(entry);
	requestTick();
	return {
		update(p) {
			entry.speed = p?.speed ?? 0.25;
			entry.axis = p?.axis ?? 'y';
		},
		destroy() {
			entries.delete(entry);
		}
	};
};

/* ──────────────────────────────────────────────────────────────
 * Reveal-on-view: adds data-revealed when the element enters.
 * Optional stagger via use:reveal={{ stagger: true }} sets --reveal-i
 * on direct children in DOM order.
 * ────────────────────────────────────────────────────────────── */
export const reveal: Action<
	HTMLElement,
	{ threshold?: number; once?: boolean; stagger?: boolean } | undefined
> = (node, params) => {
	if (params?.stagger) {
		Array.from(node.children).forEach((c, i) =>
			(c as HTMLElement).style.setProperty('--reveal-i', String(i))
		);
	}
	if (reduced()) {
		node.setAttribute('data-revealed', '');
		return {};
	}
	const once = params?.once ?? true;
	const io = new IntersectionObserver(
		(obs) => {
			for (const o of obs) {
				if (o.isIntersecting) {
					node.setAttribute('data-revealed', '');
					if (once) io.unobserve(node);
				} else if (!once) {
					node.removeAttribute('data-revealed');
				}
			}
		},
		{ threshold: params?.threshold ?? 0.18, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
};

/* ──────────────────────────────────────────────────────────────
 * Spring pointer-tilt: tracks the pointer and eases rotation with a
 * critically-ish damped spring so motion has momentum, not a 1:1 snap.
 * Exposes --rx / --ry (deg) and --gx / --gy (0–100%) for light position.
 * ────────────────────────────────────────────────────────────── */
export const tilt: Action<
	HTMLElement,
	{ max?: number; scale?: number } | undefined
> = (node, params) => {
	if (reduced()) return {};
	const max = params?.max ?? 10;
	let tx = 0,
		ty = 0, // target rotation
		cx = 0,
		cy = 0, // current rotation
		vx = 0,
		vy = 0; // velocity
	let gx = 50,
		gy = 50,
		cgx = 50,
		cgy = 50;
	let raf = 0;
	let active = false;

	const stiffness = 0.08;
	const damping = 0.78;

	function loop() {
		vx = (vx + (tx - cx) * stiffness) * damping;
		vy = (vy + (ty - cy) * stiffness) * damping;
		cx += vx;
		cy += vy;
		cgx += (gx - cgx) * 0.1;
		cgy += (gy - cgy) * 0.1;
		node.style.setProperty('--rx', cy.toFixed(3) + 'deg');
		node.style.setProperty('--ry', cx.toFixed(3) + 'deg');
		node.style.setProperty('--gx', cgx.toFixed(2) + '%');
		node.style.setProperty('--gy', cgy.toFixed(2) + '%');
		const settled =
			Math.abs(tx - cx) < 0.01 &&
			Math.abs(ty - cy) < 0.01 &&
			Math.abs(vx) < 0.01 &&
			Math.abs(vy) < 0.01 &&
			Math.abs(gx - cgx) < 0.05;
		if (settled && !active) {
			raf = 0;
			return;
		}
		raf = requestAnimationFrame(loop);
	}
	function kick() {
		if (!raf) raf = requestAnimationFrame(loop);
	}

	function onMove(e: PointerEvent) {
		const r = node.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		tx = (px - 0.5) * 2 * max;
		ty = -(py - 0.5) * 2 * max;
		gx = px * 100;
		gy = py * 100;
		kick();
	}
	function onEnter() {
		active = true;
	}
	function onLeave() {
		active = false;
		tx = 0;
		ty = 0;
		gx = 50;
		gy = 50;
		kick();
	}

	const target = node.parentElement ?? node;
	target.addEventListener('pointermove', onMove);
	target.addEventListener('pointerenter', onEnter);
	target.addEventListener('pointerleave', onLeave);
	return {
		destroy() {
			target.removeEventListener('pointermove', onMove);
			target.removeEventListener('pointerenter', onEnter);
			target.removeEventListener('pointerleave', onLeave);
			if (raf) cancelAnimationFrame(raf);
		}
	};
};

/* ──────────────────────────────────────────────────────────────
 * Scroll progress for an element: sets --progress (0–1) as it passes
 * through the viewport. Used for scroll-driven refraction on the gem.
 * ────────────────────────────────────────────────────────────── */
export const scrollProgress: Action<HTMLElement, undefined> = (node) => {
	if (reduced()) {
		node.style.setProperty('--progress', '0.5');
		return {};
	}
	let raf = 0;
	function update() {
		raf = 0;
		const r = node.getBoundingClientRect();
		const h = window.innerHeight;
		const p = 1 - (r.top + r.height / 2) / (h + r.height / 2);
		node.style.setProperty('--progress', Math.min(1, Math.max(0, p)).toFixed(4));
	}
	function onScroll() {
		if (!raf) raf = requestAnimationFrame(update);
	}
	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (raf) cancelAnimationFrame(raf);
		}
	};
};

/* ──────────────────────────────────────────────────────────────
 * Pointer spotlight: writes smoothed --mx/--my (px) on :root so any
 * element can place light at the cursor. Eased for momentum, not 1:1.
 * ────────────────────────────────────────────────────────────── */
export function startSpotlight(): () => void {
	if (typeof window === 'undefined') return () => {};
	const root = document.documentElement;
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let tx = window.innerWidth / 2,
		ty = window.innerHeight * 0.4,
		cx = tx,
		cy = ty,
		raf = 0;
	function loop() {
		cx += (tx - cx) * 0.12;
		cy += (ty - cy) * 0.12;
		root.style.setProperty('--mx', cx.toFixed(1) + 'px');
		root.style.setProperty('--my', cy.toFixed(1) + 'px');
		if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
			raf = requestAnimationFrame(loop);
		} else {
			raf = 0;
		}
	}
	function onMove(e: PointerEvent) {
		tx = e.clientX;
		ty = e.clientY;
		if (!reduce && !raf) raf = requestAnimationFrame(loop);
	}
	root.style.setProperty('--mx', tx + 'px');
	root.style.setProperty('--my', ty + 'px');
	window.addEventListener('pointermove', onMove, { passive: true });
	return () => {
		window.removeEventListener('pointermove', onMove);
		if (raf) cancelAnimationFrame(raf);
	};
}

/** Count-up when element enters view. use:countUp={{ to: 50, suffix: '+' }} */
export const countUp: Action<
	HTMLElement,
	{ to: number; suffix?: string; duration?: number }
> = (node, params) => {
	const render = (v: number) =>
		(node.textContent = Math.round(v) + (params.suffix ?? ''));
	if (reduced()) {
		render(params.to);
		return {};
	}
	render(0);
	const io = new IntersectionObserver(
		(obs) => {
			if (obs[0].isIntersecting) {
				const dur = params.duration ?? 1400;
				const start = performance.now();
				const tick = (now: number) => {
					const t = Math.min(1, (now - start) / dur);
					const eased = 1 - Math.pow(1 - t, 3);
					render(params.to * eased);
					if (t < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
				io.disconnect();
			}
		},
		{ threshold: 0.5 }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
};
