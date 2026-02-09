import { describe, it, expect } from 'vitest';
import toBoolean from '../../src/boolean/toBoolean';

describe('toBoolean', () => {
	it('returns true for boolean true', () => {
		expect(toBoolean(true)).toBe(true);
	});

	it('returns false for boolean false', () => {
		expect(toBoolean(false)).toBe(false);
	});

	it('returns true for string "true" (case-insensitive)', () => {
		expect(toBoolean('true')).toBe(true);
		expect(toBoolean('TRUE')).toBe(true);
		expect(toBoolean('True')).toBe(true);
	});

	it('returns false for string "false" (case-insensitive)', () => {
		expect(toBoolean('false')).toBe(false);
		expect(toBoolean('FALSE')).toBe(false);
	});

	it('returns false for negative numbers', () => {
		expect(toBoolean(-1)).toBe(false);
		expect(toBoolean(-100)).toBe(false);
	});

	it('returns true for positive numbers', () => {
		expect(toBoolean(1)).toBe(true);
		expect(toBoolean(42)).toBe(true);
	});

	it('returns false for 0', () => {
		expect(toBoolean(0)).toBe(false);
	});

	it('returns false for null', () => {
		expect(toBoolean(null)).toBe(false);
	});

	it('returns false for undefined', () => {
		expect(toBoolean(undefined)).toBe(false);
	});

	it('returns true for non-empty objects', () => {
		expect(toBoolean({ a: 1 })).toBe(true);
	});

	it('returns true for non-empty strings', () => {
		expect(toBoolean('hello')).toBe(true);
	});

	it('returns false for empty string', () => {
		expect(toBoolean('')).toBe(false);
	});
});
