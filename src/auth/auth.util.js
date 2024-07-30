const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BCRYPT_SALT } = require('../../constants');

exports.hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(Number(BCRYPT_SALT));
        const hashed_password = await bcrypt.hash(password, salt);
        return hashed_password;
	} catch (error) {
        return null;
	}
}

exports.comparePassword = async (password, hashed_password) => {
	try {
		const isMatch = await bcrypt.compare(password, hashed_password);
		return isMatch;
	} catch (error) {
		return false;
	}
}

exports.generateToken = async (payload) => {
	try {
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		return token;
	} catch (error) {
		return null;
	}
}

exports.verifyToken = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		return null;
	}
}

exports.decodeToken = async (token) => {
	try {
		const decoded = jwt.decode(token);
		return decoded;
	} catch (error) {
		return null;
	}
}
