import { describe, it, expect } from 'vitest';
import deepGet from '../../src/object/deepGet';

describe('deepGet', () => {
	it('gets a top-level property', () => {
		expect(deepGet({ a: 1 }, 'a')).toBe(1);
	});

	it('gets a nested property via dot notation', () => {
		expect(deepGet({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42);
	});

	it('returns undefined for a missing property', () => {
		expect(deepGet({ a: 1 }, 'b')).toBeUndefined();
	});

	it('returns undefined for a missing nested property', () => {
		expect(deepGet({ a: { b: 1 } }, 'a.c')).toBeUndefined();
	});

	it('handles properties with dots in the key name (direct match first)', () => {
		const obj = { 'a.b': 'direct' };
		expect(deepGet(obj, 'a.b')).toBe('direct');
	});

	it('throws if first parameter is not an object', () => {
		expect(() => deepGet('not an object' as any, 'a')).toThrow();
	});
});
