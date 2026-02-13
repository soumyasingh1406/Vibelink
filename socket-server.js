const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Game State store
const rooms = {};

// Helper: Initialize Room
const createRoom = (roomId) => {
    const room = {
        id: roomId,
        users: [], // Real users only
        gameState: 'lobby',
        currentRound: 0,
        roundData: {},
        scores: {},
        messages: []
    };

    return room;
};

// Questions Bank
const QUESTIONS = {
    // 1. Friendship Room
    'friendship': [
        "What's a hobby you've always wanted to pick up but haven't yet?",
        "What quality do you value most in a best friend?",
        "If you could have dinner with any fictional character, who would it be?",
        "What's your favorite way to spend a weekend?",
        "Describe your perfect day in three words."
    ],
    // 2. Collaborators Room
    'collaborators': [
        "What's your preferred working style: solo deep work or collaborative brainstorming?",
        "Describe a project you're most proud of.",
        "How do you handle creative blocks?",
        "What skill are you currently trying to improve?",
        "What's the best piece of career advice you've received?"
    ],
    // 3. Mentorship Room
    'mentorship': [
        "Who has been the most influential mentor in your life?",
        "What's a hard lesson you learned recently?",
        "Where do you see yourself in 5 years?",
        "What's one area you feel you need the most guidance in?",
        "What advice would you give to your younger self?"
    ],
    // 4. Travel Room
    'travel': [
        "What is the number one destination on your bucket list?",
        "Beach vacation or mountain adventure?",
        "What's the strangest food you've tried while traveling?",
        "Do you prefer planning every detail or going with the flow?",
        "What's your most memorable travel mishap?"
    ],
    // 5. Love Connection Room
    'love-connection': [
        "What is your love language?",
        "What's a non-negotiable for you in a relationship?",
        "Describe your ideal first date?",
        "What does 'emotional intimacy' mean to you?",
        "Do you believe in soulmates?"
    ],
    // 6. Gamers Room
    'gamers': [
        "What was the first video game you ever fell in love with?",
        "Console, PC, or Mobile? Defend your choice.",
        "What is the most difficult boss fight you've ever beaten?",
        "If you could live in any game world, which one would it be?",
        "Single-player narrative or Multiplayer chaos?"
    ],
    // Fallback / Generic
    'default': [
        "What brings you here today?",
        "What's something you're grateful for?",
        "Coffee or Tea?",
        "Early bird or Night owl?",
        "What's your hidden talent?"
    ],

    // Round 2: Team Task
    2: [
        "Design a new app idea that saves the world.",
        "Plan a dream vacation budget for the group.",
        "Come up with a new holiday and how to celebrate it.",
        "Create a survival plan for a zombie apocalypse.",
        "Invent a new sport combining two existing ones."
    ],

    // MEME TEMPLATES for Round 4
    memeTemplates: [
        "https://i.imgflip.com/30b1gx.jpg", // Drake
        "https://i.imgflip.com/1g8my4.jpg", // Two Buttons
        "https://i.imgflip.com/26am.jpg",   // Distracted Boyfriend
        "https://i.imgflip.com/1h7in3.jpg", // Mocking SpongeBob
        "https://i.imgflip.com/1otk96.jpg"  // Change My Mind
    ],

    // BOT CAPTIONS for Round 4
    botCaptions: [
        "When the code works on the first try",
        "Me explaining why I need a 3rd monitor",
        "Deploying to production on a Friday",
        "That one bug that won't go away",
        "My brain at 3 AM"
    ]
};

const MEME_TEMPLATES = QUESTIONS.memeTemplates;
const BOT_CAPTIONS = QUESTIONS.botCaptions;


