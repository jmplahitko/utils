import { describe, it, expect } from 'vitest';
import pick from '../../src/object/pick';

describe('pick', () => {
	it('picks specified properties from an object', () => {
		const obj = { a: 1, b: 2, c: 3 };
		expect(pick(obj, { a: null, b: null })).toEqual({ a: 1, b: 2 });
	});

	it('renames properties when value is a string', () => {
		const obj = { a: 1, b: 2 };
		expect(pick(obj, { a: 'x', b: 'y' })).toEqual({ x: 1, y: 2 });
	});

	it('ignores keys not present in the source object', () => {
		const obj = { a: 1 };
		expect(pick(obj, { a: null, missing: null })).toEqual({ a: 1 });
	});

	it('is non-destructive', () => {
		const obj = { a: 1, b: 2 };
		pick(obj, { a: null });
		expect(obj).toEqual({ a: 1, b: 2 });
	});

	it('throws if either parameter is not an object', () => {
		expect(() => pick('a' as any, {})).toThrow();
		expect(() => pick({}, 'b' as any)).toThrow();
	});
});
