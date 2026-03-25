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

  const suggestions = [
    t('ai.summarize'),
    t('ai.generateDiagram'),
    t('ai.organizeLayout'),
    t('ai.createFlowchart'),
  ];

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
        <span className={styles.headerTitle}>{t('ai.title')}</span>
        <button className={styles.closeBtn} onClick={togglePanel}>
          ✕
        </button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            {msg.role === 'assistant' ? <Markdown>{msg.content}</Markdown> : msg.content}
          </div>
        ))}
        {isStreaming && <div className={styles.typing}>{t('ai.thinking')}</div>}
        <div ref={messagesEndRef} />
      </div>
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
          placeholder={t('ai.placeholder')}
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
