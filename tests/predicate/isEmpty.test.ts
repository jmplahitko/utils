import { describe, it, expect } from 'vitest';
import isEmpty from '../../src/predicate/isEmpty';

describe('isEmpty', () => {
	it('returns true for null', () => {
		expect(isEmpty(null)).toBe(true);
	});

	it('returns true for undefined', () => {
		expect(isEmpty(undefined)).toBe(true);
	});

	it('returns true for empty string', () => {
		expect(isEmpty('')).toBe(true);
	});

	it('returns false for non-empty string', () => {
		expect(isEmpty('hello')).toBe(false);
	});

	it('returns true for empty array', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('returns false for non-empty array', () => {
		expect(isEmpty([1])).toBe(false);
	});

	it('returns true for empty object', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('returns false for non-empty object', () => {
		expect(isEmpty({ a: 1 })).toBe(false);
	});

	it('returns false for numbers (including 0)', () => {
		expect(isEmpty(0)).toBe(false);
		expect(isEmpty(42)).toBe(false);
	});

	it('returns false for booleans', () => {
		expect(isEmpty(true)).toBe(false);
		expect(isEmpty(false)).toBe(false);
	});

	it('returns false for valid dates', () => {
		expect(isEmpty(new Date())).toBe(false);
	});

	it('returns true for invalid dates', () => {
		expect(isEmpty(new Date('invalid'))).toBe(true);
	});

	it('returns true for noop functions', () => {
		expect(isEmpty(function() {})).toBe(true);
		expect(isEmpty(() => {})).toBe(true);
	});

	it('returns false for non-noop functions', () => {
		expect(isEmpty(() => 42)).toBe(false);
	});
});
