import { describe, it, expect } from 'vitest';
import simpleCompare from '../../src/_internal/simpleCompare';

describe('simpleCompare', () => {
	it('returns true for identical values', () => {
		expect(simpleCompare(1, 1)).toBe(true);
		expect(simpleCompare('a', 'a')).toBe(true);
	});

	it('returns false for different values', () => {
		expect(simpleCompare(1, 2)).toBe(false);
		expect(simpleCompare('a', 'b')).toBe(false);
	});

	it('returns true when both values are NaN', () => {
		expect(simpleCompare(NaN, NaN)).toBe(true);
	});

	it('returns false when only one value is NaN', () => {
		expect(simpleCompare(NaN, 1)).toBe(false);
		expect(simpleCompare(1, NaN)).toBe(false);
	});
});
