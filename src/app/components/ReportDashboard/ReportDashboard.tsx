import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebSocket } from '../../hooks/useWebSocket';
import { ReportSection } from './ReportSection';
import { ProgressIndicator } from './ProgressIndicator';
import { ErrorBoundary } from '../ErrorBoundary';
import { useInView } from 'react-intersection-observer';
import styles from './ReportDashboard.module.css';

interface ReportDashboardProps {
  requestId: string;
  prompt: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  status: 'loading' | 'complete' | 'error';
  progress: number;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ requestId, prompt }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // WebSocket connection for real-time updates
  const { messages, connectionStatus } = useWebSocket(`ws://localhost:3000/ws/${requestId}`);

  // Intersection observer for animations
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleWebSocketMessage = useCallback((message: any) => {
    const updateSection = (sectionData: any) => {
      setSections(prev => {
        const index = prev.findIndex(s => s.id === sectionData.id);
        if (index === -1) {
          return [...prev, sectionData];
        }
        const updated = [...prev];
        updated[index] = { ...updated[index], ...sectionData };
        return updated;
      });
    };

    switch (message.type) {
      case 'section_update':
        updateSection(message.data);
        break;
      case 'progress_update':
        setOverallProgress(message.data.progress);
        break;
      case 'error':
        setError(message.data.error);
        break;
    }
  }, []);

  useEffect(() => {
    if (messages) {
      handleWebSocketMessage(messages);
    }
  }, [messages, handleWebSocketMessage]);

  return (
    <ErrorBoundary>
      <div className={styles.dashboard} ref={dashboardRef}>
        {/* Header with Progress */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Analysis Report</h1>
          <div className={styles.promptDisplay}>
            <h3>Analyzing:</h3>
            <p>{prompt}</p>
          </div>
          <ProgressIndicator progress={overallProgress} status={connectionStatus} />
        </motion.div>

        {/* Sections Container */}
        <div className={styles.sectionsContainer}>
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                ref={sectionRef}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.2 }}
              >
                <ReportSection section={section} isLast={index === sections.length - 1} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading State */}
        {overallProgress < 100 && !error && (
          <motion.div
            className={styles.loadingContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.loadingSpinner} />
            <p>Generating insights...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            className={styles.errorContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry Analysis</button>
          </motion.div>
        )}

        {/* Completion State */}
        {overallProgress === 100 && !error && (
          <motion.div
            className={styles.completionContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Analysis Complete</h3>
            <div className={styles.actionButtons}>
              <button onClick={() => window.print()}>Export PDF</button>
              <button onClick={() => navigator.clipboard.writeText(JSON.stringify(sections))}>
                Copy JSON
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
};
