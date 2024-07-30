const mongoose = require('mongoose');
const { DB_URL } = require('../../constants');

async function connectToDatabase(seedDatabase = true) {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');

        if (seedDatabase) {
            console.log('Seeding database...');
            const { seedDatabase } = require('./seeder/main.seeder');
            await seedDatabase();
            console.log('Database seeded');
        }

    } catch (error) {
        console.error('Error connecting to database', error);
    }
}

connectToDatabase();
