import { describe, it, expect } from 'vitest';
import copy from '../../src/factories/copy';

describe('copy', () => {
	it('returns primitives as-is', () => {
		expect(copy(42)).toBe(42);
		expect(copy('hello')).toBe('hello');
		expect(copy(true)).toBe(true);
		expect(copy(null)).toBe(null);
	});

	it('deep copies a plain object', () => {
		const obj = { a: 1, b: { c: 2 } };
		const result = copy(obj);
		expect(result).toEqual(obj);
		expect(result).not.toBe(obj);
		expect((result as any).b).not.toBe(obj.b);
	});

	it('deep copies nested objects', () => {
		const obj = { a: { b: { c: { d: 1 } } } };
		const result = copy(obj) as any;
		expect(result).toEqual(obj);
		expect(result.a.b.c).not.toBe(obj.a.b.c);
	});

	it('deep copies an array', () => {
		const arr = [1, [2, 3], { a: 4 }];
		const result = copy(arr);
		expect(result).toEqual(arr);
		expect(result).not.toBe(arr);
		expect((result as any)[1]).not.toBe(arr[1]);
	});

	it('deep copies arrays of objects', () => {
		const arr = [{ a: 1 }, { b: 2 }];
		const result = copy(arr) as any[];
		expect(result).toEqual(arr);
		expect(result[0]).not.toBe(arr[0]);
	});

	it('handles circular references', () => {
		const obj: any = { a: 1 };
		obj.self = obj;
		const result = copy(obj) as any;
		expect(result.a).toBe(1);
		expect(result.self).toBe(result);
		expect(result).not.toBe(obj);
	});

	it('copies into a destination object when provided', () => {
		const src = { a: 1, b: 2 };
		const dest = {} as any;
		const result = copy(src, dest);
		expect(result).toBe(dest);
		expect(dest.a).toBe(1);
		expect(dest.b).toBe(2);
	});

	it('copies into a destination array when provided', () => {
		const src = [1, 2, 3];
		const dest: any[] = [];
		const result = copy(src, dest);
		expect(result).toBe(dest);
		expect(dest).toEqual([1, 2, 3]);
	});

	it('empties the destination before copying', () => {
		const src = { a: 1 };
		const dest = { x: 99, y: 100 } as any;
		copy(src, dest);
		expect(dest).toEqual({ a: 1 });
	});

	it('throws when source and destination are the same reference', () => {
		const obj = { a: 1 };
		expect(() => copy(obj, obj)).toThrow();
	});

	it('preserves Date values inside nested objects', () => {
		const date = new Date('2024-01-01');
		const obj = { d: date };
		const result = copy(obj) as any;
		expect(result.d.getTime()).toBe(date.getTime());
	});
});
