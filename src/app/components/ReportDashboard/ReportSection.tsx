import React from 'react';
import { motion } from 'framer-motion';
import styles from './ReportSection.module.css';

interface SectionProps {
  section: {
    id: string;
    title: string;
    content: string;
    status: 'loading' | 'complete' | 'error';
    progress: number;
  };
  isLast: boolean;
}

export const ReportSection: React.FC<SectionProps> = ({ section, isLast }) => {
  return (
    <motion.div
      className={`${styles.section} ${!isLast ? styles.withDivider : ''}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.sectionHeader}>
        <h2>{section.title}</h2>
        {section.status === 'loading' && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${section.progress}%` }} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        {section.status === 'loading' ? (
          <div className={styles.placeholder}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={styles.shimmer}
            />
          </div>
        ) : section.status === 'error' ? (
          <div className={styles.error}>
            <p>Error loading section</p>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        )}
      </div>
    </motion.div>
  );
};
