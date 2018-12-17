const esClient = require('../elastic/connection');

module.exports.findAllEntries = async function (page, size, order_key, order_dir) {
    const es_response = await esClient.search({
        sort: order_key + ':' + order_dir,
        from: page * size,
        size: size,
        index: 'users',
    });

    const hits = es_response.hits.hits;
    const total = es_response.hits.total;

    const result = {
        users: [],
        total: total
    };

    if (total) {
        return {...result, users: hits.map((item) => {
                return {...{id: item['_id']}, ...item['_source']};
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
        return {...{id}, ...result[0]['_source']};
    }
};

module.exports.createUser = async function (user) {
    const es_response = await esClient.index({
        index: 'users',
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
  const es_response = await esClient.update({
      index: 'users',
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

  return es_response;
};

module.exports.deleteUser = async function (id) {
    const es_response = await esClient.delete({
        index: 'users',
        type: '_doc',
        id,
        refresh: true
    });

    return es_response;
}