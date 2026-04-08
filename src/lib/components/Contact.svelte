<script lang="ts">
	import { siteConfig } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	let isSubmitting = $state(false);
	let isVisible = $state(false);
	let sectionRef: HTMLElement;
	
	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.2 }
		);
		
		if (sectionRef) {
			observer.observe(sectionRef);
		}
		
		return () => observer.disconnect();
	});
	
	function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission
		setTimeout(() => {
			alert('¡Mensaje enviado! Te contactaré pronto.');
			formData = { name: '', email: '', message: '' };
			isSubmitting = false;
		}, 1500);
	}
</script>

<section id="contact" class="contact" bind:this={sectionRef}>
	<div class="section-background">
		<div class="bg-gradient"></div>
	</div>
	
	<div class="container">
		<div class="contact-grid">
			<div class="contact-info" class:visible={isVisible}>
				<div class="info-header">
					<span class="section-tag">Contacto</span>
					<h2 class="section-title">Trabajemos juntos</h2>
					<p class="section-subtitle">
						¿Listo para llevar tu idea al siguiente nivel? Conectemos y creemos algo extraordinario juntos. Tu visión, mi código, resultados excepcionales.
					</p>
				</div>
				
				<div class="contact-methods">
					<a href="mailto:{siteConfig.email}" class="contact-card">
						<div class="card-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						</div>
						<div class="card-content">
							<span class="card-label">Email</span>
							<span class="card-value">{siteConfig.email}</span>
						</div>
						<div class="card-arrow">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</div>
					</a>
					
					<div class="social-grid">
						<a href={siteConfig.github} target="_blank" rel="noopener noreferrer" class="social-card">
							<div class="social-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
							</div>
							<span class="social-name">GitHub</span>
						</a>
						
						<a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" class="social-card">
							<div class="social-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
							</div>
							<span class="social-name">LinkedIn</span>
						</a>
					</div>
				</div>
			</div>
			
			<form class="contact-form" class:visible={isVisible} onsubmit={handleSubmit}>
				<div class="form-glow"></div>
				
				<div class="form-header">
					<h3 class="form-title">Hablemos de tu proyecto</h3>
					<p class="form-subtitle">Cuéntame tu idea y la convertiré en realidad</p>
				</div>
				
				<div class="form-group">
					<label for="name">Nombre</label>
					<div class="input-wrapper">
						<input 
							type="text" 
							id="name" 
							bind:value={formData.name}
							placeholder="Tu nombre"
							required
						/>
						<div class="input-glow"></div>
					</div>
				</div>
				
				<div class="form-group">
					<label for="email">Email</label>
					<div class="input-wrapper">
						<input 
							type="email" 
							id="email" 
							bind:value={formData.email}
							placeholder="tu@email.com"
							required
						/>
						<div class="input-glow"></div>
					</div>
				</div>
				
				<div class="form-group">
					<label for="message">Mensaje</label>
					<div class="input-wrapper">
						<textarea 
							id="message" 
							bind:value={formData.message}
							placeholder="Cuéntame sobre tu proyecto..."
							rows="5"
							required
						></textarea>
						<div class="input-glow"></div>
					</div>
				</div>
				
				<button type="submit" class="submit-btn" disabled={isSubmitting}>
					{#if isSubmitting}
						<span class="spinner"></span>
						Enviando...
					{:else}
						<span>Enviar Mensaje</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>

<style>
	.contact {
		position: relative;
		padding: var(--spacing-3xl) var(--spacing-lg);
		background: var(--color-bg-primary);
		overflow: hidden;
	}
	
	.section-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}
	
	.bg-gradient {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60%;
		background: radial-gradient(ellipse at bottom, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
	}
	
	.container {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: var(--spacing-3xl);
		align-items: start;
	}
	
	.contact-info {
		opacity: 0;
		transform: translateX(-30px);
		transition: all 0.8s var(--transition-base);
	}
	
	.contact-info.visible {
		opacity: 1;
		transform: translateX(0);
	}
	
	.info-header {
		margin-bottom: var(--spacing-2xl);
	}
	
	.section-tag {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		background: rgba(0, 255, 136, 0.1);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--color-accent-primary);
		font-weight: 600;
		margin-bottom: var(--spacing-md);
		backdrop-filter: blur(10px);
	}
	
	.section-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #00FF88 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--spacing-md);
	}
	
	.section-subtitle {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		line-height: 1.8;
	}
	
	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	
	.contact-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		text-decoration: none;
		transition: all var(--transition-fast);
	}
	
	.contact-card:hover {
		border-color: var(--color-accent-primary);
		transform: translateX(8px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 136, 0.1);
	}
	
	.card-icon {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 230, 118, 0.1) 100%);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-lg);
		color: var(--color-accent-primary);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}
	
	.contact-card:hover .card-icon {
		background: var(--color-accent-gradient);
		color: var(--color-bg-primary);
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
	}
	
	.card-content {
		flex: 1;
	}
	
	.card-label {
		display: block;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}
	
	.card-value {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
		transition: color var(--transition-fast);
	}
	
	.contact-card:hover .card-value {
		color: var(--color-accent-primary);
	}
	
	.card-arrow {
		color: var(--color-text-muted);
		transition: all var(--transition-fast);
		opacity: 0;
		transform: translateX(-10px);
	}
	
	.contact-card:hover .card-arrow {
		opacity: 1;
		transform: translateX(0);
		color: var(--color-accent-primary);
	}
	
	.social-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-sm);
	}
	
	.social-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all var(--transition-fast);
	}
	
	.social-card:hover {
		border-color: var(--color-accent-primary);
		transform: translateY(-4px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}
	
	.social-icon {
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}
	
	.social-card:hover .social-icon {
		color: var(--color-accent-primary);
	}
	
	.social-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}
	
	.social-card:hover .social-name {
		color: var(--color-text-primary);
	}
	
	.contact-form {
		position: relative;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-2xl);
		opacity: 0;
		transform: translateX(30px);
		transition: all 0.8s var(--transition-base) 0.2s;
		overflow: hidden;
	}
	
	.contact-form.visible {
		opacity: 1;
		transform: translateX(0);
	}
	
	.form-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
		opacity: 0.5;
		pointer-events: none;
	}
	
	.form-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}
	
	.form-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-xs);
	}
	
	.form-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: var(--spacing-md);
	}
	
	.form-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.input-wrapper {
		position: relative;
	}
	
	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem 1.25rem;
		background: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-primary);
		font-size: 1rem;
		transition: all var(--transition-fast);
		resize: vertical;
	}
	
	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-accent-primary);
		box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
	}
	
	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--color-text-muted);
	}
	
	.input-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: var(--radius-lg);
		box-shadow: 0 0 20px rgba(0, 255, 136, 0);
		transition: box-shadow var(--transition-fast);
		pointer-events: none;
	}
	
	.form-group input:focus ~ .input-glow,
	.form-group textarea:focus ~ .input-glow {
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
	}
	
	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 1rem 2rem;
		background: var(--color-accent-gradient);
		color: var(--color-bg-primary);
		border: none;
		border-radius: var(--radius-lg);
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
		margin-top: var(--spacing-sm);
	}
	
	.submit-btn:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
	}
	
	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
	
	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid var(--color-bg-primary);
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	
	@media (max-width: 968px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-2xl);
		}
		
		.contact-info {
			transform: translateY(-30px);
		}
		
		.contact-info.visible {
			transform: translateY(0);
		}
		
		.contact-form {
			transform: translateY(30px);
		}
		
		.contact-form.visible {
			transform: translateY(0);
		}
	}
	
	@media (max-width: 480px) {
		.social-grid {
			grid-template-columns: 1fr;
		}
		
		.social-card {
			flex-direction: row;
			justify-content: flex-start;
		}
	}
</style>
