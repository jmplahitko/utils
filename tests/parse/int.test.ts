import { describe, it, expect } from 'vitest';
import int from '../../src/parse/int';

describe('int', () => {
	it('parses integer strings', () => {
		expect(int('42')).toBe(42);
	});

	it('parses negative integers', () => {
		expect(int('-5')).toBe(-5);
	});

	it('returns NaN for float strings (stricter than parseInt)', () => {
		expect(int('3.14')).toBeNaN();
	});

	it('returns NaN for non-numeric strings', () => {
		expect(int('abc')).toBeNaN();
	});

	it('returns NaN for mixed strings', () => {
		expect(int('12px')).toBeNaN();
	});

	it('parses Infinity', () => {
		expect(int('Infinity')).toBe(Infinity);
	});

	it('accepts numbers directly', () => {
		expect(int(42)).toBe(42);
	});
});
