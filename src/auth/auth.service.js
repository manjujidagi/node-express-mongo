const { getUser } = require('../users/users.service');
const { comparePassword, generateToken } = require('./auth.util');

exports.login = async (body) => {
	try {
		let user = await getUser({ username: body.username });
		if (!user) {
			return {
				error: 'User not found',
				error_code: 'user_not_found',
				status: 404
			}
		}

		const isMatch = await comparePassword(body.password, user.password);
		if (!isMatch) {
			return {
				error: 'Invalid password',
				error_code: 'invalid_password',
				status: 400
			}
		}

		const token = await generateToken({ username: user.username, role: user.role });
		return {
			token,
			status: 200
		}
	} catch (error) {
		return {
			error: error.message,
			error_code: 'unknown_error',
			status: 500
		}
	}
}

exports.getProfile = async (decoded) => {
	try {
		let user = await getUser({ username: decoded.username });
		if (!user) {
			return {
				error: 'User not found',
				error_code: 'user_not_found',
				status: 404
			}
		}

		user = user.toObject();
		delete user.password;

		return {
			profile: user,
			status: 200
		}
	} catch (error) {
		return {
			error: error.message,
			error_code: 'unknown_error',
			status: 500
		}
	}
}
