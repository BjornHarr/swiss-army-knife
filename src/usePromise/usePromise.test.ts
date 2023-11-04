import { describe, test, expect, vitest } from 'vitest';
import { usePromise } from './usePromise';

describe('usePromise', () => {
 test('provider is called on mount', async () => {
  const provider = vitest.fn(() => Promise.resolve());
  usePromise(provider, []);
  await expect(provider).resolves.toBeCalled();
 });
});
