const THUMBNAILS: Record<string, JSX.Element> = {
  '1': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F0F4FF" />
      <rect x="20" y="15" width="55" height="35" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <rect x="95" y="25" width="55" height="35" rx="4" fill="#DBEAFE" stroke="#2563EB" />
      <rect x="170" y="15" width="55" height="35" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <line x1="75" y1="33" x2="95" y2="43" stroke="#374151" strokeWidth="1.5" />
      <line x1="150" y1="43" x2="170" y2="33" stroke="#374151" strokeWidth="1.5" />
      <rect x="20" y="70" width="100" height="25" rx="4" fill="#DCFCE7" stroke="#22C55E" />
      <rect x="140" y="80" width="100" height="25" rx="4" fill="#FEE2E2" stroke="#EF4444" />
      <text x="35" y="87" fontSize="8" fill="#166534">
        To Do
      </text>
      <text x="155" y="97" fontSize="8" fill="#991B1B">
        Blocked
      </text>
      <rect x="60" y="115" width="160" height="25" rx="12" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="100" y="132" fontSize="9" fill="#2563EB">
        Sprint Board
      </text>
    </svg>
  ),
  '2': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#FFF7ED" />
      <circle cx="60" cy="45" r="22" fill="#DBEAFE" stroke="#2563EB" />
      <circle cx="160" cy="55" r="18" fill="#FEE2E2" stroke="#EF4444" />
      <circle cx="230" cy="35" r="14" fill="#DCFCE7" stroke="#22C55E" />
      <rect x="90" y="90" width="100" height="35" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <path
        d="M40 130 Q80 90 120 120 Q160 150 200 110"
        stroke="#6B7280"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4"
      />
      <text x="55" y="48" fontSize="7" fill="#1E3A5F">
        Idea
      </text>
      <text x="100" y="112" fontSize="8" fill="#92400E">
        Brainstorm
      </text>
    </svg>
  ),
  '3': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F0FDF4" />
      <rect x="20" y="20" width="75" height="55" rx="4" fill="#DCFCE7" stroke="#22C55E" />
      <rect x="105" y="20" width="75" height="55" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <rect x="190" y="20" width="75" height="55" rx="4" fill="#FEE2E2" stroke="#EF4444" />
      <text x="32" y="42" fontSize="7" fill="#166534">
        What went
      </text>
      <text x="32" y="52" fontSize="7" fill="#166534">
        well ✅
      </text>
      <text x="117" y="42" fontSize="7" fill="#92400E">
        To
      </text>
      <text x="117" y="52" fontSize="7" fill="#92400E">
        improve 🔧
      </text>
      <text x="202" y="42" fontSize="7" fill="#991B1B">
        Action
      </text>
      <text x="202" y="52" fontSize="7" fill="#991B1B">
        items 🎯
      </text>
      <rect x="30" y="90" width="55" height="20" rx="3" fill="#BBF7D0" />
      <rect x="115" y="90" width="55" height="20" rx="3" fill="#FDE68A" />
      <rect x="200" y="90" width="55" height="20" rx="3" fill="#FECACA" />
      <rect x="30" y="115" width="55" height="20" rx="3" fill="#BBF7D0" />
      <rect x="115" y="115" width="55" height="20" rx="3" fill="#FDE68A" />
    </svg>
  ),
  '4': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F5F3FF" />
      <rect x="100" y="10" width="80" height="30" rx="4" fill="#DBEAFE" stroke="#2563EB" />
      <rect x="30" y="60" width="70" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" />
      <rect x="180" y="60" width="70" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" />
      <rect x="60" y="110" width="70" height="30" rx="4" fill="#DCFCE7" stroke="#22C55E" />
      <rect x="150" y="110" width="70" height="30" rx="4" fill="#DCFCE7" stroke="#22C55E" />
      <line
        x1="120"
        y1="40"
        x2="65"
        y2="60"
        stroke="#6B7280"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      <line x1="160" y1="40" x2="215" y2="60" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="65" y1="90" x2="95" y2="110" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="215" y1="90" x2="185" y2="110" stroke="#6B7280" strokeWidth="1.5" />
      <text x="115" y="30" fontSize="7" fill="#1E3A5F">
        API GW
      </text>
      <text x="38" y="80" fontSize="7" fill="#5B21B6">
        Service A
      </text>
      <text x="188" y="80" fontSize="7" fill="#5B21B6">
        Service B
      </text>
      <text x="72" y="130" fontSize="7" fill="#166534">
        DB
      </text>
      <text x="162" y="130" fontSize="7" fill="#166534">
        Cache
      </text>
    </svg>
  ),
  '5': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#FFF1F2" />
      <circle cx="40" cy="40" r="15" fill="#DBEAFE" stroke="#2563EB" />
      <rect x="80" y="28" width="60" height="24" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
      <rect x="170" y="28" width="60" height="24" rx="4" fill="#DCFCE7" stroke="#22C55E" />
      <line x1="55" y1="40" x2="80" y2="40" stroke="#374151" strokeWidth="1.5" />
      <line x1="140" y1="40" x2="170" y2="40" stroke="#374151" strokeWidth="1.5" />
      <rect x="80" y="70" width="60" height="24" rx="4" fill="#EDE9FE" stroke="#8B5CF6" />
      <rect x="170" y="70" width="60" height="24" rx="4" fill="#FEE2E2" stroke="#EF4444" />
      <line x1="110" y1="52" x2="110" y2="70" stroke="#374151" strokeWidth="1.5" />
      <line x1="200" y1="52" x2="200" y2="70" stroke="#374151" strokeWidth="1.5" />
      <rect x="120" y="110" width="80" height="28" rx="14" fill="#2563EB" />
      <text x="135" y="128" fontSize="8" fill="white">
        Checkout
      </text>
      <text x="35" y="43" fontSize="6" fill="#1E3A5F">
        👤
      </text>
      <text x="90" y="43" fontSize="7" fill="#92400E">
        Cart
      </text>
      <text x="180" y="43" fontSize="7" fill="#166534">
        Ship
      </text>
      <text x="90" y="85" fontSize="7" fill="#5B21B6">
        Pay
      </text>
      <text x="177" y="85" fontSize="7" fill="#991B1B">
        Review
      </text>
    </svg>
  ),
  '6': (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="160" fill="#F8FAFC" />
      <rect x="20" y="15" width="240" height="25" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="30" y="32" fontSize="9" fill="#2563EB" fontWeight="bold">
        Design Tokens
      </text>
      <circle cx="40" cy="65" r="12" fill="#2563EB" />
      <circle cx="70" cy="65" r="12" fill="#3B82F6" />
      <circle cx="100" cy="65" r="12" fill="#60A5FA" />
      <circle cx="130" cy="65" r="12" fill="#93C5FD" />
      <circle cx="160" cy="65" r="12" fill="#BFDBFE" />
      <rect x="200" y="55" width="60" height="20" rx="4" fill="#F3F4F6" />
      <text x="210" y="69" fontSize="7" fill="#6B7280">
        Aa Inter
      </text>
      <rect x="20" y="95" width="50" height="20" rx="4" fill="#2563EB" />
      <text x="28" y="109" fontSize="7" fill="white">
        Primary
      </text>
      <rect x="80" y="95" width="50" height="20" rx="4" fill="white" stroke="#D1D5DB" />
      <text x="84" y="109" fontSize="7" fill="#374151">
        Secondary
      </text>
      <rect x="140" y="95" width="50" height="20" rx="4" fill="#F3F4F6" />
      <text x="152" y="109" fontSize="7" fill="#6B7280">
        Ghost
      </text>
      <rect x="20" y="130" width="240" height="8" rx="4" fill="#E5E7EB" />
      <rect x="20" y="130" width="160" height="8" rx="4" fill="#2563EB" />
    </svg>
  ),
};

export function BoardThumbnail({ boardId }: { boardId: string }) {
  return (
    <div style={{ height: 160, overflow: 'hidden' }}>{THUMBNAILS[boardId] ?? THUMBNAILS['1']}</div>
  );
}
