<script lang="ts">
	import { projects } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	
	let isVisible = $state(false);
	let sectionRef: HTMLElement;
	
	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.1 }
		);
		
		if (sectionRef) {
			observer.observe(sectionRef);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="projects" class="projects" bind:this={sectionRef}>
	<div class="section-background">
		<div class="bg-orb orb-left"></div>
		<div class="bg-orb orb-right"></div>
	</div>
	
	<div class="container">
		<div class="section-header" class:visible={isVisible}>
			<span class="section-tag">
				<span class="tag-icon">🚀</span>
				Proyectos Destacados
			</span>
			<h2 class="section-title">Trabajos Recientes</h2>
			<p class="section-subtitle">Algunos de los proyectos que he desarrollado con pasión y dedicación</p>
		</div>
		
		<div class="projects-grid">
			{#each projects as project, index (project.id)}
				<article 
					class="project-card" 
					class:visible={isVisible}
					style="transition-delay: {index * 150}ms"
				>
					<div class="card-border"></div>
					<div class="card-glow"></div>
					
					<div class="card-content">
						<div class="project-header">
							<div class="project-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
							</div>
						</div>
						
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>
						
						<div class="tech-stack">
							{#each project.technologies as tech, techIndex (tech)}
								<span class="tech-tag" style="transition-delay: {index * 150 + techIndex * 50}ms">
									{tech}
								</span>
							{/each}
						</div>
						
						<div class="project-actions">
							<a href={project.github} target="_blank" rel="noopener noreferrer" class="action-btn secondary">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
								<span>GitHub</span>
							</a>
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="action-btn primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
									<span>Demo</span>
								</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		position: relative;
		padding: var(--spacing-3xl) var(--spacing-lg);
		background: var(--color-bg-secondary);
		overflow: hidden;
	}
	
	.section-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		overflow: hidden;
	}
	
	.bg-orb {
		position: absolute;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		filter: blur(150px);
		opacity: 0.1;
	}
	
	.orb-left {
		background: var(--color-accent-primary);
		top: -200px;
		left: -200px;
		animation: float 10s ease-in-out infinite;
	}
	
	.orb-right {
		background: var(--color-accent-secondary);
		bottom: -200px;
		right: -200px;
		animation: float 12s ease-in-out infinite reverse;
	}
	
	.container {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base);
	}
	
	.section-header.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.section-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(0, 255, 136, 0.1);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--color-accent-primary);
		font-weight: 600;
		margin-bottom: var(--spacing-md);
		backdrop-filter: blur(10px);
	}
	
	.tag-icon {
		font-size: 1rem;
	}
	
	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #00FF88 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--spacing-sm);
	}
	
	.section-subtitle {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		max-width: 500px;
		margin: 0 auto;
	}
	
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		gap: var(--spacing-xl);
	}
	
	.project-card {
		position: relative;
		background: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		opacity: 0;
		transform: translateY(40px) scale(0.95);
		transition: all 0.8s var(--transition-base);
	}
	
	.project-card.visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
	
	.card-border {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: var(--radius-xl);
		padding: 1px;
		background: linear-gradient(135deg, transparent, rgba(0, 255, 136, 0.3), transparent);
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}
	
	.project-card:hover .card-border {
		opacity: 1;
	}
	
	.card-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
		opacity: 0;
		transition: opacity var(--transition-fast);
		pointer-events: none;
	}
	
	.project-card:hover .card-glow {
		opacity: 1;
	}
	
	.card-content {
		position: relative;
		z-index: 1;
		padding: var(--spacing-xl);
	}
	
	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-md);
	}
	
	.project-icon {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 230, 118, 0.1) 100%);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-lg);
		color: var(--color-accent-primary);
		transition: all var(--transition-fast);
	}
	
	.project-card:hover .project-icon {
		background: linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%);
		color: var(--color-bg-primary);
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
		transform: scale(1.1);
	}
	
	.project-title {
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-sm);
		transition: color var(--transition-fast);
	}
	
	.project-card:hover .project-title {
		color: var(--color-accent-primary);
	}
	
	.project-description {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
	}
	
	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: var(--spacing-lg);
	}
	
	.tech-tag {
		padding: 0.4rem 0.8rem;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-size: 0.8rem;
		font-weight: 500;
		transition: all var(--transition-fast);
	}
	
	.tech-tag:hover {
		border-color: var(--color-accent-primary);
		color: var(--color-accent-primary);
		background: rgba(0, 255, 136, 0.1);
	}
	
	.project-actions {
		display: flex;
		gap: var(--spacing-sm);
	}
	
	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all var(--transition-fast);
		flex: 1;
		justify-content: center;
	}
	
	.action-btn.secondary {
		background: var(--color-bg-tertiary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
	}
	
	.action-btn.secondary:hover {
		border-color: var(--color-accent-primary);
		color: var(--color-accent-primary);
		background: rgba(0, 255, 136, 0.1);
	}
	
	.action-btn.primary {
		background: var(--color-accent-gradient);
		color: var(--color-bg-primary);
		border: 1px solid transparent;
	}
	
	.action-btn.primary:hover {
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
		transform: translateY(-2px);
	}
	
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
