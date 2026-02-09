import { describe, it, expect } from 'vitest';
import isInArray from '../../src/predicate/isInArray';

describe('isInArray', () => {
	it('returns true when value is in array', () => {
		expect(isInArray([1, 2, 3], 2)).toBe(true);
	});

	it('returns false when value is not in array', () => {
		expect(isInArray([1, 2, 3], 4)).toBe(false);
	});

	it('uses deep equality for objects', () => {
		expect(isInArray([{ a: 1 }], { a: 1 })).toBe(true);
	});

	it('supports curried invocation', () => {
		const inMyArray = isInArray([1, 2, 3]);
		expect(inMyArray(2)).toBe(true);
		expect(inMyArray(5)).toBe(false);
	});

	it('throws if first parameter is not an array', () => {
		expect(() => isInArray('not array' as any, 1)).toThrow();
	});
});
