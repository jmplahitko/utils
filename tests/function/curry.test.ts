import { describe, it, expect } from 'vitest';
import curry from '../../src/function/curry';

describe('curry', () => {
	it('curries a 2-argument function', () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add);
		expect(curried(1, 2)).toBe(3);
		expect(curried(1)(2)).toBe(3);
	});

	it('curries a 3-argument function', () => {
		const sum3 = (a: number, b: number, c: number) => a + b + c;
		const curried = curry(sum3);
		expect(curried(1)(2)(3)).toBe(6);
		expect(curried(1, 2)(3)).toBe(6);
		expect(curried(1)(2, 3)).toBe(6);
		expect(curried(1, 2, 3)).toBe(6);
	});

	it('supports overflow mode', () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add, true);
		expect(curried(1, 2, 3)).toBe(6); // (1+2) + 3
	});

	it('supports partial application with overflow', () => {
		const add = (a: number, b: number) => a + b;
		const curried = curry(add, true);
		const add1 = curried(1);
		expect(add1(2, 3)).toBe(6); // (1+2) + 3
	});

	it('throws if argument is not a function', () => {
		expect(() => curry('not a function' as any)).toThrow();
	});

	it('handles single-argument functions', () => {
		const double = (x: number) => x * 2;
		const curried = curry(double);
		expect(curried(5)).toBe(10);
	});
});
