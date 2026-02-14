import React, { useState } from 'react';

interface Meme {
  id: string;
  imageUrl: string;
  caption: string;
  player: string;
}

interface MemeBattleRoundProps {
  onComplete?: (score: number) => void;
}

const MemeBattleRound: React.FC<MemeBattleRoundProps> = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Sample memes (you can replace with real meme API or user uploads)
  const memes: Meme[] = [
    {
      id: '1',
      imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
      caption: 'When you realize it\'s Monday',
      player: 'Player 1'
    },
    {
      id: '2',
      imageUrl: 'https://i.imgflip.com/1bij.jpg',
      caption: 'Me trying to adult',
      player: 'Player 2'
    },
    {
      id: '3',
      imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
      caption: 'When the code finally works',
      player: 'Player 3'
    }
  ];

  const currentMeme = memes[currentMemeIndex];

  const handleStart = () => {
    setStarted(true);
  };

  const handleVote = (rating: 'funny' | 'okay' | 'notfunny') => {
    // Save vote
    setVotes(prev => ({
      ...prev,
      [currentMeme.id]: rating
    }));

    // Move to next meme or show results
    if (currentMemeIndex < memes.length - 1) {
      setCurrentMemeIndex(currentMemeIndex + 1);
    } else {
      setShowResults(true);
      const score = Object.keys(votes).length * 75;
      setTimeout(() => {
        if (onComplete) {
          onComplete(score);
        }
      }, 2000);
    }
  };

  // Show results
  if (showResults) {
    return (
      <div className="meme-battle-round">
        <div className="round-header">
          <h1>Meme Battle Complete!</h1>
        </div>
        <div className="round-content">
          <p>You voted on {Object.keys(votes).length} memes!</p>
          <p>Calculating scores...</p>
        </div>
      </div>
    );
  }

  // Show voting interface
  if (started) {
    return (
      <div className="meme-battle-round">
        <div className="round-header">
          <h1>Meme Battle Round</h1>
          <p>Meme {currentMemeIndex + 1} of {memes.length}</p>
        </div>
        
        <div className="round-content">
          <div className="meme-display">
            <img src={currentMeme.imageUrl} alt="Meme" />
            <p className="meme-caption">{currentMeme.caption}</p>
            <p className="meme-player">by {currentMeme.player}</p>
          </div>

          <div className="vote-buttons">
            <button onClick={() => handleVote('funny')} className="vote-funny">
              😂 Hilarious
            </button>
            <button onClick={() => handleVote('okay')} className="vote-okay">
              😊 Okay
            </button>
            <button onClick={() => handleVote('notfunny')} className="vote-notfunny">
              😐 Not Funny
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show intro screen (your existing UI)
  return (
    <div className="meme-battle-round">
      <div className="round-header">
        <h1>Meme Battle Round</h1>
        <p>Battle with the funniest memes!</p>
      </div>
      
      <div className="round-content">
        <p>Vote on memes and see who has the best sense of humor!</p>
        <button onClick={handleStart}>Start Battle</button>
      </div>
    </div>
  );
};

export default MemeBattleRound;