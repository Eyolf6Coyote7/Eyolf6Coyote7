const THUMBNAILS: Record<string, JSX.Element> = {
  '1': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F3F4F6" />
      <rect x="20" y="20" width="60" height="40" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <rect x="100" y="30" width="60" height="40" rx="4" fill="#DBEAFE" stroke="#2563EB" />
      <rect x="180" y="20" width="60" height="40" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <line x1="80" y1="40" x2="100" y2="50" stroke="#374151" strokeWidth="1.5" />
      <line x1="160" y1="50" x2="180" y2="40" stroke="#374151" strokeWidth="1.5" />
      <rect x="40" y="80" width="80" height="30" rx="4" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="160" y="90" width="80" height="30" rx="4" fill="#DBEAFE" stroke="#2563EB" />
      <text x="55" y="100" fontSize="8" fill="#92400E">
        Sprint
      </text>
      <text x="180" y="110" fontSize="8" fill="#1E3A5F">
        Review
      </text>
    </svg>
  ),
  '2': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F3F4F6" />
      <circle cx="70" cy="50" r="25" fill="#DBEAFE" stroke="#2563EB" />
      <circle cx="180" cy="60" r="20" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="120" y="90" width="100" height="40" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <path
        d="M30 120 Q60 80 90 110 Q120 140 150 100"
        stroke="#374151"
        strokeWidth="2"
        fill="none"
      />
      <text x="130" y="115" fontSize="8" fill="#92400E">
        Ideas
      </text>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F3F4F6" />
      <rect x="30" y="30" width="50" height="35" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <rect x="110" y="40" width="60" height="35" rx="4" fill="#DBEAFE" stroke="#2563EB" />
      <rect x="200" y="25" width="50" height="35" rx="4" fill="#FEE2E2" stroke="#EF4444" />
      <line x1="80" y1="48" x2="110" y2="58" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="170" y1="58" x2="200" y2="42" stroke="#9CA3AF" strokeWidth="1" />
      <rect x="60" y="90" width="160" height="40" rx="8" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="100" y="115" fontSize="10" fill="#6B7280">
        Whiteboard
      </text>
    </svg>
  ),
};

export function BoardThumbnail({ boardId }: { boardId: string }) {
  return (
    <div style={{ height: 160, overflow: 'hidden' }}>
      {THUMBNAILS[boardId] ?? THUMBNAILS.default}
    </div>
  );
}
