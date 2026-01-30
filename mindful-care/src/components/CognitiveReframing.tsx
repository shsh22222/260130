import { useState } from 'react';
import { reframingPrompts } from '../data/compassionMessages';

interface ReframingEntry {
  id: number;
  originalThought: string;
  prompt: string;
  reframedThought: string;
  timestamp: Date;
}

export function CognitiveReframing() {
  const [step, setStep] = useState<'input' | 'prompt' | 'reframe' | 'complete'>('input');
  const [originalThought, setOriginalThought] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  const [entries, setEntries] = useState<ReframingEntry[]>(() => {
    const saved = localStorage.getItem('reframingEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * reframingPrompts.length);
    return reframingPrompts[randomIndex];
  };

  const startReframing = () => {
    if (!originalThought.trim()) return;
    setCurrentPrompt(getRandomPrompt());
    setStep('prompt');
  };

  const tryAnotherPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
  };

  const proceedToReframe = () => {
    setStep('reframe');
  };

  const completeReframing = () => {
    if (!reframedThought.trim()) return;

    const newEntry: ReframingEntry = {
      id: Date.now(),
      originalThought: originalThought.trim(),
      prompt: currentPrompt,
      reframedThought: reframedThought.trim(),
      timestamp: new Date(),
    };

    const updated = [newEntry, ...entries].slice(0, 30);
    setEntries(updated);
    localStorage.setItem('reframingEntries', JSON.stringify(updated));

    setStep('complete');
  };

  const reset = () => {
    setOriginalThought('');
    setCurrentPrompt('');
    setReframedThought('');
    setStep('input');
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="cognitive-reframing">
      <h2>認知リフレーミング</h2>
      <p className="description">思考を別の視点から見つめ直す</p>

      <div className="reframing-container">
        {step === 'input' && (
          <div className="reframing-step">
            <label>今、気になっている思考は？</label>
            <textarea
              value={originalThought}
              onChange={(e) => setOriginalThought(e.target.value)}
              placeholder="ネガティブに感じている考えや、引っかかっている思考を書いてみよう..."
              rows={4}
            />
            <button
              className="primary-button"
              onClick={startReframing}
              disabled={!originalThought.trim()}
            >
              リフレーミングを始める
            </button>
          </div>
        )}

        {step === 'prompt' && (
          <div className="reframing-step">
            <div className="original-thought-display">
              <span className="label">あなたの思考:</span>
              <p>{originalThought}</p>
            </div>

            <div className="prompt-card">
              <span className="prompt-icon">💡</span>
              <p className="prompt-text">{currentPrompt}</p>
            </div>

            <div className="prompt-actions">
              <button className="secondary-button" onClick={tryAnotherPrompt}>
                別の問いかけ
              </button>
              <button className="primary-button" onClick={proceedToReframe}>
                この問いで考える
              </button>
            </div>
          </div>
        )}

        {step === 'reframe' && (
          <div className="reframing-step">
            <div className="original-thought-display">
              <span className="label">元の思考:</span>
              <p>{originalThought}</p>
            </div>

            <div className="prompt-reminder">
              <span className="prompt-icon">💡</span>
              <p>{currentPrompt}</p>
            </div>

            <div className="reframe-input">
              <label>新しい視点からの考え:</label>
              <textarea
                value={reframedThought}
                onChange={(e) => setReframedThought(e.target.value)}
                placeholder="問いかけに答えながら、新しい視点で考えを書いてみよう..."
                rows={4}
              />
            </div>

            <button
              className="primary-button"
              onClick={completeReframing}
              disabled={!reframedThought.trim()}
            >
              完了
            </button>
          </div>
        )}

        {step === 'complete' && (
          <div className="reframing-step complete">
            <div className="completion-message">
              <span className="completion-icon">🌟</span>
              <h3>リフレーミング完了</h3>
            </div>

            <div className="comparison">
              <div className="thought-box original">
                <span className="box-label">Before</span>
                <p>{originalThought}</p>
              </div>
              <div className="arrow">↓</div>
              <div className="thought-box reframed">
                <span className="box-label">After</span>
                <p>{reframedThought}</p>
              </div>
            </div>

            <button className="primary-button" onClick={reset}>
              新しいリフレーミング
            </button>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="reframing-history">
          <button
            className="toggle-history"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '履歴を閉じる' : `過去のリフレーミング (${entries.length}件)`}
          </button>

          {showHistory && (
            <div className="history-list">
              {entries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="history-entry">
                  <span className="entry-time">{formatTime(entry.timestamp)}</span>
                  <div className="entry-comparison">
                    <p className="entry-original">{entry.originalThought}</p>
                    <span className="entry-arrow">→</span>
                    <p className="entry-reframed">{entry.reframedThought}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
