'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    /* GSAP entrance animations */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2 }
    );

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.6'
    );
  }, []);

  return (
    <section className={styles.heroWrapper} id="hero">
      {/* Background Orbs */}
      <div className={`${styles.bgOrb} ${styles.bgOrb1}`} />
      <div className={`${styles.bgOrb} ${styles.bgOrb2}`} />
      <div className={`${styles.bgOrb} ${styles.bgOrb3}`} />

      {/* Logo */}
      <motion.div
        ref={logoRef}
        className={styles.logoContainer}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className={styles.logoGlow} />
        <Image
          src="/logo.png"
          alt="kharajch---WebXResearch Logo"
          width={100}
          height={100}
          className={styles.logo}
          priority
        />
      </motion.div>

      {/* Title */}
      <div className={styles.titleWrapper} ref={titleRef}>
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>kharajch---WebXResearch</span>
        </h1>
      </div>

      {/* Subtitle */}
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        AI-powered web research summarizer. Paste any URL and get instant,
        comprehensive summaries with key insights — powered by Google Gemini.
      </motion.p>

      {/* Stats */}
      <motion.div
        className={styles.statsBar}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className={styles.stat}>
          <span className={styles.statValue}>⚡</span>
          <span className={styles.statLabel}>Instant</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>🧠</span>
          <span className={styles.statLabel}>AI-Powered</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>📊</span>
          <span className={styles.statLabel}>Key Insights</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>💬</span>
          <span className={styles.statLabel}>Chat</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
