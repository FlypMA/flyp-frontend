import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressIndicator.module.css';

interface ProgressIndicatorProps {
  progress: number;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return '#4CAF50';
      case 'connecting':
        return '#FFC107';
      case 'disconnected':
      case 'error':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={styles.statusContainer}>
        <div className={styles.statusIndicator} style={{ backgroundColor: getStatusColor() }}>
          <motion.div
            animate={
              status === 'connecting'
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>
        <span className={styles.statusText}>
          {progress}% - {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};
