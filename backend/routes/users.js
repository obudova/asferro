const express = require('express');
const { promisify } = require('util');
const client = require('../elastic/connection.js');
const userRouter = express.Router();

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
            res.send({
                    users: [],
                    total: total
                },
            );
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
        console.log(e);
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
        console.log(e);
        res.stat(e.status);
        res.send();
    }
});

userRouter.post('/', async function (req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var birth_date = Date.parse(req.body.birth_date);
    var email = req.body.email;

    const createUserIndex = promisify(client.index.bind(client));

    try {
        const es_response = await createUserIndex({
            index: 'users',
            type: '_doc',
            refresh: true,
            body: {
                name: name,
                surname: surname,
                birth_date: birth_date,
                email: email,
                created_at: Math.round(Date.now()),
                updated_at: Math.round(Date.now())
            }
        });

        res.status(201);
        res.send({
            id: es_response['_id']
        });
    } catch (e) {
        console.log(e);
        res.stat(e.status);
        res.send();
    }
});

userRouter.put('/:id', async function (req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var birth_date = Date.parse(req.body.birth_date);
    var email = req.body.email;

    const createUserIndex = promisify(client.update.bind(client));

    try {
        await createUserIndex({
            index: 'users',
            type: '_doc',
            id: req.params.id,
            refresh: true,
            body: {
                doc: {
                    name: name,
                    surname: surname,
                    birth_date: birth_date,
                    email: email,
                    updated_at: Math.round(Date.now())
                }
            }
        });

        res.send();

    } catch (e) {
        console.log(e);
        res.stat(e.status);
        res.send();
    }
});

userRouter.delete('/:id', async function (req, res) {
    const searchUser = promisify(client.delete.bind(client));

    try {
        await searchUser({
            index: 'users',
            type: '_doc',
            id: req.params.id,
            refresh: true
        });

        res.send()

    } catch (e) {
        console.log(e);
        res.stat(e.status);
        res.send();
    }
});

module.exports = userRouter;