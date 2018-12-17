const esClient = require('../elastic/connection');

const userIndex = 'users';

module.exports.findAllUsers = async function (page, size, order_key, order_dir) {
    const es_response = await esClient.search({
        index: userIndex,
        sort: order_key + ':' + order_dir,
        from: page * size,
        size: size,
    });

    const hits = es_response.hits.hits;
    const total = es_response.hits.total;

    const result = {
        users: [],
        total: total
    };

    if (total) {
        return {
            ...result,
            users: hits.map((item) => {
                return {
                    ...{id: item['_id']},
                    ...item['_source']};
            })
        }
    } else {
        return result;
    }
};

module.exports.searchUser =  async function (id) {
    const es_response = await esClient.search({
        index: 'users',
        body: {
            query: {
                term: {
                    _id: id
                }
            }
        }
    });

    let result = es_response.hits.hits;

    if (result.length === 0) {
        return false;
    } else {
        return {id, ...result[0]['_source']};
    }
};

module.exports.createUser = async function (user) {
    const es_response = await esClient.index({
        index: userIndex,
        type: '_doc',
        refresh: true,
        body: {
            ...user,
            created_at: Math.round(Date.now()),
            updated_at: Math.round(Date.now())
        }
    });

    return es_response['_id'];
};

module.exports.updateUser = async function (id, user) {
  return await esClient.update({
      index: userIndex,
      type: '_doc',
      id,
      refresh: true,
      body: {
          doc: {
              ...user,
              updated_at: Math.round(Date.now())
          }
      }
  });
};

module.exports.deleteUser = async function (id) {
    return await esClient.delete({
        index: userIndex,
        type: '_doc',
        id,
        refresh: true
    });
};