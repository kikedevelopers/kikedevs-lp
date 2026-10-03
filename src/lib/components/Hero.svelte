<script lang="ts">
	import Terminal from './Terminal.svelte';
	import { parallax } from '$lib/actions/motion';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	onMount(() => {
		requestAnimationFrame(() => (mounted = true));
	});
</script>

<section id="home" class="hero">
	<div class="atmos" aria-hidden="true">
		<div class="atmos__grid" use:parallax={{ speed: 0.06 }}></div>
		<div class="atmos__pool atmos__pool--a" use:parallax={{ speed: 0.45 }}></div>
		<div class="atmos__pool atmos__pool--b" use:parallax={{ speed: 0.28 }}></div>
	</div>

	<div class="shell hero__inner">
		<div class="hero__copy" class:in={mounted}>
			<h1 class="hero__name">Enrique A. Pacheco</h1>
			<p class="hero__role">
				<span class="role-path">~/full-stack</span>
				<span class="role-sep">developer</span>
				<span class="role-caret"></span>
			</p>
			<p class="hero__hook">
				Construyo productos digitales de principio a fin — del commit al deploy.
				Arquitecturas escalables, interfaces precisas y sistemas que
				<em>corren en producción, sin drama</em>.
			</p>
			<div class="hero__actions">
				<a href="#projects" class="btn btn--primary">
					Ver proyectos
					<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
				</a>
				<a href="#contact" class="btn btn--ghost">
					<span class="ghost-prompt">$</span> Hablemos
				</a>
			</div>

			<ul class="hero__chips">
				<li>5+ años</li>
				<li>50+ proyectos</li>
				<li>disponible <span class="live"></span></li>
			</ul>
		</div>

		<div class="hero__term" use:parallax={{ speed: 0.12 }}>
			<Terminal />
		</div>
	</div>

	<a href="#about" class="scroll-cue" class:in={mounted} aria-label="Desplázate">
		<span class="meta">scroll</span>
		<span class="scroll-cue__rail"><span class="scroll-cue__bead"></span></span>
	</a>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		display: flex;
		align-items: center;
		padding-block: clamp(6rem, 14vh, 9rem) 4rem;
		overflow: hidden;
	}

	.atmos {
		position: absolute;
		inset: -10%;
		pointer-events: none;
		z-index: 0;
	}
	.atmos__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(167, 182, 176, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(167, 182, 176, 0.04) 1px, transparent 1px);
		background-size: 54px 54px;
		mask-image: radial-gradient(120% 90% at 65% 40%, #000 20%, transparent 78%);
	}
	.atmos__pool {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
	}
	.atmos__pool--a {
		width: 42rem;
		height: 42rem;
		top: -12rem;
		right: -8rem;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.13), transparent 68%);
	}
	.atmos__pool--b {
		width: 30rem;
		height: 30rem;
		bottom: -10rem;
		left: -6rem;
		background: radial-gradient(circle, rgba(0, 200, 83, 0.1), transparent 70%);
	}

	.hero__inner {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 1fr 1.02fr;
		align-items: center;
		gap: clamp(2rem, 5vw, 4.5rem);
		width: 100%;
	}

	/* copy */
	.hero__name {
		font-size: clamp(2.4rem, 6.4vw, 4.8rem);
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.02;
		color: var(--ink-100);
	}
	.hero__role {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1.1rem;
		font-family: var(--font-mono);
		font-size: clamp(0.85rem, 1.5vw, 1.02rem);
	}
	.role-path {
		color: var(--emerald-300);
	}
	.role-sep {
		color: var(--ink-300);
	}
	.role-caret {
		width: 0.56em;
		height: 1.05em;
		background: var(--emerald-300);
		box-shadow: 0 0 8px rgba(0, 255, 136, 0.7);
		animation: caret-blink 1.05s steps(1) infinite;
	}
	.hero__hook {
		margin-top: 1.6rem;
		max-width: 40ch;
		font-size: clamp(1.02rem, 1.3vw, 1.15rem);
		color: var(--ink-300);
		line-height: 1.7;
	}
	.hero__hook em {
		color: var(--emerald-200);
		font-style: normal;
	}
	.hero__actions {
		margin-top: 2.1rem;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.hero__chips {
		margin-top: 2rem;
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		list-style: none;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--ink-500);
	}
	.hero__chips li {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}
	.live {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--emerald-300);
		animation: pulse-dot 2.2s var(--ease-in-out) infinite;
	}

	/* entrance */
	.hero__copy > * {
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.8s var(--ease-out),
			transform 0.8s var(--ease-out);
	}
	.hero__copy.in > * {
		opacity: 1;
		transform: none;
	}
	.hero__copy.in .hero__name {
		transition-delay: 0.05s;
	}
	.hero__copy.in .hero__role {
		transition-delay: 0.16s;
	}
	.hero__copy.in .hero__hook {
		transition-delay: 0.26s;
	}
	.hero__copy.in .hero__actions {
		transition-delay: 0.36s;
	}
	.hero__copy.in .hero__chips {
		transition-delay: 0.46s;
	}

	.hero__term {
		position: relative;
		z-index: 2;
	}

	/* buttons (shared) */
	:global(.btn) {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.9rem 1.6rem;
		font-size: 0.86rem;
		font-weight: 500;
		letter-spacing: -0.01em;
		border-radius: var(--radius-sm);
		transition:
			transform 0.18s var(--ease-out),
			box-shadow 0.3s var(--ease-out),
			background 0.3s var(--ease-out),
			color 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out);
	}
	:global(.btn:active) {
		transform: scale(0.97);
	}
	:global(.btn--primary) {
		position: relative;
		color: var(--onyx-900);
		background: linear-gradient(135deg, #8bffc4, #00ff88 48%, #00c853);
		box-shadow:
			0 12px 30px -10px rgba(0, 255, 136, 0.5),
			var(--shadow-inset);
		overflow: hidden;
		font-weight: 600;
	}
	:global(.btn--primary::after) {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
		transform: translateX(-130%) skewX(-18deg);
		transition: transform 0.7s var(--ease-out);
	}
	:global(.btn--primary:hover) {
		transform: translateY(-2px);
		box-shadow: 0 18px 44px -10px rgba(0, 255, 136, 0.65);
	}
	:global(.btn--primary:hover::after) {
		transform: translateX(160%) skewX(-18deg);
	}
	:global(.btn--ghost) {
		color: var(--ink-200);
		border: 1px solid var(--hairline-strong);
		background: rgba(255, 255, 255, 0.015);
		font-family: var(--font-mono);
	}
	:global(.btn--ghost .ghost-prompt) {
		color: var(--emerald-300);
	}
	:global(.btn--ghost:hover) {
		border-color: var(--emerald-600);
		color: var(--emerald-100);
		transform: translateY(-2px);
	}

	/* scroll cue */
	.scroll-cue {
		position: absolute;
		bottom: 1.6rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7rem;
		z-index: 3;
		opacity: 0;
		transition: opacity 0.8s ease 1s;
	}
	.scroll-cue.in {
		opacity: 1;
	}
	.scroll-cue__rail {
		width: 22px;
		height: 36px;
		border: 1px solid var(--hairline-strong);
		border-radius: 999px;
		display: flex;
		justify-content: center;
		padding-top: 6px;
	}
	.scroll-cue__bead {
		width: 3px;
		height: 7px;
		border-radius: 3px;
		background: var(--emerald-300);
		animation: scroll-bead 1.9s var(--ease-in-out) infinite;
	}
	@keyframes scroll-bead {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		70% {
			transform: translateY(13px);
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@media (max-width: 860px) {
		.hero__inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.hero__copy {
			order: 2;
		}
		.hero__term {
			order: 1;
		}
		.hero__hook {
			max-width: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__copy > * {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.role-caret,
		.scroll-cue__bead,
		.live {
			animation: none;
		}
	}
</style>
