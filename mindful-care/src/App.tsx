import { useState } from 'react';
import { BreathingExercise } from './components/BreathingExercise';
import { ThoughtJournal } from './components/ThoughtJournal';
import { SelfCompassion } from './components/SelfCompassion';
import { CognitiveReframing } from './components/CognitiveReframing';
import './App.css';

type Tab = 'breathing' | 'journal' | 'compassion' | 'reframing';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'breathing', label: '呼吸', icon: '🌬️' },
  { id: 'journal', label: '記録', icon: '📝' },
  { id: 'compassion', label: '愛', icon: '💝' },
  { id: 'reframing', label: '視点', icon: '🔄' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('breathing');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mindful Care</h1>
        <p className="tagline">今この瞬間の、あなたのために</p>
      </header>

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'breathing' && <BreathingExercise />}
        {activeTab === 'journal' && <ThoughtJournal />}
        {activeTab === 'compassion' && <SelfCompassion />}
        {activeTab === 'reframing' && <CognitiveReframing />}
      </main>

      <footer className="app-footer">
        <p>自分を大切に。今この瞬間から。</p>
      </footer>
    </div>
  );
}

export default App;
