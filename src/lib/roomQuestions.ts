export interface Challenge {
    id: number;
    type: string;
    prompt: string;
    time: number;
}

export const ROOM_CHALLENGES: Record<string, Challenge[]> = {
    friendship: [
        { id: 1, type: "question", prompt: "What's the most important quality you look for in a best friend?", time: 30 },
        { id: 2, type: "question", prompt: "What's your favorite memory with a friend?", time: 30 },
        { id: 3, type: "question", prompt: "How do you show appreciation to your friends?", time: 30 },
        { id: 4, type: "question", prompt: "What's a deal-breaker for you in a friendship?", time: 30 },
        { id: 5, type: "question", prompt: "If you could go on a road trip with 3 friends, where would you go?", time: 30 }
    ],
    collaborators: [
        { id: 1, type: "question", prompt: "Describe your work style in 3 words and explain why", time: 30 },
        { id: 2, type: "question", prompt: "What's your biggest professional achievement?", time: 30 },
        { id: 3, type: "teamTask", prompt: "You have $10k budget - design an app feature together", time: 30 },
        { id: 4, type: "question", prompt: "How do you handle disagreements in a team?", time: 30 },
        { id: 5, type: "problem", prompt: "Your product launch is in 2 days but there's a bug. What do you do?", time: 30 }
    ],
    mentorship: [
        { id: 1, type: "question", prompt: "What's a challenge you're currently facing?", time: 30 },
        { id: 2, type: "question", prompt: "What skills do you want to develop in the next 6 months?", time: 30 },
        { id: 3, type: "question", prompt: "Who has been your biggest inspiration and why?", time: 30 },
        { id: 4, type: "teamTask", prompt: "Create a 30-day learning plan together", time: 30 },
        { id: 5, type: "scenario", prompt: "You failed at something important. How do you bounce back?", time: 30 }
    ],
    travel: [
        { id: 1, type: "choice", prompt: "Beach, mountains, city, or countryside?", time: 30 },
        { id: 2, type: "question", prompt: "What's your most memorable travel experience?", time: 30 },
        { id: 3, type: "teamTask", prompt: "Plan a dream 3-day trip together with $3000 budget", time: 30 },
        { id: 4, type: "meme", prompt: "Funniest travel disaster story as a meme", time: 30 },
        { id: 5, type: "question", prompt: "Luxury hotel or local homestay? Why?", time: 30 }
    ],
    gamers: [
        { id: 1, type: "question", prompt: "What was the first video game you ever fell in love with?", time: 30 },
        { id: 2, type: "choice", prompt: "Console, PC, or Mobile? Defend your choice.", time: 30 },
        { id: 3, type: "question", prompt: "What is the most difficult boss fight you've ever beaten?", time: 30 },
        { id: 4, type: "question", prompt: "If you could live in any game world, which one would it be?", time: 30 },
        { id: 5, type: "choice", prompt: "Single-player narrative or Multiplayer chaos?", time: 30 }
    ],
    "love-connection": [
        { id: 1, type: "question", prompt: "What makes you laugh the most?", time: 30 },
        { id: 2, type: "question", prompt: "Describe your perfect date night in detail", time: 30 },
        { id: 3, type: "question", prompt: "What's your love language and why?", time: 30 },
        { id: 4, type: "teamTask", prompt: "Create a bucket list of 10 things to do together", time: 30 },
        { id: 5, type: "deeptalk", prompt: "What does 'partnership' mean to you?", time: 30 }
    ],
    // Fallback
    default: [
        { id: 1, type: "question", prompt: "What brings you here today?", time: 30 },
        { id: 2, type: "question", prompt: "What's something you're grateful for?", time: 30 },
        { id: 3, type: "meme", prompt: "Create a meme about 'vibes'", time: 30 },
        { id: 4, type: "question", prompt: "What's your hidden talent?", time: 30 },
        { id: 5, type: "quickfire", prompt: "Morning or Night? Sweet or Savory?", time: 30 }
    ]
};

export const ROOM_SYNERGY: Record<string, string> = {
    friendship: "Plan a surprise birthday with 3 items",
    collaborators: "Design a startup idea in 60 sec",
    mentorship: "Solve a career dilemma together",
    travel: "Plan 1-day itinerary under budget",
    "love-connection": "Plan the perfect first date",
    default: "Plan a team event together"
};

// Aliases for compatibility if needed (but we will refactor to use ROOM_CHALLENGES)
export const GAME_CONTENT = null;

export type RoomId = keyof typeof ROOM_CHALLENGES; 
