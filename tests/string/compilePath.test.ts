import { describe, it, expect } from 'vitest';
import compilePath from '../../src/string/compilePath';

describe('compilePath', () => {
	it('compiles a path with provided data', () => {
		expect(compilePath('/users/:id', { id: 42 })).toBe('/users/42');
	});

	it('preserves param placeholders when data is missing', () => {
		expect(compilePath('/users/:id')).toBe('/users/:id');
	});

	it('handles multiple params', () => {
		expect(compilePath('/users/:userId/posts/:postId', { userId: 1, postId: 99 })).toBe('/users/1/posts/99');
	});

	it('fills only provided params, preserves others', () => {
		expect(compilePath('/users/:userId/posts/:postId', { userId: 1 })).toBe('/users/1/posts/:postId');
	});
});
