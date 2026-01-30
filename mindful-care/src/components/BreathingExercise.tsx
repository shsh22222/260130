import { useState, useEffect, useCallback } from 'react';

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest';

const phaseConfig = {
  inhale: { duration: 4000, label: '吸う', next: 'hold' as BreathPhase },
  hold: { duration: 4000, label: '止める', next: 'exhale' as BreathPhase },
  exhale: { duration: 4000, label: '吐く', next: 'rest' as BreathPhase },
  rest: { duration: 2000, label: '休む', next: 'inhale' as BreathPhase },
};

export function BreathingExercise() {
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [cycles, setCycles] = useState(0);
  const [progress, setProgress] = useState(0);

  const start = useCallback(() => {
    setPhase('inhale');
    setCycles(0);
    setProgress(0);
  }, []);

  const stop = useCallback(() => {
    setPhase('idle');
    setProgress(0);
  }, []);

  useEffect(() => {
    if (phase === 'idle') return;

    const config = phaseConfig[phase];
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / config.duration, 1));
    }, 50);

    const timer = setTimeout(() => {
      if (phase === 'rest') {
        setCycles(c => c + 1);
      }
      setPhase(config.next);
      setProgress(0);
    }, config.duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [phase]);

  const getCircleStyle = () => {
    if (phase === 'idle') return { transform: 'scale(1)' };
    if (phase === 'inhale') return { transform: `scale(${1 + progress * 0.5})` };
    if (phase === 'hold') return { transform: 'scale(1.5)' };
    if (phase === 'exhale') return { transform: `scale(${1.5 - progress * 0.5})` };
    return { transform: 'scale(1)' };
  };

  return (
    <div className="breathing-exercise">
      <h2>瞬間呼吸</h2>
      <p className="description">4-4-4呼吸法で、今この瞬間に戻る</p>

      <div className="breath-container">
        <div
          className={`breath-circle ${phase !== 'idle' ? 'active' : ''}`}
          style={getCircleStyle()}
        >
          {phase === 'idle' ? (
            <span className="circle-text">始める</span>
          ) : (
            <span className="circle-text">{phaseConfig[phase].label}</span>
          )}
        </div>
      </div>

      {phase !== 'idle' && (
        <div className="breath-info">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="cycles">サイクル: {cycles}</p>
        </div>
      )}

      <div className="breath-controls">
        {phase === 'idle' ? (
          <button className="primary-button" onClick={start}>
            呼吸を始める
          </button>
        ) : (
          <button className="secondary-button" onClick={stop}>
            終了
          </button>
        )}
      </div>
    </div>
  );
}
