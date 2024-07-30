const { BASE_URL } = require('../constants');

const authRoutes = require('./auth/auth.routes');

// exports.routes = (app) => {
//     app.use(BASE_URL + '/auth/', authRoutes);
// }

module.exports = routes = (app) => {
    console.log('Setting up routes...');
    app.use(BASE_URL + '/auth/', authRoutes);
}
