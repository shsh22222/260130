import { useState, useCallback } from 'react';
import { compassionMessages } from '../data/compassionMessages';

export function SelfCompassion() {
  const [message, setMessage] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * compassionMessages.length);
    setMessage(compassionMessages[randomIndex]);
    setIsRevealed(true);
  }, []);

  const toggleFavorite = useCallback(() => {
    if (!message) return;

    const updated = favorites.includes(message)
      ? favorites.filter(m => m !== message)
      : [...favorites, message];

    setFavorites(updated);
    localStorage.setItem('favoriteMessages', JSON.stringify(updated));
  }, [message, favorites]);

  const reset = useCallback(() => {
    setMessage('');
    setIsRevealed(false);
  }, []);

  return (
    <div className="self-compassion">
      <h2>セルフコンパッション</h2>
      <p className="description">自分への優しい言葉を受け取る</p>

      <div className="compassion-card-container">
        <div className={`compassion-card ${isRevealed ? 'revealed' : ''}`}>
          {isRevealed ? (
            <div className="card-content">
              <p className="compassion-message">{message}</p>
              <button
                className={`favorite-btn ${favorites.includes(message) ? 'favorited' : ''}`}
                onClick={toggleFavorite}
                title={favorites.includes(message) ? 'お気に入りから外す' : 'お気に入りに追加'}
              >
                {favorites.includes(message) ? '★' : '☆'}
              </button>
            </div>
          ) : (
            <div className="card-placeholder">
              <span className="card-icon">💝</span>
              <span>タップしてメッセージを受け取る</span>
            </div>
          )}
        </div>
      </div>

      <div className="compassion-controls">
        {isRevealed ? (
          <>
            <button className="primary-button" onClick={getRandomMessage}>
              次のメッセージ
            </button>
            <button className="secondary-button" onClick={reset}>
              閉じる
            </button>
          </>
        ) : (
          <button className="primary-button" onClick={getRandomMessage}>
            メッセージを受け取る
          </button>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="favorites-section">
          <button
            className="toggle-favorites"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'お気に入りを閉じる' : `お気に入り (${favorites.length}件)`}
          </button>

          {showFavorites && (
            <div className="favorites-list">
              {favorites.map((fav, index) => (
                <div key={index} className="favorite-item">
                  <p>{fav}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
