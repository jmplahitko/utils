import { describe, it, expect } from 'vitest';
import getMemberPath from '../../src/parse/getMemberPath';

describe('getMemberPath', () => {
	it('extracts member path from ES6 arrow function', () => {
		expect(getMemberPath((x: any) => x.name)).toBe('name');
	});

	it('extracts nested member path from arrow function', () => {
		expect(getMemberPath((x: any) => x.address.city)).toBe('address.city');
	});

	it('extracts member path from ES5 function', () => {
		expect(getMemberPath(function(x: any) { return x.name; })).toBe('name');
	});

	it('returns empty string for ES5 function without property access', () => {
		expect(getMemberPath(function() { return 'literal'; } as any)).toBe('');
	});
});
