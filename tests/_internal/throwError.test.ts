import { describe, it, expect } from 'vitest';
import throwError from '../../src/_internal/throwError';

describe('throwError', () => {
	it('throws an error with prefixed message', () => {
		expect(() => throwError('test message')).toThrowError('ui.framework.utils.test message');
	});

	it('throws an instance of Error', () => {
		expect(() => throwError('foo')).toThrow(Error);
	});
});
