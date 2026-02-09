import { describe, it, expect } from 'vitest';
import selectNonEmpties from '../../src/object/selectNonEmpties';
import selectNonNulls from '../../src/object/selectNonNulls';

describe('selectNonEmpties', () => {
	it('removes empty string values', () => {
		expect(selectNonEmpties({ a: 'hello', b: '' })).toEqual({ a: 'hello' });
	});

	it('removes null values', () => {
		expect(selectNonEmpties({ a: 1, b: null })).toEqual({ a: 1 });
	});

	it('removes undefined values', () => {
		expect(selectNonEmpties({ a: 1, b: undefined })).toEqual({ a: 1 });
	});

	it('removes empty objects', () => {
		expect(selectNonEmpties({ a: 1, b: {} })).toEqual({ a: 1 });
	});

	it('removes empty arrays', () => {
		expect(selectNonEmpties({ a: 1, b: [] })).toEqual({ a: 1 });
	});

	it('keeps numbers including 0', () => {
		expect(selectNonEmpties({ a: 0, b: 42 })).toEqual({ a: 0, b: 42 });
	});

	it('keeps booleans', () => {
		expect(selectNonEmpties({ a: true, b: false })).toEqual({ a: true, b: false });
	});

	it('recursively filters nested objects', () => {
		const input = { a: { b: '', c: 'keep' } };
		expect(selectNonEmpties(input)).toEqual({ a: { c: 'keep' } });
	});

	it('returns primitives as-is', () => {
		expect(selectNonEmpties(42 as any)).toBe(42);
	});
});

describe('selectNonNulls', () => {
	it('removes null values', () => {
		expect(selectNonNulls({ a: 1, b: null, c: 'hi' })).toEqual({ a: 1, c: 'hi' });
	});

	it('keeps undefined values', () => {
		expect(selectNonNulls({ a: 1, b: undefined })).toEqual({ a: 1, b: undefined });
	});

	it('keeps empty strings and zero', () => {
		expect(selectNonNulls({ a: '', b: 0 })).toEqual({ a: '', b: 0 });
	});
});
