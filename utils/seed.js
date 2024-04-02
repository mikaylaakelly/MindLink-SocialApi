const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const users = [];
    const thoughts = [];

    // users math 
    for (let i = 0; i < 10; i++) {
        let username;
        do {
            username = getRandomName();
        } while (users.some(user => user.username === username)); 
        const email = `${username}@example.com`; 
        const userThoughts = [];

        //thoughts math
        const totalThoughts = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < totalThoughts; j++) {
            const thoughtText = getRandomThought();
            const reactions = [];

            //reactions math
            for (let k = 0; k < 2; k++) {
                const reactionBody = getRandomReaction();
                const reactionUsername = getRandomName();
                reactions.push({ reactionBody, username: reactionUsername });
            }

            const createdAt = new Date();
            userThoughts.push({ thoughtText, reactions, createdAt });
            thoughts.push({ thoughtText, reactions, username, createdAt });
        }

        //friends math
        const userFriends = [];
        for (let j = 0; j < 3; j++) { 
            const friend = getRandomName();
            if (friend !== username && !userFriends.includes(friend)) {
                userFriends.push(friend);
            }
        }

        users.push({ username, email, friends: userFriends });
    }


    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.log('Users:');
    console.table(users);

    console.log('Thoughts:');
    console.table(thoughts);

    console.log('The Math is MATHING');
    process.exit(0);
});