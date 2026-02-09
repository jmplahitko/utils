import { describe, it, expect } from 'vitest';
import { createPipe, Operator } from '../../src/async';

describe('createPipe', () => {
	it('passes a value through a single operator', async () => {
		const double: Operator<number> = (value, next) => next(value * 2);
		const pipe = createPipe([double]);
		expect(await pipe(5)).toBe(10);
	});

	it('chains multiple operators in sequence', async () => {
		const add1: Operator<number> = (value, next) => next(value + 1);
		const double: Operator<number> = (value, next) => next(value * 2);
		const pipe = createPipe([add1, double]);
		expect(await pipe(5)).toBe(12); // (5 + 1) * 2
	});

	it('resolves with the final value when no more operators', async () => {
		const pipe = createPipe<number>([]);
		expect(await pipe(42)).toBe(42);
	});

	it('allows an operator to resolve early', async () => {
		const earlyResolve: Operator<number> = (value, _next, resolve) => resolve(value * 10);
		const shouldNotRun: Operator<number> = (value, next) => next(value + 1);
		const pipe = createPipe([earlyResolve, shouldNotRun]);
		expect(await pipe(3)).toBe(30);
	});

	it('allows an operator to reject', async () => {
		const failing: Operator<number> = (_value, _next, _resolve, reject) => reject('pipe error');
		const pipe = createPipe([failing]);
		await expect(pipe(1)).rejects.toBe('pipe error');
	});

	it('throws TypeError for non-iterable input', () => {
		expect(() => createPipe(42 as any)).toThrow(TypeError);
	});
});
