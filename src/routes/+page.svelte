<script lang="ts">
	import '../lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Full Stack Developer | Portfolio</title>
	<meta name="description" content="Desarrollador Full Stack especializado en crear experiencias web modernas y escalables" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
	<Header />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
		<Contact />
	</main>
	<Footer />
</div>

<style>
	.page {
		min-height: 100vh;
	}
	
	main {
		scroll-behavior: smooth;
	}
</style>
