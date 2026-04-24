'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiTrash2, FiGlobe } from 'react-icons/fi';
import styles from './ChatHistory.module.css';

export default function ChatHistory({ onLoadSession }) {
  const [sessions, setSessions] = useState([]);

  /* --- Load sessions from localStorage ----------------------------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wxr_research_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSessions(parsed);
      }
    } catch (err) {
      console.warn('Failed to load research history:', err);
    }
  }, []);

  /* --- Clear history ----------------------------------------------------- */
  const handleClear = () => {
    try {
      localStorage.removeItem('wxr_research_history');
      localStorage.removeItem('wxr_chat_messages');
      setSessions([]);
    } catch (err) {
      console.warn('Failed to clear history:', err);
    }
  };

  if (sessions.length === 0) return null;

  return (
    <section className={styles.historySection} id="history">
      <div className={styles.historyHeader}>
        <h2 className={styles.historyLabel}>
          <FiClock className={styles.historyLabelIcon} />
          Research History
        </h2>
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          id="clear-history"
        >
          <FiTrash2 size={12} />
          Clear
        </button>
      </div>

      <div className={styles.historyList}>
        <AnimatePresence>
          {sessions.map((session, i) => (
            <motion.div
              key={session.timestamp || i}
              className={styles.historyItem}
              onClick={() => onLoadSession && onLoadSession(session)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <FiGlobe className={styles.historyItemIcon} />
              <div className={styles.historyItemContent}>
                <div className={styles.historyItemTitle}>
                  {session.title || session.url || 'Untitled Research'}
                </div>
                <div className={styles.historyItemMeta}>
                  {session.timestamp
                    ? new Date(session.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
