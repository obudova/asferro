const express = require('express');
const cors = require('cors')
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
        app.use(cors());
        app.options('*', cors());
        app.use(bodyParser.json({type: 'application/json'}));

        var userRouter = express.Router();

        app.get('/', function (req, res) {
            res.send('Hello Asferro API!');
        });

        userRouter.get('/', async function (req, res) {
            var page = req.query.page || 0;
            var size = req.query.size || 10;
            var order_key = req.query.order_key || 'name';
            var order_dir = req.query.order_dir || 'asc';

            const searchAllUsers = promisify(client.search.bind(client));

            try {
                const es_response = await searchAllUsers({
                    sort: order_key + '.keyword' + ':' + order_dir,
                    from: page * size,
                    size: size,
                    index: 'users',
                });

                let hits = es_response['hits']['hits'];
                let total = es_response['hits']['total'];

                if (hits.length === 0) {
                    res.status(404);
                    res.send();
                } else {
                    res.send({
                            users: hits.map((item, index) => {
                                return {...{id: item['_id']}, ...item['_source']};
                            }),
                            total: total
                        },
                    );
                }

            } catch (e) {
                res.status(e.status);
                res.send();
            }
        });

        userRouter.get('/:id', async function (req, res) {
            const searchUser = promisify(client.search.bind(client));

            try {
                const es_response = await searchUser({
                    index: 'users',
                    body: {
                        query: {
                            term: {
                                _id: req.params.id
                            }
                        }
                    }
                });

                let hits = es_response['hits']['hits'];

                if (hits.length === 0) {
                    res.status(404);
                    res.send();
                } else {
                    res.send({...{id: req.params.id}, ...hits[0]['_source']});
                }

            } catch (e) {
                console.log(e)
            }
        });

        userRouter.post('/', async function (req, res) {
            var name = req.body.name;
            var surname = req.body.surname;
            var birth_date = req.body.birth_date;
            var email = req.body.email;

            const createUserIndex = promisify(client.index.bind(client));

            try {
                const es_response = await createUserIndex({
                    index: 'users',
                    type: '_doc',
                    body: {
                        name: name,
                        surname: surname,
                        birth_date: birth_date,
                        email: email,
                        created_at: Math.round(Date.now() / 1000),
                        updated_at: Math.round(Date.now() / 1000)
                    }
                });

                res.status(201);
                res.send({
                    id: es_response['_id']
                });
            } catch (e) {

            }
        });

        userRouter.patch('/:id', function (req, res) {
            res.send('Update specific user');
        });

        userRouter.delete('/:id', async function (req, res) {
            const searchUser = promisify(client.delete.bind(client));

            try {
                await searchUser({
                    index: 'users',
                    type: '_doc',
                    id: req.params.id
                });

                res.send()

            } catch (e) {
                res.status(404);
                res.send();
            }
        });

        app.listen(8000, function () {
            console.log('Example app listening on port 8000!');
        });

        app.use('/api/users', userRouter);

    }
;
start();