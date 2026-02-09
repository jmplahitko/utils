import { describe, it, expect } from 'vitest';
import { noop } from '../../src/function/noop';

describe('noop', () => {
	it('returns undefined', () => {
		expect(noop()).toBeUndefined();
	});

	it('returns undefined regardless of arguments', () => {
		expect(noop(1, 2, 3)).toBeUndefined();
		expect(noop('a', 'b')).toBeUndefined();
	});
});
