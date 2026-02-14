import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface RealTalkRoundProps {
  onComplete?: (score: number) => void;
}

const RealTalkRound: React.FC<RealTalkRoundProps> = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const questions: Question[] = [
    {
      id: '1',
      text: 'What would you do if you won a million dollars?',
      options: ['Invest it all', 'Travel the world', 'Help family and friends', 'Start a business']
    },
    {
      id: '2',
      text: 'What\'s your biggest fear?',
      options: ['Failure', 'Being alone', 'Heights', 'Public speaking']
    },
    {
      id: '3',
      text: 'If you could have dinner with anyone, who would it be?',
      options: ['A historical figure', 'A family member who passed', 'A celebrity', 'A future version of myself']
    },
    {
      id: '4',
      text: 'What\'s more important to you?',
      options: ['Career success', 'Personal happiness', 'Balance of both', 'It depends']
    },
    {
      id: '5',
      text: 'Would you rather be famous or wealthy?',
      options: ['Famous', 'Wealthy', 'Both', 'Neither']
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setStarted(true);
  };

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      // Finish round
      const score = Object.keys(answers).length * 50;
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  // Show question interface
  if (started) {
    return (
      <div className="real-talk-round">
        <div className="round-header">
          <h1>Real Talk Round</h1>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        
        <div className="round-content">
          <h2>{currentQuestion.text}</h2>
          
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                className={selectedAnswer === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>

          <button 
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="next-button"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      </div>
    );
  }

  // Show intro screen (your existing UI)
  return (
    <div className="real-talk-round">
      <div className="round-header">
        <h1>Real Talk Round</h1>
        <p>Share your honest thoughts!</p>
      </div>
      
      <div className="round-content">
        <p>Answer deep questions and get to know each other!</p>
        <button onClick={handleStart}>Start Questions</button>
      </div>
    </div>
  );
};

export default RealTalkRound;
