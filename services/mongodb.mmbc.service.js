const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

module.exports.getJwt = async (filter) => {
  await client.connect();
  const db = client.db('MMBC');
  const collection = db.collection('mfa');
  const jwt = await collection.findOne(filter)
    .then(document => {
      if (document) {
        return collection.deleteOne(document).then(response => document);
      }
      return ({ jwt: null });
    })
    .catch(error => ({ jwt: null }))

  client.close();
  return jwt;
};

