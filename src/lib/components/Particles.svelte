<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let w = 0,
			h = 0,
			dpr = Math.min(window.devicePixelRatio || 1, 2);
		let raf = 0;
		let parts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

		function resize() {
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(70, Math.floor((w * h) / 26000));
			parts = Array.from({ length: count }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.14,
				vy: (Math.random() - 0.5) * 0.14,
				r: Math.random() * 1.5 + 0.5,
				a: Math.random() * 0.4 + 0.1
			}));
		}

		function frame() {
			ctx!.clearRect(0, 0, w, h);
			for (let i = 0; i < parts.length; i++) {
				const p = parts[i];
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = w;
				else if (p.x > w) p.x = 0;
				if (p.y < 0) p.y = h;
				else if (p.y > h) p.y = 0;

				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(0, 255, 136, ${p.a})`;
				ctx!.fill();

				// faint links to nearby particles
				for (let j = i + 1; j < parts.length; j++) {
					const q = parts[j];
					const dx = p.x - q.x,
						dy = p.y - q.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < 15000) {
						const o = (1 - d2 / 15000) * 0.08;
						ctx!.strokeStyle = `rgba(90, 200, 150, ${o})`;
						ctx!.lineWidth = 0.5;
						ctx!.beginPath();
						ctx!.moveTo(p.x, p.y);
						ctx!.lineTo(q.x, q.y);
						ctx!.stroke();
					}
				}
			}
			raf = requestAnimationFrame(frame);
		}

		resize();
		if (reduce) {
			// draw one static frame, no animation
			frame();
			cancelAnimationFrame(raf);
			raf = 0;
		} else {
			frame();
		}

		const onResize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			resize();
		};
		window.addEventListener('resize', onResize);
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<canvas bind:this={canvas} class="particles" aria-hidden="true"></canvas>

<style>
	.particles {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0.55;
	}
</style>
