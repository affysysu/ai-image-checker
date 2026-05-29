'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { detectorHistoryKey, getInitialHistoryForRender, loadStoredHistory } from '@/lib/detection/history';
import type { HistoryItem } from '@/lib/detection/history';
import type { DetectionResult } from '@/lib/detection/types';

type DetectorStatus = 'idle' | 'analyzing' | 'success' | 'error';

export function DetectorShell() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<DetectorStatus>('idle');
  const [dragging, setDragging] = useState(false);
  const [url, setUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(getInitialHistoryForRender);

  useEffect(() => {
    setHistory(loadStoredHistory(window.localStorage));
  }, []);

  const engineState = useMemo(() => {
    if (status !== 'analyzing') {
      return ['queued', 'queued', 'queued', 'queued'];
    }

    return ['done', 'active', 'queued', 'queued'];
  }, [status]);

  async function analyzeFile(file: File) {
    setError(null);
    setResult(null);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus('analyzing');

    const formData = new FormData();
    formData.append('file', file);

    await submit('/api/check', { body: formData });
  }

  async function analyzeUrl() {
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Paste a public HTTPS image URL.');
      setStatus('error');
      return;
    }

    setError(null);
    setResult(null);
    setPreviewUrl(trimmed);
    setStatus('analyzing');

    await submit('/api/check-url', {
      body: JSON.stringify({ url: trimmed }),
      headers: { 'content-type': 'application/json' },
    });
  }

  async function submit(endpoint: string, init: RequestInit) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        ...init,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error?.message ?? 'Image analysis failed.');
      }

      setResult(payload);
      setStatus('success');
      persistHistory(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Image analysis failed.');
      setStatus('error');
    }
  }

  function persistHistory(nextResult: DetectionResult) {
    const nextItem = {
      id: nextResult.id,
      score: nextResult.summary.score,
      verdict: nextResult.summary.verdict,
      createdAt: nextResult.createdAt,
      label: nextResult.summary.label,
    };
    const nextHistory = [nextItem, ...history.filter((item) => item.id !== nextItem.id)].slice(0, 50);
    setHistory(nextHistory);
    window.localStorage.setItem(detectorHistoryKey, JSON.stringify(nextHistory));
  }

  function reset() {
    setStatus('idle');
    setError(null);
    setResult(null);
    setPreviewUrl(null);
    setUrl('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="detector-shell">
      <div
        className={`upload-zone ${dragging ? 'is-dragging' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files[0];
          if (file) {
            void analyzeFile(file);
          }
        }}
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void analyzeFile(file);
            }
          }}
        />
        <div className="upload-icon" aria-hidden="true">
          UP
        </div>
        <h2>Drop your image here</h2>
        <p>JPG, PNG, WebP, or GIF. Max 20MB.</p>
        <div className="format-row">
          <span>JPG</span>
          <span>PNG</span>
          <span>WebP</span>
          <span>GIF</span>
        </div>
      </div>

      <div className="url-row" aria-label="Detect image from URL">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com/image.jpg"
          type="url"
        />
        <button type="button" onClick={() => void analyzeUrl()}>
          Detect URL
        </button>
      </div>

      {status === 'analyzing' ? (
        <section className="processing-panel" aria-live="polite">
          <div className="processing-ring" />
          <div>
            <strong>Analyzing image...</strong>
            <p>Running multi-engine checks with timeout-safe aggregation.</p>
          </div>
          <div className="engine-pills">
            {['Neural Vision', 'Texture AI', 'Pixel Forensics', 'Metadata Scan'].map((engine, index) => (
              <span className={engineState[index]} key={engine}>
                {engine}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {status === 'error' && error ? (
        <div className="error-panel" role="alert">
          {error}
        </div>
      ) : null}

      {result ? (
        <section className="result-layout" aria-label="Detection result">
          <div className="image-preview">
            {previewUrl ? <img src={previewUrl} alt="Analyzed upload preview" /> : null}
            {result.heatmap.available ? (
              <div className="heatmap-placeholder">
                <span>{result.heatmap.message}</span>
              </div>
            ) : null}
          </div>
          <div className={`score-card tone-${result.summary.verdict}`}>
            <p className="eyebrow">AI probability</p>
            <div className="score-main">
              <span>{result.summary.score}</span>
              <strong>{result.summary.label}</strong>
            </div>
            <p>{result.summary.explanation}</p>
            <p className="confidence">Confidence: {result.summary.confidence}</p>
            <div className="engine-results">
              {result.engines.map((engine) => (
                <div className="engine-row" key={engine.engine}>
                  <span>{engine.displayName}</span>
                  <div className="engine-track">
                    <div style={{ width: `${engine.score}%` }} />
                  </div>
                  <strong>{engine.score}%</strong>
                </div>
              ))}
            </div>
            <button className="secondary-button" type="button" onClick={reset}>
              Check another image
            </button>
          </div>
        </section>
      ) : null}

      {history.length > 0 ? (
        <section className="history-panel" aria-label="Recent local history">
          <div className="history-heading">
            <h3>Recent checks</h3>
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                window.localStorage.removeItem(detectorHistoryKey);
              }}
            >
              Clear
            </button>
          </div>
          <div className="history-list">
            {history.slice(0, 5).map((item) => (
              <span key={item.id}>
                {item.score} / {item.label}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