function startRound(roomId, roundNum) {
    const room = rooms[roomId];
    if (!room) return;

    console.log(`🎮 Starting Round ${roundNum} in room ${roomId}`);

    // Clear any existing timer
    if (room.interval) clearInterval(room.interval);
    room.interval = null;
    room.timeLeft = null;

    room.currentRound = roundNum;
    room.gameState = `round-${roundNum}`;

    // Reset responses for new round (except for question progression in Round 1)
    if (!room.roundData) room.roundData = {};
    if (roundNum !== 1 || !room.roundData.questionCount) {
        room.roundData.responses = {};
    }

    // Round Specific Setup
    const roomType = Object.keys(QUESTIONS).find(key => roomId.toLowerCase().includes(key)) || 'default';

    if (roundNum === 1) {
        // ROUND 1: QUESTIONS
        if (!room.roundData.questionCount) room.roundData.questionCount = 1;

        // Get questions based on room type
        const qList = QUESTIONS[roomType] || QUESTIONS['default'];

        // Ensure we loop or stop at 5
        const qIndex = (room.roundData.questionCount - 1);
        room.roundData.question = qList[qIndex % qList.length];

        console.log(`📝 Question ${room.roundData.questionCount}/5: ${room.roundData.question}`);

        // Reset countdown for each question
        room.timeLeft = 30;

        io.to(roomId).emit('timer-update', room.timeLeft);
        room.interval = setInterval(() => {
            room.timeLeft--;
            if (room.timeLeft <= 0) {
                clearInterval(room.interval);
                handleRoundComplete(roomId);
            } else {
                io.to(roomId).emit('timer-update', room.timeLeft);
            }
        }, 1000);

    } else if (roundNum === 2) {
        // ROUND 2: TEAM CHALLENGE (Synergy Test)
        const qList = QUESTIONS[2];
        room.roundData.prompt = qList[Math.floor(Math.random() * qList.length)];
        room.roundData.type = "team-task";
        room.timeLeft = 60; // 60s for Team Task

        console.log(`🤝 Synergy Round: ${room.roundData.prompt}`);

        io.to(roomId).emit('timer-update', room.timeLeft);
        room.interval = setInterval(() => {
            room.timeLeft--;
            if (room.timeLeft <= 0) {
                clearInterval(room.interval);
                handleRoundComplete(roomId);
            } else {
                io.to(roomId).emit('timer-update', room.timeLeft);
            }
        }, 1000);

    } else if (roundNum === 3) {
        // BLIND CHAT
        room.roundData = {
            prompt: "Blind Chat: You are paired anonymously!",
            type: "blind-chat"
        };

        console.log(`💬 Starting Blind Chat Round`);

        // Ensure Even Number of Participants
        const shuffled = [...room.users].sort(() => 0.5 - Math.random());
        room.partners = {};
        for (let i = 0; i < shuffled.length; i += 2) {
            const u1 = shuffled[i];
            const u2 = shuffled[i + 1];
            if (u1 && u2) {
                room.partners[u1.id] = u2.id;
                room.partners[u2.id] = u1.id;
                console.log(`👥 Paired: ${u1.name} ↔ ${u2.name}`);
            }
        }

        room.timeLeft = 120; // 120s for Chat
        io.to(roomId).emit('timer-update', room.timeLeft);

        room.interval = setInterval(() => {
            room.timeLeft--;
            if (room.timeLeft <= 0) {
                clearInterval(room.interval);
                nextRound(roomId);
            } else {
                io.to(roomId).emit('timer-update', room.timeLeft);
            }
        }, 1000);

    } else if (roundNum === 4) {
        // Meme Reaction Battle
        if (!room.roundData.phase) {
            // Initialize Phase 1: Captioning
            room.roundData = {
                phase: 'captioning',
                memeUrl: MEME_TEMPLATES[Math.floor(Math.random() * MEME_TEMPLATES.length)],
                captions: []
            };
            room.timeLeft = 45; // 45s to caption
            console.log(`😂 Meme Round - Phase: Captioning`);
        } else if (room.roundData.phase === 'voting') {
            // Initialize Phase 2: Voting
            room.timeLeft = 30;
            console.log(`😂 Meme Round - Phase: Voting`);
        }

        io.to(roomId).emit('update-room-state', serializeRoom(room));
        io.to(roomId).emit('timer-update', room.timeLeft);

        room.interval = setInterval(() => {
            room.timeLeft--;
            if (room.timeLeft <= 0) {
                // Phase Transition Logic
                if (room.roundData.phase === 'captioning') {
                    clearInterval(room.interval);
                    room.roundData.phase = 'voting';

                    // AUTOMATION: Inject Bots
                    const usedCaptions = new Set();
                    for (let i = 0; i < 3; i++) {
                        let cap = BOT_CAPTIONS[Math.floor(Math.random() * BOT_CAPTIONS.length)];
                        while (usedCaptions.has(cap)) cap = BOT_CAPTIONS[Math.floor(Math.random() * BOT_CAPTIONS.length)];
                        usedCaptions.add(cap);

                        room.roundData.captions.push({
                            userId: `bot-${i}`,
                            caption: cap,
                            reactions: {}
                        });
                    }

                    room.timeLeft = 30; // 30s to vote
                    io.to(roomId).emit('update-room-state', serializeRoom(room));

                    // Restart interval for voting
                    room.interval = setInterval(() => {
                        room.timeLeft--;

                        // SIMULATE REACTIONS
                        if (Math.random() > 0.3) {
                            const allCaptions = room.roundData.captions;
                            if (allCaptions.length > 0) {
                                const randomCaption = allCaptions[Math.floor(Math.random() * allCaptions.length)];
                                const randomReaction = ["😂", "🔥", "💡", "❤️"][Math.floor(Math.random() * 4)];
                                const randomReactorId = `bot-reactor-${Math.floor(Math.random() * 10)}`;

                                randomCaption.reactions[randomReactorId] = randomReaction;
                                io.to(roomId).emit('update-room-state', serializeRoom(room));
                            }
                        }

                        if (room.timeLeft <= 0) {
                            clearInterval(room.interval);
                            finishGame(roomId);
                        } else {
                            io.to(roomId).emit('timer-update', room.timeLeft);
                        }
                    }, 1000);
                } else {
                    finishGame(roomId);
                }
            } else {
                io.to(roomId).emit('timer-update', room.timeLeft);
            }
        }, 1000);

    } else if (roundNum > 4) {
        finishGame(roomId);
        return;
    }

    io.to(roomId).emit('room-update', serializeRoom(room));
    io.to(roomId).emit('game-started');
}

