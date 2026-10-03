<script lang="ts">
	import { siteConfig } from '$lib/utils/constants';
	import { reveal, parallax } from '$lib/actions/motion';
	import { buildMailto } from '$lib/utils/format';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		window.location.href = buildMailto(siteConfig.email, name, email, message);
		sent = true;
		setTimeout(() => (sent = false), 6000);
	}
</script>

<section id="contact" class="contact">
	<div class="contact__bg" aria-hidden="true">
		<div class="contact__glow" use:parallax={{ speed: 0.22 }}></div>
	</div>

	<div class="shell contact__grid">
		<div class="contact__info" use:reveal>
			<span class="meta sec-idx">// contact</span>
			<h2>Iniciemos el<br /><span class="accent">proyecto</span></h2>
			<p class="contact__lede">
				¿Tienes una idea o un sistema que escalar? Cuéntame qué necesitas y te
				respondo con un plan. Del primer mensaje al primer deploy.
			</p>

			<div class="methods">
				<a class="method" href="mailto:{siteConfig.email}">
					<span class="method__icon">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 7 9 6 9-6" /></svg>
					</span>
					<span class="method__body">
						<span class="meta">email</span>
						<span class="method__val">{siteConfig.email}</span>
					</span>
					<svg class="method__arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
				</a>

				<div class="socials">
					<a class="social" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
						<span>GitHub</span>
					</a>
					<a class="social" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.5" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
						<span>LinkedIn</span>
					</a>
				</div>
			</div>
		</div>

		<form class="term-form" use:reveal onsubmit={handleSubmit}>
			<div class="term-form__bar">
				<span class="dots" aria-hidden="true">
					<i style="--d:var(--mac-red)"></i>
					<i style="--d:var(--mac-amber)"></i>
					<i style="--d:var(--mac-green)"></i>
				</span>
				<span class="term-form__title">contact --init</span>
			</div>

			<div class="term-form__body">
				<label class="field">
					<span class="field__label"><span class="prompt">$</span> nombre</span>
					<input type="text" bind:value={name} placeholder="tu nombre" required autocomplete="name" />
				</label>
				<label class="field">
					<span class="field__label"><span class="prompt">$</span> email</span>
					<input type="email" bind:value={email} placeholder="tu@correo.com" required autocomplete="email" />
				</label>
				<label class="field">
					<span class="field__label"><span class="prompt">$</span> mensaje</span>
					<textarea bind:value={message} rows="4" placeholder="cuéntame tu proyecto…" required></textarea>
				</label>

				<button type="submit" class="btn btn--primary send">
					{#if sent}
						abriendo correo…
					{:else}
						enviar mensaje
						<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
					{/if}
				</button>
				<p class="send-note meta">// se abre tu app de correo con el mensaje listo</p>
			</div>
		</form>
	</div>
</section>

<style>
	.contact {
		position: relative;
		padding-block: var(--space-3xl);
		overflow: hidden;
	}
	.contact__bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.contact__glow {
		position: absolute;
		bottom: -16rem;
		left: 50%;
		transform: translateX(-50%);
		width: 58rem;
		height: 38rem;
		background: radial-gradient(ellipse at center, rgba(0, 255, 136, 0.09), transparent 66%);
		filter: blur(40px);
	}

	.contact__grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 1.05fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.sec-idx {
		color: var(--ink-500);
		display: block;
		margin-bottom: 1rem;
	}
	.contact__info h2 {
		font-size: clamp(2.1rem, 5vw, 3.6rem);
		letter-spacing: -0.035em;
	}
	.accent {
		color: var(--emerald-300);
	}
	.contact__lede {
		margin-top: 1.4rem;
		max-width: 44ch;
		color: var(--ink-300);
		font-size: 1.05rem;
		line-height: 1.75;
	}

	.methods {
		margin-top: 2.4rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.method {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding: 1.1rem 1.2rem;
		border: 1px solid var(--hairline);
		border-radius: var(--radius-md);
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), transparent);
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-out),
			box-shadow 0.3s ease;
	}
	.method:hover {
		border-color: var(--emerald-700);
		transform: translateY(-2px);
		box-shadow: 0 16px 36px -14px rgba(0, 255, 136, 0.28);
	}
	.method__icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		flex-shrink: 0;
		color: var(--emerald-200);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-sm);
		background: rgba(0, 255, 136, 0.05);
	}
	.method__body {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.method__val {
		color: var(--ink-100);
		font-weight: 500;
		font-family: var(--font-mono);
		font-size: 0.9rem;
	}
	.method__arrow {
		margin-left: auto;
		color: var(--emerald-500);
		opacity: 0;
		transform: translateX(-6px);
		transition: all 0.3s var(--ease-out);
	}
	.method:hover .method__arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.socials {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.social {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.9rem;
		border: 1px solid var(--hairline);
		border-radius: var(--radius-md);
		color: var(--ink-300);
		font-size: 0.9rem;
		transition:
			border-color 0.3s ease,
			color 0.3s ease,
			transform 0.3s var(--ease-out);
	}
	.social:hover {
		border-color: var(--emerald-700);
		color: var(--emerald-100);
		transform: translateY(-2px);
	}

	/* terminal form */
	.term-form {
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, rgba(18, 22, 25, 0.6), rgba(8, 10, 12, 0.72));
		backdrop-filter: blur(12px);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
	}
	.term-form__bar {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.7rem 0.95rem;
		border-bottom: 1px solid var(--hairline);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
	}
	.dots {
		display: inline-flex;
		gap: 0.5rem;
	}
	.dots i {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--d);
	}
	.term-form__title {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--ink-500);
	}
	.term-form__body {
		padding: clamp(1.4rem, 3vw, 2rem);
	}
	.field {
		display: block;
		margin-bottom: 1.1rem;
	}
	.field__label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--ink-400);
		margin-bottom: 0.5rem;
	}
	.field__label .prompt {
		color: var(--emerald-300);
		margin-right: 0.3rem;
	}
	.field input,
	.field textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		font-family: var(--font-mono);
		font-size: 0.92rem;
		color: var(--ink-100);
		background: var(--onyx-900);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-sm);
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease,
			background 0.25s ease;
		resize: vertical;
	}
	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--ink-600);
	}
	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--emerald-500);
		background: var(--onyx-850);
		box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.12);
	}
	.send {
		width: 100%;
		justify-content: center;
		margin-top: 0.4rem;
		font-family: var(--font-mono);
	}
	.send-note {
		margin-top: 0.9rem;
		text-align: center;
		color: var(--ink-600);
	}

	@media (max-width: 860px) {
		.contact__grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}
</style>
