const express = require('express');
const bodyParser = require('body-parser');
const client = require('./elastic/connection.js');
const {promisify} = require('util');
const fs = require('fs');
const user_mapping = JSON.parse(fs.readFileSync(__dirname + '/elastic/mappings/users.json', 'utf8'));

const start = async () => {

        // Healthcheck elastic
        client.cluster.health({}, function (err, resp, status) {
            console.log("-- Client Health --", resp);
        });

        const userIndexExists = promisify(client.indices.exists.bind(client));
        const createUserIndex = promisify(client.indices.create.bind(client));

        try {
            await userIndexExists({index: 'users'});
        } catch (e) {
            if (e.status === 404) {
                try {
                    await createUserIndex({index: 'users', body: user_mapping});
                    console.log('created index');
                } catch (e) {
                    if (e.status === 400) {
                        console.log('index already exists')
                    } else {
                        throw e;
                    }
                }
            }
        }

        // Init express framework
        var app = express();
        app.use(bodyParser.json({type: 'application/json'}));

        var userRouter = express.Router();

        app.get('/', function (req, res) {
            res.send('Hello Asferro API!');
        });

        userRouter.get('/', function (req, res) {
            res.send('Get all users');
        });

        userRouter.get('/:id', async function (req, res) {
            res.send('Get specific user');
        });

        userRouter.post('/', async function (req, res) {
            res.send('Create user');
        });

        userRouter.patch('/:id', function (req, res) {
            res.send('Update specific user');
        });

        userRouter.delete('/:id', function (req, res) {
            res.send('Delete specific user');
        });

        app.listen(8000, function () {
            console.log('Example app listening on port 8000!');
        });

        app.use('/api/users', userRouter);

    }
;
start();