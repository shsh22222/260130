import { useState, useEffect } from 'react';

interface JournalEntry {
  id: number;
  thought: string;
  emotion: string;
  intensity: number;
  timestamp: Date;
}

const emotions = [
  { emoji: '😌', label: '穏やか' },
  { emoji: '😊', label: '嬉しい' },
  { emoji: '😔', label: '悲しい' },
  { emoji: '😤', label: '怒り' },
  { emoji: '😰', label: '不安' },
  { emoji: '😩', label: '疲れ' },
  { emoji: '🤔', label: '迷い' },
  { emoji: '😶', label: '無感情' },
];

export function ThoughtJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [thought, setThought] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('thoughtJournal');
    if (saved) {
      setEntries(JSON.parse(saved).map((e: JournalEntry) => ({
        ...e,
        timestamp: new Date(e.timestamp)
      })));
    }
  }, []);

  const saveEntry = () => {
    if (!thought.trim() || !selectedEmotion) return;

    const newEntry: JournalEntry = {
      id: Date.now(),
      thought: thought.trim(),
      emotion: selectedEmotion,
      intensity,
      timestamp: new Date(),
    };

    const updated = [newEntry, ...entries].slice(0, 50);
    setEntries(updated);
    localStorage.setItem('thoughtJournal', JSON.stringify(updated));

    setThought('');
    setSelectedEmotion('');
    setIntensity(5);
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
    <div className="thought-journal">
      <h2>思考の記録</h2>
      <p className="description">今この瞬間の思考と感情を書き留める</p>

      <div className="journal-form">
        <div className="emotion-selector">
          <label>今の感情は？</label>
          <div className="emotion-grid">
            {emotions.map(({ emoji, label }) => (
              <button
                key={label}
                className={`emotion-btn ${selectedEmotion === label ? 'selected' : ''}`}
                onClick={() => setSelectedEmotion(label)}
                title={label}
              >
                <span className="emoji">{emoji}</span>
                <span className="label">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedEmotion && (
          <div className="intensity-slider">
            <label>強さ: {intensity}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
          </div>
        )}

        <div className="thought-input">
          <label>今、何を考えている？</label>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="思考をそのまま書き出してみよう..."
            rows={4}
          />
        </div>

        <button
          className="primary-button"
          onClick={saveEntry}
          disabled={!thought.trim() || !selectedEmotion}
        >
          記録する
        </button>
      </div>

      {entries.length > 0 && (
        <div className="journal-history">
          <button
            className="toggle-history"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '履歴を閉じる' : `過去の記録 (${entries.length}件)`}
          </button>

          {showHistory && (
            <div className="history-list">
              {entries.slice(0, 10).map((entry) => (
                <div key={entry.id} className="history-entry">
                  <div className="entry-header">
                    <span className="entry-emotion">
                      {emotions.find(e => e.label === entry.emotion)?.emoji} {entry.emotion}
                      <span className="entry-intensity">({entry.intensity}/10)</span>
                    </span>
                    <span className="entry-time">{formatTime(entry.timestamp)}</span>
                  </div>
                  <p className="entry-thought">{entry.thought}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
