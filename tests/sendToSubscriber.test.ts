import { sendToSubscriber } from '../src/workers/jobWorker';
import { describe, test, expect, vi } from 'vitest';

describe('sendToSubscriber', () => {
  test('returns true when request succeeds', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true })) as any;

    const result = await sendToSubscriber('http://test.com', {});

    expect(result).toBe(true);
  });

  test('returns false when request fails', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false })) as any;

    const result = await sendToSubscriber('http://test.com', {});

    expect(result).toBe(false);
  });

  test('returns false on network error', async () => {
    global.fetch = vi.fn(() => Promise.reject('network error')) as any;

    const result = await sendToSubscriber('http://test.com', {});

    expect(result).toBe(false);
  });
});
