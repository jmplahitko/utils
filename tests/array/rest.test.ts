import { describe, it, expect } from 'vitest';
import rest from '../../src/array/rest';

describe('rest', () => {
	it('returns elements from index onward', () => {
		expect(rest([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
	});

	it('returns the full array when index is 0', () => {
		expect(rest([1, 2, 3], 0)).toEqual([1, 2, 3]);
	});

	it('returns the full array when index is NaN', () => {
		expect(rest([1, 2, 3], NaN)).toEqual([1, 2, 3]);
	});

	it('returns an empty array when index exceeds length', () => {
		expect(rest([1, 2], 5)).toEqual([]);
	});
});
