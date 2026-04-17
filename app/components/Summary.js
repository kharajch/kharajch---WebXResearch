'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiKey, FiCopy, FiCheck } from 'react-icons/fi';
import styles from './Summary.module.css';

/* ── Loading Skeleton ───────────────────────────────────────────────────── */
export function SummarySkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.skeletonTitle} shimmer`} />
      <div className={styles.skeletonTags}>
        <div className={`${styles.skeletonTag} shimmer`} />
        <div className={`${styles.skeletonTag} shimmer`} />
        <div className={`${styles.skeletonTag} shimmer`} />
      </div>
      <div className={`${styles.skeletonCard} shimmer`}>
        <div className={`${styles.skeletonLine} shimmer`} />
        <div className={`${styles.skeletonLine} shimmer`} />
        <div className={`${styles.skeletonLine} shimmer`} />
        <div className={`${styles.skeletonLine} shimmer`} />
      </div>
    </div>
  );
}

/* ── Stagger Animation Variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Summary Component ──────────────────────────────────────────────────── */
export default function Summary({ data }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = async () => {
    const text = `${data.title}\n\n${data.summary}\n\nKey Points:\n${data.key_points.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.section
      className={styles.summarySection}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="summary"
    >
      {/* Header */}
      <motion.div className={styles.summaryHeader} variants={itemVariants}>
        <h2 className={styles.summaryTitle}>{data.title}</h2>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          id="copy-summary"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </motion.div>

      {/* Topic Tags */}
      <motion.div className={styles.topicTags} variants={itemVariants}>
        {data.topics.map((topic, i) => (
          <span key={i} className={styles.topicTag}>
            {topic}
          </span>
        ))}
      </motion.div>

      {/* Summary Card */}
      <motion.div className={styles.summaryCard} variants={itemVariants}>
        <div className={styles.cardLabel}>
          <FiFileText className={styles.cardLabelIcon} />
          Summary
        </div>
        <p className={styles.summaryText}>{data.summary}</p>
      </motion.div>

      {/* Key Points */}
      <motion.div variants={itemVariants}>
        <div className={styles.cardLabel} style={{ marginBottom: 'var(--space-lg)' }}>
          <FiKey className={styles.cardLabelIcon} />
          Key Points
        </div>
      </motion.div>

      <motion.div className={styles.keyPointsGrid} variants={containerVariants}>
        {data.key_points.map((point, i) => (
          <motion.div
            key={i}
            className={styles.keyPoint}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.keyPointNumber}>{i + 1}</span>
            <p className={styles.keyPointText}>{point}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
