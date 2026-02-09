import { describe, it, expect } from 'vitest';
import createMap from '../../src/_internal/createMap';

describe('createMap', () => {
	it('returns an object with null prototype', () => {
		const map = createMap();
		expect(Object.getPrototypeOf(map)).toBeNull();
	});

	it('does not have inherited properties', () => {
		const map = createMap();
		expect(map.hasOwnProperty).toBeUndefined();
		expect(map.toString).toBeUndefined();
	});

	it('can have properties assigned to it', () => {
		const map = createMap();
		map.key = 'value';
		expect(map.key).toBe('value');
	});
});
