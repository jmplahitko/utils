import { describe, it, expect } from 'vitest';
import hasFlags from '../../src/predicate/hasFlags';
import hasAnyFlags from '../../src/predicate/hasAnyFlags';

const READ = 1;
const WRITE = 2;
const EXEC = 4;

describe('hasFlags', () => {
	// hasFlags(flags, mask) => (mask & flags) === mask
	// flags = value being checked, mask = required bits
	it('returns true when all mask bits are present in flags', () => {
		const perms = READ | WRITE | EXEC; // 7
		expect(hasFlags(perms, READ | WRITE)).toBe(true);
	});

	it('returns false when not all mask bits are present', () => {
		const perms = READ | EXEC; // 5
		expect(hasFlags(perms, READ | WRITE)).toBe(false);
	});

	it('supports curried invocation', () => {
		const checkPerms = hasFlags(READ | WRITE | EXEC);
		expect(checkPerms(READ | WRITE)).toBe(true);
		expect(checkPerms(READ | WRITE | EXEC)).toBe(true);
	});

	it('throws for NaN arguments', () => {
		expect(() => hasFlags(NaN, 1)).toThrow();
	});
});

describe('hasAnyFlags', () => {
	// hasAnyFlags(flags, mask) => (mask & flags) !== 0
	it('returns true when any flag bits overlap with mask', () => {
		const perms = READ | EXEC; // 5
		expect(hasAnyFlags(perms, READ | WRITE)).toBe(true);
	});

	it('returns false when no flag bits overlap with mask', () => {
		const perms = EXEC; // 4
		expect(hasAnyFlags(perms, READ | WRITE)).toBe(false);
	});

	it('supports curried invocation', () => {
		const checkAny = hasAnyFlags(READ | WRITE);
		expect(checkAny(READ)).toBe(true);
		expect(checkAny(EXEC)).toBe(false);
	});

	it('throws for NaN arguments', () => {
		expect(() => hasAnyFlags(NaN, 1)).toThrow();
	});
});
