import { describe, it, expect } from 'vitest';
import is from '../../src/predicate/is';
import isBlankObject from '../../src/predicate/isBlankObject';
import isBoolean from '../../src/predicate/isBoolean';
import isBufferArray from '../../src/predicate/isBufferArray';
import isClass from '../../src/predicate/isClass';
import isDate from '../../src/predicate/isDate';
import isFunction from '../../src/predicate/isFunction';
import isNumber from '../../src/predicate/isNumber';
import isObject from '../../src/predicate/isObject';
import isRegExp from '../../src/predicate/isRegExp';
import isString from '../../src/predicate/isString';
import isTypedArray from '../../src/predicate/isTypedArray';
import isUndefined from '../../src/predicate/isUndefined';
import isUrl from '../../src/predicate/isUrl';
import isWindow from '../../src/predicate/isWindow';
import isPrimitiveType from '../../src/predicate/isPrimitiveType';

describe('is', () => {
	it('returns true for identical values', () => {
		expect(is(1, 1)).toBe(true);
	});

	it('handles NaN correctly', () => {
		expect(is(NaN, NaN)).toBe(true);
	});

	it('distinguishes +0 and -0', () => {
		expect(is(0, -0)).toBe(false);
	});

	it('supports curried invocation', () => {
		const isOne = is(1);
		expect(isOne(1)).toBe(true);
		expect(isOne(2)).toBe(false);
	});
});

describe('isBlankObject', () => {
	it('returns true for Object.create(null)', () => {
		expect(isBlankObject(Object.create(null))).toBe(true);
	});

	it('returns false for regular objects', () => {
		expect(isBlankObject({})).toBe(false);
	});

	it('returns false for null', () => {
		expect(isBlankObject(null)).toBe(false);
	});
});

describe('isBoolean', () => {
	it('returns true for booleans', () => {
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	it('returns false for non-booleans', () => {
		expect(isBoolean(0)).toBe(false);
		expect(isBoolean('true')).toBe(false);
	});
});

describe('isBufferArray', () => {
	it('returns true for ArrayBuffer', () => {
		expect(isBufferArray(new ArrayBuffer(8))).toBe(true);
	});

	it('returns false for regular arrays', () => {
		expect(isBufferArray([1, 2])).toBe(false);
	});
});

describe('isClass', () => {
	it('returns true for class declarations', () => {
		class Foo {}
		expect(isClass(Foo)).toBe(true);
	});

	it('returns false for regular functions', () => {
		expect(isClass(function() {})).toBe(false);
	});

	it('returns false for null/undefined', () => {
		expect(isClass(null)).toBe(false);
		expect(isClass(undefined)).toBe(false);
	});
});

describe('isDate', () => {
	it('returns true for Date objects', () => {
		expect(isDate(new Date())).toBe(true);
	});

	it('returns false for date strings', () => {
		expect(isDate('2024-01-01')).toBe(false);
	});

	it('returns false for null', () => {
		expect(isDate(null)).toBe(false);
	});
});

describe('isFunction', () => {
	it('returns true for functions', () => {
		expect(isFunction(() => {})).toBe(true);
		expect(isFunction(function() {})).toBe(true);
	});

	it('returns false for non-functions', () => {
		expect(isFunction(42)).toBe(false);
		expect(isFunction(null)).toBe(false);
		expect(isFunction(undefined)).toBe(false);
	});
});

describe('isNumber', () => {
	it('returns true for numbers', () => {
		expect(isNumber(42)).toBe(true);
		expect(isNumber(0)).toBe(true);
		expect(isNumber(NaN)).toBe(true);
	});

	it('returns false for numeric strings', () => {
		expect(isNumber('42')).toBe(false);
	});
});

describe('isObject', () => {
	it('returns true for plain objects', () => {
		expect(isObject({})).toBe(true);
		expect(isObject({ a: 1 })).toBe(true);
	});

	it('returns false for arrays', () => {
		expect(isObject([])).toBe(false);
	});

	it('returns false for null', () => {
		expect(isObject(null)).toBe(false);
	});

	it('returns false for dates', () => {
		expect(isObject(new Date())).toBe(false);
	});
});

describe('isRegExp', () => {
	it('returns true for regular expressions', () => {
		expect(isRegExp(/test/)).toBe(true);
		expect(isRegExp(new RegExp('test'))).toBe(true);
	});

	it('returns false for strings', () => {
		expect(isRegExp('/test/')).toBe(false);
	});
});

describe('isString', () => {
	it('returns true for strings', () => {
		expect(isString('')).toBe(true);
		expect(isString('hello')).toBe(true);
	});

	it('returns false for non-strings', () => {
		expect(isString(42)).toBe(false);
		expect(isString(null)).toBe(false);
	});
});

describe('isTypedArray', () => {
	it('returns true for typed arrays', () => {
		expect(isTypedArray(new Uint8Array())).toBe(true);
		expect(isTypedArray(new Float64Array())).toBe(true);
		expect(isTypedArray(new Int32Array())).toBe(true);
	});

	it('returns false for regular arrays', () => {
		expect(isTypedArray([1, 2, 3])).toBe(false);
	});
});

describe('isUndefined', () => {
	it('returns true for undefined', () => {
		expect(isUndefined(undefined)).toBe(true);
	});

	it('returns false for null', () => {
		expect(isUndefined(null)).toBe(false);
	});

	it('returns false for other values', () => {
		expect(isUndefined(0)).toBe(false);
		expect(isUndefined('')).toBe(false);
	});
});

describe('isUrl', () => {
	it('returns true for http URLs', () => {
		expect(isUrl('http://example.com')).toBe(true);
	});

	it('returns true for https URLs', () => {
		expect(isUrl('https://example.com/path?q=1')).toBe(true);
	});

	it('returns false for non-URLs', () => {
		expect(isUrl('not a url')).toBe(false);
		expect(isUrl('')).toBe(false);
	});
});

describe('isWindow', () => {
	it('returns true for window-like objects', () => {
		const fakeWindow = { window: null as any };
		fakeWindow.window = fakeWindow;
		expect(isWindow(fakeWindow)).toBe(true);
	});

	it('returns false for regular objects', () => {
		expect(isWindow({})).toBe(false);
	});

	it('returns falsy for null/undefined', () => {
		expect(isWindow(null)).toBeFalsy();
		expect(isWindow(undefined)).toBeFalsy();
	});
});

describe('isPrimitiveType', () => {
	it('returns true for strings', () => {
		expect(isPrimitiveType('hello')).toBe(true);
	});

	it('returns true for numbers', () => {
		expect(isPrimitiveType(42)).toBe(true);
	});

	it('returns true for booleans', () => {
		expect(isPrimitiveType(true)).toBe(true);
	});

	it('returns false for objects', () => {
		expect(isPrimitiveType({})).toBe(false);
	});

	it('returns false for null', () => {
		expect(isPrimitiveType(null)).toBe(false);
	});
});
