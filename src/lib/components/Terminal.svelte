<script lang="ts">
	import { onMount, tick } from 'svelte';

	type Tok = { t: string; c?: string };
	type Line = { toks: Tok[]; caret?: boolean };

	type Step =
		| { k: 'cmd'; text: string }
		| { k: 'out'; toks: Tok[]; d?: number }
		| { k: 'ok'; text: string }
		| { k: 'warn'; text: string }
		| { k: 'bar'; label: string }
		| { k: 'blank' };

	// The looping "program" — real stack + a tasteful hack/deploy flavor.
	const program: Step[] = [
		{ k: 'cmd', text: 'ssh kike@kikedevs.io' },
		{ k: 'out', toks: [{ t: 'conexión segura establecida · ', c: 'dim' }, { t: 'AES-256-GCM', c: 'str' }], d: 240 },
		{ k: 'cmd', text: 'whoami' },
		{ k: 'out', toks: [{ t: 'Enrique A. Pacheco', c: 'accent' }, { t: ' — Full Stack Developer', c: 'ink' }], d: 220 },
		{ k: 'cmd', text: 'cat stack.json' },
		{ k: 'out', toks: [{ t: '{', c: 'dim' }] },
		{ k: 'out', toks: [{ t: '  "frontend"', c: 'key' }, { t: ': ', c: 'dim' }, { t: '"React · TypeScript · Tailwind"', c: 'str' }, { t: ',', c: 'dim' }] },
		{ k: 'out', toks: [{ t: '  "backend"', c: 'key' }, { t: ': ', c: 'dim' }, { t: '"Node · NestJS · Socket.io"', c: 'str' }, { t: ',', c: 'dim' }] },
		{ k: 'out', toks: [{ t: '  "data"', c: 'key' }, { t: ': ', c: 'dim' }, { t: '"PostgreSQL · MongoDB · SQLite"', c: 'str' }] },
		{ k: 'out', toks: [{ t: '}', c: 'dim' }] },
		{ k: 'cmd', text: './deploy --env=production' },
		{ k: 'out', toks: [{ t: '▸ ', c: 'fn' }, { t: 'build modules', c: 'ink' }, { t: ' ............ ', c: 'dim' }, { t: 'done', c: 'ok' }] },
		{ k: 'out', toks: [{ t: '▸ ', c: 'fn' }, { t: 'tests ', c: 'ink' }, { t: '(142)', c: 'num' }, { t: ' ............ ', c: 'dim' }, { t: 'passed', c: 'ok' }] },
		{ k: 'bar', label: 'deploy → edge' },
		{ k: 'ok', text: 'deployment live · 0s downtime' },
		{ k: 'cmd', text: 'projects --list --status' },
		{ k: 'out', toks: [{ t: '● ', c: 'ok' }, { t: 'WiseGold Capital', c: 'accent' }, { t: '  fintech · producción', c: 'dim' }] },
		{ k: 'out', toks: [{ t: '● ', c: 'ok' }, { t: 'AltivoPOS', c: 'accent' }, { t: '  POS multiplataforma · producción', c: 'dim' }] }
	];

	let lines = $state<Line[]>([]);
	let body: HTMLElement;
	let cancelled = false;

	const wait = (ms: number) =>
		new Promise<void>((r) => setTimeout(r, ms));

	async function scrollDown() {
		await tick();
		if (body) body.scrollTop = body.scrollHeight;
	}

	function fullProgram(): Line[] {
		// Static (reduced-motion) rendering of the whole program, already settled.
		const out: Line[] = [];
		for (const s of program) {
			if (s.k === 'cmd') out.push({ toks: [{ t: '$ ', c: 'prompt' }, { t: s.text, c: 'ink' }] });
			else if (s.k === 'out') out.push({ toks: s.toks });
			else if (s.k === 'ok') out.push({ toks: [{ t: '[✓] ', c: 'ok' }, { t: s.text, c: 'ink' }] });
			else if (s.k === 'warn') out.push({ toks: [{ t: '[!] ', c: 'warn' }, { t: s.text, c: 'ink' }] });
			else if (s.k === 'bar') out.push({ toks: [{ t: '▸ ', c: 'fn' }, { t: s.label + ' ', c: 'ink' }, { t: '████████████', c: 'ok' }, { t: ' 100%', c: 'num' }] });
			else out.push({ toks: [{ t: '', c: 'ink' }] });
		}
		out.push({ toks: [{ t: '$ ', c: 'prompt' }, { t: '', c: 'ink' }], caret: true });
		return out;
	}

	async function run() {
		while (!cancelled) {
			lines = [];
			for (const s of program) {
				if (cancelled) return;
				if (s.k === 'cmd') {
					let typed = '';
					lines = [...lines, { toks: [{ t: '$ ', c: 'prompt' }, { t: '', c: 'ink' }], caret: true }];
					for (const ch of s.text) {
						if (cancelled) return;
						typed += ch;
						lines = [
							...lines.slice(0, -1),
							{ toks: [{ t: '$ ', c: 'prompt' }, { t: typed, c: 'ink' }], caret: true }
						];
						await wait(26 + Math.random() * 46);
					}
					lines = [
						...lines.slice(0, -1),
						{ toks: [{ t: '$ ', c: 'prompt' }, { t: typed, c: 'ink' }], caret: false }
					];
					await scrollDown();
					await wait(300);
				} else if (s.k === 'out') {
					lines = [...lines, { toks: s.toks }];
					await scrollDown();
					await wait(s.d ?? 130);
				} else if (s.k === 'ok' || s.k === 'warn') {
					const c = s.k === 'ok' ? 'ok' : 'warn';
					const tag = s.k === 'ok' ? '[✓] ' : '[!] ';
					lines = [...lines, { toks: [{ t: tag, c }, { t: s.text, c: 'ink' }] }];
					await scrollDown();
					await wait(360);
				} else if (s.k === 'bar') {
					const width = 16;
					lines = [...lines, { toks: [{ t: '▸ ', c: 'fn' }, { t: s.label + ' ', c: 'ink' }, { t: '', c: 'ok' }, { t: '', c: 'num' }] }];
					for (let p = 0; p <= width; p++) {
						if (cancelled) return;
						const fill = '█'.repeat(p) + '░'.repeat(width - p);
						const pct = ' ' + Math.round((p / width) * 100) + '%';
						lines = [
							...lines.slice(0, -1),
							{ toks: [{ t: '▸ ', c: 'fn' }, { t: s.label + ' ', c: 'ink' }, { t: fill, c: 'ok' }, { t: pct, c: 'num' }] }
						];
						await scrollDown();
						await wait(55);
					}
					await wait(260);
				} else {
					lines = [...lines, { toks: [{ t: '', c: 'ink' }] }];
				}
			}
			// trailing prompt + blink
			lines = [...lines, { toks: [{ t: '$ ', c: 'prompt' }, { t: '', c: 'ink' }], caret: true }];
			await scrollDown();
			await wait(3200);
			// fade handled by CSS on re-render; loop clears above
		}
	}

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			lines = fullProgram();
			return;
		}
		run();
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="term">
	<div class="term__bar">
		<span class="dots" aria-hidden="true">
			<i style="--d:var(--mac-red)"></i>
			<i style="--d:var(--mac-amber)"></i>
			<i style="--d:var(--mac-green)"></i>
		</span>
		<span class="term__title">kike@dev — zsh — 80×24</span>
		<span class="term__chip">production</span>
	</div>
	<div class="term__body" bind:this={body} role="img" aria-label="Terminal mostrando el stack y el despliegue de Kike Dev's">
		<div class="term__scan" aria-hidden="true"></div>
		{#each lines as line, i (i)}
			<p class="ln">
				{#each line.toks as tok, ti (ti)}<span class="c-{tok.c}">{tok.t}</span>{/each}{#if line.caret}<span class="caret"></span>{/if}
			</p>
		{/each}
	</div>
</div>

<style>
	.term {
		position: relative;
		width: 100%;
		max-width: 560px;
		margin-inline: auto;
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, rgba(18, 22, 25, 0.82), rgba(8, 10, 12, 0.92));
		border: 1px solid var(--hairline-strong);
		box-shadow:
			var(--shadow-lg),
			var(--shadow-inset),
			0 0 60px -20px rgba(0, 255, 136, 0.25);
		backdrop-filter: blur(14px) saturate(140%);
		overflow: hidden;
		animation: drift 12s var(--ease-in-out) infinite;
	}
	/* subtle emerald edge-light that tracks the cursor */
	.term::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		padding: 1px;
		background: radial-gradient(
			18rem 18rem at var(--mx) var(--my),
			rgba(0, 255, 136, 0.5),
			transparent 60%
		);
		-webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		opacity: 0.8;
	}

	.term__bar {
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
		box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25);
	}
	.term__title {
		flex: 1;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--ink-500);
		letter-spacing: 0.01em;
	}
	.term__chip {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--emerald-200);
		padding: 0.2rem 0.55rem;
		border: 1px solid var(--emerald-800);
		border-radius: 999px;
		background: rgba(0, 255, 136, 0.06);
	}

	.term__body {
		position: relative;
		height: 340px;
		overflow: hidden;
		padding: 1.1rem 1.25rem 1.4rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		line-height: 1.75;
	}
	.term__scan {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: repeating-linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.015) 0 1px,
			transparent 1px 3px
		);
		opacity: 0.4;
		mix-blend-mode: overlay;
	}
	.ln {
		white-space: pre-wrap;
		word-break: break-word;
		margin: 0;
	}
	.caret {
		display: inline-block;
		width: 0.56em;
		height: 1.05em;
		translate: 0 0.18em;
		background: var(--emerald-300);
		box-shadow: 0 0 8px rgba(0, 255, 136, 0.7);
		animation: caret-blink 1.05s steps(1) infinite;
	}

	.c-prompt {
		color: var(--syn-prompt);
		font-weight: 600;
	}
	.c-ink {
		color: var(--ink-200);
	}
	.c-dim {
		color: var(--syn-comment);
	}
	.c-str {
		color: var(--syn-str);
	}
	.c-key {
		color: var(--syn-key);
	}
	.c-fn {
		color: var(--syn-fn);
	}
	.c-num {
		color: var(--syn-num);
	}
	.c-ok {
		color: var(--syn-ok);
	}
	.c-warn {
		color: var(--syn-warn);
	}
	.c-accent {
		color: var(--emerald-100);
		font-weight: 500;
	}

	@media (max-width: 860px) {
		.term__body {
			height: 300px;
			font-size: 0.76rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.term {
			animation: none;
		}
		.caret {
			animation: none;
		}
	}
</style>
