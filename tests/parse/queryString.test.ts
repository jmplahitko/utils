import { describe, it, expect } from 'vitest';
import queryString from '../../src/parse/queryString';

describe('queryString', () => {
	it('parses a simple query string', () => {
		expect(queryString('a=1&b=2')).toEqual({ a: '1', b: '2' });
	});

	it('handles leading question mark', () => {
		expect(queryString('?a=1&b=2')).toEqual({ a: '1', b: '2' });
	});

	it('handles encoded values', () => {
		expect(queryString('name=hello%20world')).toEqual({ name: 'hello world' });
	});

	it('handles missing values', () => {
		expect(queryString('key=')).toEqual({ key: '' });
	});

	it('handles keys without values', () => {
		expect(queryString('key')).toEqual({ key: '' });
	});
});
