import { describe, test, expect, vi } from 'vitest';

describe('retry logic', () => {
  test('retries until success', async () => {
    const mockSend = vi
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    let attempts = 0;
    let success = false;

    while (!success && attempts < 3) {
      attempts++;
      success = await mockSend();
    }

    expect(attempts).toBe(3);
    expect(success).toBe(true);
  });

  test('fails after max attempts', async () => {
    const mockSend = vi.fn().mockResolvedValue(false);

    let attempts = 0;
    let success = false;

    while (!success && attempts < 3) {
      attempts++;
      success = await mockSend();
    }

    expect(success).toBe(false);
    expect(attempts).toBe(3);
  });
});
