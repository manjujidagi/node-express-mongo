const { seedUsers } = require("./user.seeder")

exports.seedDatabase = async () => {
    try {
        await seedUsers();
    } catch (error) {
        console.log(error.message)
    }
}
