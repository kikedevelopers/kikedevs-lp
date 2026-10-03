<script lang="ts">
	import { skills } from '$lib/utils/constants';
	import { reveal, parallax } from '$lib/actions/motion';

	const categories = [...new Set(skills.map((s) => s.category))];
	const byCat = (c: string) => skills.filter((s) => s.category === c);

	const labelEs: Record<string, string> = {
		Frontend: 'Frontend',
		Backend: 'Backend',
		Database: 'Bases de datos',
		DevOps: 'DevOps',
		Quality: 'Calidad',
		AI: 'IA'
	};

	const catIcon: Record<string, string> = {
		Frontend: 'M3 5h18v11H3zM3 19h18M9 9l-2 2 2 2M15 9l2 2-2 2',
		Backend: 'M4 5h16v4H4zM4 15h16v4H4zM7 7h.01M7 17h.01M11 7h6M11 17h6',
		Database:
			'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
		DevOps:
			'M4.5 16.5 3 21l4.5-1.5M14 6s2.5-3 6-3c0 3.5-3 6-3 6M14 6l-4 1-3 3 4 1 1 4 3-3 1-4M14 6l-4 7M9 13l2 2',
		Quality: 'M12 2 9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7ZM5 4v3M19 17v3M4 5h2M18 18h2',
		AI: 'M9 3h6v3M9 21h6v-3M3 9h3v6H3M18 9h3v6h-3M8 8h8v8H8zM11 11h2v2h-2z'
	};
</script>

<section id="skills" class="skills">
	<div class="skills__bg" aria-hidden="true">
		<div class="skills__halo" use:parallax={{ speed: 0.2 }}></div>
	</div>

	<div class="shell">
		<header class="sec-head" use:reveal>
			<div class="sec-head__line">
				<h2>El <span class="accent">stack</span></h2>
				<span class="meta sec-head__idx">// dependencies</span>
			</div>
			<p class="sec-head__lede">
				Tecnologías que uso a diario para enviar producto. Cada una calibrada por
				años en producción, no por tutoriales.
			</p>
		</header>

		<div class="spectrum">
			{#each categories as cat (cat)}
				<article class="row" use:reveal>
					<div class="row__head">
						<span class="row__icon">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={catIcon[cat]} />
							</svg>
						</span>
						<h3>{labelEs[cat] ?? cat}</h3>
						<span class="meta row__count">{byCat(cat).length} pkg</span>
					</div>

					<div class="row__skills" use:reveal={{ stagger: true }}>
						{#each byCat(cat) as skill (skill.name)}
							<div class="gauge" style="--lvl:{skill.level}%; --ratio:{skill.level / 100}">
								<div class="gauge__meta">
									<span class="gauge__name">{skill.name}</span>
									<span class="gauge__pct">{skill.level}</span>
								</div>
								<div class="gauge__track">
									<div class="gauge__fill"></div>
								</div>
							</div>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		padding-block: var(--space-3xl);
		overflow: hidden;
	}
	.skills__bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.skills__halo {
		position: absolute;
		top: 28%;
		right: -10%;
		width: 42rem;
		height: 42rem;
		background: radial-gradient(circle, rgba(0, 200, 83, 0.06), transparent 62%);
		filter: blur(40px);
	}

	.sec-head {
		margin-bottom: var(--space-2xl);
	}
	.sec-head__line {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
		border-bottom: 1px solid var(--hairline);
		padding-bottom: 1.4rem;
	}
	.sec-head h2 {
		font-size: clamp(2.1rem, 5.2vw, 3.8rem);
		letter-spacing: -0.035em;
	}
	.accent {
		color: var(--emerald-300);
	}
	.sec-head__idx {
		padding-bottom: 0.6rem;
		color: var(--ink-500);
	}
	.sec-head__lede {
		margin-top: 1.4rem;
		max-width: 52ch;
		color: var(--ink-400);
		font-size: 1.02rem;
	}

	.row {
		display: grid;
		grid-template-columns: 0.42fr 1fr;
		gap: clamp(1.5rem, 4vw, 4rem);
		padding-block: 2.3rem;
		border-top: 1px solid var(--hairline);
	}
	.row:last-child {
		border-bottom: 1px solid var(--hairline);
	}
	.row__head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		position: sticky;
		top: 6rem;
		height: fit-content;
	}
	.row__icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		color: var(--emerald-200);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-md);
		background: linear-gradient(145deg, rgba(0, 255, 136, 0.06), transparent);
	}
	.row__head h3 {
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--ink-100);
	}
	.row__count {
		color: var(--emerald-600);
	}

	.row__skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 1.4rem 2.5rem;
	}
	.gauge__meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.55rem;
	}
	.gauge__name {
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--ink-200);
	}
	.gauge__pct {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--emerald-300);
		font-variant-numeric: tabular-nums;
	}
	.gauge__pct::after {
		content: '%';
		color: var(--ink-600);
		margin-left: 1px;
	}
	.gauge__track {
		position: relative;
		height: 3px;
		background: var(--onyx-600);
		border-radius: 999px;
		overflow: hidden;
	}
	.gauge__fill {
		position: absolute;
		inset: 0;
		width: 100%;
		background: linear-gradient(90deg, var(--emerald-700), var(--emerald-300));
		border-radius: 999px;
		box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 1.3s var(--ease-out);
		transition-delay: calc(var(--reveal-i, 0) * 55ms);
	}
	.row__skills[data-revealed] .gauge__fill {
		transform: scaleX(var(--ratio));
	}

	@media (max-width: 860px) {
		.row {
			grid-template-columns: 1fr;
			gap: 1.6rem;
		}
		.row__head {
			position: static;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}
		.row__count {
			margin-left: auto;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.gauge__fill {
			transition: none;
			transform: scaleX(var(--ratio));
		}
	}
</style>
