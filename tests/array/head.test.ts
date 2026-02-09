import { describe, it, expect } from 'vitest';
import head from '../../src/array/head';

describe('head', () => {
	it('returns the first N elements of an array', () => {
		expect(head([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
	});

	it('returns an empty array when index is 0', () => {
		expect(head([1, 2, 3], 0)).toEqual([]);
	});

	it('returns an empty array when index is NaN', () => {
		expect(head([1, 2, 3], NaN)).toEqual([]);
	});

	it('returns the full array when index exceeds length', () => {
		expect(head([1, 2], 5)).toEqual([1, 2]);
	});
});
