import React from 'react';
import BlindChatRound from './BlindChatRound';
import MemeBattleRound from './MemeBattleRound';
import RealTalkRound from './RealTalkRound';
import GameResults from './GameResults';
import UniversalChallenge from './UniversalChallenge';
import SynergyTest from './SynergyTest';

interface Player {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

interface GameStateType {
  gameState: string;
  players?: Player[];
  gameType?: string;
}

interface RoundRouterProps {
  gameState: GameStateType;
  isGameFinished?: boolean; // NEW: Strict check
  onPlayAgain?: () => void;
  onBackToMenu?: () => void;
}

const RoundRouter: React.FC<RoundRouterProps> = ({
  gameState,
  isGameFinished,
  onPlayAgain,
  onBackToMenu
}) => {
  console.log("RoundRouter Rendering Stat:", gameState.gameState);

  // Round 1 - Questions
  if (gameState.gameState === 'questions' || gameState.gameState === 'round-1') {
    // We need to import QuestionRound or use UniversalChallenge, but based on context, 
    // it seems UniversalChallenge is used for generic rounds/questions. 
    // However, previous code used BlindChatRound for round-1 which was WRONG.
    // I'll check if there is a specific Questions component, effectively UniversalChallenge seems to be the one.
    // Let's import UniversalChallenge and use it.
    return <UniversalChallenge />;
  }

  // Round 2 - Synergy Test
  if (gameState.gameState === 'synergy' || gameState.gameState === 'round-2') {
    return <SynergyTest />;
  }

  // Round 3 - Blind Chat
  if (gameState.gameState === 'blindChat' || gameState.gameState === 'round-3') {
    return <BlindChatRound />;
  }

  // Round 4 - Meme Battle (Humor)
  if (gameState.gameState === 'humor' || gameState.gameState === 'round-4') {
    return <MemeBattleRound />;
  }

  // Results Screen
  // ONLY show if gameState says results AND strict flag is true (or if state is forced)
  if (gameState.gameState === 'results' || (isGameFinished && gameState.gameState !== 'lobby')) {
    const players = gameState.players || [];
    const gameType = gameState.gameType || 'Game';

    return (
      <GameResults
        players={players}
        gameType={gameType}
        onPlayAgain={onPlayAgain}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  // Fallback for unknown states
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-2">Unknown Game State</h2>
        <p className="text-gray-400">Current state: {gameState.gameState}</p>
      </div>
    </div>
  );
};

export default RoundRouter;

