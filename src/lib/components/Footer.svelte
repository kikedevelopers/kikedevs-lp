<script lang="ts">
	import { base } from '$app/paths';
	import { siteConfig, navItems } from '$lib/utils/constants';
	import { reveal } from '$lib/actions/motion';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer__rule" aria-hidden="true"></div>
	<div class="shell">
		<div class="footer__top" use:reveal>
			<div class="footer__brand">
				<a href="#home" class="footer__logo" aria-label="Kike Dev's — inicio">
					<img src="{base}/logo.png" alt="Kike Dev's" />
				</a>
				<p class="footer__desc">
					Full Stack Developer. Construyo productos digitales que escalan — del
					commit al deploy. Transformo ideas en código, código en resultados.
				</p>
				<p class="footer__status meta">
					<span class="dot"></span> disponible para proyectos remotos
				</p>
			</div>

			<nav class="footer__nav" aria-label="Pie de página">
				<span class="meta footer__col-title">// nav</span>
				<ul>
					{#each navItems as item (item.href)}
						<li><a href={item.href}>{item.label}</a></li>
					{/each}
				</ul>
			</nav>

			<div class="footer__connect">
				<span class="meta footer__col-title">// conecta</span>
				<a class="footer__social" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
					<span>GitHub</span>
				</a>
				<a class="footer__social" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.5" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
					<span>LinkedIn</span>
				</a>
			</div>
		</div>

		<div class="footer__bottom meta">
			<p>© {year} {siteConfig.author} · todos los derechos reservados</p>
			<p class="footer__sig"><span class="prompt">$</span> git push origin main</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		z-index: 2;
		padding-block: var(--space-2xl) var(--space-lg);
		background: var(--onyx-850);
		overflow: hidden;
	}
	.footer__rule {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--emerald-700), transparent);
	}

	.footer__top {
		display: grid;
		grid-template-columns: 2fr 1fr 1.2fr;
		gap: clamp(2rem, 5vw, 4rem);
		padding-bottom: var(--space-xl);
	}
	.footer__logo img {
		height: 40px;
		width: auto;
		margin-bottom: 1.2rem;
	}
	.footer__desc {
		max-width: 40ch;
		color: var(--ink-400);
		font-size: 0.95rem;
		line-height: 1.7;
	}
	.footer__status {
		margin-top: 1.3rem;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--ink-400);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--emerald-300);
		animation: pulse-dot 2.2s var(--ease-in-out) infinite;
	}

	.footer__col-title {
		display: block;
		color: var(--emerald-600);
		margin-bottom: 1.2rem;
	}
	.footer__nav ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.footer__nav a {
		display: inline-block;
		color: var(--ink-300);
		font-size: 0.95rem;
		transition: color 0.25s ease, transform 0.25s var(--ease-out);
	}
	.footer__nav a:hover {
		color: var(--emerald-200);
		transform: translateX(6px);
	}

	.footer__connect {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.footer__social {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--ink-300);
		font-size: 0.95rem;
		transition: color 0.25s ease, transform 0.25s var(--ease-out);
	}
	.footer__social:hover {
		color: var(--emerald-200);
		transform: translateX(4px);
	}

	.footer__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.8rem;
		padding-top: var(--space-md);
		border-top: 1px solid var(--hairline);
		color: var(--ink-600);
	}
	.footer__sig .prompt {
		color: var(--emerald-500);
	}

	@media (max-width: 760px) {
		.footer__top {
			grid-template-columns: 1fr 1fr;
		}
		.footer__brand {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 460px) {
		.footer__top {
			grid-template-columns: 1fr;
		}
	}
</style>
