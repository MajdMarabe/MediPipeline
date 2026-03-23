import { describe, test, expect, vi } from 'vitest';
import { processAction } from '../src/workers/jobWorker';

describe('processAction', () => {
  test('calls correct handler', async () => {
    const result = await processAction('vitals_recorded', {
      heartRate: 130,
    });

    expect(result).toBeDefined();
  });

  test('throws on unknown action', async () => {
    await expect(() => processAction('unknown', {})).rejects.toThrow(
      'Unknown action',
    );
  });
});
