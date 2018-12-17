const express = require('express');
const userRouter = express.Router();
const UserQueries = require('../queries/users');

userRouter.get('/', async function (req, res) {
    const page = req.query.page || 0;
    const size = req.query.size || 10;
    const order_key = req.query.order_key || 'name';
    const order_dir = req.query.order_dir || 'asc';

    try {
        const result = await UserQueries.findAllEntries(page,size,order_key, order_dir);
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(e.status);
        res.send();
    }
});

userRouter.get('/:id', async function (req, res) {
    try {
        const result = await UserQueries.searchUser(req.params.id);

        if (result) {
            res.send(result);
        } else {
            res.status(404);
            res.send();
        }

    } catch (e) {
        console.log(e);
        res.status(e.status);
        res.send();
    }
});

userRouter.post('/', async function (req, res) {
    const name = req.body.name;
    const surname = req.body.surname;
    const birth_date = Date.parse(req.body.birth_date);
    const email = req.body.email;

    try {
        const result = await UserQueries.createUser({
            name,
            surname,
            birth_date,
            email
        });

        res.status(201);
        res.send({
            id: result
        });
    } catch (e) {
        console.log(e);
        res.status(e.status);
        res.send();
    }
});

userRouter.put('/:id', async function (req, res) {
    const name = req.body.name;
    const surname = req.body.surname;
    const birth_date = Date.parse(req.body.birth_date);
    const email = req.body.email;

    try {
        const result = await UserQueries.updateUser(req.params.id, {
            name,
            surname,
            birth_date,
            email
        });
        res.send();

    } catch (e) {
        console.log(e);
        res.status(e.status);
        res.send();
    }
});

userRouter.delete('/:id', async function (req, res) {
    try {
        const result = await UserQueries.deleteUser(req.params.id);
        res.send()

    } catch (e) {
        console.log(e);
        res.status(e.status);
        res.send();
    }
});

module.exports = userRouter;