import { describe, it, expect } from 'vitest';
import getBaseHref from '../../src/dom/getBaseHref';
import nodeExistsIn from '../../src/dom/nodeExistsIn';

describe('getBaseHref', () => {
	it('returns null when no base element exists', () => {
		const mockDocument = {
			getElementsByTagName: () => [],
		};
		expect(getBaseHref(mockDocument)).toBeNull();
	});

	it('returns the href of the first base element', () => {
		const mockDocument = {
			getElementsByTagName: () => [{ href: 'http://example.com/' }],
		};
		expect(getBaseHref(mockDocument)).toBe('http://example.com/');
	});
});

describe('nodeExistsIn', () => {
	it('returns true when element is the target', () => {
		const el = {} as HTMLElement;
		expect(nodeExistsIn(el, el)).toBe(true);
	});

	it('returns true when target is an ancestor', () => {
		const parent = { parentNode: null } as any;
		const child = { parentNode: parent } as any;
		expect(nodeExistsIn(child, parent)).toBe(true);
	});

	it('returns false when target is not an ancestor', () => {
		const other = {} as any;
		const el = { parentNode: null } as any;
		expect(nodeExistsIn(el, other)).toBe(false);
	});
});
