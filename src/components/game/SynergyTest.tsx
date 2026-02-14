import React, { useState } from 'react';

interface SynergyTestProps {
  onComplete?: (score: number) => void;
}

const SynergyTest: React.FC<SynergyTestProps> = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const questions = [
    'I prefer spontaneous adventures over planned activities',
    'I enjoy deep conversations more than small talk',
    'I recharge by spending time alone',
    'I make decisions based on logic rather than emotions',
    'I like trying new foods and experiences',
    'I prefer staying in over going out',
    'I value honesty over politeness',
    'I like to have a plan before taking action'
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setStarted(true);
  };

  const handleRating = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleNext = () => {
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedRating!
    }));

    // Move to next or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedRating(null);
    } else {
      // Calculate synergy score
      const avgScore = Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length;
      const synergyScore = Math.round((avgScore / 5) * 100);
      
      if (onComplete) {
        onComplete(synergyScore);
      }
    }
  };

  // Show test interface
  if (started) {
    return (
      <div className="synergy-test">
        <div className="round-header">
          <h1>Synergy Test</h1>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        
        <div className="round-content">
          <h2>{currentQuestion}</h2>
          
          <div className="rating-scale">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRating(rating)}
                className={selectedRating === rating ? 'selected' : ''}
              >
                {rating}
              </button>
            ))}
          </div>
          
          <div className="rating-labels">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>

          <button 
            onClick={handleNext}
            disabled={selectedRating === null}
            className="next-button"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    );
  }

  // Show intro screen
  return (
    <div className="synergy-test">
      <div className="round-header">
        <h1>Synergy Test</h1>
        <p>Discover your compatibility!</p>
      </div>
      
      <div className="round-content">
        <p>Answer personality questions to find your synergy score.</p>
        <button onClick={handleStart}>Start Test</button>
      </div>
    </div>
  );
};

export default SynergyTest;