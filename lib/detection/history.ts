import type { Verdict } from './types';

export type HistoryItem = {
  id: string;
  score: number;
  verdict: Verdict;
  createdAt: string;
  label: string;
};

type StorageLike = Pick<Storage, 'getItem'>;

export const detectorHistoryKey = 'ai-image-checker-history';

export function getInitialHistoryForRender(): HistoryItem[] {
  return [];
}

export function loadStoredHistory(storage: StorageLike, key = detectorHistoryKey): HistoryItem[] {
  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isHistoryItem).slice(0, 50);
  } catch {
    return [];
  }
}

function isHistoryItem(item: unknown): item is HistoryItem {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as Partial<HistoryItem>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.score === 'number' &&
    (candidate.verdict === 'real' || candidate.verdict === 'uncertain' || candidate.verdict === 'ai') &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.label === 'string'
  );
}
