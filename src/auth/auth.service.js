const config = require('../../config');
const { getUser, createUser } = require('../users/users.service');
const { comparePassword, generateToken, hashPassword } = require('./auth.util');

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
			user_id: user._id,
			username: user.username,
			role: user.role,
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

exports.register = async (body) => {
	try {
		let user = await getUser({ username: body.username });
		if (user) {
			return {
				error: 'User already exists',
				error_code: 'user_already_exists',
				status: 400
			}
		}

		let payload = {
			username: body.username,
			role: config.ROLES.USER.key,
			password: body.password,
			first_name: body.first_name ? body.first_name : undefined,
			middle_name: body.middle_name ? body.middle_name : undefined,
			last_name: body.last_name ? body.last_name : undefined
		}
		
		user = await createUser(payload);
		if (user.error) {
			return user;
		}
		user = user.user;

		const token = await generateToken({ username: user.username, role: user.role });
		return {
			token,
			user_id: user._id,
			username: user.username,
			role: user.role,
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
		delete user.__v;
		delete user.createdAt;
		delete user.updatedAt;

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

exports.changePassword = async (decoded, body) => {
	try {
		let user = await getUser({ username: decoded.username });
		if (!user) {
			return {
				error: 'User not found',
				error_code: 'user_not_found',
				status: 404
			}
		}

		const isMatch = await comparePassword(body.old_password, user.password);
		if (!isMatch) {
			return {
				error: 'Invalid password',
				error_code: 'invalid_password',
				status: 400
			}
		}

		user.password = await hashPassword(body.new_password);
		await user.save();

		return {
			message: 'Password updated successfully',
			message_code: 'password_updated',
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
