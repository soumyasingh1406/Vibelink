import React, { useState, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'opponent';
  text: string;
  timestamp: Date;
}

interface BlindChatRoundProps {
  onComplete?: (score: number) => void;
  players?: Array<{ id: string; name: string }>;
}

const BlindChatRound: React.FC<BlindChatRoundProps> = ({ onComplete, players }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [showChat, setShowChat] = useState(false);
  const [showGuessing, setShowGuessing] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<string>('');

  // Timer countdown
  useEffect(() => {
    if (showChat && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      
      if (timeRemaining === 1) {
        setShowChat(false);
        setShowGuessing(true);
      }
      
      return () => clearTimeout(timer);
    }
  }, [showChat, timeRemaining]);

  const handleStartChat = () => {
    setShowChat(true);
    // Simulate opponent message
    setTimeout(() => {
      addOpponentMessage("Hey! Nice to meet you 👋");
    }, 2000);
  };

  const addOpponentMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'opponent',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate opponent responses
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more 🤔",
        "I totally agree with that!",
        "Haha, that's funny! 😄",
        "What do you think about...",
        "Yeah, I can relate to that"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addOpponentMessage(randomResponse);
    }, 1500);
  };

  const handleSubmitGuess = () => {
    const score = selectedGuess ? 100 : 50;
    if (onComplete) {
      onComplete(score);
    }
  };

  // Show guessing interface
  if (showGuessing) {
    const dummyPlayers = players || [
      { id: '1', name: 'Alex' },
      { id: '2', name: 'Jordan' },
      { id: '3', name: 'Taylor' },
      { id: '4', name: 'Casey' }
    ];

    return (
      <div className="blind-chat-round">
        <h2>🤔 Who Were You Talking To?</h2>
        <p>Guess which player you were chatting with</p>
        <div className="player-options">
          {dummyPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedGuess(player.id)}
              className={selectedGuess === player.id ? 'selected' : ''}
            >
              {player.name}
            </button>
          ))}
        </div>
        <button onClick={handleSubmitGuess} disabled={!selectedGuess}>
          Submit Guess
        </button>
      </div>
    );
  }

  // Show chat interface
  if (showChat) {
    return (
      <div className="blind-chat-round">
        <div className="chat-header">
          <h2>Blind Chat</h2>
          <div className="timer">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</div>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }

  // Show intro screen (your existing UI)
  return (
    <div className="blind-chat-round">
      <div className="round-header">
        <h1>Blind Chat Round</h1>
        <p>Connect without seeing!</p>
      </div>
      
      <div className="round-content">
        <p>Chat with other players without seeing their profiles.</p>
        <button onClick={handleStartChat}>Start Chat</button>
      </div>
    </div>
  );
};

export default BlindChatRound;