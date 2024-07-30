const config = require('../../../config');
const { createUser } = require('../../users/users.service');

exports.seedUsers = async () => {
    try {
        
        let users = [
            {
                username: 'superadmin',
                password: 'superadmin',
                role: config.ROLES.SUPERADMIN.key
            }
        ]

        for (let user of users) {
            let created_user = await createUser(user);
            if (created_user.error) {
                console.log(created_user.error)
            } else {
                console.log(`User ${created_user.user.username} created successfully`)
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}
