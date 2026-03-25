import { useState, useRef, useEffect } from 'react';
import { useAiStore } from '../../stores/ai.store';
import styles from './AiChatPanel.module.css';

const SUGGESTIONS = ['Summarize', 'Generate diagram', 'Organize layout', 'Create flowchart'];

interface Props {
  boardId: string;
}

export function AiChatPanel({ boardId }: Props) {
  const { messages, isStreaming, isOpen, sendPrompt, togglePanel } = useAiStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    void sendPrompt(boardId, input.trim());
    setInput('');
  };

  const handleChip = (text: string) => {
    if (isStreaming) return;
    void sendPrompt(boardId, text);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>✨ AI Assistant</span>
        <button className={styles.closeBtn} onClick={togglePanel}>
          ✕
        </button>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            {msg.content}
          </div>
        ))}
        {isStreaming && <div className={styles.typing}>AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chips}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            className={styles.chip}
            onClick={() => handleChip(s)}
            disabled={isStreaming}
          >
            {s}
          </button>
        ))}
      </div>

      <div className={styles.inputBar}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI anything..."
          disabled={isStreaming}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
