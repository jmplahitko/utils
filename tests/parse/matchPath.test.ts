import { describe, it, expect } from 'vitest';
import matchPath from '../../src/parse/matchPath';

describe('matchPath', () => {
	it('extracts params from a matching path', () => {
		expect(matchPath('/users/:id', '/users/42')).toEqual({ id: '42' });
	});

	it('extracts multiple params', () => {
		expect(matchPath('/users/:userId/posts/:postId', '/users/1/posts/99')).toEqual({
			userId: '1',
			postId: '99',
		});
	});

	it('returns empty object when path does not match', () => {
		expect(matchPath('/users/:id', '/posts/42')).toEqual({});
	});
});
