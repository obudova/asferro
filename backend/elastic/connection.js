var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host:  process.env.ELASTIC_HOST + ':' + process.env.ELASTIC_PORT
});

module.exports = client;
