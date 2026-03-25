import type { Tool } from './WhiteboardCanvas';

interface Props {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const tools: { id: Tool; icon: string; label: string }[] = [
  { id: 'select', icon: '↖', label: 'Select' },
  { id: 'rect', icon: '□', label: 'Rectangle' },
  { id: 'circle', icon: '○', label: 'Circle' },
  { id: 'line', icon: '─', label: 'Line' },
  { id: 'text', icon: 'T', label: 'Text' },
  { id: 'sticky', icon: '📝', label: 'Sticky Note' },
  { id: 'freehand', icon: '✏', label: 'Freehand' },
];

export function Toolbar({ activeTool, onToolChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 8,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(12px)',
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      width: 48,
    }}>
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          title={tool.label}
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 18,
            background: activeTool === tool.id ? '#2563EB' : 'transparent',
            color: activeTool === tool.id ? 'white' : '#374151',
          }}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}
