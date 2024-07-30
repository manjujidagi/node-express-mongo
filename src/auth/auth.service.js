const bcrypt = require('bcryptjs');
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
