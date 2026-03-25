const THUMBNAILS: Record<string, JSX.Element> = {
  '1': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" rx="0" fill="#FAFAFA" />
      <rect
        x="15"
        y="12"
        width="75"
        height="50"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="22" y="32" fontSize="7" fontWeight="600" fill="#92400E">
        User auth
      </text>
      <text x="22" y="44" fontSize="7" fill="#92400E">
        flow
      </text>
      <rect
        x="102"
        y="12"
        width="75"
        height="50"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="109" y="32" fontSize="7" fontWeight="600" fill="#92400E">
        Payment
      </text>
      <text x="109" y="44" fontSize="7" fill="#92400E">
        integration
      </text>
      <rect
        x="190"
        y="12"
        width="75"
        height="50"
        rx="4"
        fill="#DCFCE7"
        stroke="#22C55E"
        strokeWidth="0.8"
      />
      <text x="197" y="32" fontSize="7" fontWeight="600" fill="#166534">
        Dashboard
      </text>
      <text x="197" y="44" fontSize="7" fill="#166534">
        MVP ✅
      </text>
      <rect
        x="15"
        y="78"
        width="120"
        height="55"
        rx="4"
        fill="#DBEAFE"
        stroke="#2563EB"
        strokeWidth="0.8"
      />
      <text x="22" y="98" fontSize="8" fontWeight="600" fill="#1E3A5F">
        Sprint Goal:
      </text>
      <text x="22" y="112" fontSize="7" fill="#1E3A5F">
        Ship checkout by Fri
      </text>
      <rect
        x="148"
        y="78"
        width="120"
        height="55"
        rx="4"
        fill="#FEE2E2"
        stroke="#EF4444"
        strokeWidth="0.8"
      />
      <text x="155" y="98" fontSize="8" fontWeight="600" fill="#991B1B">
        Blocked:
      </text>
      <text x="155" y="112" fontSize="7" fill="#991B1B">
        Waiting on API spec
      </text>
    </svg>
  ),
  '2': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" fill="#FAFAFA" />
      <circle cx="140" cy="55" r="30" fill="#DBEAFE" stroke="#2563EB" strokeWidth="0.8" />
      <text x="140" y="58" fontSize="8" fontWeight="600" fill="#1E3A5F" textAnchor="middle">
        Core Idea
      </text>
      <rect
        x="20"
        y="15"
        width="70"
        height="40"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="27" y="33" fontSize="6" fill="#92400E">
        AI-powered
      </text>
      <text x="27" y="43" fontSize="6" fill="#92400E">
        suggestions
      </text>
      <rect
        x="190"
        y="15"
        width="70"
        height="40"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="197" y="33" fontSize="6" fill="#92400E">
        Real-time
      </text>
      <text x="197" y="43" fontSize="6" fill="#92400E">
        collaboration
      </text>
      <rect
        x="20"
        y="100"
        width="70"
        height="40"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="27" y="118" fontSize="6" fill="#5B21B6">
        Template
      </text>
      <text x="27" y="128" fontSize="6" fill="#5B21B6">
        marketplace
      </text>
      <rect
        x="190"
        y="100"
        width="70"
        height="40"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="197" y="118" fontSize="6" fill="#5B21B6">
        Export to
      </text>
      <text x="197" y="128" fontSize="6" fill="#5B21B6">
        Figma
      </text>
      <line x1="90" y1="35" x2="110" y2="45" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="170" y1="45" x2="190" y2="35" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="90" y1="120" x2="115" y2="80" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="170" y1="80" x2="190" y2="120" stroke="#9CA3AF" strokeWidth="0.8" />
    </svg>
  ),
  '3': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" fill="#FAFAFA" />
      <rect
        x="8"
        y="8"
        width="84"
        height="24"
        rx="3"
        fill="#DCFCE7"
        stroke="#22C55E"
        strokeWidth="0.6"
      />
      <text x="16" y="24" fontSize="7" fontWeight="600" fill="#166534">
        What went well ✅
      </text>
      <rect
        x="98"
        y="8"
        width="84"
        height="24"
        rx="3"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.6"
      />
      <text x="106" y="24" fontSize="7" fontWeight="600" fill="#92400E">
        To improve 🔧
      </text>
      <rect
        x="188"
        y="8"
        width="84"
        height="24"
        rx="3"
        fill="#FEE2E2"
        stroke="#EF4444"
        strokeWidth="0.6"
      />
      <text x="196" y="24" fontSize="7" fontWeight="600" fill="#991B1B">
        Action items 🎯
      </text>
      <rect x="8" y="40" width="84" height="30" rx="3" fill="#BBF7D0" />
      <text x="14" y="58" fontSize="6" fill="#166534">
        Shipped on time
      </text>
      <rect x="8" y="76" width="84" height="30" rx="3" fill="#BBF7D0" />
      <text x="14" y="94" fontSize="6" fill="#166534">
        Good team morale
      </text>
      <rect x="98" y="40" width="84" height="30" rx="3" fill="#FDE68A" />
      <text x="104" y="58" fontSize="6" fill="#92400E">
        Too many meetings
      </text>
      <rect x="188" y="40" width="84" height="30" rx="3" fill="#FECACA" />
      <text x="194" y="58" fontSize="6" fill="#991B1B">
        Reduce standup
      </text>
    </svg>
  ),
  '4': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" fill="#FAFAFA" />
      <rect
        x="95"
        y="8"
        width="90"
        height="28"
        rx="4"
        fill="#DBEAFE"
        stroke="#2563EB"
        strokeWidth="0.8"
      />
      <text x="115" y="26" fontSize="7" fontWeight="600" fill="#1E3A5F">
        API Gateway
      </text>
      <rect
        x="15"
        y="55"
        width="75"
        height="28"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="22" y="73" fontSize="7" fill="#5B21B6">
        Auth Service
      </text>
      <rect
        x="102"
        y="55"
        width="75"
        height="28"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="108" y="73" fontSize="7" fill="#5B21B6">
        Board Service
      </text>
      <rect
        x="190"
        y="55"
        width="75"
        height="28"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="200" y="73" fontSize="7" fill="#5B21B6">
        AI Service
      </text>
      <rect
        x="30"
        y="110"
        width="65"
        height="25"
        rx="4"
        fill="#DCFCE7"
        stroke="#22C55E"
        strokeWidth="0.8"
      />
      <text x="37" y="126" fontSize="7" fill="#166534">
        PostgreSQL
      </text>
      <rect
        x="108"
        y="110"
        width="65"
        height="25"
        rx="4"
        fill="#FEE2E2"
        stroke="#EF4444"
        strokeWidth="0.8"
      />
      <text x="122" y="126" fontSize="7" fill="#991B1B">
        Redis
      </text>
      <rect
        x="186"
        y="110"
        width="65"
        height="25"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="198" y="126" fontSize="7" fill="#92400E">
        Kafka
      </text>
      <line x1="120" y1="36" x2="52" y2="55" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="140" y1="36" x2="140" y2="55" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="160" y1="36" x2="228" y2="55" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="52" y1="83" x2="62" y2="110" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="140" y1="83" x2="140" y2="110" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="228" y1="83" x2="218" y2="110" stroke="#9CA3AF" strokeWidth="0.8" />
    </svg>
  ),
  '5': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" fill="#FAFAFA" />
      <circle cx="25" cy="35" r="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="0.8" />
      <text x="21" y="38" fontSize="8" fill="#1E3A5F">
        👤
      </text>
      <rect
        x="55"
        y="22"
        width="60"
        height="26"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="63" y="39" fontSize="7" fill="#92400E">
        Cart
      </text>
      <rect
        x="128"
        y="22"
        width="60"
        height="26"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="136" y="39" fontSize="7" fill="#92400E">
        Address
      </text>
      <rect
        x="201"
        y="22"
        width="60"
        height="26"
        rx="4"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      <text x="209" y="39" fontSize="7" fill="#92400E">
        Payment
      </text>
      <rect
        x="128"
        y="68"
        width="60"
        height="26"
        rx="4"
        fill="#DCFCE7"
        stroke="#22C55E"
        strokeWidth="0.8"
      />
      <text x="136" y="85" fontSize="7" fontWeight="600" fill="#166534">
        Confirm ✅
      </text>
      <rect
        x="55"
        y="110"
        width="60"
        height="26"
        rx="4"
        fill="#FEE2E2"
        stroke="#EF4444"
        strokeWidth="0.8"
      />
      <text x="63" y="127" fontSize="7" fill="#991B1B">
        Error
      </text>
      <rect
        x="201"
        y="110"
        width="60"
        height="26"
        rx="4"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="0.8"
      />
      <text x="215" y="127" fontSize="7" fill="#5B21B6">
        Retry
      </text>
      <line x1="39" y1="35" x2="55" y2="35" stroke="#374151" strokeWidth="0.8" />
      <line x1="115" y1="35" x2="128" y2="35" stroke="#374151" strokeWidth="0.8" />
      <line x1="188" y1="35" x2="201" y2="35" stroke="#374151" strokeWidth="0.8" />
      <line x1="231" y1="48" x2="180" y2="68" stroke="#374151" strokeWidth="0.8" />
      <line
        x1="128"
        y1="81"
        x2="115"
        y2="110"
        stroke="#9CA3AF"
        strokeWidth="0.8"
        strokeDasharray="3"
      />
      <line
        x1="188"
        y1="81"
        x2="201"
        y2="110"
        stroke="#9CA3AF"
        strokeWidth="0.8"
        strokeDasharray="3"
      />
    </svg>
  ),
  '6': (
    <svg viewBox="0 0 280 160" fill="none">
      <rect width="280" height="160" fill="#FAFAFA" />
      <rect
        x="15"
        y="10"
        width="150"
        height="22"
        rx="4"
        fill="#EFF6FF"
        stroke="#BFDBFE"
        strokeWidth="0.6"
      />
      <text x="22" y="25" fontSize="8" fontWeight="600" fill="#2563EB">
        Design System Tokens
      </text>
      <circle cx="30" cy="55" r="10" fill="#2563EB" />
      <circle cx="55" cy="55" r="10" fill="#3B82F6" />
      <circle cx="80" cy="55" r="10" fill="#60A5FA" />
      <circle cx="105" cy="55" r="10" fill="#93C5FD" />
      <circle cx="130" cy="55" r="10" fill="#BFDBFE" />
      <rect x="170" y="45" width="50" height="20" rx="3" fill="#F3F4F6" />
      <text x="178" y="59" fontSize="7" fill="#6B7280">
        Aa Inter
      </text>
      <rect x="15" y="82" width="60" height="22" rx="4" fill="#2563EB" />
      <text x="25" y="97" fontSize="7" fill="white">
        Primary
      </text>
      <rect
        x="85"
        y="82"
        width="60"
        height="22"
        rx="4"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="0.6"
      />
      <text x="91" y="97" fontSize="7" fill="#374151">
        Secondary
      </text>
      <rect x="155" y="82" width="60" height="22" rx="4" fill="#F3F4F6" />
      <text x="169" y="97" fontSize="7" fill="#6B7280">
        Ghost
      </text>
      <rect x="15" y="118" width="250" height="6" rx="3" fill="#E5E7EB" />
      <rect x="15" y="118" width="170" height="6" rx="3" fill="#2563EB" />
      <text x="15" y="140" fontSize="6" fill="#9CA3AF">
        Aa 16px / 24px / 32px
      </text>
    </svg>
  ),
};

export function BoardThumbnail({ boardId }: { boardId: string }) {
  return (
    <div style={{ height: 160, overflow: 'hidden' }}>{THUMBNAILS[boardId] ?? THUMBNAILS['1']}</div>
  );
}
