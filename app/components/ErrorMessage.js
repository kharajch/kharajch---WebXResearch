'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.errorContainer}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <div className={styles.errorContent}>
          <FiAlertCircle className={styles.errorIcon} />
          <p className={styles.errorText}>{message}</p>
        </div>
        {onDismiss && (
          <button
            className={styles.dismissBtn}
            onClick={onDismiss}
            aria-label="Dismiss error"
            id="error-dismiss"
          >
            <FiX />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
