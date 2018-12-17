const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('./elastic/connection.js');
const { promisify } = require('util');
const fs = require('fs');
const user_mapping = JSON.parse(fs.readFileSync(__dirname + '/elastic/mappings/users.json', 'utf8'));
const usersRoute = require('./routes/users');

const start = async () => {

    // Healthcheck elastic
    client.cluster.health({}, function (err, resp, status) {
        console.log("-- Client Health --", resp);
    });

    const userIndexExists = promisify(client.indices.exists.bind(client));
    const createUserIndex = promisify(client.indices.create.bind(client));

    try {
        if (!await userIndexExists({index: 'users'})) {
            try {
                await createUserIndex({index: 'users', body: user_mapping});
                console.log('created index');
            } catch (e) {
                console.log(e)
            }
        }
    } catch (e) {
        console.log(e);
    }

    // Init express framework
    var app = express();
    app.use(cors());
    app.options('*', cors());
    app.use(bodyParser.json({type: 'application/json'}));


    app.listen(8000, function () {
        console.log('Example app listening on port 8000!');
    });

    app.use('/api/users', usersRoute);
};

start();