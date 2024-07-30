const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const { PORT } = require('../constants');
const config = require('./../config');


require('./database/database.provider');
const routes = require('./main.routes');
routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} @ version ${config.version}`);
});
