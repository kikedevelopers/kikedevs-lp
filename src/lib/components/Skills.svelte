<script lang="ts">
	import { skills } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	
	let isVisible = $state(false);
	let animatedLevels = $state<Record<string, number>>({});
	let sectionRef: HTMLElement;
	
	const categories = [...new Set(skills.map(s => s.category))];
	
	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					// Animate skill levels
					skills.forEach((skill, index) => {
						setTimeout(() => {
							animatedLevels[skill.name] = skill.level;
						}, index * 100);
					});
				}
			},
			{ threshold: 0.2 }
		);
		
		if (sectionRef) {
			observer.observe(sectionRef);
		}
		
		return () => observer.disconnect();
	});
	
	function getCategoryIcon(category: string) {
		switch(category) {
			case 'Frontend': return '💻';
			case 'Backend': return '⚙️';
			case 'Database': return '🗄️';
			case 'DevOps': return '🚀';
			case 'Quality': return '✨';
			case 'AI': return '🤖';
			default: return '📦';
		}
	}
</script>

<section id="skills" class="skills" bind:this={sectionRef}>
	<div class="section-glow"></div>
	
	<div class="container">
		<div class="section-header" class:visible={isVisible}>
			<span class="section-tag">Habilidades</span>
			<h2 class="section-title">Stack Tecnológico</h2>
			<p class="section-subtitle">Tecnologías que domino y uso para crear soluciones escalables</p>
		</div>
		
		<div class="skills-grid">
			{#each categories as category, catIndex (category)}
				<div 
					class="skill-category" 
					class:visible={isVisible}
					style="transition-delay: {catIndex * 150}ms"
				>
					<div class="category-header">
						<span class="category-icon">{getCategoryIcon(category)}</span>
						<h3 class="category-title">{category}</h3>
						<div class="category-line"></div>
					</div>
					
					<div class="category-skills">
						{#each skills.filter(s => s.category === category) as skill, skillIndex (skill.name)}
							<div class="skill-item" style="transition-delay: {catIndex * 150 + skillIndex * 50}ms">
								<div class="skill-info">
									<div class="skill-name-wrapper">
										<span class="skill-dot"></span>
										<span class="skill-name">{skill.name}</span>
									</div>
									<span class="skill-percentage">{animatedLevels[skill.name] || 0}%</span>
								</div>
								<div class="skill-bar">
									<div 
										class="skill-progress" 
										style="width: {animatedLevels[skill.name] || 0}%"
									>
										<div class="progress-glow"></div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		padding: var(--spacing-3xl) var(--spacing-lg);
		background: var(--color-bg-primary);
		overflow: hidden;
	}
	
	.section-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
		pointer-events: none;
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
	
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--spacing-xl);
	}
	
	.skill-category {
		position: relative;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base);
		overflow: hidden;
	}
	
	.skill-category.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.skill-category::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
		transform: scaleX(0);
		transition: transform var(--transition-slow);
	}
	
	.skill-category:hover::before {
		transform: scaleX(1);
	}
	
	.skill-category:hover {
		border-color: rgba(0, 255, 136, 0.3);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 136, 0.05);
	}
	
	.category-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
	}
	
	.category-icon {
		font-size: 1.5rem;
	}
	
	.category-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}
	
	.category-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--color-border), transparent);
		margin-left: var(--spacing-sm);
	}
	
	.category-skills {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	
	.skill-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.skill-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.skill-name-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.skill-dot {
		width: 6px;
		height: 6px;
		background: var(--color-accent-primary);
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(0, 255, 136, 0.8);
	}
	
	.skill-name {
		font-weight: 600;
		color: var(--color-text-primary);
		font-size: 0.95rem;
	}
	
	.skill-percentage {
		font-size: 0.875rem;
		color: var(--color-accent-primary);
		font-family: var(--font-mono);
		font-weight: 600;
	}
	
	.skill-bar {
		height: 6px;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		overflow: hidden;
		position: relative;
	}
	
	.skill-progress {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%);
		border-radius: var(--radius-full);
		transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}
	
	.progress-glow {
		position: absolute;
		top: 0;
		right: 0;
		width: 30px;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}
	
	@keyframes shimmer {
		0% { transform: translateX(-30px); }
		100% { transform: translateX(30px); }
	}
	
	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
