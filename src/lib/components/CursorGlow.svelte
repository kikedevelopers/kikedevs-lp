<script lang="ts">
	import { onMount } from 'svelte';
	import { startSpotlight } from '$lib/actions/motion';

	onMount(() => startSpotlight());
</script>

<div class="glow" aria-hidden="true"></div>

<style>
	.glow {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: radial-gradient(
			30rem 30rem at var(--mx) var(--my),
			rgba(0, 255, 136, 0.07),
			rgba(0, 200, 83, 0.03) 35%,
			transparent 60%
		);
		transition: opacity 0.4s ease;
	}
	@media (prefers-reduced-motion: reduce) {
		.glow {
			display: none;
		}
	}
	@media (hover: none) {
		.glow {
			display: none;
		}
	}
</style>
