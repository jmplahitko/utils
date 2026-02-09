import { describe, it, expect } from 'vitest';
import makeCSV from '../../src/factories/makeCSV';

describe('makeCSV', () => {
	it('creates a CSV string from objects with given headers', () => {
		const data = [
			{ name: 'Alice', age: 30 },
			{ name: 'Bob', age: 25 },
		];
		const result = makeCSV(data, ['name', 'age']);
		const lines = result.split('\r');
		expect(lines[0]).toBe('name,age');
		expect(lines[1]).toBe('"Alice","30"');
		expect(lines[2]).toBe('"Bob","25"');
	});

	it('handles dot notation for nested properties', () => {
		const data = [{ user: { name: 'Alice' } }];
		const result = makeCSV(data, ['user.name']);
		const lines = result.split('\r');
		expect(lines[0]).toBe('name');
		expect(lines[1]).toBe('"Alice"');
	});

	it('outputs empty quotes for missing properties', () => {
		const data = [{ name: 'Alice' }];
		const result = makeCSV(data, ['name', 'missing']);
		const lines = result.split('\r');
		expect(lines[1]).toContain('""');
	});

	it('escapes quotes in values', () => {
		const data = [{ name: 'Al"ice' }];
		const result = makeCSV(data, ['name']);
		const lines = result.split('\r');
		expect(lines[1]).toBe('"Al""ice"');
	});

	it('supports curried invocation', () => {
		const withHeaders = makeCSV([{ a: 1 }]);
		const result = withHeaders(['a']);
		expect(result).toContain('"1"');
	});

	it('throws if first parameter is not an array', () => {
		expect(() => makeCSV('not array' as any, [])).toThrow();
	});

	it('throws if second parameter is not an array', () => {
		expect(() => makeCSV([], 'not array' as any)).toThrow();
	});
});
