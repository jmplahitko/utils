import { describe, it, expect } from 'vitest';
import diff from '../../src/object/diff';

describe('diff', () => {
	it('returns changed primitive values', () => {
		const obj1 = { a: 1, b: 2 };
		const obj2 = { a: 1, b: 3 };
		expect(diff(obj1, obj2)).toEqual({ b: 3 });
	});

	it('returns new keys in obj2', () => {
		const obj1 = { a: 1 };
		const obj2 = { a: 1, b: 2 };
		expect(diff(obj1, obj2)).toEqual({ b: 2 });
	});

	it('returns empty object when objects are identical', () => {
		const obj = { a: 1, b: 2 };
		expect(diff(obj, obj)).toEqual({});
	});

	it('handles nested object diffs', () => {
		const obj1 = { a: { x: 1, y: 2 } };
		const obj2 = { a: { x: 1, y: 3 } };
		expect(diff(obj1, obj2)).toEqual({ a: { y: 3 } });
	});

	it('handles array diffs with default relativeComplement strategy', () => {
		const obj1 = { items: [1, 2, 3] };
		const obj2 = { items: [2, 3, 4] };
		const result = diff(obj1, obj2);
		expect(result).toEqual({ items: [4] });
	});
});
