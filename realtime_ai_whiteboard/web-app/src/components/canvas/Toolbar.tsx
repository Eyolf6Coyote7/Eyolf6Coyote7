import { useState } from 'react';
import type { Tool } from './WhiteboardCanvas';
import styles from './Toolbar.module.css';

interface Props {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const tools: { id: Tool; icon: string; label: string }[] = [
  { id: 'select', icon: '↖', label: 'Select (V)' },
  { id: 'rect', icon: '□', label: 'Rectangle (R)' },
  { id: 'circle', icon: '○', label: 'Circle (C)' },
  { id: 'line', icon: '─', label: 'Line (L)' },
  { id: 'text', icon: 'T', label: 'Text (T)' },
  { id: 'sticky', icon: '📝', label: 'Sticky Note (S)' },
  { id: 'freehand', icon: '✏', label: 'Freehand (P)' },
];

const COLORS = ['#2563EB', '#EF4444', '#22C55E', '#F59E0B', '#8B5CF6', '#374151'];

export function Toolbar({ activeTool, onToolChange }: Props) {
  const [activeColor, setActiveColor] = useState('#2563EB');

  return (
    <div className={styles.toolbar}>
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          className={`${styles.toolBtn} ${activeTool === tool.id ? styles.active : styles.inactive}`}
        >
          {tool.icon}
          <span className={styles.tooltip}>{tool.label}</span>
        </button>
      ))}
      <div className={styles.separator} />
      <div className={styles.colorRow}>
        {COLORS.slice(0, 3).map((color) => (
          <div
            key={color}
            className={`${styles.colorDot} ${activeColor === color ? styles.colorActive : ''}`}
            style={{ background: color }}
            onClick={() => setActiveColor(color)}
          />
        ))}
      </div>
      <div className={styles.colorRow}>
        {COLORS.slice(3).map((color) => (
          <div
            key={color}
            className={`${styles.colorDot} ${activeColor === color ? styles.colorActive : ''}`}
            style={{ background: color }}
            onClick={() => setActiveColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
