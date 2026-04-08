<script lang="ts">
	import { aboutData } from '$lib/utils/constants';
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
			{ threshold: 0.2 }
		);
		
		if (sectionRef) {
			observer.observe(sectionRef);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="about" class="about" bind:this={sectionRef}>
	<div class="section-background">
		<div class="grid-pattern"></div>
	</div>
	
	<div class="container">
		<div class="section-header" class:visible={isVisible}>
			<span class="section-tag">
				<span class="tag-line"></span>
				Sobre Mí
				<span class="tag-line"></span>
			</span>
			<h2 class="section-title">Conoce mi historia</h2>
		</div>
		
		<div class="about-content">
			<div class="about-text" class:visible={isVisible}>
				<p class="about-lead">
					{aboutData.description}
				</p>
				
				<div class="highlights-grid">
					{#each aboutData.highlights as highlight, index (highlight.title)}
						<div 
							class="highlight-card" 
							class:visible={isVisible}
							style="transition-delay: {index * 100 + 300}ms"
						>
							<div class="card-glow"></div>
							<div class="highlight-icon">
								{#if highlight.icon === 'code'}
									<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
								{:else if highlight.icon === 'server'}
									<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
								{/if}
							</div>
							<h3 class="highlight-title">{highlight.title}</h3>
							<p class="highlight-description">{highlight.description}</p>
						</div>
					{/each}
				</div>
			</div>
			
			<div class="stats-row" class:visible={isVisible}>
				{#each aboutData.stats as stat, index (stat.label)}
					<div 
						class="stat-item" 
						style="transition-delay: {index * 100 + 600}ms"
					>
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
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
	}
	
	.grid-pattern {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
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
		gap: 1rem;
		font-size: 0.875rem;
		color: var(--color-accent-primary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--spacing-md);
	}
	
	.tag-line {
		display: block;
		width: 40px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-primary));
	}
	
	.tag-line:last-child {
		background: linear-gradient(90deg, var(--color-accent-primary), transparent);
	}
	
	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #00FF88 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.about-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2xl);
	}
	
	.about-text {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base) 0.2s;
	}
	
	.about-text.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.about-lead {
		font-size: 1.35rem;
		font-weight: 500;
		color: var(--color-text-primary);
		line-height: 1.8;
		margin-bottom: var(--spacing-2xl);
	}
	
	.highlights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-2xl);
	}
	
	.highlight-card {
		position: relative;
		padding: var(--spacing-xl);
		background: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		text-align: left;
		transition: all var(--transition-fast);
		opacity: 0;
		transform: translateY(30px);
		overflow: hidden;
	}
	
	.highlight-card.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.highlight-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-primary), transparent);
		opacity: 0;
		transition: opacity var(--transition-fast);
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
	
	.highlight-card:hover {
		border-color: var(--color-accent-primary);
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 136, 0.1);
	}
	
	.highlight-card:hover::before {
		opacity: 1;
	}
	
	.highlight-card:hover .card-glow {
		opacity: 1;
	}
	
	.highlight-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 230, 118, 0.1) 100%);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-lg);
		color: var(--color-accent-primary);
		margin-bottom: var(--spacing-md);
		transition: all var(--transition-fast);
	}
	
	.highlight-card:hover .highlight-icon {
		background: linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%);
		color: var(--color-bg-primary);
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
	}
	
	.highlight-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-sm);
	}
	
	.highlight-description {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}
	
	.stats-row {
		display: flex;
		justify-content: center;
		gap: var(--spacing-2xl);
		flex-wrap: wrap;
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-border);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base) 0.6s;
	}
	
	.stats-row.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.stat-item {
		text-align: center;
		padding: var(--spacing-md);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s var(--transition-base);
	}
	
	.stat-value {
		display: block;
		font-size: 3rem;
		font-weight: 800;
		background: linear-gradient(135deg, #00FF88 0%, #00E676 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	@media (max-width: 768px) {
		.highlights-grid {
			grid-template-columns: 1fr;
		}
		
		.stats-row {
			gap: var(--spacing-lg);
		}
		
		.stat-value {
			font-size: 2.5rem;
		}
	}
</style>
