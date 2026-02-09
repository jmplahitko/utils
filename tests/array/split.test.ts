import { describe, it, expect } from 'vitest';
import split from '../../src/array/split';

describe('split', () => {
	it('splits an array into head and tail at the given index', () => {
		expect(split([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4, 5]]);
	});

	it('returns empty head when index is 0', () => {
		expect(split([1, 2, 3], 0)).toEqual([[], [1, 2, 3]]);
	});

	it('returns empty tail when index equals length', () => {
		expect(split([1, 2, 3], 3)).toEqual([[1, 2, 3], []]);
	});
});
