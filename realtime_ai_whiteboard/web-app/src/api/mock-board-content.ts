interface MockElement {
  type: 'rect' | 'circle' | 'sticky' | 'text' | 'line';
  left: number;
  top: number;
  width?: number;
  height?: number;
  radius?: number;
  fill: string;
  stroke?: string;
  text?: string;
  fontSize?: number;
  fontColor?: string;
  x2?: number;
  y2?: number;
}

// Canvas: 900 x 600
export const MOCK_BOARD_CONTENT: Record<string, MockElement[]> = {
  // Board 1 — Sprint Planning (centered)
  '1': [
    {
      type: 'sticky',
      left: 230,
      top: 60,
      width: 120,
      height: 65,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Auth flow',
      fontSize: 12,
      fontColor: '#92400E',
    },
    {
      type: 'sticky',
      left: 390,
      top: 60,
      width: 120,
      height: 65,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Payments',
      fontSize: 12,
      fontColor: '#92400E',
    },
    {
      type: 'sticky',
      left: 550,
      top: 60,
      width: 120,
      height: 65,
      fill: '#DCFCE7',
      stroke: '#22C55E',
      text: 'MVP ✅',
      fontSize: 12,
      fontColor: '#166534',
    },
    {
      type: 'rect',
      left: 260,
      top: 180,
      width: 160,
      height: 80,
      fill: '#DBEAFE',
      stroke: '#2563EB',
      text: 'Sprint Goal',
      fontSize: 13,
      fontColor: '#1E3A5F',
    },
    {
      type: 'rect',
      left: 480,
      top: 180,
      width: 160,
      height: 80,
      fill: '#FEE2E2',
      stroke: '#EF4444',
      text: 'Blocked',
      fontSize: 13,
      fontColor: '#991B1B',
    },
  ],

  // Board 2 — Mind Map: Core circle + 4 branches (compact like reference)
  '2': [
    // Center circle (large, centered)
    {
      type: 'circle',
      left: 380,
      top: 130,
      radius: 50,
      fill: '#DBEAFE',
      stroke: '#2563EB',
      text: 'Core Idea',
      fontSize: 13,
      fontColor: '#1E3A5F',
    },
    // Top-left: AI assist (close to circle)
    {
      type: 'sticky',
      left: 180,
      top: 50,
      width: 120,
      height: 60,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'AI assist',
      fontSize: 11,
      fontColor: '#92400E',
    },
    // Top-right: Realtime
    {
      type: 'sticky',
      left: 500,
      top: 50,
      width: 120,
      height: 60,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Realtime',
      fontSize: 11,
      fontColor: '#92400E',
    },
    // Bottom-left: Templates
    {
      type: 'sticky',
      left: 180,
      top: 250,
      width: 120,
      height: 60,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'Templates',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    // Bottom-right: Export
    {
      type: 'sticky',
      left: 500,
      top: 250,
      width: 120,
      height: 60,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'Export',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    // Title
    {
      type: 'text',
      left: 340,
      top: 370,
      width: 200,
      height: 20,
      fill: 'transparent',
      text: '🧠 Brainstorm',
      fontSize: 14,
      fontColor: '#374151',
    },
    // Lines: circle edge → sticky nearest corner
    // Core(380,130) r=50. Edge points: TL(345,95), TR(415,95), BL(345,170), BR(415,170)
    // AI assist bottom-right corner: (300, 110)
    { type: 'line', left: 345, top: 100, x2: 300, y2: 110, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Realtime bottom-left corner: (500, 110)
    { type: 'line', left: 415, top: 100, x2: 500, y2: 110, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Templates top-right corner: (300, 250)
    { type: 'line', left: 345, top: 165, x2: 300, y2: 250, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Export top-left corner: (500, 250)
    { type: 'line', left: 415, top: 165, x2: 500, y2: 250, fill: '#9CA3AF', stroke: '#9CA3AF' },
  ],

  // Board 3 — Retro (centered)
  '3': [
    {
      type: 'rect',
      left: 200,
      top: 50,
      width: 150,
      height: 40,
      fill: '#DCFCE7',
      stroke: '#22C55E',
      text: 'Went well ✅',
      fontSize: 11,
      fontColor: '#166534',
    },
    {
      type: 'rect',
      left: 380,
      top: 50,
      width: 150,
      height: 40,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Improve 🔧',
      fontSize: 11,
      fontColor: '#92400E',
    },
    {
      type: 'rect',
      left: 560,
      top: 50,
      width: 150,
      height: 40,
      fill: '#FEE2E2',
      stroke: '#EF4444',
      text: 'Actions 🎯',
      fontSize: 11,
      fontColor: '#991B1B',
    },
    {
      type: 'sticky',
      left: 200,
      top: 120,
      width: 150,
      height: 50,
      fill: '#BBF7D0',
      text: 'Shipped on time',
      fontSize: 11,
      fontColor: '#166534',
    },
    {
      type: 'sticky',
      left: 200,
      top: 190,
      width: 150,
      height: 50,
      fill: '#BBF7D0',
      text: 'Good morale',
      fontSize: 11,
      fontColor: '#166534',
    },
    {
      type: 'sticky',
      left: 380,
      top: 120,
      width: 150,
      height: 50,
      fill: '#FDE68A',
      text: 'Many meetings',
      fontSize: 11,
      fontColor: '#92400E',
    },
    {
      type: 'sticky',
      left: 560,
      top: 120,
      width: 150,
      height: 50,
      fill: '#FECACA',
      text: 'Shorter standup',
      fontSize: 11,
      fontColor: '#991B1B',
    },
  ],

  // Board 4 — Architecture: Gateway → Services → Databases
  // Compact layout: center=400, cols at 200, 400, 600. Box w=110.
  '4': [
    // Row 1: API Gateway
    {
      type: 'rect',
      left: 330,
      top: 40,
      width: 140,
      height: 45,
      fill: '#DBEAFE',
      stroke: '#2563EB',
      text: 'API Gateway',
      fontSize: 12,
      fontColor: '#1E3A5F',
    },
    // Row 2: Services
    {
      type: 'rect',
      left: 145,
      top: 160,
      width: 110,
      height: 45,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'Auth',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    {
      type: 'rect',
      left: 345,
      top: 160,
      width: 110,
      height: 45,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'Board Svc',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    {
      type: 'rect',
      left: 545,
      top: 160,
      width: 110,
      height: 45,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'AI Svc',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    // Row 3: Databases
    {
      type: 'rect',
      left: 145,
      top: 280,
      width: 110,
      height: 45,
      fill: '#DCFCE7',
      stroke: '#22C55E',
      text: 'PostgreSQL',
      fontSize: 10,
      fontColor: '#166534',
    },
    {
      type: 'rect',
      left: 345,
      top: 280,
      width: 110,
      height: 45,
      fill: '#FEE2E2',
      stroke: '#EF4444',
      text: 'Redis',
      fontSize: 10,
      fontColor: '#991B1B',
    },
    {
      type: 'rect',
      left: 545,
      top: 280,
      width: 110,
      height: 45,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Kafka',
      fontSize: 10,
      fontColor: '#92400E',
    },
    // Fan-out: Gateway bottom edge → each service top-center
    // Gateway: left=330, w=140 → left-third=370, center=400, right-third=430
    // Auth center: 200, Board Svc center: 400, AI Svc center: 600
    { type: 'line', left: 370, top: 85, x2: 200, y2: 160, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 400, top: 85, x2: 400, y2: 160, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 430, top: 85, x2: 600, y2: 160, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Service bottom → DB top (vertical)
    { type: 'line', left: 200, top: 205, x2: 200, y2: 280, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 400, top: 205, x2: 400, y2: 280, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 600, top: 205, x2: 600, y2: 280, fill: '#9CA3AF', stroke: '#9CA3AF' },
  ],

  // Board 5 — Checkout Flow: Person → Cart → Address → Payment → Confirm, Error/Retry
  '5': [
    // Row 1: Person → Cart → Address → Payment
    {
      type: 'circle',
      left: 110,
      top: 85,
      radius: 20,
      fill: '#DBEAFE',
      stroke: '#2563EB',
      text: '👤',
      fontSize: 14,
      fontColor: '#1E3A5F',
    },
    {
      type: 'rect',
      left: 180,
      top: 70,
      width: 120,
      height: 45,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Cart',
      fontSize: 11,
      fontColor: '#92400E',
    },
    {
      type: 'rect',
      left: 350,
      top: 70,
      width: 120,
      height: 45,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Address',
      fontSize: 11,
      fontColor: '#92400E',
    },
    {
      type: 'rect',
      left: 520,
      top: 70,
      width: 120,
      height: 45,
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      text: 'Payment',
      fontSize: 11,
      fontColor: '#92400E',
    },
    // Row 2: Confirm (centered below between Address & Payment)
    {
      type: 'rect',
      left: 380,
      top: 180,
      width: 120,
      height: 45,
      fill: '#DCFCE7',
      stroke: '#22C55E',
      text: 'Confirm ✅',
      fontSize: 11,
      fontColor: '#166534',
    },
    // Row 3: Error & Retry
    {
      type: 'rect',
      left: 260,
      top: 290,
      width: 110,
      height: 42,
      fill: '#FEE2E2',
      stroke: '#EF4444',
      text: 'Error',
      fontSize: 11,
      fontColor: '#991B1B',
    },
    {
      type: 'rect',
      left: 510,
      top: 290,
      width: 110,
      height: 42,
      fill: '#EDE9FE',
      stroke: '#8B5CF6',
      text: 'Retry',
      fontSize: 11,
      fontColor: '#5B21B6',
    },
    // Title
    {
      type: 'text',
      left: 350,
      top: 380,
      width: 200,
      height: 20,
      fill: 'transparent',
      text: 'Checkout Flow',
      fontSize: 14,
      fontColor: '#374151',
    },
    // Horizontal flow: Person→Cart→Address→Payment (edge to edge)
    { type: 'line', left: 138, top: 92, x2: 180, y2: 92, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 300, top: 92, x2: 350, y2: 92, fill: '#9CA3AF', stroke: '#9CA3AF' },
    { type: 'line', left: 470, top: 92, x2: 520, y2: 92, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Payment bottom → Confirm top
    { type: 'line', left: 580, top: 115, x2: 440, y2: 180, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Confirm bottom-left → Error top
    { type: 'line', left: 410, top: 225, x2: 315, y2: 290, fill: '#9CA3AF', stroke: '#9CA3AF' },
    // Confirm bottom-right → Retry top
    { type: 'line', left: 470, top: 225, x2: 565, y2: 290, fill: '#9CA3AF', stroke: '#9CA3AF' },
  ],

  // Board 6 — Design Tokens (centered on 900px canvas)
  '6': [
    {
      type: 'rect',
      left: 310,
      top: 50,
      width: 280,
      height: 45,
      fill: '#EFF6FF',
      stroke: '#BFDBFE',
      text: 'Design Tokens',
      fontSize: 14,
      fontColor: '#2563EB',
    },
    // Color circles (centered row)
    { type: 'circle', left: 330, top: 150, radius: 14, fill: '#1D4ED8', stroke: '#1E40AF' },
    { type: 'circle', left: 380, top: 150, radius: 14, fill: '#2563EB', stroke: '#1D4ED8' },
    { type: 'circle', left: 430, top: 150, radius: 14, fill: '#3B82F6', stroke: '#2563EB' },
    { type: 'circle', left: 480, top: 150, radius: 14, fill: '#60A5FA', stroke: '#3B82F6' },
    { type: 'circle', left: 530, top: 150, radius: 14, fill: '#93C5FD', stroke: '#60A5FA' },
    { type: 'circle', left: 580, top: 150, radius: 14, fill: '#BFDBFE', stroke: '#93C5FD' },
    // Button row (centered)
    {
      type: 'rect',
      left: 250,
      top: 230,
      width: 120,
      height: 42,
      fill: '#2563EB',
      stroke: '#1D4ED8',
      text: 'Primary',
      fontSize: 11,
      fontColor: '#FFFFFF',
    },
    {
      type: 'rect',
      left: 400,
      top: 230,
      width: 120,
      height: 42,
      fill: '#FFFFFF',
      stroke: '#D1D5DB',
      text: 'Secondary',
      fontSize: 11,
      fontColor: '#374151',
    },
    {
      type: 'rect',
      left: 550,
      top: 230,
      width: 120,
      height: 42,
      fill: '#F3F4F6',
      stroke: '#E5E7EB',
      text: 'Ghost',
      fontSize: 11,
      fontColor: '#6B7280',
    },
    // Typography (centered)
    {
      type: 'text',
      left: 320,
      top: 320,
      width: 280,
      height: 20,
      fill: 'transparent',
      text: 'Aa Inter — 16 / 24 / 32',
      fontSize: 13,
      fontColor: '#9CA3AF',
    },
  ],
};

export function getMockContent(boardId: string): MockElement[] {
  return MOCK_BOARD_CONTENT[boardId] ?? MOCK_BOARD_CONTENT['1'];
}
