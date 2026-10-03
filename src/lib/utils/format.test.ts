import { describe, it, expect } from 'vitest';
import { parseStat, splitProjectTitle, buildMailto, slugify } from './format';

describe('parseStat', () => {
	it('splits a number with a "+" suffix', () => {
		expect(parseStat('50+')).toEqual({ n: 50, suffix: '+' });
	});

	it('splits a number with a "%" suffix', () => {
		expect(parseStat('100%')).toEqual({ n: 100, suffix: '%' });
	});

	it('handles a bare number with no suffix', () => {
		expect(parseStat('5')).toEqual({ n: 5, suffix: '' });
	});

	it('handles single digit with suffix', () => {
		expect(parseStat('5+')).toEqual({ n: 5, suffix: '+' });
	});

	it('falls back to 0 and keeps the raw value when it does not start with a digit', () => {
		expect(parseStat('N/A')).toEqual({ n: 0, suffix: 'N/A' });
	});

	it('falls back for an empty string', () => {
		expect(parseStat('')).toEqual({ n: 0, suffix: '' });
	});

	it('only parses the leading integer, keeping the rest as suffix', () => {
		expect(parseStat('24/7')).toEqual({ n: 24, suffix: '/7' });
	});
});

describe('splitProjectTitle', () => {
	it('splits a "Name - Subtitle" title on the first " - "', () => {
		expect(splitProjectTitle('WiseGold Capital - Plataforma de Metales')).toEqual({
			name: 'WiseGold Capital',
			sub: 'Plataforma de Metales'
		});
	});

	it('returns an empty subtitle when there is no separator', () => {
		expect(splitProjectTitle('AltivoPOS')).toEqual({ name: 'AltivoPOS', sub: '' });
	});

	it('splits only on the first separator, keeping later dashes in the subtitle', () => {
		expect(splitProjectTitle('A - B - C')).toEqual({ name: 'A', sub: 'B - C' });
	});

	it('does not split on a hyphen without surrounding spaces', () => {
		expect(splitProjectTitle('e-commerce')).toEqual({ name: 'e-commerce', sub: '' });
	});

	it('handles an empty title', () => {
		expect(splitProjectTitle('')).toEqual({ name: '', sub: '' });
	});
});

describe('slugify', () => {
	it('lowercases and kebab-cases a multi-word name', () => {
		expect(slugify('WiseGold Capital')).toBe('wisegold-capital');
	});

	it('strips accents', () => {
		expect(slugify('Gestión de Metales')).toBe('gestion-de-metales');
	});

	it('collapses runs of non-alphanumerics into one dash', () => {
		expect(slugify('A  --  B')).toBe('a-b');
	});

	it('trims leading and trailing dashes', () => {
		expect(slugify('  AltivoPOS!  ')).toBe('altivopos');
	});

	it('handles a single token', () => {
		expect(slugify('AltivoPOS')).toBe('altivopos');
	});

	it('returns empty string for punctuation-only input', () => {
		expect(slugify('—/—')).toBe('');
	});
});

describe('buildMailto', () => {
	it('composes a mailto: with encoded subject and body', () => {
		const href = buildMailto('dev@example.com', 'Ana', 'ana@mail.com', 'Hola mundo');
		expect(href.startsWith('mailto:dev@example.com?')).toBe(true);
		expect(href).toContain('subject=' + encodeURIComponent('Nuevo encargo de Ana'));
		expect(href).toContain('body=');
		const body = decodeURIComponent(href.split('body=')[1]);
		expect(body).toBe('Nombre: Ana\nEmail: ana@mail.com\n\nHola mundo');
	});

	it('falls back to "un cliente" when no name is given', () => {
		const href = buildMailto('dev@example.com', '', 'ana@mail.com', 'Hi');
		expect(decodeURIComponent(href)).toContain('Nuevo encargo de un cliente');
	});

	it('percent-encodes special characters so the URL stays valid', () => {
		const href = buildMailto('dev@example.com', 'A&B', 'x@y.com', 'line1\nline2 & more');
		// raw control/special chars must not leak into the query string
		expect(href).not.toContain('\n');
		expect(href).not.toContain(' & more');
		expect(decodeURIComponent(href.split('body=')[1])).toContain('line1\nline2 & more');
	});

	it('targets the given recipient address', () => {
		const href = buildMailto('kikedevelopers@gmail.com', 'X', 'x@x.com', 'm');
		expect(href).toContain('mailto:kikedevelopers@gmail.com?');
	});
});
