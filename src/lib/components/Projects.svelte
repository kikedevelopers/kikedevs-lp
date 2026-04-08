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
	
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
