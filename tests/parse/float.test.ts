import { describe, it, expect } from 'vitest';
import float from '../../src/parse/float';

describe('float', () => {
	it('parses integer strings', () => {
		expect(float('42')).toBe(42);
	});

	it('parses float strings', () => {
		expect(float('3.14')).toBe(3.14);
	});

	it('parses negative numbers', () => {
		expect(float('-5.5')).toBe(-5.5);
	});

	it('parses positive-signed numbers', () => {
		expect(float('+3')).toBe(3);
	});

	it('returns NaN for non-numeric strings', () => {
		expect(float('abc')).toBeNaN();
	});

	it('returns NaN for mixed strings (stricter than parseFloat)', () => {
		expect(float('12px')).toBeNaN();
	});

	it('parses Infinity', () => {
		expect(float('Infinity')).toBe(Infinity);
	});

	it('accepts numbers directly', () => {
		expect(float(42)).toBe(42);
	});
});
