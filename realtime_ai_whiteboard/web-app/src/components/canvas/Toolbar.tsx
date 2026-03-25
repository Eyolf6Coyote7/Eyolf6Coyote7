import type { Tool } from './WhiteboardCanvas';
import styles from './Toolbar.module.css';

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
    <div className={styles.toolbar}>
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          title={tool.label}
          className={`${styles.toolBtn} ${activeTool === tool.id ? styles.active : styles.inactive}`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}
