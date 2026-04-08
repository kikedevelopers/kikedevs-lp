<script lang="ts">
	import { siteConfig, navItems } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	
	const currentYear = new Date().getFullYear();
	let isVisible = $state(false);
	let footerRef: HTMLElement;
	
	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.2 }
		);
		
		if (footerRef) {
			observer.observe(footerRef);
		}
		
		return () => observer.disconnect();
	});
</script>

<footer class="footer" bind:this={footerRef}>
	<div class="footer-glow"></div>
	
	<div class="container">
		<div class="footer-content" class:visible={isVisible}>
			<div class="footer-brand">
				<a href="#home" class="footer-logo">
					<img src="/logo.png" alt="Kike Dev's" class="footer-logo-img" />
				</a>
				<p class="footer-description">
					Full Stack Developer especializado en crear soluciones digitales que impulsan tu negocio. 
					Transformo ideas en código, código en resultados.
				</p>
				<div class="footer-location">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
					<span>Disponible para proyectos remotos</span>
				</div>
			</div>
			
			<div class="footer-links" style="transition-delay: 100ms">
				<h4 class="links-title">Navegación</h4>
				<ul class="links-list">
					{#each navItems as item (item.href)}
						<li>
							<a href={item.href} class="footer-link">
								<span class="link-dot"></span>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<div class="footer-social" style="transition-delay: 200ms">
				<h4 class="links-title">Conecta</h4>
				<div class="social-links">
					<a href={siteConfig.github} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
						<div class="social-icon-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
						</div>
						<span>GitHub</span>
					</a>
					<a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
						<div class="social-icon-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
						</div>
						<span>LinkedIn</span>
					</a>
				</div>
			</div>
		</div>
		
		<div class="footer-bottom" style="transition-delay: 300ms">
			<div class="bottom-content">
				<p class="copyright">
					© {currentYear} <span class="highlight">{siteConfig.author}</span>. Todos los derechos reservados.
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		padding: var(--spacing-3xl) var(--spacing-lg) var(--spacing-lg);
		background: var(--color-bg-secondary);
		border-top: 1px solid var(--color-border);
		overflow: hidden;
	}
	
	.footer-glow {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 200px;
		background: radial-gradient(ellipse, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
		pointer-events: none;
	}
	
	.container {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1.5fr;
		gap: var(--spacing-2xl);
		margin-bottom: var(--spacing-2xl);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base);
	}
	
	.footer-content.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		margin-bottom: var(--spacing-md);
		transition: transform var(--transition-fast);
	}
	
	.footer-logo:hover {
		transform: scale(1.02);
	}
	
	.footer-logo-img {
		height: 45px;
		width: auto;
		object-fit: contain;
		transition: transform var(--transition-fast);
	}
	
	.footer-logo:hover .footer-logo-img {
		transform: scale(1.05);
	}
	
	.footer-description {
		color: var(--color-text-secondary);
		font-size: 0.95rem;
		line-height: 1.7;
		max-width: 320px;
		margin-bottom: var(--spacing-md);
	}
	
	.footer-location {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}
	
	.footer-location svg {
		color: var(--color-accent-primary);
	}
	
	.links-title {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-md);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	
	.links-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	
	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
		transition: all var(--transition-fast);
	}
	
	.link-dot {
		width: 4px;
		height: 4px;
		background: var(--color-accent-primary);
		border-radius: 50%;
		opacity: 0;
		transition: all var(--transition-fast);
		box-shadow: 0 0 6px rgba(0, 255, 136, 0.8);
	}
	
	.footer-link:hover {
		color: var(--color-accent-primary);
		transform: translateX(4px);
	}
	
	.footer-link:hover .link-dot {
		opacity: 1;
	}
	
	.social-links {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	
	.social-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 0.75rem 1rem;
		background: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all var(--transition-fast);
	}
	
	.social-icon-wrapper {
		color: var(--color-text-muted);
		transition: color var(--transition-fast);
	}
	
	.social-link:hover {
		border-color: var(--color-accent-primary);
		transform: translateX(8px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 255, 136, 0.1);
	}
	
	.social-link:hover .social-icon-wrapper {
		color: var(--color-accent-primary);
	}
	
	.footer-bottom {
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-border);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s var(--transition-base);
	}
	
	.footer-content.visible ~ .footer-bottom {
		opacity: 1;
		transform: translateY(0);
	}
	
	.bottom-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}
	
	.copyright,
	.built-with {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}
	
	.highlight {
		color: var(--color-accent-primary);
		font-weight: 600;
	}
	
	.heart {
		color: #ff4757;
		animation: pulse 1.5s ease-in-out infinite;
	}
	
	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.2); }
	}
	
	.tech {
		color: var(--color-accent-primary);
		font-weight: 600;
	}
	
	@media (max-width: 968px) {
		.footer-content {
			grid-template-columns: 1fr 1fr;
		}
		
		.footer-brand {
			grid-column: 1 / -1;
		}
	}
	
	@media (max-width: 640px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}
		
		.bottom-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
