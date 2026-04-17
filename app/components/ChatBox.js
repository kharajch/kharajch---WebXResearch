'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import styles from './ChatBox.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ChatBox({ context, onError }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* ── Load from localStorage ──────────────────────────────────────────── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wxr_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch (err) {
      console.warn('Failed to load chat history from localStorage:', err);
    }
  }, []);

  /* ── Save to localStorage ────────────────────────────────────────────── */
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem('wxr_chat_messages', JSON.stringify(messages));
      }
    } catch (err) {
      console.warn('Failed to save chat history to localStorage:', err);
      if (onError) {
        onError('Could not save chat history to local storage.');
      }
    }
  }, [messages, onError]);

  /* ── Auto scroll ─────────────────────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* ── Send Message ────────────────────────────────────────────────────── */
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.content,
          context: context || '',
          history: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
      if (onError) {
        onError(`Chat failed: ${err.message}`);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className={styles.chatSection} id="chat">
      <div className={styles.chatLabel}>
        <FiMessageSquare className={styles.chatLabelIcon} />
        Ask Follow-up Questions
      </div>

      {/* Messages */}
      <div className={styles.messagesContainer} id="chat-messages">
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>💬</span>
            <p className={styles.emptyText}>
              Ask any question about the research topic
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`${styles.message} ${
                  msg.role === 'user' ? styles.messageUser : styles.messageAi
                }`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.messageAvatar}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={styles.messageBubble}>{msg.content}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className={`${styles.message} ${styles.messageAi}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.messageAvatar}>AI</div>
            <div className={`${styles.messageBubble} ${styles.typingIndicator}`}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.chatInputWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.chatInput}
          placeholder="Ask a question about this research..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping || !context}
          id="chat-input"
          aria-label="Chat message"
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={isTyping || !input.trim() || !context}
          id="chat-send"
          aria-label="Send message"
        >
          <FiSend size={16} />
        </button>
      </div>
    </section>
  );
}
