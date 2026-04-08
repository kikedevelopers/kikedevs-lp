<script lang="ts">
	import { siteConfig, aboutData } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	
	let particles: Array<{x: number; y: number; size: number; speedX: number; speedY: number}> = [];
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;
	let isVisible = $state(false);
	
	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d')!;
		resizeCanvas();
		initParticles();
		animate();
		
		window.addEventListener('resize', () => {
			resizeCanvas();
			initParticles();
		});
		
		// Trigger animations after mount
		setTimeout(() => isVisible = true, 100);
		
		return () => {
			cancelAnimationFrame(animationId);
		};
	});
	
	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
	function initParticles() {
		particles = [];
		const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2 + 1,
				speedX: (Math.random() - 0.5) * 0.5,
				speedY: (Math.random() - 0.5) * 0.5
			});
		}
	}
	
	function animate() {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		particles.forEach((particle, i) => {
			particle.x += particle.speedX;
			particle.y += particle.speedY;
			
			if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
			if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
			
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
			ctx.fill();
			
			// Draw connections
			particles.slice(i + 1).forEach(other => {
				const dx = particle.x - other.x;
				const dy = particle.y - other.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < 100) {
					ctx.beginPath();
					ctx.moveTo(particle.x, particle.y);
					ctx.lineTo(other.x, other.y);
					ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - distance / 100)})`;
					ctx.stroke();
				}
			});
		});
		
		animationId = requestAnimationFrame(animate);
	}
	
	const typingText = "Full Stack Developer";
	let displayedText = $state("");
	let typingIndex = $state(0);
	
	$effect(() => {
		if (isVisible && typingIndex < typingText.length) {
			const timeout = setTimeout(() => {
				displayedText += typingText[typingIndex];
				typingIndex++;
			}, 100);
			return () => clearTimeout(timeout);
		}
	});
</script>

<section id="home" class="hero">
	<canvas bind:this={canvas} class="particles-canvas"></canvas>
	
	<div class="hero-content" class:visible={isVisible}>
		<!-- <div class="hero-badge" class:visible={isVisible}>
			<span class="badge-pulse"></span>
			<span class="badge-text">Disponible para proyectos</span>
		</div> -->
		
		<h1 class="hero-title">
			<span class="title-greeting" class:visible={isVisible}>Hola, soy</span>
			<span class="title-name" class:visible={isVisible}>{siteConfig.author}</span>
			<span class="title-role" class:visible={isVisible}>
				{displayedText}<span class="cursor">|</span>
			</span>
		</h1>
		
		<p class="hero-description" class:visible={isVisible}>
			Transformo ideas en <strong>experiencias digitales excepcionales</strong>. Especializado en React, Node.js y arquitecturas escalables que impulsan tu negocio al siguiente nivel.
		</p>
		
		<div class="hero-actions" class:visible={isVisible}>
			<a href="#projects" class="btn-primary">
				<span class="btn-content">
					Ver Proyectos
					<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</span>
				<span class="btn-shine"></span>
			</a>
			<a href="#contact" class="btn-secondary">
				<span class="btn-content">
					Contactar
					<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
				</span>
			</a>
		</div>
		
		<div class="hero-quote" class:visible={isVisible}>
			<span class="quote-mark">"</span>
			<span class="quote-text">{aboutData.quote.replace(/"/g, '')}</span>
			<span class="quote-mark">"</span>
		</div>
	</div>
	
	<div class="hero-background">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="grid-lines"></div>
		<div class="noise-overlay"></div>
	</div>
	
	<div class="scroll-indicator" class:visible={isVisible}>
		<div class="mouse">
			<div class="wheel"></div>
		</div>
		<span>Scroll</span>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: var(--spacing-3xl) var(--spacing-lg);
		overflow: hidden;
		background: radial-gradient(ellipse at bottom, #0f0f0f 0%, #0a0a0a 100%);
	}
	
	.particles-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}
	
	.hero-content {
		text-align: center;
		max-width: 900px;
		z-index: 2;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s var(--transition-base);
	}
	
	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background: rgba(0, 255, 136, 0.1);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--color-accent-primary);
		margin-bottom: var(--spacing-xl);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.2s;
		backdrop-filter: blur(10px);
	}
	
	.hero-badge.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.badge-pulse {
		width: 8px;
		height: 8px;
		background: var(--color-accent-primary);
		border-radius: 50%;
		animation: pulse-glow 2s infinite;
		box-shadow: 0 0 10px var(--color-accent-primary);
	}
	
	.hero-title {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
	}
	
	.title-greeting {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		font-weight: 500;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.3s;
	}
	
	.title-greeting.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.title-name {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #00FF88 50%, #00E676 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		background-size: 200% 200%;
		animation: gradient-shift 5s ease infinite;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.4s;
	}
	
	.title-name.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.title-role {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-family: var(--font-mono);
		color: var(--color-accent-primary);
		text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.5s;
		height: 1.2em;
	}
	
	.title-role.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.cursor {
		animation: blink 1s infinite;
	}
	
	.hero-description {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto var(--spacing-xl);
		line-height: 1.8;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.6s;
	}
	
	.hero-description.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.hero-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: var(--spacing-2xl);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.7s;
	}
	
	.hero-actions.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.btn-primary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2.5rem;
		background: var(--color-accent-gradient);
		color: var(--color-bg-primary);
		text-decoration: none;
		font-weight: 700;
		font-size: 1rem;
		border-radius: var(--radius-md);
		overflow: hidden;
		transition: all var(--transition-fast);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
	}
	
	.btn-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}
	
	.btn-shine {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s;
	}
	
	.btn-primary:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 0 50px rgba(0, 255, 136, 0.6);
	}
	
	.btn-primary:hover .btn-shine {
		left: 100%;
	}
	
	.btn-primary:hover .btn-icon {
		transform: translateX(4px);
	}
	
	.btn-secondary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2.5rem;
		background: transparent;
		color: var(--color-accent-primary);
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-accent-primary);
		transition: all var(--transition-fast);
		overflow: hidden;
	}
	
	.btn-secondary::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.2), transparent);
		transition: left 0.5s;
	}
	
	.btn-secondary:hover {
		background: rgba(0, 255, 136, 0.1);
		border-color: var(--color-accent-secondary);
		transform: translateY(-3px);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
	}
	
	.btn-secondary:hover::before {
		left: 100%;
	}
	
	.btn-icon {
		transition: transform var(--transition-fast);
	}
	
	.hero-quote {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-style: italic;
		color: var(--color-text-muted);
		font-size: 1.125rem;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.8s;
	}
	
	.hero-quote.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.quote-mark {
		color: var(--color-accent-primary);
		font-size: 1.5rem;
	}
	
	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		z-index: 0;
	}
	
	.hero-description strong {
		color: var(--color-accent-primary);
		font-weight: 700;
	}
	
	.grid-lines {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
		background-size: 80px 80px;
		animation: grid-move 20s linear infinite;
		pointer-events: none;
	}
	
	@keyframes grid-move {
		0% { transform: translate(0, 0); }
		100% { transform: translate(80px, 80px); }
	}
	
	.noise-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		opacity: 0.02;
		pointer-events: none;
	}
	
	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		opacity: 0.3;
	}
	
	.orb-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, transparent 70%);
		top: -200px;
		right: -100px;
		animation: float 8s ease-in-out infinite;
	}
	
	.orb-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(0, 230, 118, 0.3) 0%, transparent 70%);
		bottom: -150px;
		left: -100px;
		animation: float 10s ease-in-out infinite reverse;
	}
	
	.orb-3 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: pulse-glow 4s ease-in-out infinite;
	}
	
	.scroll-indicator {
		position: absolute;
		bottom: var(--spacing-xl);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-text-muted);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0;
		transition: all 0.6s ease 1s;
		z-index: 2;
	}
	
	.scroll-indicator.visible {
		opacity: 1;
	}
	
	.mouse {
		width: 26px;
		height: 40px;
		border: 2px solid var(--color-accent-primary);
		border-radius: var(--radius-full);
		position: relative;
		box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
	}
	
	.wheel {
		width: 4px;
		height: 8px;
		background: var(--color-accent-primary);
		border-radius: var(--radius-full);
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);
		animation: scroll 2s infinite;
	}
	
	@keyframes scroll {
		0% { top: 6px; opacity: 1; }
		100% { top: 20px; opacity: 0; }
	}
	
	@media (max-width: 768px) {
		.hero-actions {
			flex-direction: column;
			align-items: center;
		}
		
		.btn-primary,
		.btn-secondary {
			width: 100%;
			max-width: 280px;
			justify-content: center;
		}
	}
</style>
