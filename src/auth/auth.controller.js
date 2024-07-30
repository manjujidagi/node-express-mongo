// const { loginMethod, getProfileMethod, changePasswordMethod } = require('../methods/auth.methods');

const { login, getProfile } = require("./auth.service");

exports.login = async (req, res) => {
    try {
        let body = req.body;
        let user = await login(body);
        if (user.error) {
            return res.status(user.status).json(user);
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message, error_code: '|unknown_error|', status: 500 });
    }
}

exports.profile = async (req, res) => {
    try {
        let decoded = res.user;
        let profile = await getProfile(decoded);
        if (profile.error) {
            return res.status(profile.status).json(profile);
        }

        return res.status(200).json(profile);
    } catch (error) {
        return res.status(400).json({ error: error.message, error_code: '|unknown_error|', status: 500 });
    }
}

// exports.changePassword = async (req, res) => {
//     try {
//         let decoded = res.user;
//         let body = req.body;

//         let updatePassword = await changePasswordMethod(decoded, body);
//         if (updatePassword.error) {
//             return res.status(updatePassword.status).json(updatePassword);
//         }

//         return res.status(200).json(updatePassword);
//     } catch (error) {
//         return res.status(400).json({ error: error.message, error_code: '|unknown_error|', status: 500 });
//     }
// }