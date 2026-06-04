<script lang="ts">
	import { base } from '$app/paths';
	import { navItems } from '$lib/utils/constants';
	
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let isVisible = $state(true);
	let lastScrollY = $state(0);
	
	function handleScroll() {
		const currentScrollY = window.scrollY;
		isScrolled = currentScrollY > 50;
		
		if (currentScrollY > lastScrollY && currentScrollY > 100) {
			isVisible = false;
		} else {
			isVisible = true;
		}
		lastScrollY = currentScrollY;
	}
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
		isMenuOpen = false;
	}

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
	<div class="container">
		<a href="#home" class="logo">
			<img src="{base}/logo.png" alt="Kike Dev's" class="logo-img" />
		</a>
		
		<button 
			class="menu-toggle" 
			onclick={toggleMenu}
			aria-label="Toggle menu"
			aria-expanded={isMenuOpen}
		>
			<span class:open={isMenuOpen}></span>
			<span class:open={isMenuOpen}></span>
			<span class:open={isMenuOpen}></span>
		</button>
		
		<nav class:open={isMenuOpen}>
			{#each navItems as item (item.href)}
				<a 
					href={item.href} 
					class="nav-link"
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
			<a href="#contact" class="cta-button" onclick={closeMenu}>
				<span class="btn-text">Hablemos</span>
			</a>
		</nav>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: var(--spacing-md) 0;
		transition: transform var(--transition-base), background var(--transition-base), padding var(--transition-base);
		background: transparent;
	}

	header.hidden {
		transform: translateY(-100%);
	}
	
	header.scrolled {
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(20px) saturate(180%);
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid rgba(0, 255, 136, 0.1);
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		transition: transform var(--transition-fast);
	}
	
	.logo:hover {
		transform: scale(1.02);
	}
	
	.logo-img {
		height: 50px;
		width: auto;
		object-fit: contain;
		transition: transform var(--transition-fast);
	}
	
	.logo:hover .logo-img {
		transform: scale(1.05);
	}
	
	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1001;
	}
	
	.menu-toggle span {
		display: block;
		width: 25px;
		height: 2px;
		background: linear-gradient(90deg, #00FF88, #00E676);
		transition: all var(--transition-fast);
	}
	
	.menu-toggle span.open:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}
	
	.menu-toggle span.open:nth-child(2) {
		opacity: 0;
	}
	
	.menu-toggle span.open:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}
	
	nav {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}
	
	.nav-link {
		color: var(--color-text-secondary);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.95rem;
		transition: all var(--transition-fast);
		position: relative;
		padding: 0.5rem 0;
	}
	
	.nav-link::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: var(--color-accent-primary);
		box-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
		transition: width var(--transition-fast);
	}
	
	.nav-link:hover {
		color: var(--color-accent-primary);
		text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
	}
	
	.nav-link:hover::before {
		width: 100%;
	}
	
	.cta-button {
		position: relative;
		background: var(--color-accent-primary);
		color: #0a0a0a;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: 700;
		font-size: 0.95rem;
		border: 2px solid var(--color-accent-primary);
		transition: all var(--transition-fast);
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
	}
	
	.cta-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s;
	}
	
	.cta-button:hover {
		background: transparent;
		color: var(--color-accent-primary);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
		transform: translateY(-2px);
	}
	
	.cta-button:hover::before {
		left: 100%;
	}
	
	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}
		
		nav {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			height: 100dvh;
			background: var(--color-bg-primary);
			background: linear-gradient(180deg, #0a0a0a 0%, #0d130f 100%);
			flex-direction: column;
			justify-content: center;
			gap: var(--spacing-xl);
			padding: var(--spacing-xl);
			transform: translateX(100%);
			transition: transform var(--transition-base);
			z-index: 1000;
		}

		nav.open {
			transform: translateX(0);
		}

		.nav-link {
			font-size: 1.5rem;
			color: var(--color-text-primary);
		}

		.cta-button {
			margin-top: var(--spacing-md);
			font-size: 1.1rem;
			padding: 1rem 2rem;
		}
	}
</style>
