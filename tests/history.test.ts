import { describe, expect, it } from 'vitest';
import { getInitialHistoryForRender, loadStoredHistory } from '@/lib/detection/history';

describe('detector history hydration behavior', () => {
  it('uses an empty history list for initial render to match server HTML', () => {
    expect(getInitialHistoryForRender()).toEqual([]);
  });

  it('loads persisted history only after the client has mounted', () => {
    const storage = {
      getItem: () =>
        JSON.stringify([
          {
            id: 'det_1',
            score: 86,
            verdict: 'ai',
            createdAt: '2026-05-26T00:00:00.000Z',
            label: 'Likely AI-Generated',
          },
        ]),
    };

    expect(loadStoredHistory(storage).length).toBe(1);
  });
});
