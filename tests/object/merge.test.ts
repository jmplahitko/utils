import { describe, it, expect } from 'vitest';
import merge from '../../src/object/merge';

describe('merge', () => {
	it('merges two objects', () => {
		expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
	});

	it('src values override dest values', () => {
		expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
	});

	it('is non-destructive', () => {
		const dest = { a: 1 };
		const src = { b: 2 };
		const result = merge(dest, src);
		expect(dest).toEqual({ a: 1 });
		expect(src).toEqual({ b: 2 });
		expect(result).not.toBe(dest);
		expect(result).not.toBe(src);
	});

	it('deep merges nested objects', () => {
		const dest = { a: { x: 1, y: 2 } };
		const src = { a: { y: 3, z: 4 } };
		expect(merge(dest, src)).toEqual({ a: { x: 1, y: 3, z: 4 } });
	});

	it('copies Date objects properly', () => {
		const date = new Date('2024-01-01');
		const result = merge({ d: new Date('2020-01-01') }, { d: date });
		expect((result as any).d).toEqual(date);
		expect((result as any).d).not.toBe(date);
	});

	it('throws if either parameter is not an object', () => {
		expect(() => merge('a' as any, {})).toThrow();
		expect(() => merge({}, 'b' as any)).toThrow();
	});
});
