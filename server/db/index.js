const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl =  process.env.MONGODBURL

let _db;

const initDb = async callback => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  try {
    const client = await MongoClient.connect(mongoDbUrl, {useNewUrlParser: true})
    _db = client;
    callback(null, _db);

  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
