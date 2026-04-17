'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    let processedUrl = url.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }

    onSubmit(processedUrl);
  };

  return (
    <motion.section
      className={styles.searchSection}
      id="search"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <span className={styles.sectionLabel}>Research Any Webpage</span>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Paste a URL to summarize..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            id="search-input"
            aria-label="Webpage URL"
          />
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading || !url.trim()}
            id="search-submit"
          >
            {isLoading ? (
              <>
                <div className={styles.spinner} />
                Analyzing
              </>
            ) : (
              <>
                Summarize
                <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </form>

      <p className={styles.hint}>
        Try pasting a Wikipedia article, blog post, or research paper URL
      </p>
    </motion.section>
  );
}
