'use client';

import { useState, useCallback, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Summary, { SummarySkeleton } from './components/Summary';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';

const Scene3D = lazy(() => import('./components/Scene3D'));

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState(null);
  const [chatContext, setChatContext] = useState('');

  /* ── Handle URL Submit ───────────────────────────────────────────────── */
  const handleSubmit = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);
    setSummaryData(null);
    setChatContext('');

    try {
      const response = await fetch(`${API_URL}/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Server returned ${response.status}. Please try again.`
        );
      }

      const data = await response.json();
      setSummaryData(data);

      /* Build context string for chat */
      const context = `Title: ${data.title}\n\nSummary: ${data.summary}\n\nKey Points:\n${data.key_points.map((p) => `- ${p}`).join('\n')}`;
      setChatContext(context);

      /* Save to research history in localStorage */
      try {
        const history = JSON.parse(localStorage.getItem('wxr_research_history') || '[]');
        const session = {
          url,
          title: data.title,
          summary: data.summary,
          key_points: data.key_points,
          topics: data.topics,
          timestamp: Date.now(),
        };
        history.unshift(session);
        /* Keep last 20 sessions */
        localStorage.setItem('wxr_research_history', JSON.stringify(history.slice(0, 20)));
      } catch (storageErr) {
        console.warn('Failed to save to research history:', storageErr);
      }

      /* Scroll to summary */
      setTimeout(() => {
        document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (err) {
      console.error('Research error:', err);

      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Could not connect to the backend server. Make sure the backend is running on port 8000.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ── Handle Load Session from History ────────────────────────────────── */
  const handleLoadSession = useCallback((session) => {
    setSummaryData({
      title: session.title,
      summary: session.summary,
      key_points: session.key_points,
      topics: session.topics,
    });

    const context = `Title: ${session.title}\n\nSummary: ${session.summary}\n\nKey Points:\n${session.key_points.map((p) => `- ${p}`).join('\n')}`;
    setChatContext(context);

    setTimeout(() => {
      document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  /* ── Handle Error ────────────────────────────────────────────────────── */
  const handleError = useCallback((msg) => {
    setError(msg);
  }, []);

  return (
    <main>
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Hero Section */}
      <Hero />

      {/* Search Bar */}
      <SearchBar onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error Message */}
      <div style={{ padding: '0 var(--space-xl)' }}>
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      </div>

      {/* Loading Skeleton */}
      {isLoading && <SummarySkeleton />}

      {/* Summary Results */}
      {summaryData && <Summary data={summaryData} />}

      {/* Chat Box (only show when we have context) */}
      {(summaryData || chatContext) && (
        <ChatBox context={chatContext} onError={handleError} />
      )}

      {/* Research History */}
      <ChatHistory onLoadSession={handleLoadSession} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
