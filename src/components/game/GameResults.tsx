import React from 'react';
import './GameResults.css';

interface Player {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

interface GameResultsProps {
  players: Player[];
  gameType: string;
  onPlayAgain?: () => void;
  onBackToMenu?: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ 
  players, 
  gameType, 
  onPlayAgain, 
  onBackToMenu 
}) => {
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  const handlePlayAgain = () => {
    if (onPlayAgain) {
      onPlayAgain();
    }
  };
  
  const handleBackToMenu = () => {
    if (onBackToMenu) {
      onBackToMenu();
    }
  };
  
  const getMedalEmoji = (index: number): string => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  };
  
  return (
    <div className="game-results-container">
      <div className="results-header">
        <h1>🎉 Game Results 🎉</h1>
        <p className="game-type">{gameType}</p>
      </div>
      
      <div className="results-list">
        {sortedPlayers.map((player, index) => (
          <div 
            key={player.id} 
            className={`player-result ${index === 0 ? 'winner' : ''}`}
          >
            <div className="rank">
              <span className="medal">{getMedalEmoji(index)}</span>
              <span className="position">#{index + 1}</span>
            </div>
            
            <div className="player-info">
              {player.avatar && (
                <img 
                  src={player.avatar} 
                  alt={`${player.name}'s avatar`}
                  className="player-avatar"
                />
              )}
              <span className="player-name">{player.name}</span>
            </div>
            
            <div className="player-score">
              <span className="score-value">{player.score}</span>
              <span className="score-label">points</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="results-actions">
        <button 
          onClick={handlePlayAgain}
          className="btn btn-primary"
        >
          🎮 Play Again
        </button>
        <button 
          onClick={handleBackToMenu}
          className="btn btn-secondary"
        >
          🏠 Back to Menu
        </button>
      </div>
    </div>
  );
};

export default GameResults;