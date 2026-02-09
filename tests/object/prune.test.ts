import { describe, it, expect } from 'vitest';
import prune from '../../src/object/prune';

describe('prune', () => {
	it('removes specified properties', () => {
		const obj = { a: 1, b: 2, c: 3 };
		expect(prune(obj, 'b', 'c')).toEqual({ a: 1 });
	});

	it('is non-destructive', () => {
		const obj = { a: 1, b: 2 };
		const result = prune(obj, 'b');
		expect(obj).toEqual({ a: 1, b: 2 });
		expect(result).not.toBe(obj);
	});

	it('returns a copy when no props to remove are given', () => {
		const obj = { a: 1 };
		const result = prune(obj);
		expect(result).toEqual({ a: 1 });
		expect(result).not.toBe(obj);
	});

	it('returns a copy of empty objects', () => {
		const obj = {};
		const result = prune(obj, 'a');
		expect(result).toEqual({});
	});

	it('ignores non-existent properties', () => {
		const obj = { a: 1 };
		expect(prune(obj, 'missing')).toEqual({ a: 1 });
	});
});
