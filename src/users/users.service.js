const { hashPassword } = require('../auth/auth.util');
const User = require('./user.model');

exports.createUser = async (payload) => {
	try {

		let existing_user = await this.getUser({ username: payload.username });
		if (existing_user) {
			return {
				error: `User ${existing_user.username} already exists`,
				error_code: 'user_exists',
				status: 400
			}
		}

		let hashed_password = await hashPassword(payload.password);
		if (!hashed_password) {
			return {
				error: 'Error hashing password',
				error_code: 'hash_error',
				status: 500
			}
		}

		payload.password = hashed_password;

		let created_user = new User(payload);
		created_user = await created_user.save();
		return {
			user: created_user,
			status: 201
		}
	} catch (error) {
		return {
			error: error.message,
			error_code: 'unknown_error',
			status: 500
		}
	}
}

exports.getUser = async (query = {}) => {
	try {
		let user = await User.findOne(query);
		return user;
	} catch (error) {
		return null;
	}

}

exports.getUserById = async (id) => {
	try {
		let user = await User.findById(id);
		return user;
	} catch (error) {
		return null;
	}
}
