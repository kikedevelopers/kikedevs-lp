<script lang="ts">
	import { base } from '$app/paths';
	import { navItems } from '$lib/utils/constants';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let isVisible = $state(true);
	let lastScrollY = $state(0);

	function handleScroll() {
		const y = window.scrollY;
		isScrolled = y > 40;
		isVisible = !(y > lastScrollY && y > 160);
		lastScrollY = y;
	}

	const close = () => (isMenuOpen = false);

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onscroll={handleScroll} />

<header class:scrolled={isScrolled} class:hidden={!isVisible && !isMenuOpen}>
	<div class="shell bar">
		<a href="#home" class="logo" onclick={close} aria-label="Kike Dev's — inicio">
			<img src="{base}/logo.png" alt="Kike Dev's" />
		</a>

		<nav class:open={isMenuOpen}>
			<ul>
				{#each navItems as item, i (item.href)}
					<li style="--i:{i}">
						<a href={item.href} class="nav-link" onclick={close}>
							<span class="nav-link__idx">0{i + 1}</span>
							<span class="nav-link__label">{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>
			<a href="#contact" class="btn btn--primary nav-cta" onclick={close}>Hablemos</a>
		</nav>

		<button
			class="burger"
			class:open={isMenuOpen}
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
			aria-expanded={isMenuOpen}
		>
			<span></span>
			<span></span>
		</button>
	</div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 1000;
		padding-block: 1.1rem;
		transition:
			transform 0.45s var(--ease-drawer),
			background 0.4s ease,
			padding 0.4s ease,
			border-color 0.4s ease;
		border-bottom: 1px solid transparent;
	}
	header.scrolled {
		padding-block: 0.65rem;
		background: rgba(5, 6, 7, 0.72);
		backdrop-filter: blur(18px) saturate(160%);
		border-bottom-color: var(--hairline);
	}
	header.hidden {
		transform: translateY(-105%);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logo img {
		height: 42px;
		width: auto;
		object-fit: contain;
		transition: transform 0.3s var(--ease-out);
	}
	.logo:hover img {
		transform: scale(1.04);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 2.4rem;
	}
	nav ul {
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
	}
	.nav-link {
		display: inline-flex;
		align-items: baseline;
		gap: 0.4rem;
		font-size: 0.82rem;
		letter-spacing: 0.08em;
		color: var(--ink-300);
		position: relative;
		padding-block: 0.3rem;
		transition: color 0.25s ease;
	}
	.nav-link__idx {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: var(--emerald-600);
		transition: color 0.25s ease;
	}
	.nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: var(--emerald-300);
		box-shadow: 0 0 8px rgba(0, 255, 136, 0.7);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s var(--ease-out);
	}
	.nav-link:hover {
		color: var(--ink-100);
	}
	.nav-link:hover .nav-link__idx {
		color: var(--emerald-300);
	}
	.nav-link:hover::after {
		transform: scaleX(1);
	}
	.nav-cta {
		padding: 0.6rem 1.3rem;
		font-size: 0.72rem;
	}

	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 42px;
		height: 42px;
		background: none;
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-sm);
		z-index: 1001;
	}
	.burger span {
		display: block;
		width: 18px;
		height: 1.5px;
		margin-inline: auto;
		background: var(--emerald-200);
		transition: transform 0.3s var(--ease-out), opacity 0.2s ease;
	}
	.burger.open span:nth-child(1) {
		transform: translateY(3.75px) rotate(45deg);
	}
	.burger.open span:nth-child(2) {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	@media (max-width: 860px) {
		.burger {
			display: flex;
		}
		nav {
			position: fixed;
			inset: 0;
			flex-direction: column;
			justify-content: center;
			gap: 2.5rem;
			background:
				radial-gradient(90% 60% at 70% 20%, #0d1a15, transparent 60%),
				var(--onyx-900);
			transform: translateX(100%);
			transition: transform 0.5s var(--ease-drawer);
		}
		nav.open {
			transform: translateX(0);
		}
		nav ul {
			flex-direction: column;
			gap: 1.6rem;
		}
		.nav-link {
			font-size: 1.4rem;
			font-family: var(--font-display);
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}
		.nav-link__idx {
			font-size: 0.8rem;
		}
		nav.open li {
			opacity: 0;
			transform: translateY(16px);
			animation: menu-in 0.5s var(--ease-out) forwards;
			animation-delay: calc(var(--i) * 60ms + 120ms);
		}
		.nav-cta {
			padding: 0.9rem 2rem;
			font-size: 0.82rem;
		}
	}
	@keyframes menu-in {
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
