import { describe, it, expect } from 'vitest';
import equals from '../../src/predicate/equals';

describe('equals', () => {
	it('returns true for identical primitives', () => {
		expect(equals(1, 1)).toBe(true);
		expect(equals('a', 'a')).toBe(true);
	});

	it('returns false for different primitives', () => {
		expect(equals(1, 2)).toBe(false);
		expect(equals('a', 'b')).toBe(false);
	});

	it('handles NaN equality', () => {
		expect(equals(NaN, NaN)).toBe(true);
	});

	it('returns false for null vs non-null', () => {
		expect(equals(null, 1)).toBe(false);
		expect(equals(1, null)).toBe(false);
	});

	it('compares arrays deeply', () => {
		expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(equals([1, 2], [1, 2, 3])).toBe(false);
	});

	it('compares nested arrays', () => {
		expect(equals([[1, 2], [3]], [[1, 2], [3]])).toBe(true);
		expect(equals([[1, 2], [3]], [[1, 2], [4]])).toBe(false);
	});

	it('compares objects deeply', () => {
		expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
		expect(equals({ a: 1 }, { a: 2 })).toBe(false);
	});

	it('compares nested objects', () => {
		expect(equals({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
		expect(equals({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
	});

	it('compares Date objects by value', () => {
		expect(equals(new Date('2024-01-01'), new Date('2024-01-01'))).toBe(true);
		expect(equals(new Date('2024-01-01'), new Date('2024-01-02'))).toBe(false);
	});

	it('compares RegExp objects', () => {
		expect(equals(/test/g, /test/g)).toBe(true);
		expect(equals(/test/g, /test/i)).toBe(false);
	});

	it('compares ISO 8601 date strings', () => {
		expect(equals('2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z')).toBe(true);
	});

	it('ignores $ prefixed properties', () => {
		expect(equals({ $internal: 1, a: 2 }, { $internal: 99, a: 2 })).toBe(true);
	});

	it('ignores function properties', () => {
		expect(equals({ a: 1, fn: () => {} }, { a: 1, fn: () => {} })).toBe(true);
	});

	it('supports curried invocation', () => {
		const equalsOne = equals(1);
		expect(equalsOne(1)).toBe(true);
		expect(equalsOne(2)).toBe(false);
	});
});
