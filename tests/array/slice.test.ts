import { describe, it, expect } from 'vitest';
import slice from '../../src/array/slice';

describe('slice', () => {
	it('returns a copy of the full array when called with just the array', () => {
		const arr = [1, 2, 3, 4, 5];
		const result = slice(arr);
		expect(result).toEqual([1, 2, 3, 4, 5]);
		expect(result).not.toBe(arr);
	});

	it('slices from a given index to the end', () => {
		expect(slice([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
	});

	it('slices from a given index to a given end index', () => {
		expect(slice([1, 2, 3, 4, 5], 1, 3)).toEqual([2, 3]);
	});

	it('returns an empty array when fromIndex equals toIndex', () => {
		expect(slice([1, 2, 3], 1, 1)).toEqual([]);
	});

	it('throws if first argument is not an array', () => {
		expect(() => slice('not an array' as any)).toThrow();
	});
});
