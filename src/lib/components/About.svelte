<script lang="ts">
	import { aboutData } from '$lib/utils/constants';
	import { reveal, parallax, countUp } from '$lib/actions/motion';
	import { parseStat } from '$lib/utils/format';

	const icons: Record<string, string> = {
		code: 'M8 6 2 12l6 6M16 6l6 6-6 6M13 4l-2 16',
		server:
			'M5 4h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM5 14h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1ZM8 7h.01M8 17h.01',
		check: 'M12 3 4 6v5c0 4.5 3.3 8.3 8 9.5 4.7-1.2 8-5 8-9.5V6l-8-3ZM9 12l2 2 4-4'
	};
	const keys = ['frontend', 'backend', 'quality'];
</script>

<section id="about" class="about">
	<div class="about__bg" aria-hidden="true">
		<div class="about__beam" use:parallax={{ speed: 0.16 }}></div>
	</div>

	<div class="shell">
		<header class="sec-head" use:reveal>
			<div class="sec-head__line">
				<h2>Ingeniería, no<br /><span class="accent">improvisación</span></h2>
				<span class="meta sec-head__idx">// sobre-mí</span>
			</div>
		</header>

		<div class="about__grid">
			<div class="about__lede" use:reveal>
				<blockquote class="credo">
					<span class="credo__m">/*</span>
					{aboutData.quote.replace(/"/g, '')}
					<span class="credo__m">*/</span>
				</blockquote>
				<p>{aboutData.description}</p>
			</div>

			<ol class="caps" use:reveal={{ stagger: true }}>
				{#each aboutData.highlights as h, i (h.title)}
					<li class="cap">
						<span class="cap__key">{keys[i] ?? 'module'}</span>
						<span class="cap__icon">
							<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={icons[h.icon]} />
							</svg>
						</span>
						<div class="cap__body">
							<h3>{h.title}</h3>
							<p>{h.description}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<div class="metrics" use:reveal>
			<p class="metrics__cmd meta"><span class="metrics__prompt">$</span> stats --summary</p>
			<dl class="metrics__list">
				{#each aboutData.stats as stat (stat.label)}
					{@const s = parseStat(stat.value)}
					<div class="metric">
						<span class="metric__arrow" aria-hidden="true">→</span>
						<dt class="metric__value" use:countUp={{ to: s.n, suffix: s.suffix }}>
							{stat.value}
						</dt>
						<dd class="metric__label">{stat.label}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	.about {
		position: relative;
		padding-block: var(--space-3xl);
		overflow: hidden;
	}
	.about__bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.about__beam {
		position: absolute;
		top: -16%;
		left: 6%;
		width: 48rem;
		height: 48rem;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.05), transparent 62%);
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

	.about__grid {
		display: grid;
		grid-template-columns: 0.92fr 1.08fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
	}
	.credo {
		font-family: var(--font-mono);
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		line-height: 1.5;
		color: var(--ink-100);
		margin-bottom: 1.6rem;
		padding-left: 1.4rem;
		border-left: 1px solid var(--emerald-700);
	}
	.credo__m {
		color: var(--syn-comment);
	}
	.about__lede p {
		color: var(--ink-300);
		font-size: 1.05rem;
		line-height: 1.8;
		max-width: 46ch;
	}

	/* capabilities as a module list, not uniform cards */
	.caps {
		list-style: none;
		display: flex;
		flex-direction: column;
	}
	.cap {
		display: grid;
		grid-template-columns: auto auto 1fr;
		align-items: start;
		gap: 1.3rem;
		padding-block: 1.6rem;
		border-top: 1px solid var(--hairline);
		transition: transform 0.4s var(--ease-out);
	}
	.cap:last-child {
		border-bottom: 1px solid var(--hairline);
	}
	.cap:hover {
		transform: translateX(8px);
	}
	.cap__key {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--emerald-600);
		padding-top: 0.5rem;
	}
	.cap__icon {
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		color: var(--emerald-200);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-sm);
		background: linear-gradient(145deg, rgba(0, 255, 136, 0.07), transparent);
		transition:
			color 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			background 0.3s ease;
	}
	.cap:hover .cap__icon {
		color: var(--onyx-900);
		background: linear-gradient(145deg, #8bffc4, #00c853);
		border-color: transparent;
		box-shadow: 0 0 24px rgba(0, 255, 136, 0.4);
	}
	.cap__body h3 {
		font-size: 1.12rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink-100);
		margin-bottom: 0.4rem;
	}
	.cap__body p {
		color: var(--ink-400);
		font-size: 0.96rem;
		line-height: 1.65;
		max-width: 44ch;
	}

	/* metrics as a terminal readout, not a 4-cell hero-metric template */
	.metrics {
		margin-top: var(--space-2xl);
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-md);
		background: linear-gradient(180deg, rgba(18, 22, 25, 0.5), rgba(8, 10, 12, 0.6));
		backdrop-filter: blur(8px);
		padding: clamp(1.3rem, 3vw, 2rem);
	}
	.metrics__cmd {
		padding-bottom: 1.1rem;
		margin-bottom: 1.3rem;
		border-bottom: 1px solid var(--hairline);
		color: var(--ink-400);
	}
	.metrics__prompt {
		color: var(--emerald-300);
		margin-right: 0.3rem;
	}
	.metrics__list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.3rem 2.5rem;
	}
	.metric {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
	}
	.metric__arrow {
		font-family: var(--font-mono);
		color: var(--syn-fn);
	}
	.metric__value {
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 3vw, 2.3rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		color: var(--emerald-200);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.metric__label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--ink-400);
	}

	@media (max-width: 860px) {
		.about__grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}
	@media (max-width: 520px) {
		.metrics__list {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 460px) {
		.cap {
			grid-template-columns: auto 1fr;
		}
		.cap__key {
			display: none;
		}
	}
</style>
