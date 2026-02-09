import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, or } from '../../src/number';

describe('add', () => {
	it('adds two numbers', () => {
		expect(add(1, 2)).toBe(3);
	});

	it('supports curried invocation', () => {
		const add5 = add(5);
		expect(add5(3)).toBe(8);
	});

	it('supports overflow (more than 2 args)', () => {
		expect(add(1, 2, 3)).toBe(6);
	});

	it('throws for NaN arguments', () => {
		expect(() => add(NaN, 1)).toThrow();
	});
});

describe('subtract', () => {
	it('subtracts two numbers', () => {
		expect(subtract(10, 3)).toBe(7);
	});

	it('supports curried invocation', () => {
		const sub10 = subtract(10);
		expect(sub10(3)).toBe(7);
	});

	it('throws for NaN arguments', () => {
		expect(() => subtract(NaN, 1)).toThrow();
	});
});

describe('multiply', () => {
	it('multiplies two numbers', () => {
		expect(multiply(3, 4)).toBe(12);
	});

	it('supports curried invocation', () => {
		const times3 = multiply(3);
		expect(times3(4)).toBe(12);
	});

	it('throws for NaN arguments', () => {
		expect(() => multiply(NaN, 1)).toThrow();
	});
});

describe('divide', () => {
	it('divides two numbers', () => {
		expect(divide(10, 2)).toBe(5);
	});

	it('supports curried invocation', () => {
		const div10 = divide(10);
		expect(div10(2)).toBe(5);
	});

	it('throws for NaN arguments', () => {
		expect(() => divide(NaN, 1)).toThrow();
	});
});

describe('or (bitwise)', () => {
	it('performs bitwise OR', () => {
		expect(or(0b1010, 0b0101)).toBe(0b1111);
	});

	it('supports curried invocation', () => {
		const or3 = or(3);
		expect(or3(5)).toBe(7); // 011 | 101 = 111
	});

	it('throws for NaN arguments', () => {
		expect(() => or(NaN, 1)).toThrow();
	});
});
