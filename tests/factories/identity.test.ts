import { describe, it, expect } from 'vitest';
import identity from '../../src/factories/identity';

describe('identity', () => {
	it('returns the same value passed in', () => {
		expect(identity(42)).toBe(42);
		expect(identity('hello')).toBe('hello');
		expect(identity(null)).toBe(null);
		expect(identity(undefined)).toBe(undefined);
	});

	it('returns the same object reference', () => {
		const obj = { a: 1 };
		expect(identity(obj)).toBe(obj);
	});
});
