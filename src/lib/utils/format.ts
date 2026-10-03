/**
 * Pure helpers shared by the landing sections. Kept framework-free so they are
 * unit-testable in isolation.
 */

/** Split a declared stat like "50+" or "100%" into its number and suffix. */
export function parseStat(value: string): { n: number; suffix: string } {
	const match = value.match(/^(\d+)(.*)$/);
	return match ? { n: parseInt(match[1], 10), suffix: match[2] } : { n: 0, suffix: value };
}

/** Split a project title "Name - Subtitle" into its name and subtitle halves. */
export function splitProjectTitle(title: string): { name: string; sub: string } {
	const i = title.indexOf(' - ');
	return i === -1
		? { name: title, sub: '' }
		: { name: title.slice(0, i), sub: title.slice(i + 3) };
}

/** Turn a project name into a repo-style slug (accent-free, kebab-case). */
export function slugify(name: string): string {
	return name
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/** Compose a prefilled mailto: URL for the contact form (no backend). */
export function buildMailto(
	to: string,
	name: string,
	email: string,
	message: string
): string {
	const subject = `Nuevo encargo de ${name || 'un cliente'}`;
	const body = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
	return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
