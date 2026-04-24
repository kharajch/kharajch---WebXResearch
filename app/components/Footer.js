'use client';

import Image from 'next/image';
import { FiZap } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className={styles.footerLogo}
          />
          <span className={styles.footerName}>kharajch---WebXResearch</span>
        </div>

        <div className={styles.footerMeta}>
          <span className={styles.footerText}>© {year}</span>
          <div className={styles.footerDivider} />
          <div className={styles.footerPowered}>
            <FiZap className={styles.footerPoweredIcon} />
            Powered by Nvidia NIM
          </div>
        </div>
      </div>
    </footer>
  );
}