function handleSubmitRound(roomId, userId, response) {
    const room = rooms[roomId];
    if (!room) return;

    // Store response
    if (!room.roundData.responses) room.roundData.responses = {};
    if (!room.roundData.responses[userId]) {
        room.roundData.responses[userId] = response;
        room.scores[userId] = (room.scores[userId] || 0) + 10;

        console.log(`✅ ${userId} submitted response for Round ${room.currentRound}`);
    }

    const submittedCount = Object.keys(room.roundData.responses).length;
    const totalCount = room.users.length;

    console.log(`📊 Submissions: ${submittedCount}/${totalCount}`);

    // Check if ALL submitted
    if (submittedCount >= totalCount) {
        console.log(`✨ All users submitted! Moving to next phase...`);
        io.to(roomId).emit('roundCompleted');
        setTimeout(() => handleRoundComplete(roomId), 1000);
        return;
    }

    // Fallback Timer on FIRST submission (not for Round 2/Synergy)
    if (submittedCount === 1 && !room.interval && room.currentRound !== 2) {
        room.timeLeft = 5;
        io.to(roomId).emit('timer-update', room.timeLeft);

        room.interval = setInterval(() => {
            room.timeLeft--;
            io.to(roomId).emit('timer-update', room.timeLeft);

            if (room.timeLeft <= 0) {
                clearInterval(room.interval);
                handleRoundComplete(roomId);
            }
        }, 1000);
    }

    io.to(roomId).emit('room-update', serializeRoom(room));
}

