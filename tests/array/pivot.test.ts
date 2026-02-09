import { describe, it, expect } from 'vitest';
import { leftPivot, rightPivot } from '../../src/array';

describe('leftPivot', () => {
	it('rotates a 2D array 90 degrees to the left', () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
		];
		const result = leftPivot(matrix);
		expect(result).toEqual([
			[3, 6],
			[2, 5],
			[1, 4],
		]);
	});
});

describe('rightPivot', () => {
	it('rotates a 2D array 90 degrees to the right', () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
		];
		const result = rightPivot(matrix);
		expect(result).toEqual([
			[4, 1],
			[5, 2],
			[6, 3],
		]);
	});
});
