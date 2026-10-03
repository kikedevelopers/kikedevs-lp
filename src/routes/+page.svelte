<script lang="ts">
	import '../lib/styles/global.css';
	// Self-hosted faces (no external font host)
	import '@fontsource/geist-sans/400.css';
	import '@fontsource/geist-sans/500.css';
	import '@fontsource/geist-sans/600.css';
	import '@fontsource/geist-sans/700.css';
	import '@fontsource/geist-mono/400.css';
	import '@fontsource/geist-mono/500.css';

	import { siteConfig } from '$lib/utils/constants';
	import Particles from '$lib/components/Particles.svelte';
	import CursorGlow from '$lib/components/CursorGlow.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="theme-color" content="#050607" />
	<meta property="og:title" content={siteConfig.title} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<Particles />
<CursorGlow />
<Header />
<main>
	<Hero />
	<About />
	<Skills />
	<Projects />
	<Contact />
</main>
<Footer />

<style>
	main {
		position: relative;
		z-index: 2;
	}
</style>
