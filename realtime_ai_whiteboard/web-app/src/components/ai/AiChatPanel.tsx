import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import { useAiStore } from '../../stores/ai.store';
import styles from './AiChatPanel.module.css';

interface Props {
  boardId: string;
}

export function AiChatPanel({ boardId }: Props) {
  const { t } = useTranslation();
  const { messages, isStreaming, isOpen, sendPrompt, togglePanel } = useAiStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [t('ai.summarize'), t('ai.generateDiagram'), t('ai.organizeLayout')];

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
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerTitle}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L11 7L17 7L12 11L14 17L9 13L4 17L6 11L1 7L7 7L9 1Z"
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          AI Assistant
        </span>
        <div className={styles.headerControls}>
          <button className={styles.controlBtn} title="Minimize">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
              <line x1="0" y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button className={styles.closeBtn} onClick={togglePanel} title="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            {msg.role === 'assistant' ? <Markdown>{msg.content}</Markdown> : msg.content}
          </div>
        ))}
        {isStreaming && (
          <div className={styles.typing}>
            <div className={styles.typingDots}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
            <span className={styles.typingText}>{t('ai.thinking')}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.chips}>
          {suggestions.map((s) => (
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
            placeholder="Ask AI anything about this board..."
            disabled={isStreaming}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 11.5V1.5M6.5 1.5L1.5 6.5M6.5 1.5L11.5 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
