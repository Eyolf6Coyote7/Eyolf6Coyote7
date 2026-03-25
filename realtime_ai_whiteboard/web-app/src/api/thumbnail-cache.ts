const cache = new Map<string, string>();

export function setThumbnail(boardId: string, dataUrl: string) {
  cache.set(boardId, dataUrl);
}

export function getThumbnail(boardId: string): string | null {
  return cache.get(boardId) ?? null;
}

export function hasThumbnail(boardId: string): boolean {
  return cache.has(boardId);
}