function handleRoundComplete(roomId) {
    const room = rooms[roomId];
    if (!room) return;

    console.log(`🏁 Round ${room.currentRound} completed`);

    if (room.interval) clearInterval(room.interval);
    room.interval = null;
    room.timeLeft = 0;

    // Check if we stay in Round 1 (Multi-Question - 5 questions total)
    if (room.currentRound === 1 && room.roundData.questionCount < 5) {
        room.roundData.questionCount++;
        room.roundData.responses = {}; // Clear responses for next question
        console.log(`➡️ Moving to question ${room.roundData.questionCount}/5`);
        io.to(roomId).emit('roundCompleted');
        setTimeout(() => startRound(roomId, 1), 1500);
    } else {
        // Move to next round
        console.log(`➡️ Moving to Round ${room.currentRound + 1}`);
        io.to(roomId).emit('roundCompleted');
        setTimeout(() => nextRound(roomId), 1500);
    }
}

function nextRound(roomId) {
    const room = rooms[roomId];
    if (room) {
        const nextR = room.currentRound + 1;
        console.log(`🔄 Advancing to Round ${nextR}`);
        startRound(roomId, nextR);
    }
}

function calculateFinalMatches(roomId) {
    const room = rooms[roomId];
    const users = room.users;
    room.matches = [];

    const getHumorScore = (u1Id, u2Id) => {
        let score = 0;
        if (room.roundData.captions) {
            room.roundData.captions.forEach(c => {
                const r1 = c.reactions[u1Id];
                const r2 = c.reactions[u2Id];
                if (r1 && r2) {
                    score += 15;
                    if (r1 === r2) score += 10;
                }
            });
        }
        return score;
    };

    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            const u1 = users[i];
            const u2 = users[j];
            let baseScore = 70 + Math.floor(Math.random() * 20);
            let humorBonus = getHumorScore(u1.id, u2.id);
            let finalScore = Math.min(100, baseScore + humorBonus);

            room.matches.push({
                user1: u1,
                user2: u2,
                score: finalScore,
                tags: humorBonus > 20 ? ['Humor Match 😂'] : []
            });
        }
    }
    room.matches.sort((a, b) => b.score - a.score);
    room.leaderboard = users.sort((a, b) => (room.scores[b.id] || 0) - (room.scores[a.id] || 0));
}

function serializeRoom(room) {
    const serialized = { ...room };
    delete serialized.interval;
    return serialized;
}

function finishGame(roomId) {
    const room = rooms[roomId];
    if (room) {
        console.log(`🎉 Game finished in room ${roomId}`);
        room.gameState = 'results';
        calculateFinalMatches(roomId);
        io.to(roomId).emit('room-update', serializeRoom(room));
    }
}

// === SOCKET CONNECTION HANDLER ===
io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('join-room', ({ roomId, user }) => {
        if (!roomId || !user) return;
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = createRoom(roomId);
        }

        const room = rooms[roomId];
        // Add User
        if (!room.users.find(u => u.id === user.id)) {
            room.users.push({ ...user, socketId: socket.id, score: 0 });
            room.scores[user.id] = 0;
        }

        console.log(`👤 ${user.name} joined room ${roomId} (${room.users.length} users)`);
        io.to(roomId).emit('room-update', serializeRoom(room));
    });

    socket.on('start-game', (roomId) => {
        if (rooms[roomId]) {
            console.log(`🎮 Game starting in room ${roomId}`);

            // RESET GAME STATE
            rooms[roomId].roundData = {};
            rooms[roomId].currentRound = 0;
            rooms[roomId].gameState = 'lobby';

            startRound(roomId, 1);
        }
    });

    socket.on('send-message', ({ roomId, message, user }) => {
        io.to(roomId).emit('new-message', { user, message, timestamp: new Date() });
    });

    socket.on('submit-round', ({ roomId, userId, response }) => {
        handleSubmitRound(roomId, userId, response);
    });

    // Listen for Client's explicit Round Completion trigger
    socket.on('roundCompleted', ({ roomId }) => {
        handleRoundComplete(roomId);
    });

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
        // Clean up logic if needed
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`> 🚀 Socket Server ready on http://localhost:${PORT}`);
});