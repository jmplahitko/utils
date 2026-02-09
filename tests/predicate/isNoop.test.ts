import { describe, it, expect } from 'vitest';
import isNoop from '../../src/predicate/isNoop';

describe('isNoop', () => {
	it('returns true for empty arrow function', () => {
		expect(isNoop(() => {})).toBe(true);
	});

	it('returns true for empty function declaration', () => {
		expect(isNoop(function() {})).toBe(true);
	});

	it('returns false for functions with a body', () => {
		expect(isNoop(() => 42)).toBe(false);
		expect(isNoop(function() { return 1; })).toBe(false);
	});

	it('throws if argument is not a function', () => {
		expect(() => isNoop('not a function' as any)).toThrow(TypeError);
	});
});
