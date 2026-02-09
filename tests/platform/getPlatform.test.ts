import { describe, it, expect, vi } from 'vitest';
import getPlatform from '../../src/platform/getPlatform';

vi.mock('detect-browser', () => ({
	detect: vi.fn(),
}));

import { detect } from 'detect-browser';
const mockDetect = vi.mocked(detect);

describe('getPlatform', () => {
	it('returns platform info for a browser', () => {
		mockDetect.mockReturnValue({ type: 'browser', name: 'chrome', version: '120.0.0', os: 'Mac OS' } as any);
		const result = getPlatform();
		expect(result).toEqual({
			name: 'chrome',
			type: 'browser',
			version: '120.0.0',
			os: 'Mac OS',
		});
	});

	it('maps node type to server', () => {
		mockDetect.mockReturnValue({ type: 'node', name: 'node', version: '20.0.0', os: 'linux' } as any);
		const result = getPlatform();
		expect(result.type).toBe('server');
	});

	it('returns null name for bots', () => {
		mockDetect.mockReturnValue({ type: 'bot', name: 'googlebot', version: null, os: null } as any);
		const result = getPlatform();
		expect(result.name).toBeNull();
	});

	it('returns null name for react-native', () => {
		mockDetect.mockReturnValue({ type: 'react-native', name: 'react-native', version: null, os: null } as any);
		const result = getPlatform();
		expect(result.name).toBeNull();
	});

	it('handles null detection result', () => {
		mockDetect.mockReturnValue(null);
		const result = getPlatform();
		expect(result).toEqual({ name: null, type: null, version: null, os: null });
	});
});
