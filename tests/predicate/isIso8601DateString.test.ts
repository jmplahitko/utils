import { describe, it, expect } from 'vitest';
import isIso8601DateString from '../../src/predicate/isIso8601DateString';

describe('isIso8601DateString', () => {
	it('returns true for date-only string', () => {
		expect(isIso8601DateString('2024-01-15')).toBe(true);
	});

	it('returns true for full ISO string', () => {
		expect(isIso8601DateString('2024-01-15T10:30:00Z')).toBe(true);
	});

	it('returns true for ISO string with timezone offset', () => {
		expect(isIso8601DateString('2024-01-15T10:30:00+05:30')).toBe(true);
	});

	it('returns false for non-date strings', () => {
		expect(isIso8601DateString('not a date')).toBe(false);
		expect(isIso8601DateString('')).toBe(false);
	});

	it('returns false for non-strings', () => {
		expect(isIso8601DateString(42)).toBe(false);
		expect(isIso8601DateString(null)).toBe(false);
	});
});
