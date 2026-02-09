import { describe, it, expect } from 'vitest';
import shuffle from '../../src/array/shuffle';

describe('shuffle', () => {
	it('returns an array with the same elements', () => {
		const arr = [1, 2, 3, 4, 5];
		const result = shuffle([...arr]);
		expect(result.sort()).toEqual(arr.sort());
	});

	it('returns the same array reference (mutates in place)', () => {
		const arr = [1, 2, 3, 4, 5];
		const result = shuffle(arr);
		expect(result).toBe(arr);
	});

	it('handles single-element arrays', () => {
		expect(shuffle([1])).toEqual([1]);
	});

	it('handles empty arrays', () => {
		expect(shuffle([])).toEqual([]);
	});

	it('throws if argument is not an array', () => {
		expect(() => shuffle('not an array' as any)).toThrow();
	});
});
