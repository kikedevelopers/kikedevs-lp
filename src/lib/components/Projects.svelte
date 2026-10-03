<script lang="ts">
	import { projects } from '$lib/utils/constants';
	import { reveal, parallax } from '$lib/actions/motion';
	import { splitProjectTitle as split, slugify as slug } from '$lib/utils/format';
</script>

<section id="projects" class="projects">
	<div class="projects__bg" aria-hidden="true">
		<div class="projects__pool" use:parallax={{ speed: 0.3 }}></div>
	</div>

	<div class="shell">
		<header class="sec-head" use:reveal>
			<div class="sec-head__line">
				<h2>En <span class="accent">producción</span></h2>
				<span class="meta sec-head__idx">// projects</span>
			</div>
			<p class="sec-head__lede">
				Sistemas de negocio reales, construidos de principio a fin y corriendo
				hoy. No prototipos — producto.
			</p>
		</header>

		<div class="repos">
			{#each projects as project, i (project.id)}
				{@const p = split(project.title)}
				<article class="repo" use:reveal>
					<div class="repo__bar">
						<span class="dots" aria-hidden="true">
							<i style="--d:var(--mac-red)"></i>
							<i style="--d:var(--mac-amber)"></i>
							<i style="--d:var(--mac-green)"></i>
						</span>
						<span class="repo__path">kike/{slug(p.name)} — main</span>
						<span class="repo__status"><span class="live"></span> producción</span>
					</div>

					<div class="repo__body">
						<div class="repo__head">
							<span class="meta repo__idx">[0{i + 1}]</span>
							<h3>{p.name}</h3>
							{#if p.sub}<p class="repo__sub">{p.sub}</p>{/if}
						</div>

						<p class="repo__desc"><span class="repo__c">// </span>{project.description}</p>

						<div class="repo__deps">
							<span class="meta repo__deps-label">dependencies ({project.technologies.length})</span>
							<ul>
								{#each project.technologies as tech (tech)}
									<li>{tech}</li>
								{/each}
							</ul>
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
		padding-block: var(--space-3xl);
		overflow: hidden;
	}
	.projects__bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.projects__pool {
		position: absolute;
		top: 10%;
		left: -12rem;
		width: 40rem;
		height: 40rem;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.07), transparent 66%);
		filter: blur(90px);
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

	.repos {
		display: flex;
		flex-direction: column;
		gap: clamp(1.6rem, 3vw, 2.4rem);
	}
	.repo {
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, rgba(18, 22, 25, 0.5), rgba(8, 10, 12, 0.62));
		backdrop-filter: blur(10px);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		transition:
			transform 0.4s var(--ease-out),
			border-color 0.4s ease,
			box-shadow 0.4s ease;
	}
	.repo:hover {
		transform: translateY(-4px);
		border-color: var(--emerald-700);
		box-shadow: var(--shadow-lg), 0 0 50px -24px rgba(0, 255, 136, 0.5);
	}
	.repo__bar {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.7rem 1rem;
		border-bottom: 1px solid var(--hairline);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent);
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
	.repo__path {
		flex: 1;
		min-width: 0;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--ink-500);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.repo__status {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.04em;
		color: var(--emerald-200);
	}
	.live {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--emerald-300);
		animation: pulse-dot 2.2s var(--ease-in-out) infinite;
	}

	.repo__body {
		padding: clamp(1.4rem, 3vw, 2.2rem);
	}
	.repo__head {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
	}
	.repo__idx {
		color: var(--emerald-600);
	}
	.repo__head h3 {
		font-size: clamp(1.4rem, 2.6vw, 2rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--ink-100);
	}
	.repo__sub {
		flex-basis: 100%;
		color: var(--emerald-100);
		font-weight: 500;
		font-size: 1rem;
	}
	.repo__desc {
		margin-top: 1.1rem;
		max-width: 68ch;
		color: var(--ink-300);
		line-height: 1.75;
	}
	.repo__c {
		font-family: var(--font-mono);
		color: var(--syn-comment);
	}
	.repo__deps {
		margin-top: 1.6rem;
		padding-top: 1.3rem;
		border-top: 1px solid var(--hairline);
	}
	.repo__deps-label {
		display: block;
		color: var(--ink-500);
		margin-bottom: 0.8rem;
	}
	.repo__deps ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.repo__deps li {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--ink-300);
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--hairline-strong);
		border-radius: var(--radius-sm);
		background: rgba(255, 255, 255, 0.015);
		transition:
			color 0.25s ease,
			border-color 0.25s ease,
			background 0.25s ease,
			transform 0.25s var(--ease-out);
	}
	.repo__deps li:hover {
		color: var(--emerald-100);
		border-color: var(--emerald-600);
		background: rgba(0, 255, 136, 0.06);
		transform: translateY(-2px);
	}
</style>
