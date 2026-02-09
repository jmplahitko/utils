import { describe, it, expect } from 'vitest';
import { complement } from '../../src/array/complement';
import { dedup } from '../../src/array/dedup';
import { intersect } from '../../src/array/intersect';
import relativeComplement from '../../src/array/relativeComplement';
import { union } from '../../src/array/union';

describe('dedup', () => {
	it('removes duplicate primitives', () => {
		expect(dedup([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
	});

	it('removes duplicate objects by deep equality', () => {
		expect(dedup([{ a: 1 }, { a: 1 }, { a: 2 }])).toEqual([{ a: 1 }, { a: 2 }]);
	});

	it('returns empty array for empty input', () => {
		expect(dedup([])).toEqual([]);
	});
});

describe('intersect', () => {
	it('returns elements present in both arrays', () => {
		expect(intersect([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
	});

	it('returns empty array when no common elements', () => {
		expect(intersect([1, 2], [3, 4])).toEqual([]);
	});
});

describe('union', () => {
	it('returns combined unique elements from both arrays', () => {
		expect(union([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
	});

	it('handles empty arrays', () => {
		expect(union([], [1, 2])).toEqual([1, 2]);
		expect(union([1, 2], [])).toEqual([1, 2]);
	});
});

describe('complement (symmetric difference)', () => {
	it('returns elements in either array but not both', () => {
		expect(complement([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 4, 5]);
	});

	it('returns all elements when arrays have no overlap', () => {
		expect(complement([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
	});

	it('returns empty array when arrays are identical', () => {
		expect(complement([1, 2, 3], [1, 2, 3])).toEqual([]);
	});
});

describe('relativeComplement', () => {
	it('returns elements in b that are not in a', () => {
		expect(relativeComplement([1, 2, 3], [2, 3, 4, 5])).toEqual([4, 5]);
	});

	it('returns all of b when no overlap with a', () => {
		expect(relativeComplement([1, 2], [3, 4])).toEqual([3, 4]);
	});

	it('returns empty array when b is subset of a', () => {
		expect(relativeComplement([1, 2, 3], [1, 2])).toEqual([]);
	});
});
